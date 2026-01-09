/**
 * Profile Optimizer - Main Integration
 * Orchestrates all optimization modules for PDF generation
 */

import { RIASECProfile, optimizeRIASECProfile, getRIASECCode, getDominantDimensions } from './riasecOptimizer';
import { CognitiveScores, QualitativeCognitiveProfile, optimizeCognitiveProfile, getCognitiveStrengths, getCognitiveWeaknesses } from './cognitiveOptimizer';
import { Experience, CareerAnalysis, analyzeCareerPath, estimateSalaryPotential } from './careerAnalyzer';
import { PersonalizedRecommendations, generatePersonalizedRecommendations } from './recommendationEngine';
import { MarketInsights, getMarketInsights } from './marketData';

export interface OptimizedProfileData {
  // Optimized profiles
  riasec: RIASECProfile & {
    code: string;
    dominant: string[];
  };
  cognitive: CognitiveScores & {
    strengths: string[];
    weaknesses: string[];
  };
  
  // Career analysis
  career: CareerAnalysis;
  
  // Personalized recommendations
  recommendations: PersonalizedRecommendations;
  
  // Market insights
  market: MarketInsights;
}

export interface RawProfileInput {
  // Raw RIASEC scores (can be flat)
  riasecScores: RIASECProfile;
  
  // Qualitative cognitive profile
  cognitiveProfile: QualitativeCognitiveProfile;
  
  // Career experiences
  experiences: Experience[];
  
  // Current role and skills
  currentRole: string;
  skills: string[];
  targetRoles?: string[];
}

/**
 * Main optimization function
 * Transforms raw profile data into optimized, differentiated profile
 */
export function optimizeProfile(input: RawProfileInput): OptimizedProfileData {
  // 1. Optimize RIASEC profile (amplify variance)
  const optimizedRiasec = optimizeRIASECProfile(input.riasecScores);
  const riasecCode = getRIASECCode(optimizedRiasec);
  const dominantDimensions = getDominantDimensions(optimizedRiasec);

  const riasec = {
    ...optimizedRiasec,
    code: riasecCode,
    dominant: dominantDimensions,
  };

  // 2. Optimize cognitive profile (realistic scores)
  const optimizedCognitive = optimizeCognitiveProfile(input.cognitiveProfile);
  const cognitiveStrengths = getCognitiveStrengths(optimizedCognitive);
  const cognitiveWeaknesses = getCognitiveWeaknesses(optimizedCognitive);

  const cognitive = {
    ...optimizedCognitive,
    strengths: cognitiveStrengths,
    weaknesses: cognitiveWeaknesses,
  };

  // 3. Analyze career path
  const career = analyzeCareerPath(
    input.experiences,
    optimizedCognitive,
    optimizedRiasec
  );

  // Add salary potential if experiences exist
  if (input.experiences.length > 0) {
    const yearsExperience = career.careerLength;
    const targetRole = input.targetRoles?.[0];
    career.salaryPotential = estimateSalaryPotential(
      input.currentRole,
      yearsExperience,
      targetRole
    );
  }

  // 4. Generate personalized recommendations
  const recommendations = generatePersonalizedRecommendations(
    optimizedRiasec,
    optimizedCognitive,
    career.gaps
  );

  // 5. Get market insights
  const market = getMarketInsights(
    input.currentRole,
    input.targetRoles || [],
    input.skills,
    riasecCode,
    career.careerLength
  );

  return {
    riasec,
    cognitive,
    career,
    recommendations,
    market,
  };
}

/**
 * Example usage for testing
 */
export function createSampleProfile(): OptimizedProfileData {
  const sampleInput: RawProfileInput = {
    riasecScores: {
      R: 15,
      I: 35,
      A: 12,
      S: 10,
      E: 20,
      C: 18,
    },
    cognitiveProfile: {
      inhibitionControl: 'high',
      workingMemory: 'medium',
      decisionSpeed: 'medium',
      cognitiveLoadTolerance: 'medium',
      verbalFluency: 'high',
    },
    experiences: [
      {
        role: 'Développeur Backend',
        company: 'TechCorp',
        startYear: 2018,
        endYear: 2020,
        skills: ['Python', 'Django', 'PostgreSQL'],
      },
      {
        role: 'Lead Developer',
        company: 'StartupXYZ',
        startYear: 2020,
        endYear: 2023,
        skills: ['Python', 'Architecture', 'Team Leading', 'AWS'],
      },
      {
        role: 'Architecte Solutions',
        company: 'BigTech',
        startYear: 2023,
        skills: ['Cloud', 'Architecture', 'DevOps', 'Leadership'],
      },
    ],
    currentRole: 'Architecte Solutions',
    skills: ['Python', 'Cloud', 'Architecture', 'Leadership', 'DevOps'],
    targetRoles: ['Engineering Manager', 'Principal Architect'],
  };

  return optimizeProfile(sampleInput);
}
