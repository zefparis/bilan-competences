/**
 * Cognitive Profile Optimizer
 * Converts qualitative levels to realistic numeric scores with variance
 */

export interface CognitiveScores {
  inhibitoryControl: number;    // 0-100
  workingMemory: number;         // 0-100
  decisionSpeed: number;         // 0-100
  cognitiveLoadTolerance: number; // 0-100
  verbalFluency: number;         // 0-100
}

export type QualitativeLevel = "low" | "medium" | "high";

export interface QualitativeCognitiveProfile {
  inhibitionControl: QualitativeLevel;
  workingMemory: QualitativeLevel;
  decisionSpeed: QualitativeLevel;
  cognitiveLoadTolerance: QualitativeLevel;
  verbalFluency: QualitativeLevel;
}

/**
 * Convert qualitative level to numeric score with realistic variance
 */
function qualitativeToScore(level: QualitativeLevel, variance: number = 8): number {
  const baseScores = {
    low: 35,      // 20-50 range
    medium: 60,   // 45-75 range
    high: 80,     // 65-95 range
  };

  const base = baseScores[level];
  const randomVariance = (Math.random() - 0.5) * 2 * variance; // -variance to +variance
  const score = Math.round(base + randomVariance);

  return Math.max(20, Math.min(100, score));
}

/**
 * Optimize cognitive profile to create realistic, differentiated scores
 */
export function optimizeCognitiveProfile(
  qualitative: QualitativeCognitiveProfile
): CognitiveScores {
  // Convert each dimension with variance
  const scores: CognitiveScores = {
    inhibitoryControl: qualitativeToScore(qualitative.inhibitionControl, 10),
    workingMemory: qualitativeToScore(qualitative.workingMemory, 8),
    decisionSpeed: qualitativeToScore(qualitative.decisionSpeed, 12),
    cognitiveLoadTolerance: qualitativeToScore(qualitative.cognitiveLoadTolerance, 8),
    verbalFluency: qualitativeToScore(qualitative.verbalFluency, 10),
  };

  // Ensure at least one strength (>= 70) and one weakness (<= 45)
  const values = Object.values(scores);
  const hasStrength = values.some(v => v >= 70);
  const hasWeakness = values.some(v => v <= 45);

  if (!hasStrength) {
    // Boost the highest score
    const keys = Object.keys(scores) as (keyof CognitiveScores)[];
    const highest = keys.reduce((a, b) => scores[a] > scores[b] ? a : b);
    scores[highest] = Math.min(95, scores[highest] + 15);
  }

  if (!hasWeakness) {
    // Lower the lowest score
    const keys = Object.keys(scores) as (keyof CognitiveScores)[];
    const lowest = keys.reduce((a, b) => scores[a] < scores[b] ? a : b);
    scores[lowest] = Math.max(25, scores[lowest] - 15);
  }

  return scores;
}

/**
 * Get cognitive strengths (scores >= 65)
 */
export function getCognitiveStrengths(scores: CognitiveScores): string[] {
  const labels: Record<keyof CognitiveScores, string> = {
    inhibitoryControl: 'Contrôle inhibiteur',
    workingMemory: 'Mémoire de travail',
    decisionSpeed: 'Vitesse de décision',
    cognitiveLoadTolerance: 'Tolérance à la charge',
    verbalFluency: 'Fluidité verbale',
  };

  return Object.entries(scores)
    .filter(([_, score]) => score >= 65)
    .map(([key]) => labels[key as keyof CognitiveScores]);
}

/**
 * Get cognitive weaknesses (scores <= 45)
 */
export function getCognitiveWeaknesses(scores: CognitiveScores): string[] {
  const labels: Record<keyof CognitiveScores, string> = {
    inhibitoryControl: 'Contrôle inhibiteur',
    workingMemory: 'Mémoire de travail',
    decisionSpeed: 'Vitesse de décision',
    cognitiveLoadTolerance: 'Tolérance à la charge',
    verbalFluency: 'Fluidité verbale',
  };

  return Object.entries(scores)
    .filter(([_, score]) => score <= 45)
    .map(([key]) => labels[key as keyof CognitiveScores]);
}
