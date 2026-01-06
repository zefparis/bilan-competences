import { CERTIFICATION_QUESTIONS, getQuestionById, getAntagonistPairs } from './questions';
import type { RiasecResult, CognitiveProfile } from '@prisma/client';

export interface Answer {
  questionId: string;
  value: string;
  timestamp: Date;
}

export interface Scores {
  dev: number;
  data: number;
  cyber: number;
  infra: number;
  coherence: number;
}

export interface ScoringResult {
  scores: Scores;
  primaryRole: string;
  secondaryRoles: string[];
  level: 'junior' | 'confirmed' | 'senior' | 'expert';
  strengths: string[];
  developmentAreas: string[];
}

const WEIGHT_MULTIPLIERS = {
  high: 3,
  medium: 2,
  low: 1
};

const ROLE_DEFINITIONS = {
  'Architecte Logiciel': { dev: 0.7, data: 0.1, cyber: 0.1, infra: 0.1 },
  'Data Scientist': { dev: 0.2, data: 0.7, cyber: 0.05, infra: 0.05 },
  'Data Engineer': { dev: 0.3, data: 0.5, cyber: 0.05, infra: 0.15 },
  'Security Engineer': { dev: 0.2, data: 0.1, cyber: 0.6, infra: 0.1 },
  'DevOps/SRE': { dev: 0.3, data: 0.05, cyber: 0.15, infra: 0.5 },
  'Backend Developer': { dev: 0.6, data: 0.15, cyber: 0.1, infra: 0.15 },
  'Frontend Developer': { dev: 0.6, data: 0.05, cyber: 0.1, infra: 0.25 },
  'Full Stack Developer': { dev: 0.5, data: 0.2, cyber: 0.1, infra: 0.2 },
  'Cloud Architect': { dev: 0.2, data: 0.1, cyber: 0.2, infra: 0.5 },
  'ML Engineer': { dev: 0.3, data: 0.5, cyber: 0.05, infra: 0.15 }
};

export function calculateScores(
  answers: Record<string, Answer>,
  riasecProfile?: RiasecResult | null,
  cognitiveProfile?: CognitiveProfile | null
): ScoringResult {
  const rawScores = calculateRawScores(answers);
  
  const coherenceScore = detectInconsistencies(answers);
  
  const enrichedScores = enrichWithProfiles(rawScores, riasecProfile, cognitiveProfile);
  
  const normalizedScores: Scores = {
    dev: Math.round(enrichedScores.dev),
    data: Math.round(enrichedScores.data),
    cyber: Math.round(enrichedScores.cyber),
    infra: Math.round(enrichedScores.infra),
    coherence: coherenceScore
  };
  
  const primaryRole = determinePrimaryRole(normalizedScores);
  const secondaryRoles = determineSecondaryRoles(normalizedScores, primaryRole);
  const level = determineLevel(normalizedScores, Object.keys(answers).length);
  const strengths = identifyStrengths(normalizedScores, answers);
  const developmentAreas = identifyDevelopmentAreas(normalizedScores, answers);
  
  return {
    scores: normalizedScores,
    primaryRole,
    secondaryRoles,
    level,
    strengths,
    developmentAreas
  };
}

function calculateRawScores(answers: Record<string, Answer>): Scores {
  const domainScores = {
    dev: { total: 0, maxPossible: 0 },
    data: { total: 0, maxPossible: 0 },
    cyber: { total: 0, maxPossible: 0 },
    infra: { total: 0, maxPossible: 0 }
  };
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = getQuestionById(questionId);
    if (!question || question.domain === 'cross') return;
    
    const multiplier = WEIGHT_MULTIPLIERS[question.weight];
    
    let score = 0;
    if (question.type === 'scenario') {
      const option = question.options?.find(opt => opt.value === answer.value);
      score = option?.score || 0;
    } else if (question.type === 'objective' || question.type === 'cognitive') {
      score = parseInt(answer.value) || 0;
    }
    
    const weightedScore = score * multiplier;
    const maxScore = 5 * multiplier;
    
    domainScores[question.domain].total += weightedScore;
    domainScores[question.domain].maxPossible += maxScore;
  });
  
  return {
    dev: domainScores.dev.maxPossible > 0 
      ? (domainScores.dev.total / domainScores.dev.maxPossible) * 100 
      : 0,
    data: domainScores.data.maxPossible > 0 
      ? (domainScores.data.total / domainScores.data.maxPossible) * 100 
      : 0,
    cyber: domainScores.cyber.maxPossible > 0 
      ? (domainScores.cyber.total / domainScores.cyber.maxPossible) * 100 
      : 0,
    infra: domainScores.infra.maxPossible > 0 
      ? (domainScores.infra.total / domainScores.infra.maxPossible) * 100 
      : 0,
    coherence: 100
  };
}

