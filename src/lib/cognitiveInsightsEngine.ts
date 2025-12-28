/**
 * Cognitive Insights Engine
 * 
 * Generates human-readable insights from cognitive profile and normalized traits.
 * 
 * Constraints:
 * - Professional, accessible language
 * - No medical diagnosis
 * - No judgment or determinism
 * - Empowering and constructive tone
 */

import type { NormalizedCognitiveProfile, QualitativeLevel } from "./cognitiveNormalizer"
import type { CognitiveProfile } from "./cognitiveProfileEngine"

// ============================================================================
// Types
// ============================================================================

export interface CognitiveInsightsInput {
  primaryProfile: CognitiveProfile
  secondaryProfile?: CognitiveProfile
  traits: NormalizedCognitiveProfile
}

export interface CognitiveInsights {
  strengths: string[]
  frictionZones: string[]
  decisionStyle: string
  communicationStyle: string
  learningPreferences: string[]
}

// ============================================================================
// Insight Knowledge Base
// ============================================================================

/**
 * Profile-based strengths.
 * Each profile has core strengths that manifest regardless of trait levels.
 */
const PROFILE_STRENGTHS: Record<CognitiveProfile, string[]> = {
  FORM: [
    "Capacité à structurer l'information de manière logique",
    "Rigueur dans l'analyse et le traitement des données",
    "Aptitude à suivre des processus et des méthodologies",
  ],
  COLOR: [
    "Facilité à générer des idées nouvelles et originales",
    "Capacité à faire des associations inattendues",
    "Ouverture aux approches non conventionnelles",
  ],
  VOLUME: [
    "Prise de décision rapide et efficace",
    "Capacité à gérer plusieurs priorités simultanément",
    "Orientation vers l'action et les résultats",
  ],
  SOUND: [
    "Aisance dans la communication interpersonnelle",
    "Capacité à créer des liens et à fédérer",
    "Sensibilité aux dynamiques relationnelles",
  ],
}

/**
 * Trait-based strengths (when trait is "high").
 */
const TRAIT_STRENGTHS: Record<keyof NormalizedCognitiveProfile, string> = {
  inhibitionControl: "Maîtrise de soi dans les situations exigeantes",
  workingMemory: "Capacité à jongler avec plusieurs informations simultanément",
  decisionSpeed: "Réactivité face aux situations nécessitant une réponse rapide",
  cognitiveLoadTolerance: "Résistance à la pression et aux environnements complexes",
  verbalFluency: "Facilité d'expression et clarté dans la communication",
}

/**
 * Friction zones based on trait levels (when trait is "low").
 * Phrased constructively as areas of attention, not weaknesses.
 */
const TRAIT_FRICTION_ZONES: Record<keyof NormalizedCognitiveProfile, string> = {
  inhibitionControl: "Les environnements avec de nombreuses distractions peuvent demander un effort supplémentaire de concentration",
  workingMemory: "Les tâches impliquant de nombreuses informations simultanées peuvent bénéficier d'outils de support (notes, listes)",
  decisionSpeed: "Les situations nécessitant des décisions immédiates peuvent générer un inconfort temporaire",
  cognitiveLoadTolerance: "Les périodes de forte charge de travail peuvent nécessiter des pauses régulières pour maintenir l'efficacité",
  verbalFluency: "L'expression orale spontanée peut être facilitée par une préparation préalable",
}

/**
 * Profile-based friction zones (potential challenges).
 */
const PROFILE_FRICTION_ZONES: Record<CognitiveProfile, string> = {
  FORM: "Les situations très ambiguës ou sans cadre défini peuvent demander un temps d'adaptation",
  COLOR: "Les environnements très procéduriers peuvent parfois sembler contraignants",
  VOLUME: "Les contextes nécessitant une réflexion prolongée avant l'action peuvent générer de l'impatience",
  SOUND: "Les tâches solitaires prolongées peuvent réduire la motivation naturelle",
}

/**
 * Decision styles based on profile and decision speed trait.
 */
