/**
 * Types unifiés pour la génération de rapport PERSPECTA
 */

// ============================================
// DONNÉES D'ENTRÉE
// ============================================

export interface CognitiveSignature {
  inhibitoryControl: number;    // 0-100
  processingSpeed: number;      // 0-100
  cognitiveFlexibility: number; // 0-100
  accessFluency: number;        // 0-100
  attentionDrift: number;       // 0-100
  reactionVariance?: number;
  conflictErrors?: number;
  sequencingErrors?: number;
}

export interface RIASECProfile {
  realistic: number;      // 0-10
  investigative: number;  // 0-10
  artistic: number;       // 0-10
  social: number;         // 0-10
  enterprising: number;   // 0-10
  conventional: number;   // 0-10
}

export interface UserValue {
  name: string;
  order: number;    // 1-5 (top 5)
  gapScore: number; // 1-5 (satisfaction)
}

export interface ValuesProfile {
  values: UserValue[];
}

export interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  situation: string;
  task: string;
  action: string;
  result: string;
  skills: string[]; // ["React", "Node.js", ...]
}

export interface ExperienceProfile {
  experiences: Experience[];
}

export interface LifeEvent {
  title: string;
  year: number;
  type: "PRO" | "PERSO" | "FORMATION";
  sentiment: number; // -10 à +10
  description?: string;
}

export interface LifePathProfile {
  events: LifeEvent[];
}

// ============================================
// INPUT COMPLET POUR GÉNÉRATION
// ============================================

export interface CompleteReportInput {
  user: {
    id: string;
    name?: string;
    email: string;
  };
  cognitive: CognitiveSignature;
  riasec: RIASECProfile;
  values?: ValuesProfile;
  experiences?: ExperienceProfile;
  lifePath?: LifePathProfile;
}

// ============================================
// SECTIONS DU RAPPORT (13 sections enrichies)
// ============================================

export interface CompleteReportSections {
  // PARTIE I - Synthèse Générale (7 sections)
  cadre: string;
  synthese: string;
  valeurs_professionnelles: string;      // NOUVEAU
  parcours_professionnel: string;        // NOUVEAU
  croisement_riasec: string;
  scenarios: string;
  environnements_compatibles: string;

  // PARTIE II - Analyse Cognitive (4 sections)
  signature_centrale: string;
  lecture_fonctionnelle: string;
  tensions_cognitives: string;
  zones_vigilance: string;

  // PARTIE III - Transformation (1 section)
  projection_ia: string;

  // PARTIE IV - Conclusion (1 section)
  conclusion: string;
}
