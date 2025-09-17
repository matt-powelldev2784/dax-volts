import { NavBar } from '@/app/components'
import { SignOutButton } from '@clerk/nextjs'


export default function SignOutPage() {
  return (
    <>
      <NavBar />
      <div className="flexCol gap-4">
        <SignOutButton />
      </div>
    </>
  )
}
