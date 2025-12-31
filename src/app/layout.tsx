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
  title: {
    default: 'PERSPECTA - Bilan de Compétences & Évaluation Cognitive',
    template: '%s | PERSPECTA'
  },
  description: 'Plateforme premium d\'évaluation cognitive et de bilan de compétences. Découvrez votre signature cognitive unique, votre profil RIASEC et obtenez des recommandations personnalisées pour votre orientation professionnelle.',
  keywords: ['bilan de compétences', 'évaluation cognitive', 'orientation professionnelle', 'RIASEC', 'signature cognitive', 'reconversion'],
  authors: [{ name: 'ia-solution' }],
  creator: 'ia-solution',
  publisher: 'PERSPECTA',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://perspecta.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PERSPECTA',
    title: 'PERSPECTA - Bilan de Compétences & Évaluation Cognitive',
    description: 'Découvrez votre signature cognitive unique et obtenez des recommandations personnalisées pour votre orientation professionnelle.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PERSPECTA - Bilan de Compétences',
    description: 'Plateforme premium d\'évaluation cognitive et de bilan de compétences.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
