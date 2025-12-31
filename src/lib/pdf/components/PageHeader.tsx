/**
 * PERSPECTA PDF - Composant PageHeader
 * En-tête de page avec logo et titre de section
 */

import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts } from '../styles/tokens';

interface PageHeaderProps {
  section?: string;
  showLogo?: boolean;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  logo: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.primary.blue,
    letterSpacing: 1,
  },
  section: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.xs,
    color: colors.neutral[500],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export const PageHeader: React.FC<PageHeaderProps> = ({
  section,
  showLogo = true,
}) => {
  return (
    <View style={styles.container} fixed>
      {showLogo && <Text style={styles.logo}>PERSPECTA</Text>}
      {section && <Text style={styles.section}>{section}</Text>}
    </View>
  );
};

export default PageHeader;