export function detectInconsistencies(answers: Record<string, Answer>): number {
  const pairs = getAntagonistPairs();
  let totalInconsistency = 0;
  let pairCount = 0;
  
  pairs.forEach(([q1Id, q2Id]) => {
    const answer1 = answers[q1Id];
    const answer2 = answers[q2Id];
    
    if (answer1 && answer2) {
      const score1 = parseInt(answer1.value) || 0;
      const score2 = parseInt(answer2.value) || 0;
      
      const expectedDifference = Math.abs(score1 - (6 - score2));
      
      if (expectedDifference > 2) {
        totalInconsistency += expectedDifference;
      }
      
      pairCount++;
    }
  });
  
  if (pairCount === 0) return 100;
  
  const maxPossibleInconsistency = pairCount * 5;
  const coherenceScore = Math.max(0, 100 - (totalInconsistency / maxPossibleInconsistency) * 100);
  
  return Math.round(coherenceScore);
}

function enrichWithProfiles(
  scores: Scores,
  riasecProfile?: RiasecResult | null,
  cognitiveProfile?: CognitiveProfile | null
): Scores {
  let enrichedScores = { ...scores };
  
  if (riasecProfile) {
    const { scoreR, scoreI, scoreA, scoreS, scoreE, scoreC } = riasecProfile;
    const total = scoreR + scoreI + scoreA + scoreS + scoreE + scoreC;
    
    if (total > 0) {
      const investigativeRatio = scoreI / total;
      const realisticRatio = scoreR / total;
      const conventionalRatio = scoreC / total;
      
      enrichedScores.data += investigativeRatio * 10;
      enrichedScores.dev += (investigativeRatio + realisticRatio) * 5;
      enrichedScores.infra += realisticRatio * 8;
      enrichedScores.cyber += (investigativeRatio + conventionalRatio) * 6;
    }
  }
  
  if (cognitiveProfile) {
    const { form_score, color_score, volume_score, sound_score } = cognitiveProfile;
    const total = form_score + color_score + volume_score + sound_score;
    
    if (total > 0) {
      const formRatio = form_score / total;
      const volumeRatio = volume_score / total;
      
      enrichedScores.dev += formRatio * 8;
      enrichedScores.data += volumeRatio * 8;
      enrichedScores.cyber += formRatio * 5;
      enrichedScores.infra += (formRatio + volumeRatio) * 4;
    }
  }
  
  enrichedScores.dev = Math.min(100, enrichedScores.dev);
  enrichedScores.data = Math.min(100, enrichedScores.data);
  enrichedScores.cyber = Math.min(100, enrichedScores.cyber);
  enrichedScores.infra = Math.min(100, enrichedScores.infra);
  
  return enrichedScores;
}

function determinePrimaryRole(scores: Scores): string {
  const normalizedScores = {
    dev: scores.dev / 100,
    data: scores.data / 100,
    cyber: scores.cyber / 100,
    infra: scores.infra / 100
  };
  
  let bestRole = 'Full Stack Developer';
  let bestMatch = 0;
  
  Object.entries(ROLE_DEFINITIONS).forEach(([role, weights]) => {
    const match = 
      Math.abs(normalizedScores.dev - weights.dev) +
      Math.abs(normalizedScores.data - weights.data) +
      Math.abs(normalizedScores.cyber - weights.cyber) +
      Math.abs(normalizedScores.infra - weights.infra);
    
    const inverseMatch = 4 - match;
    
    if (inverseMatch > bestMatch) {
      bestMatch = inverseMatch;
      bestRole = role;
    }
  });
  
  return bestRole;
}

function determineSecondaryRoles(scores: Scores, primaryRole: string): string[] {
  const normalizedScores = {
    dev: scores.dev / 100,
    data: scores.data / 100,
    cyber: scores.cyber / 100,
    infra: scores.infra / 100
  };
  
  const roleMatches: Array<{ role: string; match: number }> = [];
  
  Object.entries(ROLE_DEFINITIONS).forEach(([role, weights]) => {
    if (role === primaryRole) return;
    
    const match = 
      Math.abs(normalizedScores.dev - weights.dev) +
      Math.abs(normalizedScores.data - weights.data) +
      Math.abs(normalizedScores.cyber - weights.cyber) +
      Math.abs(normalizedScores.infra - weights.infra);
    
    const inverseMatch = 4 - match;
    roleMatches.push({ role, match: inverseMatch });
  });
  
  roleMatches.sort((a, b) => b.match - a.match);
  
  return roleMatches.slice(0, 2).map(rm => rm.role);
}

function determineLevel(scores: Scores, answeredCount: number): 'junior' | 'confirmed' | 'senior' | 'expert' {
  const avgScore = (scores.dev + scores.data + scores.cyber + scores.infra) / 4;
  const completionRate = answeredCount / 35;
  
  const adjustedScore = avgScore * completionRate;
  
  if (adjustedScore >= 80 && scores.coherence >= 85) return 'expert';
  if (adjustedScore >= 65 && scores.coherence >= 75) return 'senior';
  if (adjustedScore >= 45 && scores.coherence >= 65) return 'confirmed';
  return 'junior';
}

