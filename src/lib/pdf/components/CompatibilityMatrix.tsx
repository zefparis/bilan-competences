/**
 * PERSPECTA PDF - Composant CompatibilityMatrix
 * Tableau de compatibilité métiers
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';
import { JobCompatibility } from '../data/types';

interface CompatibilityMatrixProps {
  jobs: JobCompatibility[];
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  cellHeader: {
    padding: spacing.sm,
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xs,
    color: colors.neutral[700],
    textTransform: 'uppercase',
  },
  cell: {
    padding: spacing.sm,
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
  },
  cellFamily: {
    width: '25%',
  },
  cellCompat: {
    width: '15%',
    alignItems: 'center',
  },
  cellWhy: {
    width: '35%',
  },
  cellVigilance: {
    width: '25%',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  icon: {
    fontSize: fontSizes.md,
    marginRight: spacing.xs,
  },
  familyText: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[800],
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

export const CompatibilityMatrix: React.FC<CompatibilityMatrixProps> = ({ jobs }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={[styles.cellHeader, styles.cellFamily]}>
            <Text>Famille métiers</Text>
          </View>
          <View style={[styles.cellHeader, styles.cellCompat]}>
            <Text>Compat.</Text>
          </View>
          <View style={[styles.cellHeader, styles.cellWhy]}>
            <Text>Pourquoi ça marche</Text>
          </View>
          <View style={[styles.cellHeader, styles.cellVigilance]}>
            <Text>Vigilance</Text>
          </View>
        </View>

        {/* Rows */}
        {jobs.map((job, idx) => (
          <View
            key={idx}
            style={[styles.row, idx === jobs.length - 1 ? styles.rowLast : {}]}
          >
            <View style={[styles.cell, styles.cellFamily]}>
              <Text style={styles.familyText}>
                {job.icon} {job.family}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellCompat]}>
              <Stars count={job.compatibility} />
            </View>
            <View style={[styles.cell, styles.cellWhy]}>
              <Text>{job.why}</Text>
            </View>
            <View style={[styles.cell, styles.cellVigilance]}>
              <Text style={{ color: colors.warning }}>{job.vigilance}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CompatibilityMatrix;
