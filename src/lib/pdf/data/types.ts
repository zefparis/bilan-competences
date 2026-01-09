/**
 * PERSPECTA PDF - Types de données
 * Structure des données d'entrée pour la génération PDF
 */

import { RiasecCode } from '../styles/tokens';

export interface ProfileMeta {
  id: string;
  date: string;
  userName: string;
  userEmail?: string;
  city?: string;
  postalCode?: string;
  department?: string;
  title?: string;
  bio?: string;
}

export interface CognitiveProfile {
  flexibility: number;
  inhibitoryControl: number;
  processingSpeed: number;
  attentionDrift?: number;
  fluency?: number;
  conflictErrors?: number;
  sequencingErrors?: number;
}

export interface RiasecProfile {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
  dominant: RiasecCode[];
}

export interface ProfessionalValue {
  name: string;
  satisfaction: number; // 1-5
  importance: number; // 1-5
}

export interface CareerExperience {
  year: number;
  role: string;
  company: string;
  cognitiveSkill?: string;
  description?: string;
}

export interface LifeEvent {
  year: number;
  event: string;
  impact?: 'positive' | 'negative' | 'neutral';
}

export interface JobCompatibility {
  family: string;
  icon: string;
  compatibility: number; // 1-5
  why: string;
  vigilance: string;
}

export interface CareerScenario {
  id: number;
  title: string;
  color: 'blue' | 'green' | 'orange';
  horizon: string;
  probability: number; // 1-5
  description: string;
  positions: string[];
  skills: string[];
}

export interface EnvironmentRecommendation {
  type: 'favorable' | 'avoid';
  icon: string;
  name: string;
  reason: string;
  example?: string;
}

export interface ActionItem {
  phase: string;
  period: string;
  tasks: {
    title: string;
    detail?: string;
    duration?: string;
  }[];
}

export interface Resource {
  category: 'formation' | 'lecture' | 'outil' | 'communaute';
  name: string;
  provider?: string;
  cost?: string;
  duration?: string;
  reason: string;
  url?: string;
}

export interface ProfileData {
  meta: ProfileMeta;
  cognitive: CognitiveProfile;
  riasec: RiasecProfile;
  values: ProfessionalValue[];
  career: CareerExperience[];
  lifeEvents?: LifeEvent[];
  
  // Données générées/calculées
  jobCompatibility?: JobCompatibility[];
  scenarios?: CareerScenario[];
  environments?: EnvironmentRecommendation[];
  actions?: ActionItem[];
  resources?: Resource[];
  
  // Textes personnalisés (générés par IA ou templates)
  generatedTexts?: {
    signaturePhrase?: string;
    strengthsAnalysis?: string;
    vigilanceAnalysis?: string;
    trajectoryAnalysis?: string;
    sweetSpot?: string;
  };
}

export interface PDFGenerationOptions {
  includeWatermark?: boolean;
  debug?: boolean;
  quality?: 'draft' | 'standard' | 'premium';
}
