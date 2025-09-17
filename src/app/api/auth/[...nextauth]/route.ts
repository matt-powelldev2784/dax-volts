import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../../../prisma/db/client'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/pages/auth/signin',
    signOut: '/pages/auth/signout',
    error: '/pages/auth/error',
    verifyRequest: '/pages/auth/verify',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect() {
      return '/pages/dashboard'
    },
    async session(session: any) {
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