const DECISION_STYLES: Record<CognitiveProfile, Record<QualitativeLevel, string>> = {
  FORM: {
    high: "Vous privilégiez une approche analytique rapide, en vous appuyant sur des critères objectifs pour trancher efficacement.",
    medium: "Vous prenez le temps d'analyser les options selon des critères logiques avant de vous engager.",
    low: "Vous préférez une analyse approfondie et méthodique, en examinant toutes les variables avant de décider.",
  },
  COLOR: {
    high: "Vous faites confiance à votre intuition et pouvez prendre des décisions créatives rapidement.",
    medium: "Vous combinez intuition et réflexion, laissant les idées mûrir avant de choisir.",
    low: "Vous aimez explorer plusieurs pistes créatives et laisser émerger la meilleure solution avec le temps.",
  },
  VOLUME: {
    high: "Vous êtes à l'aise avec les décisions rapides et assumez facilement la responsabilité de vos choix.",
    medium: "Vous savez accélérer quand nécessaire tout en prenant le recul utile sur les décisions importantes.",
    low: "Vous préférez consolider votre position avant d'agir, en vous assurant d'avoir toutes les cartes en main.",
  },
  SOUND: {
    high: "Vous intégrez rapidement les perspectives des autres pour prendre des décisions collaboratives.",
    medium: "Vous consultez les parties prenantes clés avant de vous positionner.",
    low: "Vous privilégiez le consensus et prenez le temps de recueillir les avis avant de trancher.",
  },
}

/**
 * Communication styles based on profile and verbal fluency trait.
 */
const COMMUNICATION_STYLES: Record<CognitiveProfile, Record<QualitativeLevel, string>> = {
  FORM: {
    high: "Communication claire, structurée et factuelle. Vous allez à l'essentiel avec précision.",
    medium: "Communication organisée et méthodique, avec un souci de clarté dans vos explications.",
    low: "Communication réfléchie et précise, vous préférez les échanges préparés aux improvisations.",
  },
  COLOR: {
    high: "Communication expressive et imagée. Vous savez captiver par vos métaphores et vos récits.",
    medium: "Communication vivante qui mêle créativité et substance dans vos échanges.",
    low: "Communication authentique, vous exprimez vos idées créatives de manière posée et réfléchie.",
  },
  VOLUME: {
    high: "Communication directe et orientée action. Vous allez droit au but avec assurance.",
    medium: "Communication efficace qui équilibre concision et diplomatie selon le contexte.",
    low: "Communication mesurée, vous choisissez vos mots avec soin pour maximiser l'impact.",
  },
  SOUND: {
    high: "Communication chaleureuse et engageante. Vous créez facilement un climat de confiance.",
    medium: "Communication empathique qui s'adapte naturellement à vos interlocuteurs.",
    low: "Communication attentive et à l'écoute, vous privilégiez la qualité des échanges à leur quantité.",
  },
}

/**
 * Learning preferences based on profile.
 */
const LEARNING_PREFERENCES: Record<CognitiveProfile, string[]> = {
  FORM: [
    "Apprentissage structuré avec des objectifs clairs et mesurables",
    "Supports écrits détaillés et documentation de référence",
    "Progression logique et séquentielle des concepts",
    "Exercices pratiques avec feedback précis",
  ],
  COLOR: [
    "Apprentissage par exploration et expérimentation",
    "Supports visuels et interactifs stimulant la créativité",
    "Liberté dans l'approche et les méthodes",
    "Projets ouverts permettant l'expression personnelle",
  ],
  VOLUME: [
    "Apprentissage orienté vers l'application concrète",
    "Mises en situation et cas pratiques",
    "Formats courts et dynamiques",
    "Objectifs ambitieux avec résultats rapides",
  ],
  SOUND: [
    "Apprentissage collaboratif et échanges en groupe",
    "Discussions et partages d'expériences",
    "Mentorat et accompagnement personnalisé",
    "Environnement bienveillant et encourageant",
  ],
}

/**
 * Additional learning preferences based on traits.
 */
const TRAIT_LEARNING_MODIFIERS: Partial<Record<keyof NormalizedCognitiveProfile, {
  condition: QualitativeLevel
  preference: string
}>> = {
  cognitiveLoadTolerance: {
    condition: "low",
    preference: "Séquences d'apprentissage courtes avec pauses régulières",
  },
  workingMemory: {
    condition: "low",
    preference: "Supports de révision et aide-mémoire accessibles",
  },
}

