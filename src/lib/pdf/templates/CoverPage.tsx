/**
 * PERSPECTA PDF - Page de Couverture
 * Page 1 : Couverture premium avec informations utilisateur
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { ProfileMeta } from '../data/types';

interface CoverPageProps {
  meta: ProfileMeta;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.background.cover,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  logo: {
    fontFamily: fonts.primaryBold,
    fontSize: 28,
    color: colors.primary.blue,
    letterSpacing: 4,
    marginBottom: spacing.xxl,
  },
  mainTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['4xl'],
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['2xl'],
    color: colors.primary.darkBlue,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  divider: {
    width: 120,
    height: 3,
    backgroundColor: colors.primary.blue,
    marginVertical: spacing.xl,
  },
  tagline: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing.xl,
  },
  userSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  userLabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.md,
    color: colors.neutral[500],
    marginBottom: spacing.xs,
  },
  userName: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['2xl'],
    color: colors.neutral[800],
    marginBottom: spacing.xxl,
  },
  metaSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  metaText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: spacing.xs,
  },
  metaCode: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.gold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    marginTop: spacing.xxl,
  },
  premiumText: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xs,
    color: colors.background.page,
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  },
});

export const CoverPage: React.FC<CoverPageProps> = ({ meta }) => {
  const formattedDate = new Date(meta.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Logo */}
        <Text style={styles.logo}>PERSPECTA-COMPETENCES</Text>

        {/* Titre principal */}
        <Text style={styles.mainTitle}>BILAN COGNITIF</Text>
        <Text style={styles.subtitle}>PROFESSIONNEL</Text>

        {/* Séparateur */}
        <View style={styles.divider} />

        {/* Tagline */}
        <Text style={styles.tagline}>Empreinte Cognitive Individuelle</Text>

        {/* Section utilisateur */}
        <View style={styles.userSection}>
          <Text style={styles.userLabel}>Analyse personnalisée pour</Text>
          <Text style={styles.userName}>{meta.userName}</Text>
          {meta.title && (
            <Text style={[styles.userLabel, { fontSize: fontSizes.md, color: colors.primary.blue, fontFamily: fonts.primaryBold, marginTop: -spacing.md, marginBottom: spacing.xs }]}>
              {meta.title}
            </Text>
          )}
          {(meta.city || meta.department) && (
            <Text style={[styles.userLabel, { fontSize: fontSizes.sm, marginTop: meta.title ? 0 : -spacing.md }]}>
              {meta.city && meta.department 
                ? `${meta.city} (${meta.department})`
                : meta.city || meta.department}
            </Text>
          )}
        </View>

        {/* Métadonnées */}
        <View style={styles.metaSection}>
          <Text style={styles.metaText}>Document généré le {formattedDate}</Text>
          <Text style={styles.metaCode}>Réf. {meta.id}</Text>
        </View>

        {/* Badge Premium */}
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>★ PREMIUM</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 PERSPECTA-COMPETENCES by ia-solution - Document confidentiel
        </Text>
        <Text style={[styles.footerText, { fontSize: 8, marginTop: 4, color: '#666' }]}>
          🤖 Ce rapport contient des analyses générées par Intelligence Artificielle (GPT-4o). Les recommandations sont indicatives.
        </Text>
        <Text style={[styles.footerText, { fontSize: 8, color: '#666' }]}>
          Vous restez maître de vos décisions professionnelles. Plus d'infos : perspecta.fr/ai-disclosure
        </Text>
      </View>
    </Page>
  );
};

export default CoverPage;
