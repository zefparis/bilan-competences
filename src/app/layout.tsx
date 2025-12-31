import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import { AuthSessionProvider } from '@/components/session-provider'
import { ReactQueryProvider } from '@/components/query-provider'
import { CookieBanner } from '@/components/cookie-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bilan de Compétences',
  description: 'Application web de bilan de compétences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </AuthSessionProvider>
          <Toaster />
          <SonnerToaster richColors />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
