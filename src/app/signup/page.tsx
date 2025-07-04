import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signUpAction } from "@/actions/auth"


interface SignUpPageProps {
    searchParams?: Promise<{error?: string}>
}

export default async function SignUpPage({searchParams} : SignUpPageProps){
    const session = await getSession()
    if(session) redirect('/dashboard')

    const params = await searchParams

    const errorMessages =  {
        'email-exists':
      'An account with this email already exists. Please try logging in.',
    'invalid-email': 'Please provide a valid email address.',
    'weak-password': 'Password must be at least 8 characters long.',
    'password-mismatch': 'Passwords do not match. Please try again.',
    'missing-fields': 'Please fill in all required fields.',
    }

     const errorMessage = params?.error
    ? errorMessages[params.error as keyof typeof errorMessages]
    : null

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Create Account
          </CardTitle>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form action={signUpAction}  className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="py-5 px-4 text-base rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                minLength={8}
                className="py-5 px-4 text-base rounded-xl"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                minLength={8}
                className="py-5 px-4 text-base rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base font-medium bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl shadow-lg transition-all"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    )

}