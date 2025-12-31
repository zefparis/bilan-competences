/**
 * PERSPECTA PDF - Composant CheckList
 * Liste avec cases à cocher
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';

interface CheckListItem {
  text: string;
  detail?: string;
  checked?: boolean;
}

interface CheckListProps {
  items: CheckListItem[];
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    fontSize: 10,
    color: colors.background.page,
  },
  content: {
    flex: 1,
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    lineHeight: 1.5,
    color: colors.neutral[700],
  },
  detail: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    marginTop: 2,
  },
});

export const CheckList: React.FC<CheckListProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <View style={[styles.checkbox, item.checked ? styles.checkboxChecked : {}]}>
            {item.checked && <Text style={styles.checkmark}>x</Text>}
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{item.text}</Text>
            {item.detail && <Text style={styles.detail}>- {item.detail}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CheckList;
