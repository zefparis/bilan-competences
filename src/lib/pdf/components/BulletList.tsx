/**
 * PERSPECTA PDF - Composant BulletList
 * Liste à puces stylisée
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts } from '../styles/tokens';

interface BulletListProps {
  items: string[];
  bulletColor?: string;
  bulletChar?: string;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  bullet: {
    width: 16,
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
  },
  text: {
    flex: 1,
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    lineHeight: 1.6,
    color: colors.neutral[700],
  },
});

export const BulletList: React.FC<BulletListProps> = ({
  items,
  bulletColor = colors.primary.blue,
  bulletChar = '•',
}) => {
  return (
    <View style={styles.container}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <Text style={[styles.bullet, { color: bulletColor }]}>{bulletChar}</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default BulletList;
