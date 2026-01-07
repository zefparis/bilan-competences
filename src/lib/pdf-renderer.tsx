import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { CompleteReportSections } from "./report-generator";

/* =======================
   TYPOGRAPHY
======================= */
// Optionnel : charger des polices custom
// Font.register({
//   family: 'Inter',
//   fonts: [
//     { src: '/fonts/Inter-Regular.ttf' },
//     { src: '/fonts/Inter-Medium.ttf', fontWeight: 500 },
//     { src: '/fonts/Inter-SemiBold.ttf', fontWeight: 600 },
//   ],
// });

/* =======================
   DESIGN TOKENS
======================= */
const colors = {
  // Primary palette
  primary: "#0B1F3A",
  primaryLight: "#1E3A5F",
  accent: "#3B82F6",
  
  // Neutral scale
  slate950: "#020617",
  slate900: "#0F172A",
  slate800: "#1E293B",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748B",
  slate400: "#94A3B8",
  slate300: "#CBD5E1",
  slate200: "#E2E8F0",
  slate100: "#F1F5F9",
  slate50: "#F8FAFC",
  
  // Semantic
  background: "#FFFFFF",
  surface: "#F8FAFC",
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  /* ========== COVER PAGE ========== */
  coverPage: {
    padding: spacing.xxxl * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  coverBrand: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.accent,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: spacing.xl,
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: colors.slate900,
    marginBottom: spacing.md,
    letterSpacing: -0.5,
    lineHeight: 1.2,
  },
  coverSubtitle: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.slate600,
    marginBottom: spacing.xxxl,
  },
  coverDivider: {
    width: 60,
    height: 3,
    backgroundColor: colors.accent,
    marginBottom: spacing.xxxl,
  },
  coverMetaBlock: {
    marginTop: spacing.xxxl,
    padding: spacing.xl,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderLeft: `3px solid ${colors.accent}`,
  },
  coverMeta: {
    fontSize: 11,
    color: colors.slate600,
    marginBottom: spacing.sm,
    lineHeight: 1.5,
  },
  coverHash: {
    fontSize: 9,
    color: colors.slate500,
    fontFamily: "Courier",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.slate200}`,
  },

  /* ========== CONTENT PAGES ========== */
  page: {
    paddingTop: 70,
    paddingBottom: 100,
    paddingHorizontal: 70,
    backgroundColor: colors.background,
    fontFamily: "Helvetica",
  },

  /* ========== PART HEADERS ========== */
  partHeader: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  partLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.accent,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  partTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.slate900,
    marginBottom: spacing.md,
    letterSpacing: -0.3,
  },
  partSpacing: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  partDivider: {
    height: 2,
    backgroundColor: colors.accent,
    width: 50,
  },

  /* ========== SECTIONS ========== */
  section: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottom: `1px solid ${colors.slate200}`,
  },
  sectionNumber: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.accent,
    marginRight: spacing.md,
    minWidth: 30,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.slate900,
    flex: 1,
    letterSpacing: -0.2,
  },

  /* ========== CONTENT ========== */
  paragraph: {
    fontSize: 10.5,
    lineHeight: 1.7,
    marginBottom: spacing.md,
    color: colors.slate800,
    textAlign: "justify",
  },
  paragraphFirst: {
    fontSize: 10.5,
    lineHeight: 1.7,
    marginBottom: spacing.md,
    color: colors.slate800,
    textAlign: "justify",
  },
  paragraphLast: {
    fontSize: 10.5,
    lineHeight: 1.7,
    marginBottom: 0,
    color: colors.slate800,
    textAlign: "justify",
  },

  /* ========== EMPHASIS ========== */
  highlight: {
    backgroundColor: colors.slate100,
    padding: spacing.md,
    borderRadius: 4,
    borderLeft: `3px solid ${colors.accent}`,
    marginVertical: spacing.md,
  },

  /* ========== SEPARATORS ========== */
  sectionDivider: {
    height: 1,
    backgroundColor: colors.slate200,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  lightDivider: {
    height: 1,
    backgroundColor: colors.slate100,
    marginVertical: spacing.md,
  },

  /* ========== FOOTER ========== */
  footer: {
    position: "absolute",
    bottom: 35,
    left: 70,
    right: 70,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.slate200}`,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBrand: {
    fontSize: 8,
    fontWeight: 600,
    color: colors.accent,
    letterSpacing: 1,
  },
  footerText: {
    fontSize: 7.5,
    color: colors.slate500,
    marginTop: 3,
  },
  pageNumber: {
    fontSize: 8,
    color: colors.slate500,
    fontWeight: 500,
  },
});

/* =======================
   HELPERS
======================= */
function renderParagraphs(text: string) {
  const paragraphs = text
    .split("\n\n")
    .map(p => p.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => {
    const isFirst = index === 0;
    const isLast = index === paragraphs.length - 1;

    const style = isFirst
      ? styles.paragraphFirst
      : isLast
        ? styles.paragraphLast
        : styles.paragraph;

    return (
      <Text key={index} style={style}>
        {paragraph}
      </Text>
    );
  });
}

