// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthStatus from '@/components/auth-status'
import { Suspense } from 'react'
import { NextAuthProvider } from './providers'

const rubik = Rubik({ subsets: ['latin'] })

const title = 'Pantry Pilot 2'
const description = 'Web kelompok 5'

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
  themeColor: '#FFF',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={rubik.className}>
        <Toaster />
        <Suspense fallback="Loading...">
          {/* @ts-expect-error Async Server Component */}
          <AuthStatus />
        </Suspense>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
