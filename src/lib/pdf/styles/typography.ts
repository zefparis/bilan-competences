/**
 * PERSPECTA PDF Design System - Typography
 * Système typographique à 3 niveaux
 */

import { StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, fontSizes, lineHeights } from './tokens';

export const typography = StyleSheet.create({
  // Titres
  h1: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
    color: colors.neutral[900],
    marginBottom: 24,
  },

  h2: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.tight,
    color: colors.primary.darkBlue,
    marginBottom: 16,
  },

  h3: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.normal,
    color: colors.neutral[800],
    marginBottom: 12,
  },

  h4: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
    color: colors.neutral[700],
    marginBottom: 8,
  },

  // Corps de texte
  body: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.neutral[700],
  },

  bodySmall: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.relaxed,
    color: colors.neutral[600],
  },

  // Texte mis en avant
  highlight: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.normal,
    color: colors.primary.blue,
  },

  // Légendes et notes
  caption: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
    color: colors.neutral[500],
  },

  // Code / Référence
  mono: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
  },

  // Labels
  label: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Liens
  link: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    color: colors.primary.blue,
    textDecoration: 'underline',
  },

  // Citation
  quote: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
    color: colors.neutral[700],
    fontStyle: 'italic',
  },

  // Score / Pourcentage
  score: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xl,
    color: colors.primary.blue,
  },

  // Numéro de page
  pageNumber: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  },
});

export const textStyles = {
  centered: { textAlign: 'center' as const },
  right: { textAlign: 'right' as const },
  uppercase: { textTransform: 'uppercase' as const },
  bold: { fontFamily: fonts.primaryBold },
  italic: { fontStyle: 'italic' as const },
};
