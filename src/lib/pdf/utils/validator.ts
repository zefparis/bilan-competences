/**
 * PERSPECTA PDF - Validateur de données
 * Validation des données d'entrée pour la génération PDF
 */

import { ProfileData, CognitiveProfile, RiasecProfile, ProfessionalValue } from '../data/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Valide les données cognitives
 */
function validateCognitive(cognitive: CognitiveProfile | undefined): string[] {
  const errors: string[] = [];

  if (!cognitive) {
    errors.push('Données cognitives manquantes');
    return errors;
  }

  const { flexibility, inhibitoryControl, processingSpeed } = cognitive;

  if (typeof flexibility !== 'number' || flexibility < 0 || flexibility > 100) {
    errors.push('Score flexibilité invalide (doit être 0-100)');
  }

  if (typeof inhibitoryControl !== 'number' || inhibitoryControl < 0 || inhibitoryControl > 100) {
    errors.push('Score contrôle inhibiteur invalide (doit être 0-100)');
  }

  if (typeof processingSpeed !== 'number' || processingSpeed < 0 || processingSpeed > 100) {
    errors.push('Score vitesse de traitement invalide (doit être 0-100)');
  }

  return errors;
}

/**
 * Valide le profil RIASEC
 */
function validateRiasec(riasec: RiasecProfile | undefined): string[] {
  const errors: string[] = [];

  if (!riasec) {
    errors.push('Profil RIASEC manquant');
    return errors;
  }

  const codes = ['R', 'I', 'A', 'S', 'E', 'C'] as const;
  
  for (const code of codes) {
    const score = riasec[code];
    if (typeof score !== 'number' || score < 0 || score > 100) {
      errors.push(`Score RIASEC ${code} invalide (doit être 0-100)`);
    }
  }

  if (!riasec.dominant || !Array.isArray(riasec.dominant) || riasec.dominant.length !== 3) {
    errors.push('Profil RIASEC incomplet (besoin de 3 dimensions dominantes)');
  } else {
    for (const code of riasec.dominant) {
      if (!codes.includes(code as typeof codes[number])) {
        errors.push(`Code RIASEC dominant invalide: ${code}`);
      }
    }
  }

  return errors;
}

/**
 * Valide les valeurs professionnelles
 */
function validateValues(values: ProfessionalValue[] | undefined): string[] {
  const errors: string[] = [];

  if (!values || !Array.isArray(values)) {
    errors.push('Valeurs professionnelles manquantes');
    return errors;
  }

  if (values.length < 3) {
    errors.push('Au moins 3 valeurs professionnelles requises');
  }

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    
    if (!value.name || typeof value.name !== 'string') {
      errors.push(`Valeur ${i + 1}: nom manquant`);
    }

    if (typeof value.satisfaction !== 'number' || value.satisfaction < 1 || value.satisfaction > 5) {
      errors.push(`Valeur "${value.name || i + 1}": satisfaction invalide (doit être 1-5)`);
    }

    if (typeof value.importance !== 'number' || value.importance < 1 || value.importance > 5) {
      errors.push(`Valeur "${value.name || i + 1}": importance invalide (doit être 1-5)`);
    }
  }

  return errors;
}

/**
 * Valide les métadonnées
 */
function validateMeta(meta: ProfileData['meta'] | undefined): string[] {
  const errors: string[] = [];

  if (!meta) {
    errors.push('Métadonnées manquantes');
    return errors;
  }

  if (!meta.id || typeof meta.id !== 'string') {
    errors.push('ID de profil manquant');
  }

  if (!meta.userName || typeof meta.userName !== 'string') {
    errors.push('Nom d\'utilisateur manquant');
  }

  if (!meta.date || typeof meta.date !== 'string') {
    errors.push('Date manquante');
  }

  return errors;
}

/**
 * Génère des avertissements (non bloquants)
 */
function generateWarnings(data: ProfileData): string[] {
  const warnings: string[] = [];

  // Vérifier si le parcours est vide
  if (!data.career || data.career.length === 0) {
    warnings.push('Aucune expérience professionnelle fournie - le parcours sera vide');
  }

  // Vérifier si les textes générés sont présents
  if (!data.generatedTexts?.signaturePhrase) {
    warnings.push('Phrase signature non générée - utilisation du texte par défaut');
  }

  // Vérifier les scores extrêmes
  if (data.cognitive) {
    if (data.cognitive.flexibility === 100 || data.cognitive.flexibility === 0) {
      warnings.push('Score flexibilité extrême (0 ou 100) - vérifier les données');
    }
    if (data.cognitive.processingSpeed < 5) {
      warnings.push('Vitesse de traitement très basse - vérifier les données');
    }
  }

  return warnings;
}

/**
 * Valide l'ensemble des données du profil
 */
export function validateProfileData(data: ProfileData | undefined): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data) {
    return {
      isValid: false,
      errors: ['Données de profil manquantes'],
      warnings: [],
    };
  }

  // Validation des sections obligatoires
  errors.push(...validateMeta(data.meta));
  errors.push(...validateCognitive(data.cognitive));
  errors.push(...validateRiasec(data.riasec));
  errors.push(...validateValues(data.values));

  // Génération des avertissements
  if (errors.length === 0) {
    warnings.push(...generateWarnings(data));
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Valide et nettoie les données (avec valeurs par défaut)
 */
export function sanitizeProfileData(data: Partial<ProfileData>): ProfileData {
  const now = new Date().toISOString().split('T')[0];
  
  return {
    meta: {
      id: data.meta?.id || `PERSPECTA-${Date.now()}`,
      date: data.meta?.date || now,
      userName: data.meta?.userName || 'Utilisateur',
      userEmail: data.meta?.userEmail,
    },
    cognitive: {
      flexibility: data.cognitive?.flexibility ?? 50,
      inhibitoryControl: data.cognitive?.inhibitoryControl ?? 50,
      processingSpeed: data.cognitive?.processingSpeed ?? 50,
      attentionDrift: data.cognitive?.attentionDrift,
      fluency: data.cognitive?.fluency,
      conflictErrors: data.cognitive?.conflictErrors,
      sequencingErrors: data.cognitive?.sequencingErrors,
    },
    riasec: {
      R: data.riasec?.R ?? 50,
      I: data.riasec?.I ?? 50,
      A: data.riasec?.A ?? 50,
      S: data.riasec?.S ?? 50,
      E: data.riasec?.E ?? 50,
      C: data.riasec?.C ?? 50,
      dominant: data.riasec?.dominant || ['R', 'I', 'E'],
    },
    values: data.values || [
      { name: 'Créativité', satisfaction: 3, importance: 4 },
      { name: 'Autonomie', satisfaction: 3, importance: 4 },
      { name: 'Sécurité', satisfaction: 3, importance: 3 },
      { name: 'Reconnaissance', satisfaction: 3, importance: 3 },
      { name: 'Équilibre', satisfaction: 3, importance: 4 },
    ],
    career: data.career || [],
    lifeEvents: data.lifeEvents,
    jobCompatibility: data.jobCompatibility,
    scenarios: data.scenarios,
    environments: data.environments,
    actions: data.actions,
    resources: data.resources,
    generatedTexts: data.generatedTexts,
  };
}
