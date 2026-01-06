import { Metadata } from 'next'
import HomePageV3 from './homepage-v3.1'

export const metadata: Metadata = {
  title: "PERSPECTA - Reconversion Professionnelle & Bilan de Compétences",
  description: "287 métiers français • Analyse IA GPT-4o • Module handicap inclusif • Matching emploi + formations CPF • Certification blockchain • 49€",
  keywords: "reconversion professionnelle, bilan de compétences, handicap RQTH, formation CPF, analyse IA, AGEFIPH, orientation professionnelle, compétences transférables, France Travail",
  openGraph: {
    title: "PERSPECTA - Votre reconversion, étape par étape",
    description: "Plateforme universelle avec module handicap. 287 métiers • Analyse IA • 49€ • Garantie satisfaction",
    type: "website",
    locale: "fr_FR",
    url: "https://perspecta.ia-solution.fr",
    siteName: "PERSPECTA"
  },
  twitter: {
    card: "summary_large_image",
    title: "PERSPECTA - Reconversion professionnelle universelle",
    description: "287 métiers • Module handicap • Analyse IA • 49€"
  }
}

export default function Home() {
  return <HomePageV3 />
}
