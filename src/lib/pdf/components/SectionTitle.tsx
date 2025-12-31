/**
 * PERSPECTA PDF - Composant SectionTitle
 * Titre de section avec numérotation et icône
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';

interface SectionTitleProps {
  number?: string;
  title: string;
  icon?: string;
  color?: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
  },
  numberBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  number: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.background.page,
  },
  icon: {
    fontSize: fontSizes.xl,
    marginRight: spacing.sm,
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.xl,
    flex: 1,
  },
});

export const SectionTitle: React.FC<SectionTitleProps> = ({
  number,
  title,
  icon,
  color = colors.primary.blue,
}) => {
  return (
    <View style={[styles.container, { borderBottomColor: color }]}>
      {number && (
        <View style={[styles.numberBadge, { backgroundColor: color }]}>
          <Text style={styles.number}>{number}</Text>
        </View>
      )}
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.title, { color }]}>{title}</Text>
    </View>
  );
};

export default SectionTitle;
