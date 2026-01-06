import { Metadata } from 'next'
import NewHomePage from './new-homepage'

export const metadata: Metadata = {
  title: "PERSPECTA - Bilan de compétences + Certification Blockchain + Emploi",
  description: "La seule plateforme qui valide vos compétences tech, délivre un certificat blockchain et vous connecte aux offres d'emploi France Travail. Spécialiste métiers du numérique.",
  keywords: "bilan compétences, certification blockchain, emploi tech, reconversion numérique, test technique, France Travail, développeur, data scientist, devops, cybersécurité",
  openGraph: {
    title: "PERSPECTA - Certification Tech + Emploi",
    description: "Bilan complet + Certificat blockchain + Matching emploi automatique",
    type: "website",
    locale: "fr_FR",
    url: "https://perspecta.ia-solution.fr",
    siteName: "PERSPECTA"
  },
  twitter: {
    card: "summary_large_image",
    title: "PERSPECTA - Certification Tech + Emploi",
    description: "Bilan complet + Certificat blockchain + Matching emploi automatique"
  }
}

export default function Home() {
  return <NewHomePage />
}
