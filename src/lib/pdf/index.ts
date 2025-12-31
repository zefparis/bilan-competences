/**
 * PERSPECTA PDF Generator
 * Système de génération de PDF premium pour bilans cognitifs
 * 
 * @example
 * ```typescript
 * import { generatePDFBlob, prepareProfileData } from '@/lib/pdf';
 * 
 * const profileData = {
 *   meta: { id: 'PERSPECTA-123', date: '2025-01-01', userName: 'Jean Dupont' },
 *   cognitive: { flexibility: 85, inhibitoryControl: 72, processingSpeed: 45 },
 *   riasec: { R: 75, I: 82, A: 45, S: 38, E: 68, C: 32, dominant: ['I', 'R', 'E'] },
 *   values: [
 *     { name: 'Créativité', satisfaction: 4, importance: 5 },
 *     { name: 'Autonomie', satisfaction: 3, importance: 4 },
 *     // ...
 *   ],
 *   career: [
 *     { year: 2020, role: 'Développeur', company: 'Tech Corp', cognitiveSkill: 'Analyse' },
 *     // ...
 *   ],
 * };
 * 
 * const blob = await generatePDFBlob(profileData);
 * ```
 */

// Générateur principal
export {
  generatePDFBlob,
  generatePDFBuffer,
  generatePDFDataURL,
  prepareProfileData,
  PerspectaDocument,
} from './generator';

// Types
export type {
  ProfileData,
  ProfileMeta,
  CognitiveProfile,
  RiasecProfile,
  ProfessionalValue,
  CareerExperience,
  LifeEvent,
  JobCompatibility,
  CareerScenario,
  EnvironmentRecommendation,
  ActionItem,
  Resource,
  PDFGenerationOptions,
} from './data/types';

// Utilitaires
export {
  validateProfileData,
  sanitizeProfileData,
  generateAllTexts,
  enrichProfileData,
  calculateDominantRiasec,
} from './utils';

// Styles (pour personnalisation avancée)
export { colors, spacing, fonts, fontSizes, riasecLabels, riasecDescriptions } from './styles/tokens';
