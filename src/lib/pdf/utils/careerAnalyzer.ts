/**
 * Career Path Analyzer
 * Analyzes career trajectory and provides personalized insights
 */

import { RIASECProfile, getRIASECCode } from './riasecOptimizer';
import { CognitiveScores } from './cognitiveOptimizer';

export interface Experience {
  role: string;
  company: string;
  startYear: number;
  endYear?: number;
  skills?: string[];
}

export interface CareerAnalysis {
  coherence: number;        // 0-100
  progression: 'ascendante' | 'horizontale' | 'pivot';
  careerLength: number;     // years
  avgTenure: number;        // years per position
  dominantSkills: string[];
  gaps: string[];
  recommendations: string[];
  salaryPotential?: {
    current: string;
    potential: string;
    increase: string;
  };
}

const SENIORITY_KEYWORDS = ['senior', 'lead', 'manager', 'director', 'principal', 'chief', 'head', 'architect'];
const JUNIOR_KEYWORDS = ['junior', 'assistant', 'stagiaire', 'apprenti', 'débutant'];

/**
 * Analyze career path with cognitive and RIASEC alignment
 */
export function analyzeCareerPath(
  experiences: Experience[],
  cognitiveScores: CognitiveScores,
  riasecProfile: RIASECProfile
): CareerAnalysis {
  if (!experiences || experiences.length === 0) {
    return {
      coherence: 50,
      progression: 'horizontale',
      careerLength: 0,
      avgTenure: 0,
      dominantSkills: [],
      gaps: ['Aucune expérience professionnelle renseignée'],
      recommendations: ['Commencez par documenter vos expériences professionnelles'],
    };
  }

  // 1. Temporal analysis
  const sorted = [...experiences].sort((a, b) => a.startYear - b.startYear);
  const currentYear = new Date().getFullYear();
  const careerLength = currentYear - sorted[0].startYear;
  const avgTenure = careerLength / sorted.length;

  // 2. Skills analysis
  const allSkills = experiences.flatMap(e => e.skills || []);
  const skillFrequency: Record<string, number> = {};
  allSkills.forEach(skill => {
    skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
  });

  const dominantSkills = Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([skill]) => skill);

  // 3. Progression pattern
  const firstRole = sorted[0].role.toLowerCase();
  const lastRole = sorted[sorted.length - 1].role.toLowerCase();

  const firstIsSenior = SENIORITY_KEYWORDS.some(kw => firstRole.includes(kw));
  const lastIsSenior = SENIORITY_KEYWORDS.some(kw => lastRole.includes(kw));

  let progression: 'ascendante' | 'horizontale' | 'pivot';

  if (!firstIsSenior && lastIsSenior) {
    progression = 'ascendante';
  } else if (sorted.length >= 2) {
    const recentSkills = sorted.slice(-2).flatMap(e => e.skills || []);
    const hasSkillPivot = dominantSkills.every(skill => !recentSkills.includes(skill));
    progression = hasSkillPivot ? 'pivot' : 'horizontale';
  } else {
    progression = 'horizontale';
  }

  // 4. Coherence scoring
  let coherence = 50; // Base
  const riasecCode = getRIASECCode(riasecProfile);

  // RIASEC alignment
  if (riasecProfile.I >= 25) {
    const hasAnalyticalRole = experiences.some(e =>
      ['analyste', 'data', 'recherche', 'développeur', 'ingénieur'].some(kw =>
        e.role.toLowerCase().includes(kw)
      )
    );
    if (hasAnalyticalRole) coherence += 20;
  }

  if (riasecProfile.E >= 25) {
    if (lastIsSenior) coherence += 15;
  }

  if (riasecProfile.S >= 25) {
    const hasPeopleRole = experiences.some(e =>
      ['rh', 'formation', 'coach', 'consultant', 'manager'].some(kw =>
        e.role.toLowerCase().includes(kw)
      )
    );
    if (hasPeopleRole) coherence += 15;
  }

  // Cognitive alignment
  if (cognitiveScores.decisionSpeed >= 70 && avgTenure < 2) {
    coherence -= 10; // High speed but short tenure = instability
  }

  if (cognitiveScores.inhibitoryControl >= 70 && lastIsSenior) {
    coherence += 10; // Good control + senior role = aligned
  }

  coherence = Math.max(0, Math.min(100, coherence));

  // 5. Gap identification
  const gaps: string[] = [];

  if (riasecProfile.E >= 20 && !lastIsSenior) {
    gaps.push(`Profil Entreprenant (${riasecProfile.E}%) mais aucune expérience de management`);
  }

  if (avgTenure < 1.5) {
    gaps.push(`Durée moyenne par poste courte (${avgTenure.toFixed(1)} ans) - risque de perception d'instabilité`);
  }

  if (progression === 'pivot' && cognitiveScores.decisionSpeed < 50) {
    gaps.push('Reconversion récente avec flexibilité cognitive modérée - nécessite consolidation');
  }

  // 6. Personalized recommendations
  const recommendations: string[] = [];

  if (progression === 'ascendante') {
    recommendations.push(
      `Progression cohérente (${sorted[0].role} → ${sorted[sorted.length - 1].role}). ` +
      `Visez un poste ${lastIsSenior ? 'de direction' : 'senior'} dans les 2-3 ans.`
    );
  }

  if (progression === 'pivot') {
    recommendations.push(
      'Reconversion récente détectée. Consolidez votre expertise pendant 2-3 ans avant évolution hiérarchique.'
    );
  }

  if (coherence >= 70) {
    recommendations.push(
      `Excellente cohérence (${coherence}%) entre parcours et profil ${riasecCode}. Continuez sur cette trajectoire.`
    );
  } else if (coherence < 50) {
    recommendations.push(
      `Cohérence modérée (${coherence}%). Envisagez un pivot vers des rôles exploitant davantage votre profil ${riasecCode}.`
    );
  }

  if (dominantSkills.length > 0) {
    recommendations.push(
      `Capitalisez sur vos compétences clés : ${dominantSkills.slice(0, 3).join(', ')}.`
    );
  }

  return {
    coherence: Math.round(coherence),
    progression,
    careerLength,
    avgTenure: Math.round(avgTenure * 10) / 10,
    dominantSkills,
    gaps,
    recommendations,
  };
}

