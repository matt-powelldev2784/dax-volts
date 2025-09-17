import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function checkAuth() {
  const { userId } = await auth()

  const authorisedUser1 = process.env.AUTHORISED_USER1

  if (!userId || userId !== authorisedUser1) {
    redirect('/pages/auth/signin')
  }
}
