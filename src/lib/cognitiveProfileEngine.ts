/**
 * Cognitive Profile Engine
 * 
 * Determines the dominant cognitive profile (FORM, COLOR, VOLUME, SOUND)
 * from normalized cognitive test results.
 * 
 * Logic is deterministic, explainable, and produces no numeric scores in output.
 */

import type { NormalizedCognitiveProfile } from "./cognitiveNormalizer"

// ============================================================================
// Types
// ============================================================================

export type CognitiveProfile = "FORM" | "COLOR" | "VOLUME" | "SOUND"
export type ConfidenceLevel = "low" | "medium" | "high"

export interface CognitiveProfileResult {
  primaryProfile: CognitiveProfile
  secondaryProfile?: CognitiveProfile
  confidenceLevel: ConfidenceLevel
}

// ============================================================================
// Profile Mapping Logic
// ============================================================================

/**
 * HCS-U7 Cognitive Profile Mapping:
 * 
 * FORM (Structural/Analytical):
 *   - High inhibition control → methodical, rule-following
 *   - High cognitive load tolerance → handles complexity
 *   
 * COLOR (Creative/Intuitive):
 *   - High verbal fluency → expressive, associative thinking
 *   - Medium/Low inhibition → allows divergent thought
 *   
 * VOLUME (Executive/Decisive):
 *   - High decision speed → quick judgment
 *   - High working memory → holds multiple factors
 *   
 * SOUND (Relational/Communicative):
 *   - High verbal fluency → communication strength
 *   - High working memory → tracks conversational context
 */

/** Internal weight for qualitative levels */
const LEVEL_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1,
} as const

/**
 * Profile contribution matrix.
 * Each profile is influenced by specific cognitive dimensions with weights.
 * Weights are normalized internally - higher = stronger influence.
 */
const PROFILE_CONTRIBUTIONS: Record<CognitiveProfile, {
  dimension: keyof NormalizedCognitiveProfile
  weight: number
}[]> = {
  FORM: [
    { dimension: "inhibitionControl", weight: 3 },
    { dimension: "cognitiveLoadTolerance", weight: 3 },
    { dimension: "workingMemory", weight: 1 },
  ],
  COLOR: [
    { dimension: "verbalFluency", weight: 3 },
    { dimension: "decisionSpeed", weight: 1 },
    // Note: low inhibition favors COLOR, handled specially
  ],
  VOLUME: [
    { dimension: "decisionSpeed", weight: 3 },
    { dimension: "workingMemory", weight: 2 },
    { dimension: "cognitiveLoadTolerance", weight: 1 },
  ],
  SOUND: [
    { dimension: "verbalFluency", weight: 2 },
    { dimension: "workingMemory", weight: 2 },
    { dimension: "inhibitionControl", weight: 1 },
  ],
}

// ============================================================================
// Scoring Functions (Internal Only)
// ============================================================================

/**
 * Calculate internal score for a profile based on normalized dimensions.
 * Score is used only for comparison, never exposed.
 */
function calculateProfileScore(
  profile: CognitiveProfile,
  normalized: NormalizedCognitiveProfile
): number {
  const contributions = PROFILE_CONTRIBUTIONS[profile]
  let score = 0

  for (const { dimension, weight } of contributions) {
    const level = normalized[dimension]
    score += LEVEL_WEIGHTS[level] * weight
  }

  // Special case: COLOR benefits from lower inhibition (divergent thinking)
  if (profile === "COLOR") {
    const inhibitionPenalty = LEVEL_WEIGHTS[normalized.inhibitionControl]
    // Invert: low inhibition = +2, medium = +1, high = 0
    score += (4 - inhibitionPenalty)
  }

  return score
}

/**
 * Determine confidence level based on score differentiation.
 * - High: clear winner with significant gap
 * - Medium: moderate differentiation
 * - Low: close scores, less certainty
 */
function determineConfidence(
  primaryScore: number,
  secondaryScore: number,
  totalMaxScore: number
): ConfidenceLevel {
  const gap = primaryScore - secondaryScore
  const gapRatio = gap / totalMaxScore

  if (gapRatio >= 0.20) return "high"    // 20%+ gap = high confidence
  if (gapRatio >= 0.10) return "medium"  // 10-20% gap = medium
  return "low"                            // < 10% gap = low confidence
}

// ============================================================================
// Main Export
// ============================================================================

/**
 * Determine cognitive profile from normalized test results.
 * 
 * @param normalized - Output from cognitiveNormalizer
 * @returns Primary profile, optional secondary, and confidence level
 * 
 * @example
 * ```ts
 * const result = determineCognitiveProfile({
 *   inhibitionControl: "high",
 *   workingMemory: "medium",
 *   decisionSpeed: "medium",
 *   cognitiveLoadTolerance: "high",
 *   verbalFluency: "low"
 * })
 * // => { primaryProfile: "FORM", secondaryProfile: "VOLUME", confidenceLevel: "high" }
 * ```
 */
export function determineCognitiveProfile(
  normalized: NormalizedCognitiveProfile
): CognitiveProfileResult {
  // Calculate scores for all profiles
  const scores: { profile: CognitiveProfile; score: number }[] = [
    { profile: "FORM", score: calculateProfileScore("FORM", normalized) },
    { profile: "COLOR", score: calculateProfileScore("COLOR", normalized) },
    { profile: "VOLUME", score: calculateProfileScore("VOLUME", normalized) },
    { profile: "SOUND", score: calculateProfileScore("SOUND", normalized) },
  ]

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score)

  const primary = scores[0]
  const secondary = scores[1]

  // Calculate max possible score for confidence calculation
  // Max per dimension = 3 (high) * max weight
  const maxPossibleScore = Math.max(
    ...Object.values(PROFILE_CONTRIBUTIONS).map(
      contribs => contribs.reduce((sum, c) => sum + 3 * c.weight, 0) + 2 // +2 for COLOR bonus
    )
  )

  const confidence = determineConfidence(primary.score, secondary.score, maxPossibleScore)

  // Only include secondary if it's meaningfully different from others
  const thirdScore = scores[2].score
  const includeSecondary = secondary.score > thirdScore

  return {
    primaryProfile: primary.profile,
    ...(includeSecondary && { secondaryProfile: secondary.profile }),
    confidenceLevel: confidence,
  }
}
