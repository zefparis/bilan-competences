/**
 * PERSPECTA PDF - Partie II : Lecture Approfondie
 * Pages 7-9 : Matrice métiers, parcours, vigilances
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { ProfileData } from '../data/types';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { SectionTitle } from '../components/SectionTitle';
import { CompatibilityMatrix } from '../components/CompatibilityMatrix';
import { Timeline } from '../components/Timeline';
import { InfoBox } from '../components/InfoBox';
import { BulletList } from '../components/BulletList';

interface Part2AnalysisProps {
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
  paragraph: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    color: colors.neutral[700],
    lineHeight: 1.6,
    marginBottom: spacing.md,
  },
  sweetSpotBox: {
    padding: spacing.md,
    backgroundColor: colors.primary.lightBlue,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.blue,
    marginTop: spacing.md,
  },
  sweetSpotTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.primary.darkBlue,
    marginBottom: spacing.sm,
  },
  sweetSpotText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.6,
  },
  analysisBox: {
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  analysisTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },
  analysisText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.6,
  },
  checkItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  checkIcon: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.success,
    marginRight: spacing.sm,
  },
  checkText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
  },
  vigilanceContainer: {
    marginBottom: spacing.md,
  },
});

// Page 7: Matrice Compatibilité
const CompatibilityPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const defaultJobs = [
    {
      family: 'R&D Technique',
      icon: '[R]',
      compatibility: 5,
      why: 'Flexibilité + analyse profonde',
      vigilance: 'Deadlines courts',
    },
    {
      family: 'Management de projets',
      icon: '[M]',
      compatibility: 4,
      why: 'Contrôle inhibiteur élevé',
      vigilance: 'Réunionnite intense',
    },
    {
      family: 'Consulting strategique',
      icon: '[C]',
      compatibility: 4,
      why: 'Pensée structurée',
      vigilance: 'Clients impatients',
    },
    {
      family: 'Entrepreneur',
      icon: '[E]',
      compatibility: 3,
      why: 'Vision + engagement',
      vigilance: 'Exige rapidité',
    },
    {
      family: 'Direction creative',
      icon: '[D]',
      compatibility: 3,
      why: 'Créativité encadrée',
      vigilance: 'Pression délais',
    },
  ];

  const jobs = data.jobCompatibility || defaultJobs;

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie II · Lecture Approfondie" />
      
      <SectionTitle 
        number="2.1" 
        title="COGNITION × MÉTIERS : LA MATRICE" 
        color={colors.success}
      />

      <CompatibilityMatrix jobs={jobs} />

      <View style={styles.sweetSpotBox}>
        <Text style={styles.sweetSpotTitle}>VOTRE SWEET SPOT</Text>
        <Text style={styles.sweetSpotText}>
          {data.generatedTexts?.sweetSpot || 
            `Vos meilleures performances seront dans des rôles combinant :

• Analyse approfondie (vitesse ${data.cognitive.processingSpeed.toFixed(1)}%)
• Capacité d'adaptation (flexibilité ${data.cognitive.flexibility.toFixed(1)}%)
• Gestion de complexité (contrôle ${data.cognitive.inhibitoryControl.toFixed(1)}%)

Evitez : Environnements ultra-rapides, micro-decisions en continu, chaos non structure`}
        </Text>
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 8: Parcours Professionnel
const CareerPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie II · Lecture Approfondie" />
      
      <SectionTitle 
        number="2.2" 
        title="VOTRE PARCOURS À LA LOUPE" 
        color={colors.success}
      />

      <Timeline experiences={data.career} />

      <View style={styles.analysisBox}>
        <Text style={styles.analysisTitle}>CE QUE VOTRE TRAJECTOIRE REVELE</Text>
        <Text style={styles.analysisText}>
          {data.generatedTexts?.trajectoryAnalysis || 
            `Votre parcours montre une progression naturelle vers des rôles combinant expertise technique et responsabilités managériales. Cette évolution s'appuie directement sur vos forces cognitives :

- Flexibilite pour naviguer tech / management
- Controle pour maintenir qualite sous pression
- Approche analytique pour decisions eclairees`}
        </Text>
        
        <View style={{ marginTop: spacing.md }}>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>*</Text>
            <Text style={styles.checkText}>Cohérence narrative : forte</Text>
          </View>
          <View style={styles.checkItem}>
            <Text style={styles.checkIcon}>*</Text>
            <Text style={styles.checkText}>Alignement cognition × parcours : excellent</Text>
          </View>
        </View>
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 9: Zones de Vigilance
const VigilancePage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const vigilances = [
    {
      title: 'SESSIONS LONGUES',
      description: `Avec votre profil (vitesse ${data.cognitive.processingSpeed.toFixed(1)}%, fluidité ${data.cognitive.fluency?.toFixed(1) || '42.5'}%), les sessions prolongées sur tâches répétitives peuvent générer de la fatigue cognitive rapide.`,
      solutions: [
        'Pauses toutes les 90 minutes',
        'Alterner tâches analytiques / routinières',
        'Environnement calme pour travail profond',
        'To-do list visuelle (charge cognitive reduite)',
      ],
    },
    {
      title: 'ENVIRONNEMENTS ULTRA-RAPIDES',
      description: `Votre vitesse de traitement (${data.cognitive.processingSpeed.toFixed(1)}%) indique une préférence pour la réflexion approfondie plutôt que la réactivité instantanée.`,
      solutions: [
        'Négocier délais raisonnables (48h mini)',
        'Préparer templates/processus standardisés',
        'Déléguer micro-décisions urgentes',
        'Bloquer créneaux "deep work" quotidiens',
      ],
    },
    {
      title: 'SURCHARGE MULTITÂCHE',
      description: `Paradoxalement, votre flexibilité (${data.cognitive.flexibility.toFixed(1)}%) peut vous rendre vulnérable à la dispersion.`,
      solutions: [
        'Max 3 projets simultanés (pas 5+)',
        'Time-blocking strict par projet',
        'Revue hebdomadaire des priorités',
        'Dire "non" aux opportunités hors focus',
      ],
    },
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie II · Lecture Approfondie" />
      
      <SectionTitle 
        number="2.3" 
        title="ZONES DE VIGILANCE COGNITIVE" 
        color={colors.success}
      />

      {vigilances.map((vigilance, idx) => (
        <View key={idx} style={styles.vigilanceContainer}>
          <InfoBox variant="warning" icon="!" title={`ATTENTION : ${vigilance.title}`}>
            <Text style={styles.paragraph}>{vigilance.description}</Text>
            <Text style={[styles.sweetSpotTitle, { color: colors.success, marginTop: spacing.sm }]}>
              Solutions pratiques :
            </Text>
            <BulletList items={vigilance.solutions} bulletChar="*" bulletColor={colors.success} />
          </InfoBox>
        </View>
      ))}

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

export const Part2Analysis: React.FC<Part2AnalysisProps> = ({ data }) => {
  return (
    <>
      <CompatibilityPage data={data} />
      <CareerPage data={data} />
      <VigilancePage data={data} />
    </>
  );
};

export default Part2Analysis;
