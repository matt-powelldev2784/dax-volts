import { NavBar } from '@/app/components'
import { SignIn } from '@clerk/nextjs'

export default async function SignInPage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-start gap-4 mt-8 min-h-screen">
        <SignIn forceRedirectUrl="/pages/dashboard" />
      </div>
    </>
  )
}
