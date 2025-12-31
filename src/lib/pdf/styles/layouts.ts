/**
 * PERSPECTA PDF Design System - Layouts
 * Grilles et mises en page
 */

import { StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, borderRadius } from './tokens';

export const layouts = StyleSheet.create({
  // Page de base
  page: {
    flexDirection: 'column',
    backgroundColor: colors.background.page,
    paddingTop: spacing.pageMargin.top,
    paddingBottom: spacing.pageMargin.bottom,
    paddingLeft: spacing.pageMargin.left,
    paddingRight: spacing.pageMargin.right,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.6,
    color: colors.neutral[700],
  },

  // Page de couverture
  coverPage: {
    flexDirection: 'column',
    backgroundColor: colors.background.cover,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Conteneur principal
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  // Grille 2 colonnes
  row: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },

  col2: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },

  col3: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },

  // Sections
  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.blue,
  },

  // Encadrés
  box: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral[50],
  },

  boxHighlight: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.lightBlue,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.blue,
  },

  boxSuccess: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.success,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },

  boxWarning: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.warning,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },

  boxDanger: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.danger,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },

  // Carte
  card: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.page,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: spacing.pageMargin.left,
    right: spacing.pageMargin.right,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },

  // Header
  header: {
    position: 'absolute',
    top: 20,
    left: spacing.pageMargin.left,
    right: spacing.pageMargin.right,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Liste
  list: {
    marginLeft: spacing.md,
    marginBottom: spacing.md,
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },

  listBullet: {
    width: 16,
    fontSize: 11,
    color: colors.primary.blue,
  },

  listContent: {
    flex: 1,
  },

  // Tableau
  table: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },

  tableCell: {
    flex: 1,
    padding: spacing.sm,
    fontSize: 10,
  },

  tableCellHeader: {
    flex: 1,
    padding: spacing.sm,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.neutral[700],
  },

  // Séparateur
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.md,
  },

  dividerThick: {
    height: 2,
    backgroundColor: colors.primary.blue,
    marginVertical: spacing.lg,
  },

  // Espacements
  spacerSm: { height: spacing.sm },
  spacerMd: { height: spacing.md },
  spacerLg: { height: spacing.lg },
  spacerXl: { height: spacing.xl },
});
