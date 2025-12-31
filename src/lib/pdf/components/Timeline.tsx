/**
 * PERSPECTA PDF - Composant Timeline
 * Timeline du parcours professionnel
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { CareerExperience } from '../data/types';

interface TimelineProps {
  experiences: CareerExperience[];
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  yearColumn: {
    width: 60,
    alignItems: 'flex-end',
    paddingRight: spacing.md,
  },
  year: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.primary.blue,
  },
  lineColumn: {
    width: 20,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary.blue,
    marginTop: 2,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.neutral[200],
    marginTop: 2,
  },
  contentColumn: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingBottom: spacing.md,
  },
  role: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
    marginBottom: 2,
  },
  company: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    marginBottom: spacing.xs,
  },
  skillBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primary.lightBlue,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  skillIcon: {
    fontSize: fontSizes.sm,
    marginRight: spacing.xs,
  },
  skillContent: {
    flex: 1,
  },
  skillLabel: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xs,
    color: colors.primary.darkBlue,
    marginBottom: 2,
  },
  skillText: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[700],
  },
});

export const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const sortedExperiences = [...experiences].sort((a, b) => a.year - b.year);

  return (
    <View style={styles.container}>
      {sortedExperiences.map((exp, idx) => (
        <View key={idx} style={styles.item}>
          {/* Année */}
          <View style={styles.yearColumn}>
            <Text style={styles.year}>{exp.year}</Text>
          </View>

          {/* Ligne verticale */}
          <View style={styles.lineColumn}>
            <View style={styles.dot} />
            {idx < sortedExperiences.length - 1 && <View style={styles.line} />}
          </View>

          {/* Contenu */}
          <View style={styles.contentColumn}>
            <Text style={styles.role}>{exp.role}</Text>
            <Text style={styles.company}>{exp.company}</Text>

            {exp.cognitiveSkill && (
              <View style={styles.skillBox}>
                <Text style={styles.skillIcon}>[*]</Text>
                <View style={styles.skillContent}>
                  <Text style={styles.skillLabel}>Compétence mobilisée</Text>
                  <Text style={styles.skillText}>
                    {exp.cognitiveSkill}
                    {exp.description && ` (${exp.description})`}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Timeline;
