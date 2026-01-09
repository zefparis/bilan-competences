/**
 * RIASEC Profile Optimizer
 * Amplifies variance to create differentiated, credible profiles
 */

export interface RIASECProfile {
  R: number; // Réaliste
  I: number; // Investigatif
  A: number; // Artistique
  S: number; // Social
  E: number; // Entreprenant
  C: number; // Conventionnel
}

export type RIASECCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

/**
 * Optimizes RIASEC profile to ensure clear differentiation
 * - Dominant dimension: >= 25%
 * - Weakest dimension: <= 10%
 * - Natural variance amplified by 1.5x
 */
export function optimizeRIASECProfile(rawScores: RIASECProfile): RIASECProfile {
  // 1. Normalize to 100%
  const total = Object.values(rawScores).reduce((a, b) => a + b, 0);
  let normalized: RIASECProfile = {
    R: (rawScores.R / total) * 100,
    I: (rawScores.I / total) * 100,
    A: (rawScores.A / total) * 100,
    S: (rawScores.S / total) * 100,
    E: (rawScores.E / total) * 100,
    C: (rawScores.C / total) * 100,
  };

  // 2. Amplify variance (coefficient 1.5)
  const mean = 100 / 6; // 16.67%
  normalized = {
    R: mean + (normalized.R - mean) * 1.5,
    I: mean + (normalized.I - mean) * 1.5,
    A: mean + (normalized.A - mean) * 1.5,
    S: mean + (normalized.S - mean) * 1.5,
    E: mean + (normalized.E - mean) * 1.5,
    C: mean + (normalized.C - mean) * 1.5,
  };

  // 3. Renormalize to 100%
  const newTotal = Object.values(normalized).reduce((a, b) => a + b, 0);
  normalized = {
    R: (normalized.R / newTotal) * 100,
    I: (normalized.I / newTotal) * 100,
    A: (normalized.A / newTotal) * 100,
    S: (normalized.S / newTotal) * 100,
    E: (normalized.E / newTotal) * 100,
    C: (normalized.C / newTotal) * 100,
  };

  // 4. Enforce minimum variance
  const sorted = Object.entries(normalized).sort((a, b) => b[1] - a[1]);

  // Dominant must be >= 25%
  if (sorted[0][1] < 25) {
    const boost = 25 - sorted[0][1];
    normalized[sorted[0][0] as RIASECCode] = 25;
    // Redistribute to others
    const others = sorted.slice(1);
    others.forEach(([k]) => {
      normalized[k as RIASECCode] -= boost / 5;
    });
  }

  // Weakest must be <= 10%
  if (sorted[5][1] > 10) {
    const reduce = sorted[5][1] - 10;
    normalized[sorted[5][0] as RIASECCode] = 10;
    // Redistribute to others
    const others = sorted.slice(0, 5);
    others.forEach(([k]) => {
      normalized[k as RIASECCode] += reduce / 5;
    });
  }

  // 5. Final normalization and rounding
  const finalTotal = Object.values(normalized).reduce((a, b) => a + b, 0);
  const result: RIASECProfile = {
    R: Math.round((normalized.R / finalTotal) * 100),
    I: Math.round((normalized.I / finalTotal) * 100),
    A: Math.round((normalized.A / finalTotal) * 100),
    S: Math.round((normalized.S / finalTotal) * 100),
    E: Math.round((normalized.E / finalTotal) * 100),
    C: Math.round((normalized.C / finalTotal) * 100),
  };

  // Ensure total is exactly 100 (adjust largest if needed)
  const resultTotal = Object.values(result).reduce((a, b) => a + b, 0);
  if (resultTotal !== 100) {
    const sortedResult = Object.entries(result).sort((a, b) => b[1] - a[1]);
    result[sortedResult[0][0] as RIASECCode] += 100 - resultTotal;
  }

  return result;
}

/**
 * Get RIASEC code (top 3 dimensions)
 */
export function getRIASECCode(profile: RIASECProfile): string {
  const sorted = Object.entries(profile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return sorted.map(([k]) => k).join('');
}

/**
 * Get dominant RIASEC dimensions as array
 */
export function getDominantDimensions(profile: RIASECProfile): RIASECCode[] {
  return Object.entries(profile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k as RIASECCode);
}
