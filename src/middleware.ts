import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/pages/auth/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
    const { userId } = await auth()
    const authorisedUser1 = process.env.AUTHORISED_USER1
    const authorisedUser2 = process.env.AUTHORISED_USER2
    const authorisedUsers = [authorisedUser1, authorisedUser2]

    if (!authorisedUsers.includes(userId || '')) {
      return NextResponse.redirect(new URL('/pages/auth/signin', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