/* =======================
   PDF DOCUMENT
======================= */
export function PdfDocument({
  sections,
  userName,
  date,
  cognitiveHash,
  chartSvgs,
}: {
  sections: CompleteReportSections;
  userName?: string;
  date?: string;
  cognitiveHash?: string;
  chartSvgs?: {
    riasec: string;
    cognitive: string;
  };
}) {
  const parts = [
    {
      key: "part-1",
      label: "PARTIE I",
      title: "Synthèse Générale",
      blocks: [
        { title: "Cadre stratégique", content: sections.cadre },
        { title: "Synthèse générale", content: sections.synthese },
        { title: "Valeurs professionnelles", content: sections.valeurs_professionnelles },
        { title: "Parcours professionnel", content: sections.parcours_professionnel },
        { title: "Croisement Cognition × RIASEC", content: sections.croisement_riasec },
        { title: "Scénarios professionnels", content: sections.scenarios },
        { title: "Environnements compatibles", content: sections.environnements_compatibles },
      ],
    },
    {
      key: "part-2",
      label: "PARTIE II",
      title: "Analyse Cognitive Premium",
      blocks: [
        { title: "Signature cognitive centrale", content: sections.signature_centrale },
        { title: "Lecture fonctionnelle du traitement de l'information", content: sections.lecture_fonctionnelle },
        { title: "Carte des tensions cognitives", content: sections.tensions_cognitives },
        { title: "Zones de vigilance cognitive", content: sections.zones_vigilance },
      ],
    },
    {
      key: "part-3",
      label: "PARTIE III",
      title: "Transformation & Projections",
      blocks: [
        { title: "Empreinte cognitive et transformation du travail", content: sections.projection_ia },
      ],
    },
    {
      key: "part-4",
      label: "PARTIE IV",
      title: "Conclusion",
      blocks: [
        { title: "Conclusion stratégique", content: sections.conclusion },
      ],
    },
  ];

  return (
    <Document
      title="Bilan Cognitif Professionnel PERSPECTA-COMPETENCES"
      author="PERSPECTA-COMPETENCES by IA-SOLUTION"
      subject="Analyse cognitive professionnelle individuelle"
      keywords="cognition, bilan professionnel, RIASEC, orientation"
    >
      {/* ================= COVER PAGE ================= */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverBrand}>PERSPECTA-COMPETENCES</Text>

        <Text style={styles.coverTitle}>
          Bilan Cognitif{"\n"}Professionnel
        </Text>

        <Text style={styles.coverSubtitle}>
          Empreinte Cognitive Individuelle
        </Text>

        <View style={styles.coverDivider} />

        {(userName || date || cognitiveHash) && (
          <View style={styles.coverMetaBlock}>
            {userName && (
              <Text style={styles.coverMeta}>
                Analyse personnalisée pour <Text style={{ fontWeight: 600 }}>{userName}</Text>
              </Text>
            )}
            {date && (
              <Text style={styles.coverMeta}>
                Document généré le {date}
              </Text>
            )}
            {cognitiveHash && (
              <Text style={styles.coverHash}>
                Réf. cognitive : {cognitiveHash}
              </Text>
            )}
          </View>
        )}
      </Page>

      {/* ================= VISUALIZATION PAGE ================= */}
      {chartSvgs && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.partTitle}>Synthèse Visuelle</Text>

          {/* RIASEC Radar Chart */}
          <View style={{ marginBottom: spacing.xxxl }}>
            <Text style={styles.sectionTitle}>Profil RIASEC - Préférences Professionnelles</Text>
            {chartSvgs.riasec && (
              <Image
                src={chartSvgs.riasec}
                style={{
                  width: 400,
                  height: 300,
                  marginTop: spacing.lg,
                  alignSelf: 'center'
                }}
              />
            )}
            <Text style={[styles.paragraph, { fontSize: 9, color: colors.slate600, textAlign: 'center', marginTop: spacing.sm }]}>
              Radar montrant vos préférences selon les 6 types RIASEC (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel)
            </Text>
          </View>

          {/* Cognitive Bar Chart */}
          <View style={{ marginTop: spacing.xxxl }}>
            <Text style={styles.sectionTitle}>Dimensions Cognitives - Fonctions Exécutives</Text>
            {chartSvgs.cognitive && (
              <Image
                src={chartSvgs.cognitive}
                style={{
                  width: 400,
                  height: 250,
                  marginTop: spacing.lg,
                  alignSelf: 'center'
                }}
              />
            )}
            <Text style={[styles.paragraph, { fontSize: 9, color: colors.slate600, textAlign: 'center', marginTop: spacing.sm }]}>
              Barres horizontales représentant vos scores dans les 4 dimensions cognitives (Contrôle inhibiteur, Vitesse traitement, Flexibilité, Fluidité d'accès)
            </Text>
          </View>
        </Page>
      )}

      {/* ================= CONTENT PAGES - Unlimited natural flow ================= */}
      <Page size="A4" style={styles.page}>
        {parts.map((part, partIdx) => (
          <View key={part.key}>
            {/* Part Header */}
            <View style={styles.partHeader}>
              <Text style={styles.partLabel}>{part.label}</Text>
              <Text style={styles.partTitle}>{part.title}</Text>
              <View style={styles.partDivider} />
            </View>

            {/* Sections - Allow unlimited natural pagination */}
            {part.blocks.map((block, blockIdx) => {
              const content = block.content?.trim();
              if (!content) return null;

              return (
                <View key={`${part.key}-${blockIdx}`} style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionNumber}>
                      {partIdx + 1}.{blockIdx + 1}
                    </Text>
                    <Text style={styles.sectionTitle}>{block.title}</Text>
                  </View>

                  {/* Content - Flows naturally across unlimited pages */}
                  {renderParagraphs(content)}

                  {blockIdx < part.blocks.length - 1 && (
                    <View style={styles.sectionDivider} />
                  )}
                </View>
              );
            })}
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View style={styles.footerContent}>
            <View>
              <Text style={styles.footerBrand}>PERSPECTA-COMPETENCES</Text>
              <Text style={styles.footerText}>
                Document personnel et confidentiel
              </Text>
            </View>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}
