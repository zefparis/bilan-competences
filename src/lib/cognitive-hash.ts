import { createHash } from 'crypto'

export interface CognitiveSignatureData {
  inhibitoryControl: number
  processingSpeed: number
  cognitiveFlexibility: number
  accessFluency: number
  attentionDrift: number
}

export interface RIASECProfile {
  R: number
  I: number
  A: number
  S: number
  E: number
  C: number
}

export interface CognitiveHashInput {
  cognitiveSignature: CognitiveSignatureData
  riasec?: RIASECProfile
  userId?: string
  userName?: string
}

/**
 * Génère un hash cognitif unique et déterministe pour un rapport PERSPECTA
 * 
 * @param input - Données du profil cognitif et métadonnées
 * @returns Hash SHA-256 hexadécimal de 64 caractères
 */
export function generateCognitiveHash(input: CognitiveHashInput): string {
  // Extraire uniquement les scores numériques de la signature cognitive
  const cognitiveScores = {
    processingSpeed: input.cognitiveSignature.processingSpeed,
    inhibitoryControl: input.cognitiveSignature.inhibitoryControl,
    cognitiveFlexibility: input.cognitiveSignature.cognitiveFlexibility,
    accessFluency: input.cognitiveSignature.accessFluency,
    attentionDrift: input.cognitiveSignature.attentionDrift
  }

  // Construire l'objet à hasher avec tri des clés
  const hashObject: Record<string, any> = {
    cognitiveSignature: cognitiveScores,
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD uniquement
  }

  // Ajouter RIASEC si présent
  if (input.riasec) {
    hashObject.riasec = {
      R: input.riasec.R,
      I: input.riasec.I,
      A: input.riasec.A,
      S: input.riasec.S,
      E: input.riasec.E,
      C: input.riasec.C
    }
  }

  // Ajouter identifiant utilisateur pseudonymisé si présent
  if (input.userId || input.userName) {
    // Pseudonymisation simple : hash de l'identifiant
    const userIdentifier = input.userId || input.userName || ''
    const userHash = createHash('sha256')
      .update(userIdentifier, 'utf8')
      .digest('hex')
      .substring(0, 8)
    
    hashObject.user = `U-${userHash}`
  }

  // Sérialisation JSON canonique (clés triées)
  const canonicalString = JSON.stringify(hashObject, Object.keys(hashObject).sort())

  // Génération du hash SHA-256
  const hash = createHash('sha256')
    .update(canonicalString, 'utf8')
    .digest('hex')

  return hash
}

/**
 * Formate le hash pour l'affichage dans le PDF
 * 
 * @param hash - Hash complet de 64 caractères
 * @returns Format court pour affichage : HCS-PERSPECTA-[8 premiers caractères]
 */
export function formatCognitiveHashForPDF(hash: string): string {
  const shortHash = hash.substring(0, 8).toUpperCase()
  return `HCS-PERSPECTA-${shortHash}`
}

/**
 * Vérifie la cohérence d'un hash avec les données d'origine
 * 
 * @param originalHash - Hash original à vérifier
 * @param input - Données utilisées pour générer le hash
 * @returns true si le hash correspond aux données
 */
export function verifyCognitiveHash(originalHash: string, input: CognitiveHashInput): boolean {
  const computedHash = generateCognitiveHash(input)
  return computedHash === originalHash
}
