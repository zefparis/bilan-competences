/**
 * PERSPECTA PDF - Resume Executif
 * Page de synthese visuelle avec graphiques RIASEC et jauges cognitives
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius, riasecLabels, RiasecCode } from '../styles/tokens';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { ProfileData } from '../data/types';
import { RiasecHexagon } from '../components/RiasecHexagon';
import { ScoreGauge } from '../components/ScoreGauge';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.background.page,
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: spacing.pageMargin.left,
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['2xl'],
    color: colors.primary.darkBlue,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  column: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.base,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.blue,
  },
  signatureBox: {
    backgroundColor: colors.primary.lightBlue,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  signatureText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.5,
    textAlign: 'center',
  },
  signatureBold: {
    fontFamily: fonts.primaryBold,
    color: colors.primary.darkBlue,
  },
  gaugesContainer: {
    gap: spacing.sm,
  },
  gaugeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  gaugeLabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[600],
    width: 100,
  },
  gaugeBar: {
    flex: 1,
    height: 12,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  gaugeFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  gaugeValue: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xs,
    color: colors.neutral[700],
    width: 35,
    textAlign: 'right',
  },
  keyPointsBox: {
    backgroundColor: colors.neutral[50],
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  keyPoint: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  keyPointBullet: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.success,
    width: 20,
  },
  keyPointText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    flex: 1,
  },
  bottomSection: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: '#F3E8FF',
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.purple,
  },
  bottomTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.accent.purple,
    marginBottom: spacing.xs,
  },
  bottomText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[700],
    lineHeight: 1.5,
  },
});

interface ExecutiveSummaryProps {
  data: ProfileData;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ data }) => {
  const { cognitive, riasec, values, meta, generatedTexts } = data;

  // Determiner la couleur de la jauge selon le score
  const getGaugeColor = (score: number) => {
    if (score >= 70) return colors.success;
    if (score >= 40) return colors.warning;
    return colors.danger;
  };

  // Points cles a afficher
  const keyPoints = [
    `Profil RIASEC dominant : ${riasec.dominant.join('')} (${riasec.dominant.map(c => riasecLabels[c]).join(', ')})`,
    `Controle inhibiteur : ${cognitive.inhibitoryControl >= 70 ? 'Eleve' : cognitive.inhibitoryControl >= 40 ? 'Modere' : 'A developper'}`,
    `Flexibilite cognitive : ${cognitive.flexibility >= 70 ? 'Elevee' : cognitive.flexibility >= 40 ? 'Moderee' : 'A developper'}`,
    values && values.length > 0 ? `Valeurs prioritaires : ${values.slice(0, 3).map(v => v.name).join(', ')}` : 'Valeurs : A completer',
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Resume Executif" />

      <Text style={styles.title}>VOTRE PROFIL EN UN COUP D'OEIL</Text>
      <Text style={styles.subtitle}>
        Synthese de votre signature cognitive et orientation professionnelle
      </Text>

      {/* Phrase signature */}
      <View style={styles.signatureBox}>
        <Text style={styles.signatureText}>
          {generatedTexts?.signaturePhrase || 
            `Vous etes un profil ${riasec.dominant.join('')} avec une approche ${
              cognitive.processingSpeed >= 50 ? 'reactive' : 'analytique'
            } et ${cognitive.flexibility >= 60 ? 'flexible' : 'structuree'}.`
          }
        </Text>
      </View>

      <View style={styles.twoColumns}>
        {/* Colonne gauche : RIASEC */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>PROFIL RIASEC</Text>
          <RiasecHexagon
            scores={riasec}
            dominant={riasec.dominant}
            size={180}
          />
        </View>

        {/* Colonne droite : Dimensions cognitives */}
        <View style={styles.column}>
          <Text style={styles.sectionTitle}>DIMENSIONS COGNITIVES</Text>
          <View style={styles.gaugesContainer}>
            {/* Controle inhibiteur */}
            <View style={styles.gaugeRow}>
              <Text style={styles.gaugeLabel}>Controle</Text>
              <View style={styles.gaugeBar}>
                <View 
                  style={[
                    styles.gaugeFill, 
                    { 
                      width: `${cognitive.inhibitoryControl}%`,
                      backgroundColor: getGaugeColor(cognitive.inhibitoryControl)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.gaugeValue}>{cognitive.inhibitoryControl}%</Text>
            </View>

            {/* Vitesse de traitement */}
            <View style={styles.gaugeRow}>
              <Text style={styles.gaugeLabel}>Vitesse</Text>
              <View style={styles.gaugeBar}>
                <View 
                  style={[
                    styles.gaugeFill, 
                    { 
                      width: `${cognitive.processingSpeed}%`,
                      backgroundColor: getGaugeColor(cognitive.processingSpeed)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.gaugeValue}>{cognitive.processingSpeed}%</Text>
            </View>

            {/* Flexibilite */}
            <View style={styles.gaugeRow}>
              <Text style={styles.gaugeLabel}>Flexibilite</Text>
              <View style={styles.gaugeBar}>
                <View 
                  style={[
                    styles.gaugeFill, 
                    { 
                      width: `${cognitive.flexibility}%`,
                      backgroundColor: getGaugeColor(cognitive.flexibility)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.gaugeValue}>{cognitive.flexibility}%</Text>
            </View>

            {/* Fluidite d'acces */}
            <View style={styles.gaugeRow}>
              <Text style={styles.gaugeLabel}>Fluidite</Text>
              <View style={styles.gaugeBar}>
                <View 
                  style={[
                    styles.gaugeFill, 
                    { 
                      width: `${cognitive.flexibility}%`,
                      backgroundColor: getGaugeColor(cognitive.flexibility)
                    }
                  ]} 
                />
              </View>
              <Text style={styles.gaugeValue}>{cognitive.flexibility}%</Text>
            </View>

            {/* Derive attentionnelle (inverse) */}
            <View style={styles.gaugeRow}>
              <Text style={styles.gaugeLabel}>Attention</Text>
              <View style={styles.gaugeBar}>
                <View 
                  style={[
                    styles.gaugeFill, 
                    { 
                      width: `${100 - (cognitive.attentionDrift || 0)}%`,
                      backgroundColor: getGaugeColor(100 - (cognitive.attentionDrift || 0))
                    }
                  ]} 
                />
              </View>
              <Text style={styles.gaugeValue}>{100 - (cognitive.attentionDrift || 0)}%</Text>
            </View>
          </View>

          {/* Points cles */}
          <View style={[styles.keyPointsBox, { marginTop: spacing.md }]}>
            {keyPoints.map((point, idx) => (
              <View key={idx} style={styles.keyPoint}>
                <Text style={styles.keyPointBullet}>*</Text>
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Section du bas */}
      <View style={styles.bottomSection}>
        <Text style={styles.bottomTitle}>CE QUE CE BILAN VA VOUS APPORTER</Text>
        <Text style={styles.bottomText}>
          Dans les pages suivantes, vous decouvrirez une analyse approfondie de votre profil cognitif, 
          des scenarios d'evolution professionnelle adaptes a vos forces, et un plan d'action concret 
          pour les 90 prochains jours. Prenez le temps de lire chaque section - ce bilan est concu 
          pour etre relu plusieurs fois.
        </Text>
      </View>

      <PageFooter profileId={meta.id} />
    </Page>
  );
};

export default ExecutiveSummary;
