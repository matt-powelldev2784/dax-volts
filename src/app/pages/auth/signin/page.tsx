import { NavBar } from '@/app/components'
import { SignInButton } from '@clerk/nextjs'

export default async function SignInPage() {
  return (
    <>
      <NavBar />
      <SignInButton />
    </>
  )
}
