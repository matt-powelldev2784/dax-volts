import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../../../prisma/db/client'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

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
    EmailProvider({
      server: {
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY! },
      },
      from: process.env.EMAIL_FROM!,
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
