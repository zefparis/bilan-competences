/**
 * PERSPECTA PDF - Partie IV : Plan d'Action
 * Pages 12-14 : Actions prioritaires, ressources, prochain pas
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { ProfileData } from '../data/types';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { SectionTitle } from '../components/SectionTitle';
import { CheckList } from '../components/CheckList';

interface Part4ActionsProps {
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
  phaseContainer: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.blue,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  phaseIcon: {
    fontSize: fontSizes.lg,
    marginRight: spacing.sm,
  },
  phaseTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.primary.darkBlue,
  },
  resourceSection: {
    marginBottom: spacing.lg,
  },
  resourceTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  resourceItem: {
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  resourceName: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[800],
  },
  resourceMeta: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[500],
  },
  resourceReason: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[600],
    fontStyle: 'italic',
    marginTop: 2,
  },
  ctaBox: {
    padding: spacing.lg,
    backgroundColor: colors.primary.lightBlue,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.primary.blue,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  ctaIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  ctaTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xl,
    color: colors.primary.darkBlue,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  ctaText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    color: colors.neutral[700],
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: spacing.md,
  },
  ctaAction: {
    padding: spacing.md,
    backgroundColor: colors.background.page,
    borderRadius: borderRadius.md,
    width: '100%',
  },
  ctaActionText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.6,
  },
  accompagnementBox: {
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  accompagnementTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },
  accompagnementText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.6,
    marginBottom: spacing.sm,
  },
  accompagnementFeature: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  accompagnementCheck: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.success,
    marginRight: spacing.sm,
  },
  accompagnementFeatureText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.background.highlight,
    borderRadius: borderRadius.sm,
  },
  priceText: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.accent.gold,
  },
  promoCode: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    marginLeft: spacing.sm,
  },
  contactBox: {
    padding: spacing.md,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  contactTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    marginBottom: spacing.xs,
  },
  contactText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
  },
  closingBox: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  closingText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.md,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  closingEmoji: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  logo: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.lg,
    color: colors.primary.blue,
    letterSpacing: 2,
  },
});

// Page 12: Actions Prioritaires
const ActionsPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const phases = [
    {
      icon: '[S1-2]',
      title: 'SEMAINE 1-2 : CLARIFICATION',
      tasks: [
        { text: 'Identifier les 2 valeurs à prioriser', detail: 'Outil : matrice Urgent/Important · Durée : 30 min' },
        { text: 'Audit de votre environnement actuel', detail: 'Checklist page 11 (5 critères) · Score actuel : __/5' },
        { text: 'Cartographier 3 opportunités pro', detail: 'LinkedIn, réseau, annonces · Compatibles avec votre profil' },
      ],
    },
    {
      icon: '[S3-6]',
      title: 'SEMAINE 3-6 : EXPLORATION',
      tasks: [
        { text: '3 entretiens exploratoires', detail: 'Avec personnes dans scénarios 1 ou 2 · Questions : rythme, autonomie, défis' },
        { text: 'Tester 1 formation/certification', detail: 'Coursera, LinkedIn Learning (gratuit) · Alignée avec votre pivot' },
        { text: 'Mettre en place rituels anti-fatigue', detail: 'Pauses 90 min · Deep work blocks 2h/jour' },
      ],
    },
    {
      icon: '[S7-12]',
      title: 'SEMAINE 7-12 : DECISION',
      tasks: [
        { text: 'Choisir 1 scénario prioritaire (1, 2 ou 3)', detail: 'Revisiter page 10 · Critères : épanouissement + faisabilité' },
        { text: 'Construire roadmap 12 mois', detail: 'Formations, réseau, candidatures' },
        { text: 'Réserver session accompagnement', detail: '1h stratégique avec coach PERSPECTA · Personnalisation approfondie' },
      ],
    },
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie IV · Plan d'Action" />
      
      <SectionTitle 
        number="4.1" 
        title="ACTIONS PRIORITAIRES : VOS 90 PROCHAINS JOURS" 
        color={colors.accent.purple}
      />

      {phases.map((phase, idx) => (
        <View key={idx} style={styles.phaseContainer}>
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseIcon}>{phase.icon}</Text>
            <Text style={styles.phaseTitle}>{phase.title}</Text>
          </View>
          <CheckList items={phase.tasks} />
        </View>
      ))}

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 13: Ressources
const ResourcesPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  const riasecCode = data.riasec.dominant.join('');
  
  const formations = [
    { name: 'Design Thinking', provider: 'Stanford d.school | Coursera', cost: 'Gratuit', duration: '6 semaines, 3h/semaine', reason: 'Investigatif + Entreprenant' },
    { name: 'Data Analysis with Python', provider: 'IBM | Coursera', cost: 'Certification €39', duration: '4 semaines, 5h/semaine', reason: 'Investigatif' },
    { name: 'Strategic Leadership', provider: 'HEC Paris | Coursera', cost: 'Audit gratuit', duration: '8 semaines, 4h/semaine', reason: 'Entreprenant' },
  ];

  const lectures = [
    { name: '"Range" - David Epstein', reason: 'Valorise généralistes flexibles' },
    { name: '"Atomic Habits" - James Clear', reason: `Systèmes vs objectifs (vitesse ${data.cognitive.processingSpeed.toFixed(1)}%)` },
    { name: '"The Startup of You" - Reid Hoffman', reason: `Pensée entrepreneuriale (E=${data.riasec.E}%)` },
  ];

  const outils = [
    { name: 'Notion', provider: 'notion.so', cost: 'Gratuit', reason: 'Gestion projets multiples (flexibilité)' },
    { name: 'Forest App', provider: 'iOS/Android', cost: '3€', reason: 'Timer 90 min anti-dispersion' },
    { name: 'Calm / Headspace', provider: 'Freemium', cost: '', reason: 'Récupération cognitive rapide' },
  ];

  const communautes = [
    { name: 'Product Management', provider: 'LinkedIn', members: '150K+' },
    { name: 'Data Science Central', provider: 'LinkedIn', members: '800K+' },
    { name: 'Tech Leadership Community', provider: 'LinkedIn', members: '50K+' },
  ];

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie IV · Plan d'Action" />
      
      <SectionTitle 
        number="4.2" 
        title={`RESSOURCES RECOMMANDÉES POUR VOTRE PROFIL ${riasecCode}`}
        color={colors.accent.purple}
      />

      {/* Formations */}
      <View style={styles.resourceSection}>
        <Text style={styles.resourceTitle}>FORMATIONS ALIGNEES {riasecCode}</Text>
        {formations.map((item, idx) => (
          <View key={idx} style={styles.resourceItem}>
            <Text style={styles.resourceName}>- {item.name}</Text>
            <Text style={styles.resourceMeta}>{item.provider} | {item.cost} | {item.duration}</Text>
            <Text style={styles.resourceReason}>Pourquoi : {item.reason}</Text>
          </View>
        ))}
      </View>

      {/* Lectures */}
      <View style={styles.resourceSection}>
        <Text style={styles.resourceTitle}>LECTURES ESSENTIELLES</Text>
        {lectures.map((item, idx) => (
          <View key={idx} style={styles.resourceItem}>
            <Text style={styles.resourceName}>- {item.name}</Text>
            <Text style={styles.resourceReason}>Pourquoi : {item.reason}</Text>
          </View>
        ))}
      </View>

      {/* Outils */}
      <View style={styles.resourceSection}>
        <Text style={styles.resourceTitle}>OUTILS PRATIQUES</Text>
        {outils.map((item, idx) => (
          <View key={idx} style={styles.resourceItem}>
            <Text style={styles.resourceName}>- {item.name}</Text>
            <Text style={styles.resourceMeta}>{item.provider} {item.cost && `| ${item.cost}`}</Text>
            <Text style={styles.resourceReason}>Usage : {item.reason}</Text>
          </View>
        ))}
      </View>

      {/* Communautés */}
      <View style={styles.resourceSection}>
        <Text style={styles.resourceTitle}>COMMUNAUTES PROFESSIONNELLES</Text>
        <Text style={[styles.resourceMeta, { marginBottom: spacing.sm }]}>
          Groupes LinkedIn {riasecCode}-compatibles :
        </Text>
        {communautes.map((item, idx) => (
          <View key={idx} style={styles.resourceItem}>
            <Text style={styles.resourceName}>• {item.name} ({item.members} membres)</Text>
          </View>
        ))}
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

