import bcrypt from "bcryptjs"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

interface CustomJWTPayload {
    email:string
    userId:string
    iat?: number
    exp?: number
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)


export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const verifyPassword = async (password:string, hashedPassword:string) => {
    return await bcrypt.compare(password, hashedPassword)
}

export const createJWT = async(email: string, userId: string) => {
    return await new SignJWT({ email , userId })
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(SECRET_KEY)
}

export const verifyJWT = async (): Promise<CustomJWTPayload | null> => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(!token) return null

    try {
        const { payload } : { payload: CustomJWTPayload } = await jwtVerify(token , SECRET_KEY)
        return payload
    } catch (error) {
        return null
    }
}

export const getSession = async (): Promise<{email: string; userId: string} | null> => {
    const payload = await verifyJWT()

    if(payload && typeof payload.email === 'string' && typeof payload.userId === 'string'){
        return {
            email: payload.email,
            userId: payload.userId
        }
    }
    return null
}
