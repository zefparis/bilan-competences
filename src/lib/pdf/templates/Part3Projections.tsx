/**
 * PERSPECTA PDF - Partie III : Projections
 * Pages 10-11 : Scénarios d'évolution, environnements compatibles
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { ProfileData, CareerScenario, EnvironmentRecommendation } from '../data/types';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { SectionTitle } from '../components/SectionTitle';
import { BulletList } from '../components/BulletList';

interface Part3ProjectionsProps {
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
  scenarioContainer: {
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    paddingLeft: spacing.md,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  scenarioIcon: {
    fontSize: fontSizes.xl,
    marginRight: spacing.sm,
  },
  scenarioTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.lg,
    flex: 1,
  },
  scenarioMeta: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  metaItem: {
    marginRight: spacing.lg,
  },
  metaLabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[500],
  },
  metaValue: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: fontSizes.sm,
    marginRight: 1,
  },
  starFilled: {
    color: colors.warning,
  },
  starEmpty: {
    color: colors.neutral[300],
  },
  scenarioDescription: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.6,
    marginBottom: spacing.sm,
  },
  subSection: {
    marginTop: spacing.sm,
  },
  subSectionTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.md,
  },
  envContainer: {
    marginBottom: spacing.md,
  },
  envBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  envBoxFavorable: {
    backgroundColor: colors.background.success,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  envBoxAvoid: {
    backgroundColor: colors.background.danger,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  envTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    marginBottom: spacing.md,
  },
  envItem: {
    marginBottom: spacing.sm,
  },
  envItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  envIcon: {
    fontSize: fontSizes.md,
    marginRight: spacing.sm,
  },
  envName: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[800],
  },
  envReason: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[600],
    marginLeft: spacing.lg,
  },
  envExample: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[500],
    fontStyle: 'italic',
    marginLeft: spacing.lg,
  },
  criteriaBox: {
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  criteriaTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },
  criteriaItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  criteriaCheck: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    marginRight: spacing.sm,
  },
  criteriaText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    flex: 1,
  },
  criteriaResult: {
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.primary.lightBlue,
    borderRadius: borderRadius.sm,
  },
  criteriaResultText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
  },
});

const Stars: React.FC<{ count: number; max?: number }> = ({ count, max = 5 }) => (
  <View style={styles.starsContainer}>
    {Array.from({ length: max }, (_, i) => (
      <Text
        key={i}
        style={[styles.star, i < count ? styles.starFilled : styles.starEmpty]}
      >
        ★
      </Text>
    ))}
  </View>
);

// Page 10: Trois Scénarios
const ScenariosPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const defaultScenarios: CareerScenario[] = [
    {
      id: 1,
      title: 'CONTINUITÉ OPTIMISÉE',
      color: 'blue',
      horizon: '3-5 ans',
      probability: 5,
      description: 'Vous continuez sur votre trajectoire actuelle en optimisant votre environnement pour mieux exploiter vos forces cognitives. Cette voie offre stabilité et progression naturelle.',
      positions: ['Senior Product Manager (tech)', 'Lead R&D Engineer', 'Directeur Innovation'],
      skills: ['Leadership transversal', 'Gestion budgétaire', 'Influence stratégique'],
    },
    {
      id: 2,
      title: 'PIVOT STRATÉGIQUE',
      color: 'green',
      horizon: '2-4 ans',
      probability: 4,
      description: 'Vous réorientez votre carrière vers un domaine adjacent qui valorise davantage votre profil cognitif unique. Nécessite un investissement en formation mais ouvre de nouvelles opportunités.',
      positions: ['Data Scientist (avec formation)', 'Consultant transformation digitale', 'Product Manager (nouvelle industrie)'],
      skills: ['Certifications sectorielles', 'Upskilling technique', 'Réseau professionnel nouveau secteur'],
    },
    {
      id: 3,
      title: 'RUPTURE INNOVANTE',
      color: 'orange',
      horizon: '5+ ans',
      probability: 3,
      description: 'Vous créez votre propre structure ou rejoignez un projet entrepreneurial. Cette voie maximise votre autonomie mais demande une préparation importante.',
      positions: ['Entrepreneur deeptech', 'Consultant indépendant', 'Enseignant-chercheur'],
      skills: ['Constitution capital (12-18 mois)', 'Réseau solide', 'Mentorat entrepreneurial'],
    },
  ];

  const scenarios = data.scenarios || defaultScenarios;
  const scenarioColors = {
    blue: colors.primary.blue,
    green: colors.success,
    orange: colors.warning,
  };
  const scenarioIcons = {
    blue: '[1]',
    green: '[2]',
    orange: '[3]',
  };

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie III · Projections" />
      
      <SectionTitle 
        number="3.1" 
        title="TROIS SCÉNARIOS D'ÉVOLUTION" 
        color={colors.warning}
      />

      {scenarios.map((scenario, idx) => (
        <View 
          key={idx} 
          style={[
            styles.scenarioContainer, 
            { borderLeftColor: scenarioColors[scenario.color] }
          ]}
        >
          <View style={styles.scenarioHeader}>
            <Text style={styles.scenarioIcon}>{scenarioIcons[scenario.color]}</Text>
            <Text style={[styles.scenarioTitle, { color: scenarioColors[scenario.color] }]}>
              SCÉNARIO {scenario.id} : {scenario.title}
            </Text>
          </View>

          <View style={styles.scenarioMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Horizon</Text>
              <Text style={styles.metaValue}>{scenario.horizon}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Probabilité d'épanouissement</Text>
              <Stars count={scenario.probability} />
            </View>
          </View>

          <Text style={styles.scenarioDescription}>{scenario.description}</Text>

          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>Exemples de postes :</Text>
            <BulletList items={scenario.positions} bulletColor={scenarioColors[scenario.color]} />
          </View>

          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>Competences a developper :</Text>
            <BulletList items={scenario.skills} bulletColor={colors.neutral[500]} />
          </View>

          {idx < scenarios.length - 1 && <View style={styles.divider} />}
        </View>
      ))}

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 11: Environnements Compatibles
const EnvironmentsPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const defaultEnvironments: EnvironmentRecommendation[] = [
    { type: 'favorable', icon: '+', name: 'PME innovantes (50-200 pers.)', reason: 'Structure + flexibilite', example: 'Scale-up tech B2B' },
    { type: 'favorable', icon: '+', name: 'Grands groupes avec labs innovation', reason: 'Ressources + creativite', example: 'Orange Innovation, Airbus X' },
    { type: 'favorable', icon: '+', name: 'Organismes de recherche appliquee', reason: 'Profondeur + impact', example: 'INRIA, CEA Tech' },
    { type: 'favorable', icon: '+', name: 'Cabinets de conseil strategique', reason: 'Analyse + diversite missions', example: 'BCG, Bain, boutiques specialisees' },
    { type: 'avoid', icon: '-', name: 'Startups pre-seed en chaos', reason: 'Trop d\'imprevu non structure' },
    { type: 'avoid', icon: '-', name: 'Organisations ultra-hierarchiques', reason: 'Bride flexibilite cognitive' },
    { type: 'avoid', icon: '-', name: 'Trading floors / salles de marche', reason: 'Vitesse exigee incompatible' },
    { type: 'avoid', icon: '-', name: 'Environnements micro-management', reason: 'Frustration autonomie/controle' },
  ];

  const environments = data.environments || defaultEnvironments;
  const favorable = environments.filter(e => e.type === 'favorable');
  const avoid = environments.filter(e => e.type === 'avoid');

  const criteria = [
    'Ai-je le temps de réfléchir avant d\'agir ?',
    'La complexité est-elle valorisée ?',
    'Puis-je jongler entre plusieurs sujets ?',
    'L\'environnement respecte-t-il mon rythme ?',
    'Y a-t-il un cadre structurant (pas chaos) ?',
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie III · Projections" />
      
      <SectionTitle 
        number="3.2" 
        title="ENVIRONNEMENTS COMPATIBLES" 
        color={colors.warning}
      />

      {/* Environnements favorables */}
      <View style={[styles.envBox, styles.envBoxFavorable]}>
        <Text style={[styles.envTitle, { color: colors.success }]}>
          [+] ENVIRONNEMENTS FAVORABLES
        </Text>
        {favorable.map((env, idx) => (
          <View key={idx} style={styles.envItem}>
            <View style={styles.envItemHeader}>
              <Text style={styles.envIcon}>{env.icon}</Text>
              <Text style={styles.envName}>{env.name}</Text>
            </View>
            <Text style={styles.envReason}>Pourquoi : {env.reason}</Text>
            {env.example && <Text style={styles.envExample}>Exemple : {env.example}</Text>}
          </View>
        ))}
      </View>

      {/* Environnements à éviter */}
      <View style={[styles.envBox, styles.envBoxAvoid]}>
        <Text style={[styles.envTitle, { color: colors.danger }]}>
          [-] ENVIRONNEMENTS A EVITER
        </Text>
        {avoid.map((env, idx) => (
          <View key={idx} style={styles.envItem}>
            <View style={styles.envItemHeader}>
              <Text style={styles.envIcon}>{env.icon}</Text>
              <Text style={styles.envName}>{env.name}</Text>
            </View>
            <Text style={styles.envReason}>Raison : {env.reason}</Text>
          </View>
        ))}
      </View>

      {/* Critères décisifs */}
      <View style={styles.criteriaBox}>
        <Text style={styles.criteriaTitle}>CRITERES DECISIFS POUR VOS CHOIX</Text>
        <Text style={[styles.scenarioDescription, { marginBottom: spacing.sm }]}>
          Lorsque vous évaluez une opportunité, posez-vous :
        </Text>
        {criteria.map((criterion, idx) => (
          <View key={idx} style={styles.criteriaItem}>
            <Text style={styles.criteriaCheck}>[ ]</Text>
            <Text style={styles.criteriaText}>{criterion}</Text>
          </View>
        ))}
        <View style={styles.criteriaResult}>
          <Text style={styles.criteriaResultText}>
            Si 4/5 = OUI : environnement compatible{'\n'}
            Si 2/5 ou moins = OUI : risque d'epuisement eleve
          </Text>
        </View>
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

export const Part3Projections: React.FC<Part3ProjectionsProps> = ({ data }) => {
  return (
    <>
      <ScenariosPage data={data} />
      <EnvironmentsPage data={data} />
    </>
  );
};

export default Part3Projections;
