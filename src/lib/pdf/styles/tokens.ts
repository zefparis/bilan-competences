/**
 * PERSPECTA PDF Design System - Tokens
 * Variables de design pour la génération PDF premium
 */

export const colors = {
  // Primaires
  primary: {
    blue: '#2563EB',
    darkBlue: '#1E40AF',
    lightBlue: '#DBEAFE',
  },

  // Secondaires (sémantiques)
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  // Neutres
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Catégories RIASEC
  riasec: {
    R: '#8B5CF6', // Violet - Réaliste
    I: '#3B82F6', // Bleu - Investigatif
    A: '#EC4899', // Rose - Artistique
    S: '#10B981', // Vert - Social
    E: '#F59E0B', // Orange - Entreprenant
    C: '#6366F1', // Indigo - Conventionnel
  },

  // Backgrounds
  background: {
    page: '#FFFFFF',
    cover: '#F0F9FF',
    highlight: '#FEF3C7',
    success: '#D1FAE5',
    warning: '#FEF3C7',
    danger: '#FEE2E2',
    info: '#DBEAFE',
  },

  // Accents
  accent: {
    gold: '#D97706',
    purple: '#7C3AED',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Marges de page
  pageMargin: {
    top: 60,
    bottom: 60,
    left: 50,
    right: 50,
  },
} as const;

export const fonts = {
  primary: 'Helvetica',
  primaryBold: 'Helvetica-Bold',
  mono: 'Courier',
} as const;

export const fontSizes = {
  xs: 8,
  sm: 9,
  base: 11,
  md: 12,
  lg: 14,
  xl: 18,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const borderRadius = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;

export type RiasecCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export const riasecLabels: Record<RiasecCode, string> = {
  R: 'Réaliste',
  I: 'Investigatif',
  A: 'Artistique',
  S: 'Social',
  E: 'Entreprenant',
  C: 'Conventionnel',
};

export const riasecDescriptions: Record<RiasecCode, string> = {
  R: 'Vous appréciez le concret, le tangible, les résultats mesurables. Vous êtes à l\'aise avec les outils, la technique, les systèmes physiques.',
  I: 'Vous êtes animé par la curiosité intellectuelle, le besoin de comprendre en profondeur, d\'analyser et de résoudre des problèmes complexes.',
  A: 'Vous valorisez l\'expression créative, l\'originalité et l\'esthétique. Vous aimez créer, innover et sortir des sentiers battus.',
  S: 'Vous êtes orienté vers les autres, l\'aide, l\'accompagnement. Vous excellez dans les relations humaines et la communication.',
  E: 'Vous avez le goût de l\'initiative, du leadership, de l\'influence. Vous aimez convaincre, piloter, créer de la valeur.',
  C: 'Vous appréciez l\'ordre, la structure, les processus clairs. Vous excellez dans l\'organisation et la gestion méthodique.',
};
