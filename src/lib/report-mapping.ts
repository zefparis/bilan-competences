/**
 * PERSPECTA - Mapping des sections pour les livrables
 * 
 * Ce fichier définit le mapping explicite entre :
 * - Le moteur cognitif complet (16 sections)
 * - Les livrables spécifiques (PDF premium, etc.)
 */

// 🔑 Clés des sections pour le PDF Premium (7 sections au total)
export const PDF_PREMIUM_SECTION_KEYS = [
  "signature_centrale",
  "lecture_fonctionnelle", 
  "tensions_cognitives",
  "zones_vigilance",
  "environnements_compatibles",
  "projection_ia",
  "conclusion"
] as const

// 📝 Titres maîtrisés pour le PDF Premium
export const SECTION_TITLES: Record<string, string> = {
  signature_centrale: "Signature cognitive centrale",
  lecture_fonctionnelle: "Lecture fonctionnelle du fonctionnement cognitif",
  tensions_cognitives: "Carte des tensions cognitives", 
  zones_vigilance: "Zones de vigilance cognitive",
  environnements_compatibles: "Environnements professionnels compatibles",
  projection_ia: "Empreinte cognitive et transformation du travail",
  conclusion: "Conclusion stratégique",
} as const

/**
 * Extrait les sections du PDF premium à partir du rapport complet
 * 
 * @param allSections - Objet contenant toutes les 16 sections générées
 * @returns Tableau des sections PDF premium avec clé et contenu
 */
export function extractPremiumPdfSections(
  allSections: Record<string, string>
): { key: string; content: string }[] {
  return PDF_PREMIUM_SECTION_KEYS.map((key) => ({
    key,
    content: allSections[key] || `*Section ${key} non disponible*`,
  }))
}

/**
 * Type pour les sections complètes du rapport cognitif
 */
export type CognitiveReportSections = {
  cadre: string
  synthese: string
  signature_centrale: string
  lecture_fonctionnelle: string
  tensions_cognitives: string
  zones_vigilance: string
  environnements_compatibles: string
  projection_ia: string
  forces: string
  leviers_developpement: string
  croisement_riasec: string
  scenarios: string
  environnements: string
  leviers: string
  conclusion_enrichie: string
  conclusion: string
}
