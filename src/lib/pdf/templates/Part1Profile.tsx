/**
 * PERSPECTA PDF - Partie I : Votre Profil
 * Pages 3-6 : Signature cognitive, forces, valeurs, RIASEC
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { ProfileData } from '../data/types';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { SectionTitle } from '../components/SectionTitle';
import { ScoreGauge } from '../components/ScoreGauge';
import { RiasecHexagon } from '../components/RiasecHexagon';
import { RadarChart } from '../components/RadarChart';
import { InfoBox } from '../components/InfoBox';
import { BulletList } from '../components/BulletList';

interface Part1ProfileProps {
  data: ProfileData;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.background.page,
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: spacing.pageMargin.left,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  col: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  quoteBox: {
    padding: spacing.md,
    backgroundColor: colors.primary.lightBlue,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.blue,
    borderRadius: borderRadius.md,
    marginVertical: spacing.md,
  },
  quoteText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.lg,
    fontStyle: 'italic',
    color: colors.neutral[700],
    lineHeight: 1.6,
  },
  codeBox: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  codeLabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: spacing.xs,
  },
  codeValue: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes['2xl'],
    color: colors.primary.darkBlue,
  },
  paragraph: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    color: colors.neutral[700],
    lineHeight: 1.6,
    marginBottom: spacing.md,
  },
  columnTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },
  successColumn: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background.success,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  infoColumn: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background.info,
    borderRadius: borderRadius.md,
    marginLeft: spacing.sm,
  },
  riasecDescription: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
  },
  riasecItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  riasecBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  riasecBadgeText: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.background.page,
  },
  riasecContent: {
    flex: 1,
  },
  riasecTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
  },
  riasecScore: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
  },
  riasecText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    lineHeight: 1.5,
    marginTop: 2,
  },
});

// Page 3: Signature Cognitive
const SignatureCognitivePage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const { cognitive, generatedTexts } = data;
  
  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Votre super-pouvoir';
    if (score >= 60) return 'Force majeure';
    if (score >= 40) return 'Zone équilibrée';
    if (score >= 20) return 'Approche analytique';
    return 'Zone de développement';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.primary.blue;
    if (score >= 40) return colors.warning;
    return colors.neutral[500];
  };

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie I · Votre Profil" />
      
      <SectionTitle 
        number="1.1" 
        title="VOTRE SIGNATURE COGNITIVE EN 30 SEC" 
        color={colors.primary.blue}
      />

      {/* Jauges des scores */}
      <ScoreGauge 
        score={cognitive.flexibility} 
        label="FLEXIBILITÉ COGNITIVE"
        sublabel={getScoreLabel(cognitive.flexibility)}
        color={getScoreColor(cognitive.flexibility)}
      />
      
      <ScoreGauge 
        score={cognitive.inhibitoryControl} 
        label="CONTRÔLE INHIBITEUR"
        sublabel={getScoreLabel(cognitive.inhibitoryControl)}
        color={getScoreColor(cognitive.inhibitoryControl)}
      />
      
      <ScoreGauge 
        score={cognitive.processingSpeed} 
        label="VITESSE DE TRAITEMENT"
        sublabel={getScoreLabel(cognitive.processingSpeed)}
        color={getScoreColor(cognitive.processingSpeed)}
      />

      {/* Citation personnalisée */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          VOTRE PROFIL EN 1 PHRASE{'\n\n'}
          "{generatedTexts?.signaturePhrase || 
            `Vous êtes un penseur ${cognitive.flexibility >= 80 ? 'flexible et ' : ''}analytique, capable de naviguer dans la complexité ${cognitive.processingSpeed < 30 ? 'sans précipitation' : 'avec agilité'}.`}"
        </Text>
      </View>

      {/* Code profil RIASEC miniature */}
      <View style={styles.codeBox}>
        <Text style={styles.codeLabel}>Code profil</Text>
        <Text style={styles.codeValue}>{data.riasec.dominant.join('')}</Text>
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 4: Ce que cela signifie
const MeaningPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const strengths = [
    'Navigation fluide entre projets multiples',
    'Maintien du focus sous pression',
    'Adaptation rapide aux imprévus',
    'Réflexion approfondie avant action',
  ];

  const environments = [
    'Startups en phase de structuration',
    'R&D avec deadlines souples',
    'Conseil stratégique (pas opérationnel)',
    'Management de projets complexes',
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie I · Votre Profil" />
      
      <SectionTitle 
        number="1.2" 
        title="CE QUE CELA SIGNIFIE" 
        color={colors.primary.blue}
      />

      <View style={styles.row}>
        <View style={styles.successColumn}>
          <Text style={styles.columnTitle}>[+] VOS FORCES NATURELLES</Text>
          <BulletList items={strengths} bulletColor={colors.success} />
        </View>
        
        <View style={styles.infoColumn}>
          <Text style={styles.columnTitle}>ENVIRONNEMENTS A PRIVILEGIER</Text>
          <BulletList items={environments} bulletColor={colors.primary.blue} />
        </View>
      </View>

      <Text style={styles.paragraph}>
        {data.generatedTexts?.strengthsAnalysis || 
          `Votre combinaison unique de flexibilité cognitive (${data.cognitive.flexibility.toFixed(1)}%) et de contrôle inhibiteur (${data.cognitive.inhibitoryControl.toFixed(1)}%) vous permet d'exceller dans des environnements qui valorisent à la fois l'adaptabilité et la rigueur. Vous êtes naturellement équipé pour gérer la complexité sans vous laisser submerger.`}
      </Text>

      <InfoBox variant="highlight" icon="*" title="A RETENIR">
        <Text style={styles.paragraph}>
          Votre profil cognitif n'est ni bon ni mauvais - il est unique. La clé est de 
          trouver des environnements qui valorisent vos forces naturelles plutôt que 
          de vous épuiser à compenser vos zones de moindre aisance.
        </Text>
      </InfoBox>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 5: Valeurs Professionnelles
const ValuesPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const avgSatisfaction = data.values.reduce((sum, v) => sum + v.satisfaction, 0) / data.values.length;
  const hasLowSatisfaction = avgSatisfaction <= 3;

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie I · Votre Profil" />
      
      <SectionTitle 
        number="1.3" 
        title="VOS VALEURS PROFESSIONNELLES" 
        color={colors.primary.blue}
      />

      <RadarChart values={data.values} />

      {hasLowSatisfaction && (
        <InfoBox variant="warning" icon="!" title="ZONE DE TENSION IDENTIFIEE">
          <Text style={styles.paragraph}>
            Vos valeurs prioritaires sont toutes satisfaites à niveau moyen ({avgSatisfaction.toFixed(1)}/5).
            {'\n\n'}
            Cela suggere :{'\n'}
            - Une periode de transition professionnelle{'\n'}
            - Un besoin d'ajustement environnemental{'\n'}
            - Des attentes en evolution
            {'\n\n'}
            Recommandation : Identifier 2 valeurs a prioriser dans les 6 prochains mois
          </Text>
        </InfoBox>
      )}

      <Text style={styles.paragraph}>
        Vos valeurs professionnelles sont le socle de votre épanouissement au travail. 
        Elles guident vos choix, vos réactions et votre niveau d'engagement. Un écart 
        important entre l'importance d'une valeur et sa satisfaction actuelle est un 
        signal d'alerte à prendre en compte.
      </Text>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 6: Profil RIASEC
const RiasecPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const { riasec } = data;
  
  const riasecDescriptions: Record<string, string> = {
    R: 'Vous appréciez le concret, le tangible, les résultats mesurables. Vous êtes à l\'aise avec les outils, la technique, les systèmes physiques.',
    I: 'Vous êtes animé par la curiosité intellectuelle, le besoin de comprendre en profondeur, d\'analyser et de résoudre des problèmes complexes.',
    A: 'Vous valorisez l\'expression créative, l\'originalité et l\'esthétique. Vous aimez créer, innover et sortir des sentiers battus.',
    S: 'Vous êtes orienté vers les autres, l\'aide, l\'accompagnement. Vous excellez dans les relations humaines et la communication.',
    E: 'Vous avez le goût de l\'initiative, du leadership, de l\'influence. Vous aimez convaincre, piloter, créer de la valeur.',
    C: 'Vous appréciez l\'ordre, la structure, les processus clairs. Vous excellez dans l\'organisation et la gestion méthodique.',
  };

  const riasecLabels: Record<string, string> = {
    R: 'RÉALISTE',
    I: 'INVESTIGATIF',
    A: 'ARTISTIQUE',
    S: 'SOCIAL',
    E: 'ENTREPRENANT',
    C: 'CONVENTIONNEL',
  };

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie I · Votre Profil" />
      
      <SectionTitle 
        number="1.4" 
        title="VOTRE PROFIL RIASEC DÉCODÉ" 
        color={colors.primary.blue}
      />

      <RiasecHexagon scores={riasec} dominant={riasec.dominant} size={180} />

      <View style={styles.riasecDescription}>
        <Text style={[styles.columnTitle, { marginBottom: spacing.md }]}>
          VOS 3 DIMENSIONS DOMINANTES
        </Text>
        
        {riasec.dominant.map((code, idx) => (
          <View key={code} style={styles.riasecItem}>
            <View style={[styles.riasecBadge, { backgroundColor: colors.riasec[code] }]}>
              <Text style={styles.riasecBadgeText}>{code}</Text>
            </View>
            <View style={styles.riasecContent}>
              <Text style={styles.riasecTitle}>
                {riasecLabels[code]} ({riasec[code]}%)
              </Text>
              <Text style={styles.riasecText}>
                {riasecDescriptions[code]}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

export const Part1Profile: React.FC<Part1ProfileProps> = ({ data }) => {
  return (
    <>
      <SignatureCognitivePage data={data} />
      <MeaningPage data={data} />
      <ValuesPage data={data} />
      <RiasecPage data={data} />
    </>
  );
};

export default Part1Profile;