// ============================================================================
// Insight Generation Functions
// ============================================================================

/**
 * Generate strengths based on profile and high-level traits.
 */
function generateStrengths(input: CognitiveInsightsInput): string[] {
  const strengths: string[] = []

  // Add profile-based strengths (first 2)
  strengths.push(...PROFILE_STRENGTHS[input.primaryProfile].slice(0, 2))

  // Add secondary profile strength if exists
  if (input.secondaryProfile) {
    strengths.push(PROFILE_STRENGTHS[input.secondaryProfile][0])
  }

  // Add trait-based strengths for high traits
  for (const [trait, level] of Object.entries(input.traits)) {
    if (level === "high") {
      const strength = TRAIT_STRENGTHS[trait as keyof NormalizedCognitiveProfile]
      if (strength && !strengths.includes(strength)) {
        strengths.push(strength)
      }
    }
  }

  // Limit to 5 strengths max
  return strengths.slice(0, 5)
}

/**
 * Generate friction zones based on profile and low-level traits.
 * Phrased constructively as areas of attention.
 */
function generateFrictionZones(input: CognitiveInsightsInput): string[] {
  const frictionZones: string[] = []

  // Add profile-based friction zone
  frictionZones.push(PROFILE_FRICTION_ZONES[input.primaryProfile])

  // Add trait-based friction zones for low traits
  for (const [trait, level] of Object.entries(input.traits)) {
    if (level === "low") {
      const friction = TRAIT_FRICTION_ZONES[trait as keyof NormalizedCognitiveProfile]
      if (friction && !frictionZones.includes(friction)) {
        frictionZones.push(friction)
      }
    }
  }

  // Limit to 3 friction zones max (keep it constructive, not overwhelming)
  return frictionZones.slice(0, 3)
}

/**
 * Generate decision style description.
 */
function generateDecisionStyle(input: CognitiveInsightsInput): string {
  const speedLevel = input.traits.decisionSpeed
  return DECISION_STYLES[input.primaryProfile][speedLevel]
}

/**
 * Generate communication style description.
 */
function generateCommunicationStyle(input: CognitiveInsightsInput): string {
  const fluencyLevel = input.traits.verbalFluency
  return COMMUNICATION_STYLES[input.primaryProfile][fluencyLevel]
}

/**
 * Generate learning preferences based on profile and traits.
 */
function generateLearningPreferences(input: CognitiveInsightsInput): string[] {
  const preferences: string[] = []

  // Add profile-based preferences (first 3)
  preferences.push(...LEARNING_PREFERENCES[input.primaryProfile].slice(0, 3))

  // Add trait-based modifiers
  for (const [trait, modifier] of Object.entries(TRAIT_LEARNING_MODIFIERS)) {
    if (modifier && input.traits[trait as keyof NormalizedCognitiveProfile] === modifier.condition) {
      preferences.push(modifier.preference)
    }
  }

  // Add secondary profile preference if exists
  if (input.secondaryProfile) {
    const secondaryPref = LEARNING_PREFERENCES[input.secondaryProfile][0]
    if (!preferences.includes(secondaryPref)) {
      preferences.push(secondaryPref)
    }
  }

  // Limit to 5 preferences max
  return preferences.slice(0, 5)
}

// ============================================================================
// Main Export
// ============================================================================

/**
 * Generate comprehensive cognitive insights from profile and traits.
 * 
 * @param input - Cognitive profile and normalized traits
 * @returns Human-readable insights for non-technical users
 * 
 * @example
 * ```ts
 * const insights = generateCognitiveInsights({
 *   primaryProfile: "FORM",
 *   secondaryProfile: "VOLUME",
 *   traits: {
 *     inhibitionControl: "high",
 *     workingMemory: "medium",
 *     decisionSpeed: "medium",
 *     cognitiveLoadTolerance: "high",
 *     verbalFluency: "low"
 *   }
 * })
 * ```
 */
export function generateCognitiveInsights(input: CognitiveInsightsInput): CognitiveInsights {
  return {
    strengths: generateStrengths(input),
    frictionZones: generateFrictionZones(input),
    decisionStyle: generateDecisionStyle(input),
    communicationStyle: generateCommunicationStyle(input),
    learningPreferences: generateLearningPreferences(input),
  }
}
