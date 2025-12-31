/**
 * PERSPECTA PDF - Composant ScoreGauge
 * Jauge visuelle pour afficher les scores cognitifs
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, borderRadius, fontSizes, fonts } from '../styles/tokens';

interface ScoreGaugeProps {
  score: number;
  label: string;
  sublabel?: string;
  color?: string;
  showPercentage?: boolean;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
  },
  label: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
    color: colors.neutral[800],
  },
  sublabel: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    fontStyle: 'italic',
  },
  score: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.lg,
    color: colors.primary.blue,
  },
  barContainer: {
    height: 12,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.md,
  },
});

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label,
  sublabel,
  color = colors.primary.blue,
  showPercentage = true,
}) => {
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>{label}</Text>
          {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}
        </View>
        {showPercentage && (
          <Text style={[styles.score, { color }]}>{clampedScore.toFixed(1)}%</Text>
        )}
      </View>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${clampedScore}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ScoreGauge;
