import { NavBar } from '@/app/components'
import { Button } from '@/app/ui'
import { SignOutButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SignOutPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/pages/auth/signin')
  }

  return (
    <>
      <NavBar />
      <div className="flexCol gap-4 mt-5">
        <SignOutButton redirectUrl="/pages/auth/signin">
          <Button
            buttonText="Sign Out"
            optionalClasses="bg-mvOrange text-white font-normal px-6 py-3 rounded"
          />
        </SignOutButton>
      </div>
    </>
  )
}
