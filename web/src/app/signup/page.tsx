import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up | AkaraCarbon",
  description: "Create an AkaraCarbon account to start buying or selling carbon credits.",
}

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Sign up to start your carbon journey</p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
