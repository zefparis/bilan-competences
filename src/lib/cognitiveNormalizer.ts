/**
 * Cognitive Normalizer Service
 * 
 * Transforms raw cognitive test results into qualitative classifications.
 * No numeric scores are exposed - only "low" | "medium" | "high" levels.
 * 
 * Internal thresholds are based on cognitive science literature and
 * calibrated for adult populations in professional assessment contexts.
 */

// ============================================================================
// Types
// ============================================================================

export type QualitativeLevel = "low" | "medium" | "high"

/** Raw input from cognitive tests */
export interface RawCognitiveResults {
  stroop: {
    reactionTimeMs: number
    errorRate: number // 0-1
  }
  nBack: {
    accuracy: number // 0-1
  }
  reactionTime: {
    avgMs: number
    varianceMs: number
  }
  digitSpan: {
    maxSpan: number // typically 4-9
  }
  ranVocal: {
    speed: number // items per second
    hesitationRate: number // 0-1
  }
}

/** Normalized qualitative output */
export interface NormalizedCognitiveProfile {
  inhibitionControl: QualitativeLevel
  workingMemory: QualitativeLevel
  decisionSpeed: QualitativeLevel
  cognitiveLoadTolerance: QualitativeLevel
  verbalFluency: QualitativeLevel
}

// ============================================================================
// Internal Threshold Constants
// ============================================================================

/**
 * Stroop Test Thresholds
 * - Measures inhibition control (ability to suppress automatic responses)
 * - Lower reaction time + lower error rate = better inhibition
 */
const STROOP_THRESHOLDS = {
  reactionTime: {
    high: 650,    // < 650ms = high inhibition control
    medium: 900,  // 650-900ms = medium
    // > 900ms = low
  },
  errorRate: {
    high: 0.05,   // < 5% errors = high
    medium: 0.15, // 5-15% = medium
    // > 15% = low
  },
} as const

/**
 * N-Back Test Thresholds
 * - Measures working memory capacity
 * - Higher accuracy = better working memory
 */
const NBACK_THRESHOLDS = {
  accuracy: {
    high: 0.85,   // > 85% = high working memory
    medium: 0.65, // 65-85% = medium
    // < 65% = low
  },
} as const

/**
 * Reaction Time Test Thresholds
 * - Measures decision speed and consistency
 * - Lower avg + lower variance = faster, more consistent decisions
 */
const REACTION_TIME_THRESHOLDS = {
  avgMs: {
    high: 250,    // < 250ms = high speed
    medium: 350,  // 250-350ms = medium
    // > 350ms = low
  },
  varianceMs: {
    high: 30,     // < 30ms variance = high consistency
    medium: 60,   // 30-60ms = medium
    // > 60ms = low
  },
} as const

/**
 * Digit Span Test Thresholds
 * - Measures cognitive load tolerance (short-term memory capacity)
 * - Higher span = better load tolerance
 */
const DIGIT_SPAN_THRESHOLDS = {
  maxSpan: {
    high: 7,      // >= 7 digits = high tolerance
    medium: 5,    // 5-6 digits = medium
    // < 5 = low
  },
} as const

/**
 * RAN Vocal Test Thresholds
 * - Measures verbal fluency (rapid automatized naming)
 * - Higher speed + lower hesitation = better fluency
 */
const RAN_VOCAL_THRESHOLDS = {
  speed: {
    high: 2.5,    // > 2.5 items/sec = high fluency
    medium: 1.5,  // 1.5-2.5 = medium
    // < 1.5 = low
  },
  hesitationRate: {
    high: 0.05,   // < 5% hesitation = high fluency
    medium: 0.15, // 5-15% = medium
    // > 15% = low
  },
} as const

// ============================================================================
// Normalization Functions
// ============================================================================

/**
 * Normalize inhibition control from Stroop test results.
 * Combines reaction time and error rate for composite assessment.
 */
function normalizeInhibitionControl(stroop: RawCognitiveResults["stroop"]): QualitativeLevel {
  const { reactionTimeMs, errorRate } = stroop

  // Score each dimension
  const rtLevel: QualitativeLevel =
    reactionTimeMs < STROOP_THRESHOLDS.reactionTime.high ? "high" :
    reactionTimeMs < STROOP_THRESHOLDS.reactionTime.medium ? "medium" : "low"

  const errLevel: QualitativeLevel =
    errorRate < STROOP_THRESHOLDS.errorRate.high ? "high" :
    errorRate < STROOP_THRESHOLDS.errorRate.medium ? "medium" : "low"

  // Composite: both must be at least medium for medium, both high for high
  if (rtLevel === "high" && errLevel === "high") return "high"
  if (rtLevel === "low" || errLevel === "low") return "low"
  return "medium"
}

