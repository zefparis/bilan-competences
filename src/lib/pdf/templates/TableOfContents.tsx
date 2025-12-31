/**
 * PERSPECTA PDF - Table des Matières
 * Page 2 : Sommaire interactif avec temps de lecture
 */

import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';

interface TOCItem {
  number: string;
  title: string;
  page: number;
}

interface TOCSection {
  part: string;
  title: string;
  color: string;
  icon: string;
  readTime: string;
  items: TOCItem[];
}

const tocData: TOCSection[] = [
  {
    part: 'I',
    title: 'Votre Profil',
    color: colors.primary.blue,
    icon: '',
    readTime: '~8 min',
    items: [
      { number: '1.1', title: 'Votre signature cognitive', page: 3 },
      { number: '1.2', title: 'Ce que cela signifie', page: 4 },
      { number: '1.3', title: 'Vos valeurs professionnelles', page: 5 },
      { number: '1.4', title: 'Votre profil RIASEC', page: 6 },
    ],
  },
  {
    part: 'II',
    title: 'Lecture Approfondie',
    color: colors.success,
    icon: '',
    readTime: '~12 min',
    items: [
      { number: '2.1', title: 'Cognition × Métiers', page: 7 },
      { number: '2.2', title: 'Votre parcours à la loupe', page: 8 },
      { number: '2.3', title: 'Zones de vigilance', page: 9 },
    ],
  },
  {
    part: 'III',
    title: 'Projections',
    color: colors.warning,
    icon: '',
    readTime: '~10 min',
    items: [
      { number: '3.1', title: 'Trois scénarios d\'évolution', page: 10 },
      { number: '3.2', title: 'Environnements compatibles', page: 11 },
    ],
  },
  {
    part: 'IV',
    title: 'Plan d\'Action',
    color: colors.accent.purple,
    icon: '',
    readTime: '~5 min',
    items: [
      { number: '4.1', title: 'Actions prioritaires', page: 12 },
      { number: '4.2', title: 'Ressources recommandées', page: 13 },
      { number: '4.3', title: 'Votre prochain pas', page: 14 },
    ],
  },
];

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
    fontSize: fontSizes['3xl'],
    color: colors.neutral[900],
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 2,
  },
  partBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  partText: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.background.page,
  },
  icon: {
    fontSize: fontSizes.lg,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.lg,
  },
  readTime: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  },
  itemsContainer: {
    paddingLeft: spacing.xl,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  itemNumber: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    width: 30,
  },
  itemTitle: {
    flex: 1,
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    color: colors.neutral[700],
  },
  itemDots: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: colors.neutral[300],
    marginHorizontal: spacing.sm,
    marginBottom: 4,
  },
  itemPage: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    width: 30,
    textAlign: 'right',
  },
  intro: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.primary.lightBlue,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.blue,
  },
  introText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
    lineHeight: 1.6,
  },
  introHighlight: {
    fontFamily: fonts.primaryBold,
    color: colors.primary.darkBlue,
  },
});

interface TableOfContentsProps {
  profileId?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ profileId }) => {
  return (
    <Page size="A4" style={styles.page}>
      <PageHeader section="Sommaire" />

      <Text style={styles.title}>SOMMAIRE</Text>

      {tocData.map((section, idx) => (
        <View key={idx} style={styles.section}>
          {/* En-tête de section */}
          <View style={[styles.sectionHeader, { borderBottomColor: section.color }]}>
            <View style={[styles.partBadge, { backgroundColor: section.color }]}>
              <Text style={styles.partText}>PARTIE {section.part}</Text>
            </View>
            <Text style={[styles.sectionTitle, { color: section.color }]}>
              {section.title}
            </Text>
            <Text style={styles.readTime}>{section.readTime}</Text>
          </View>

          {/* Items */}
          <View style={styles.itemsContainer}>
            {section.items.map((item, itemIdx) => (
              <View key={itemIdx} style={styles.item}>
                <Text style={styles.itemNumber}>{item.number}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemDots} />
                <Text style={styles.itemPage}>p. {item.page}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Introduction */}
      <View style={styles.intro}>
        <Text style={styles.introText}>
          <Text style={styles.introHighlight}>Temps de lecture total : ~35 minutes</Text>
          {'\n\n'}
          Ce bilan est conçu pour être lu en plusieurs fois. Nous vous recommandons 
          de commencer par la Partie I pour découvrir votre profil, puis de revenir 
          sur les autres sections selon vos besoins.
        </Text>
      </View>

      <PageFooter profileId={profileId} />
    </Page>
  );
};

export default TableOfContents;
