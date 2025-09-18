import './globals.css'
import type { Metadata } from 'next'
import { ReduxProvider } from '@/redux/provider/provider'
import { Libre_Franklin } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const Libre = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Max Volts Web Portal',
  description: 'Max Volts web Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider
        signInUrl="/pages/auth/signin"
        signUpUrl="/pages/auth/signup"
        signInForceRedirectUrl="/pages/dashboard"
        signUpForceRedirectUrl="/pages/dashboard"
        afterSignOutUrl="/pages/auth/signin"
        appearance={{
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
        }}
      >
        <body className={`${Libre.className} min-w-[320px]`}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
