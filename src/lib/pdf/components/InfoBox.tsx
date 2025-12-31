/**
 * PERSPECTA PDF - Composant InfoBox
 * Encadrés colorés pour informations importantes
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/tokens';

type InfoBoxVariant = 'info' | 'success' | 'warning' | 'danger' | 'highlight' | 'quote';

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  icon?: string;
  title?: string;
  children: React.ReactNode;
}

const variantStyles: Record<InfoBoxVariant, { bg: string; border: string; titleColor: string }> = {
  info: {
    bg: colors.background.info,
    border: colors.primary.blue,
    titleColor: colors.primary.darkBlue,
  },
  success: {
    bg: colors.background.success,
    border: colors.success,
    titleColor: colors.success,
  },
  warning: {
    bg: colors.background.warning,
    border: colors.warning,
    titleColor: colors.warning,
  },
  danger: {
    bg: colors.background.danger,
    border: colors.danger,
    titleColor: colors.danger,
  },
  highlight: {
    bg: colors.primary.lightBlue,
    border: colors.primary.blue,
    titleColor: colors.primary.darkBlue,
  },
  quote: {
    bg: colors.neutral[50],
    border: colors.neutral[400],
    titleColor: colors.neutral[700],
  },
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: fontSizes.lg,
    marginRight: spacing.sm,
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.md,
  },
  content: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.base,
    lineHeight: 1.6,
    color: colors.neutral[700],
  },
});

export const InfoBox: React.FC<InfoBoxProps> = ({
  variant = 'info',
  icon,
  title,
  children,
}) => {
  const variantStyle = variantStyles[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyle.bg,
          borderLeftColor: variantStyle.border,
        },
      ]}
    >
      {(icon || title) && (
        <View style={styles.header}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          {title && (
            <Text style={[styles.title, { color: variantStyle.titleColor }]}>
              {title}
            </Text>
          )}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default InfoBox;
