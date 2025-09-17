import { NavBar } from '@/app/components'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => (
  <>
    <NavBar />
    <div className="flex justify-center items-center min-h-[70vh] mt-8">
      <SignUp
        path="/pages/auth/signup"
        routing="path"
        signInUrl="/pages/auth/signin"
        forceRedirectUrl="/pages/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-mvOrange text-white',
          },
        }}
      />
    </div>
  </>
)

export default SignUpPage
