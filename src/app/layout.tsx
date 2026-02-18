import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'
import { AuthSessionProvider } from '@/components/session-provider'
import { ReactQueryProvider } from '@/components/query-provider'
import { CookieBanner } from '@/components/cookie-banner'
import { AIConsentBanner } from '@/components/ai-consent-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PERSPECTA-COMPETENCES - Évaluation Professionnelle & Évaluation Cognitive',
    template: '%s | PERSPECTA-COMPETENCES',
  },
  description:
    "Plateforme premium d'évaluation cognitive et professionnelle.",
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? 'https://perspecta.fr'
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  if(document.querySelector('script[data-widget]'))return;
  var s=document.createElement('script');
  s.src='https://hcs-widget-mvp.vercel.app/widget/v3/hcs-widget.js';
  s.async=true;
  s.setAttribute('data-widget','HYtUigkEXGYU1cu8gzgTadzm2HjaOF7k');
  document.head.appendChild(s);
})()`
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </AuthSessionProvider>

          <Toaster />
          <SonnerToaster richColors />
          <CookieBanner />
          <AIConsentBanner />

        </ThemeProvider>
      </body>
    </html>
  )
}