// Page 14: Votre Prochain Pas
const NextStepPage: React.FC<{ data: ProfileData }> = ({ data }) => {
  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Partie IV · Plan d'Action" />
      
      <SectionTitle 
        number="4.3" 
        title="VOTRE PROCHAIN PAS" 
        color={colors.accent.purple}
      />

      {/* CTA Principal */}
      <View style={styles.ctaBox}>
        <Text style={styles.ctaIcon}>[!]</Text>
        <Text style={styles.ctaTitle}>L'ACTION QUI CHANGE TOUT</Text>
        <Text style={styles.ctaText}>
          Dans les 48h, réalisez cette action :
        </Text>
        <View style={styles.ctaAction}>
          <Text style={styles.ctaActionText}>
            Bloquez 2h dans votre agenda cette semaine pour :{'\n\n'}
            1. Remplir la checklist page 11{'\n'}
            2. Noter votre score environnement{'\n'}
            3. Identifier 1 ajustement possible{'\n\n'}
            Cette action ancre votre réflexion dans le réel et active votre passage à l'action.
          </Text>
        </View>
      </View>

      {/* Accompagnement */}
      <View style={styles.accompagnementBox}>
        <Text style={styles.accompagnementTitle}>
          ALLER PLUS LOIN : L'ACCOMPAGNEMENT HUMAIN
        </Text>
        <Text style={styles.accompagnementText}>
          Ce bilan vous a donné une cartographie claire.{'\n'}
          Mais une carte n'est pas le voyage.
        </Text>
        <Text style={[styles.accompagnementTitle, { marginTop: spacing.sm }]}>
          SESSION STRATEGIQUE PERSONNALISEE (1h)
        </Text>
        <Text style={styles.accompagnementText}>
          Avec un consultant PERSPECTA, vous :
        </Text>
        {[
          'Approfondissez votre profil (zones grises)',
          'Construisez votre roadmap 12 mois sur-mesure',
          'Levez les blocages invisibles',
          'Obtenez des intro réseau ciblées',
        ].map((feature, idx) => (
          <View key={idx} style={styles.accompagnementFeature}>
            <Text style={styles.accompagnementCheck}>*</Text>
            <Text style={styles.accompagnementFeatureText}>{feature}</Text>
          </View>
        ))}
        <View style={styles.priceBox}>
          <Text style={styles.priceText}>Prix : 120€</Text>
          <Text style={styles.promoCode}>(réduction -25% code BILAN49)</Text>
        </View>
        <Text style={[styles.resourceMeta, { marginTop: spacing.sm }]}>
          Reservation : perspecta.fr/accompagnement
        </Text>
      </View>

      {/* Contact */}
      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>RESTONS EN CONTACT</Text>
        <Text style={styles.contactText}>
          Questions sur votre bilan ? support@perspecta.fr (reponse sous 48h){'\n'}
          Partagez votre experience PERSPECTA : Trustpilot | Google Reviews
        </Text>
      </View>

      {/* Closing */}
      <View style={styles.closingBox}>
        <Text style={styles.closingText}>
          Merci de votre confiance.{'\n'}
          Bon voyage vers votre prochaine étape.
        </Text>
        <Text style={styles.closingEmoji}>***</Text>
        <Text style={styles.logo}>PERSPECTA</Text>
      </View>

      <PageFooter profileId={data.meta.id} />
    </Page>
  );
};

export const Part4Actions: React.FC<Part4ActionsProps> = ({ data }) => {
  return (
    <>
      <ActionsPage data={data} />
      <ResourcesPage data={data} />
      <NextStepPage data={data} />
    </>
  );
};

export default Part4Actions;