/**
 * Normalize working memory from N-Back test results.
 */
function normalizeWorkingMemory(nBack: RawCognitiveResults["nBack"]): QualitativeLevel {
  const { accuracy } = nBack

  if (accuracy >= NBACK_THRESHOLDS.accuracy.high) return "high"
  if (accuracy >= NBACK_THRESHOLDS.accuracy.medium) return "medium"
  return "low"
}

/**
 * Normalize decision speed from reaction time test results.
 * Combines average speed and consistency (variance).
 */
function normalizeDecisionSpeed(reactionTime: RawCognitiveResults["reactionTime"]): QualitativeLevel {
  const { avgMs, varianceMs } = reactionTime

  const avgLevel: QualitativeLevel =
    avgMs < REACTION_TIME_THRESHOLDS.avgMs.high ? "high" :
    avgMs < REACTION_TIME_THRESHOLDS.avgMs.medium ? "medium" : "low"

  const varLevel: QualitativeLevel =
    varianceMs < REACTION_TIME_THRESHOLDS.varianceMs.high ? "high" :
    varianceMs < REACTION_TIME_THRESHOLDS.varianceMs.medium ? "medium" : "low"

  // Speed is primary, variance is secondary modifier
  if (avgLevel === "high" && varLevel !== "low") return "high"
  if (avgLevel === "low") return "low"
  if (avgLevel === "medium" && varLevel === "low") return "low"
  return "medium"
}

/**
 * Normalize cognitive load tolerance from digit span test results.
 */
function normalizeCognitiveLoadTolerance(digitSpan: RawCognitiveResults["digitSpan"]): QualitativeLevel {
  const { maxSpan } = digitSpan

  if (maxSpan >= DIGIT_SPAN_THRESHOLDS.maxSpan.high) return "high"
  if (maxSpan >= DIGIT_SPAN_THRESHOLDS.maxSpan.medium) return "medium"
  return "low"
}

/**
 * Normalize verbal fluency from RAN vocal test results.
 * Combines naming speed and hesitation rate.
 */
function normalizeVerbalFluency(ranVocal: RawCognitiveResults["ranVocal"]): QualitativeLevel {
  const { speed, hesitationRate } = ranVocal

  const speedLevel: QualitativeLevel =
    speed > RAN_VOCAL_THRESHOLDS.speed.high ? "high" :
    speed > RAN_VOCAL_THRESHOLDS.speed.medium ? "medium" : "low"

  const hesLevel: QualitativeLevel =
    hesitationRate < RAN_VOCAL_THRESHOLDS.hesitationRate.high ? "high" :
    hesitationRate < RAN_VOCAL_THRESHOLDS.hesitationRate.medium ? "medium" : "low"

  // Both factors equally weighted
  if (speedLevel === "high" && hesLevel === "high") return "high"
  if (speedLevel === "low" || hesLevel === "low") return "low"
  return "medium"
}

// ============================================================================
// Main Export
// ============================================================================

/**
 * Normalize raw cognitive test results into qualitative profile.
 * 
 * @param raw - Raw results from cognitive tests
 * @returns Normalized profile with qualitative levels only
 * 
 * @example
 * ```ts
 * const normalized = normalizeCognitiveResults({
 *   stroop: { reactionTimeMs: 720, errorRate: 0.08 },
 *   nBack: { accuracy: 0.78 },
 *   reactionTime: { avgMs: 280, varianceMs: 45 },
 *   digitSpan: { maxSpan: 6 },
 *   ranVocal: { speed: 2.1, hesitationRate: 0.10 }
 * })
 * // => { inhibitionControl: "medium", workingMemory: "medium", ... }
 * ```
 */
export function normalizeCognitiveResults(raw: RawCognitiveResults): NormalizedCognitiveProfile {
  return {
    inhibitionControl: normalizeInhibitionControl(raw.stroop),
    workingMemory: normalizeWorkingMemory(raw.nBack),
    decisionSpeed: normalizeDecisionSpeed(raw.reactionTime),
    cognitiveLoadTolerance: normalizeCognitiveLoadTolerance(raw.digitSpan),
    verbalFluency: normalizeVerbalFluency(raw.ranVocal),
  }
}
