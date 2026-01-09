import { Metadata } from 'next'
import HomePageV3 from './homepage-v3.1'

export const metadata: Metadata = {
  title: "PERSPECTA-COMPETENCES - Reconversion Professionnelle & Évaluation Professionnelle",
  description: "287 métiers français • Analyse IA Claude 3.5 • Module handicap inclusif • Matching emploi + formations CPF • Certification blockchain • 49€",
  keywords: "reconversion professionnelle, évaluation professionnelle, handicap RQTH, formation CPF, analyse IA, AGEFIPH, orientation professionnelle, compétences transférables, France Travail",
  openGraph: {
    title: "PERSPECTA-COMPETENCES - Votre reconversion, étape par étape",
    description: "Outil d'orientation professionnelle avec module handicap. 287 métiers • Analyse IA • 49€",
    type: "website",
    locale: "fr_FR",
    url: "https://perspecta.ia-solution.fr",
    siteName: "PERSPECTA-COMPETENCES"
  },
  twitter: {
    card: "summary_large_image",
    title: "PERSPECTA-COMPETENCES - Reconversion professionnelle universelle",
    description: "287 métiers • Module handicap • Analyse IA • 49€"
  }
}

export default function Home() {
  return <HomePageV3 />
}