/**
 * Estimate salary potential based on role and experience
 */
export function estimateSalaryPotential(
  currentRole: string,
  yearsExperience: number,
  targetRole?: string
): { current: string; potential: string; increase: string } {
  // Simplified salary estimation (should be enriched with real market data)
  const baseSalaries: Record<string, { junior: number; mid: number; senior: number }> = {
    'développeur': { junior: 35000, mid: 45000, senior: 60000 },
    'lead': { junior: 50000, mid: 65000, senior: 80000 },
    'architect': { junior: 60000, mid: 75000, senior: 95000 },
    'manager': { junior: 55000, mid: 70000, senior: 90000 },
    'director': { junior: 80000, mid: 100000, senior: 130000 },
  };

  const roleKey = Object.keys(baseSalaries).find(key =>
    currentRole.toLowerCase().includes(key)
  ) || 'développeur';

  const level = yearsExperience < 3 ? 'junior' : yearsExperience < 7 ? 'mid' : 'senior';
  const currentSalary = baseSalaries[roleKey][level];

  const targetRoleKey = targetRole
    ? Object.keys(baseSalaries).find(key => targetRole.toLowerCase().includes(key)) || roleKey
    : roleKey;

  const potentialSalary = baseSalaries[targetRoleKey].senior;
  const increase = ((potentialSalary - currentSalary) / currentSalary * 100).toFixed(0);

  return {
    current: `${currentSalary.toLocaleString('fr-FR')}€/an`,
    potential: `${potentialSalary.toLocaleString('fr-FR')}€/an`,
    increase: `+${increase}%`,
  };
}