function identifyStrengths(scores: Scores, answers: Record<string, Answer>): string[] {
  const strengths: string[] = [];
  
  if (scores.dev >= 70) {
    strengths.push('Développement logiciel et architecture');
  }
  if (scores.data >= 70) {
    strengths.push('Analyse de données et Machine Learning');
  }
  if (scores.cyber >= 70) {
    strengths.push('Sécurité informatique et cryptographie');
  }
  if (scores.infra >= 70) {
    strengths.push('Infrastructure et DevOps');
  }
  
  const highScoreAnswers = Object.entries(answers).filter(([qId, answer]) => {
    const question = getQuestionById(qId);
    if (!question || question.type === 'open') return false;
    
    if (question.type === 'scenario') {
      const option = question.options?.find(opt => opt.value === answer.value);
      return (option?.score || 0) >= 4;
    }
    
    return parseInt(answer.value) >= 4;
  });
  
  if (highScoreAnswers.length >= 20) {
    strengths.push('Polyvalence technique');
  }
  
  if (scores.coherence >= 85) {
    strengths.push('Cohérence et fiabilité des réponses');
  }
  
  return strengths;
}

function identifyDevelopmentAreas(scores: Scores, answers: Record<string, Answer>): string[] {
  const areas: string[] = [];
  
  if (scores.dev < 50) {
    areas.push('Renforcer les compétences en développement logiciel');
  }
  if (scores.data < 50) {
    areas.push('Approfondir l\'analyse de données et le Machine Learning');
  }
  if (scores.cyber < 50) {
    areas.push('Développer les connaissances en cybersécurité');
  }
  if (scores.infra < 50) {
    areas.push('Améliorer les compétences en infrastructure et DevOps');
  }
  
  const lowScoreAnswers = Object.entries(answers).filter(([qId, answer]) => {
    const question = getQuestionById(qId);
    if (!question || question.type === 'open' || question.type === 'scenario') return false;
    
    return parseInt(answer.value) <= 2;
  });
  
  if (lowScoreAnswers.length >= 10) {
    areas.push('Élargir le spectre de compétences techniques');
  }
  
  if (scores.coherence < 70) {
    areas.push('Clarifier les préférences et orientations professionnelles');
  }
  
  return areas;
}

export function mapToROMECodes(primaryRole: string): string[] {
  const mapping: Record<string, string[]> = {
    'Architecte Logiciel': ['M1805', 'M1806'],
    'Data Scientist': ['M1805', 'M1403'],
    'Data Engineer': ['M1805', 'M1403'],
    'Security Engineer': ['M1802'],
    'DevOps/SRE': ['M1810', 'M1805'],
    'Backend Developer': ['M1805'],
    'Frontend Developer': ['M1805'],
    'Full Stack Developer': ['M1805'],
    'Cloud Architect': ['M1810', 'M1806'],
    'ML Engineer': ['M1805', 'M1403']
  };
  
  return mapping[primaryRole] || ['M1805'];
}

export function calculateJobMatch(
  jobData: any,
  sessionData: { 
    primaryRole?: string | null; 
    devScore?: number | null; 
    dataScore?: number | null; 
    cyberScore?: number | null; 
    infraScore?: number | null;
  }
): number {
  let matchScore = 50;
  
  const jobTitle = (jobData.intitule || '').toLowerCase();
  const jobDescription = (jobData.description || '').toLowerCase();
  const primaryRole = (sessionData.primaryRole || '').toLowerCase();
  
  if (jobTitle.includes(primaryRole) || jobDescription.includes(primaryRole)) {
    matchScore += 30;
  }
  
  const keywords = {
    dev: ['développeur', 'developer', 'programmeur', 'software', 'code'],
    data: ['data', 'données', 'analyst', 'scientist', 'machine learning', 'ia'],
    cyber: ['sécurité', 'security', 'cyber', 'pentest', 'soc'],
    infra: ['devops', 'infrastructure', 'cloud', 'système', 'sre']
  };
  
  const scores = {
    dev: sessionData.devScore || 0,
    data: sessionData.dataScore || 0,
    cyber: sessionData.cyberScore || 0,
    infra: sessionData.infraScore || 0
  };
  
  Object.entries(keywords).forEach(([domain, words]) => {
    const hasKeyword = words.some(word => 
      jobTitle.includes(word) || jobDescription.includes(word)
    );
    
    if (hasKeyword) {
      const domainScore = scores[domain as keyof typeof scores];
      matchScore += (domainScore / 100) * 10;
    }
  });
  
  return Math.min(100, Math.round(matchScore));
}
