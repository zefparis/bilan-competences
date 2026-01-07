/**
 * PERSPECTA PDF - Composant PageFooter
 * Pied de page avec numéro de page et copyright
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts } from '../styles/tokens';

interface PageFooterProps {
  profileId?: string;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  left: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  },
  center: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  },
  right: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  },
});

export const PageFooter: React.FC<PageFooterProps> = ({ profileId }) => {
  return (
    <View style={styles.container} fixed>
      <Text style={styles.left}>© 2025 PERSPECTA-COMPETENCES by ia-solution</Text>
      {profileId && <Text style={styles.center}>Réf. {profileId}</Text>}
      <Text
        style={styles.right}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
};

export default PageFooter;
