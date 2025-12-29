import { CognitiveSignatureData, RIASECProfile } from "./premium-report-sections";
import {
  generateSignatureCentraleSection,
  generateLectureFonctionnelleSection,
  generateCarteTensionsSection,
  generateZonesVigilanceSection,
  generateProjectionIATransformationSection,
} from "./premium-report-sections";
import * as crypto from 'crypto';
import { generateGeneralReport, type GeneralReportInput } from "./general-report-sections";
import type { CompleteReportInput } from '@/types/report';
import { generateRIASECRadar, generateCognitiveBarChart } from './chart-generator';
import fs from 'fs';
import path from 'path';

/* =======================
   TYPES & INTERFACES
======================= */

/**
 * Interface unifiée pour les entrées du générateur de rapport
 */
export interface ReportGeneratorInput {
  cognitiveSignature: CognitiveSignatureData;
  riasecProfile?: RIASECProfile;
  userName?: string;
  age?: number;
  occupation?: string;
  experience?: string;
}

/**
 * Interface canonique du rapport complet PERSPECTA (11 sections)
 * PARTIE I - Synthèse Générale (7 sections)
 * PARTIE II - Analyse Cognitive Premium (4 sections)
 * PARTIE III - Transformation (1 section)
 * PARTIE IV - Conclusion (1 section)
 */
export interface CompleteReportSections {
  // PARTIE I - Synthèse Générale (7 sections)
  cadre: string;
  synthese: string;
  valeurs_professionnelles: string;      // NOUVEAU
  parcours_professionnel: string;        // NOUVEAU
  croisement_riasec: string;
  scenarios: string;
  environnements_compatibles: string;

  // PARTIE II - Analyse Cognitive Premium (4 sections)
  signature_centrale: string;
  lecture_fonctionnelle: string;
  tensions_cognitives: string;
  zones_vigilance: string;

  // PARTIE III - Transformation (1 section)
  projection_ia: string;

  // PARTIE IV - Conclusion (1 section)
  conclusion: string;

  // Graphiques SVG
  chartSvgs?: {
    riasec: string;
    cognitive: string;
  };
}

/**
 * Sections cognitives générées de manière déterministe
 * (anciennes sections "premium")
 */
interface CognitiveSections {
  signature_centrale: string;
  lecture_fonctionnelle: string;
  tensions_cognitives: string;
  zones_vigilance: string;
  projection_ia: string;
  conclusion: string;
}

/* =======================
   GÉNÉRATION SECTIONS COGNITIVES
======================= */

/**
 * Génère les 6 sections d'analyse cognitive détaillée
 * (logique déterministe basée sur les scores cognitifs)
 */
async function generateCognitiveSections(
  input: ReportGeneratorInput
): Promise<CognitiveSections> {
  const { cognitiveSignature, riasecProfile } = input;

  console.log("🤖 Génération des sections cognitives avec OpenAI...");

  // Générer les 4 sections Part II en parallèle
  const [
    signature_centrale,
    lecture_fonctionnelle,
    tensions_cognitives,
    zones_vigilance
  ] = await Promise.all([
    generateSignatureCentraleSection(cognitiveSignature),
    generateLectureFonctionnelleSection(cognitiveSignature),
    generateCarteTensionsSection(cognitiveSignature),
    generateZonesVigilanceSection(cognitiveSignature, riasecProfile)
  ]);

  const cognitiveSections = {
    signature_centrale,
    lecture_fonctionnelle,
    tensions_cognitives,
    zones_vigilance,
    projection_ia: generateProjectionIATransformationSection(cognitiveSignature),
    conclusion: generateConclusionSection(cognitiveSignature),
  };

  return cognitiveSections;
}

/**
 * Génère la conclusion stratégique du rapport
 */
function generateConclusionSection(sig: CognitiveSignatureData): string {
  const scores = [
    sig.processingSpeed,
    sig.inhibitoryControl,
    sig.cognitiveFlexibility,
    sig.accessFluency
  ].filter(Boolean);

  const scoresText = scores.length > 0 
    ? scores.map(s => `${s}%`).join(', ')
    : 'scores mesurés';

  return `Ce rapport décrit un fonctionnement cognitif spécifique à un instant donné, basé sur des indicateurs comportementaux mesurés (${scoresText}).

Il ne constitue ni un diagnostic, ni une prédiction, ni une évaluation normative. Il s'agit d'un outil de compréhension destiné à éclairer vos réflexions professionnelles dans un contexte de transformation du travail et d'évolution des environnements cognitifs.

Votre empreinte cognitive n'est pas figée. Elle évolue avec l'expérience, les contextes et les stratégies que vous mobilisez. Ce document propose une photographie actuelle de vos ressources cognitives, qui peut servir de point de départ pour une réflexion sur votre développement professionnel.

Les recommandations formulées dans ce rapport visent à identifier les environnements dans lesquels vos ressources cognitives peuvent s'exprimer de manière optimale, minimisant ainsi les coûts d'adaptation et favorisant l'épanouissement professionnel. Elles ne constituent pas des prescriptions rigides, mais plutôt des pistes de réflexion à considérer dans le cadre de votre parcours individuel.`;
}

/* =======================
   ASSEMBLAGE RAPPORT COMPLET
======================= */

/**
 * Fonction principale : génère le rapport complet PERSPECTA (11 sections)
 * 
 * Pipeline :
 * 1. Génère les sections générales via API OpenAI (async)
 * 2. Génère les sections cognitives (déterministe)
 * 3. Assemble les 11 sections dans l'ordre canonique
 * 
 * @param input - Données cognitives + RIASEC + métadonnées utilisateur
 * @returns Promise<CompleteReportSections> - Les 11 sections du rapport
 * @throws Error si génération échoue ou sections incomplètes
 */
export async function assembleCompleteReport(
  input: CompleteReportInput
): Promise<CompleteReportSections> {
  console.log("🚀 Démarrage génération rapport complet (13 sections)...");

  // Validation
  if (!input.cognitive || !input.riasec) {
    throw new Error("Données cognitives et RIASEC requises");
  }

  try {
    // Créer le dossier temporaire pour les graphiques
    const chartsDir = path.join(process.cwd(), 'public', 'temp-charts');
    if (!fs.existsSync(chartsDir)) {
      fs.mkdirSync(chartsDir, { recursive: true });
    }

    // Génération parallèle des sections et graphiques
    const [generalSections, cognitiveSections, riasecChartSvg, cognitiveChartSvg] = await Promise.all([
      generateGeneralReport({
        cognitive: input.cognitive,
        riasec: input.riasec,
        values: input.values,
        experiences: input.experiences,
        lifePath: input.lifePath,
        userName: input.user.name,
      }),
      generateCognitiveSections({ 
        cognitiveSignature: input.cognitive,
        riasecProfile: input.riasec
      }),
      generateRIASECRadar(input.riasec),
      generateCognitiveBarChart(input.cognitive)
    ]);

    console.log("📊 Graphiques SVG générés");

    // Assemblage final (13 sections + graphiques SVG)
    const completeReport: CompleteReportSections = {
      // PARTIE I - Synthèse Générale (7 sections)
      cadre: generalSections.cadre,
      synthese: generalSections.synthese,
      valeurs_professionnelles: generalSections.valeurs_professionnelles,
      parcours_professionnel: generalSections.parcours_professionnel,
      croisement_riasec: generalSections.croisement_riasec,
      scenarios: generalSections.scenarios,
      environnements_compatibles: generalSections.environnements_compatibles,

      // Partie II - Analyse Cognitive (4 sections)
      signature_centrale: cognitiveSections.signature_centrale,
      lecture_fonctionnelle: cognitiveSections.lecture_fonctionnelle,
      tensions_cognitives: cognitiveSections.tensions_cognitives,
      zones_vigilance: cognitiveSections.zones_vigilance,

      // Partie III - Transformation (1 section)
      projection_ia: cognitiveSections.projection_ia,

      // Partie IV - Conclusion (1 section)
      conclusion: cognitiveSections.conclusion,

      // Graphiques SVG
      chartSvgs: {
        riasec: riasecChartSvg,
        cognitive: cognitiveChartSvg
      }
    };

    // Validation
    validateReportSections(completeReport);

    console.log("✅ Rapport complet généré (13 sections)");
    return completeReport;

  } catch (error) {
    console.error("❌ Erreur assembleCompleteReport:", error);
    console.warn("⚠️ Utilisation du rapport de secours complet");
    return generateCompleteFallbackReport(input);
  }
}

/**
 * Génère un rapport de secours complet avec toutes les sections
 */
function generateCompleteFallbackReport(input: CompleteReportInput): CompleteReportSections {
  return {
    // Partie I - Synthèse Générale (7 sections)
    cadre: `Ce bilan cognitif professionnel PERSPECTA vise à éclairer votre réflexion professionnelle en croisant votre fonctionnement cognitif avec vos intérêts professionnels selon le modèle RIASEC.

L'analyse repose sur une mesure de vos fonctions exécutives (contrôle inhibiteur, vitesse de traitement, flexibilité cognitive, fluidité d'accès) et de vos préférences d'activité professionnelle.

Cette approche permet d'identifier les environnements dans lesquels vos ressources cognitives pourront s'exprimer pleinement, sans coût d'adaptation excessif.`,

    synthese: `Votre profil cognitif présente des caractéristiques spécifiques qui orientent vers certains types d'environnements professionnels.

Les dimensions mesurées (contrôle inhibiteur à ${input.cognitive.inhibitoryControl}%, vitesse de traitement à ${input.cognitive.processingSpeed}%, flexibilité cognitive à ${input.cognitive.cognitiveFlexibility}%) dessinent un fonctionnement cognitif qui trouve sa cohérence dans le croisement avec vos intérêts professionnels.

Votre profil RIASEC révèle des préférences marquées qui, articulées avec votre architecture cognitive, suggèrent des voies d'orientation à explorer.`,

    valeurs_professionnelles: `Vos valeurs professionnelles constituent un pilier essentiel de votre épanouissement au travail.

L'analyse de vos valeurs prioritaires révèle les moteurs profonds qui animent votre engagement professionnel et guident vos choix de carrière.

L'alignement entre vos valeurs fondamentales et votre environnement de travail constitue un facteur déterminant de votre satisfaction et de votre performance professionnelle.`,

    parcours_professionnel: `Votre parcours professionnel dessine une trajectoire cohérente marquée par des expériences significatives et des apprentissages continus.

L'analyse de vos expériences passées met en évidence des compétences transférables et des patterns de réussite qui peuvent être valorisés dans votre évolution professionnelle.

Les leçons tirées de votre parcours constituent un atout précis pour orienter vos prochains choix stratégiques.`,

    croisement_riasec: `L'articulation entre votre fonctionnement cognitif et vos intérêts professionnels révèle des synergies potentielles.

Les dimensions cognitives les plus développées soutiennent vos préférences d'activité dominantes, créant des conditions favorables pour certains types d'environnements professionnels.

Il existe également des zones de tension potentielle à anticiper, où l'écart entre ressources cognitives et exigences professionnelles pourrait nécessiter des stratégies d'adaptation spécifiques.`,

    scenarios: `Plusieurs trajectoires professionnelles s'offrent à vous en fonction de votre profil.

Un premier scénario de continuité permettrait d'optimiser vos ressources actuelles dans des environnements alignés avec vos forces cognitives.

Un second scénario de pivot stratégique mobiliserait vos compétences transférables vers de nouveaux horizons nécessitant une adaptation progressive.

Un troisième scénario de rupture innovante explorerait des chemins moins conventionnels, croisant plusieurs dimensions de votre profil de manière originale.`,

    environnements_compatibles: `Les environnements professionnels compatibles avec votre profil présentent certaines caractéristiques structurelles.

En termes de culture organisationnelle, certains types d'organisations correspondent mieux à votre fonctionnement cognitif et à vos préférences d'activité.

Le rythme de travail, les modalités de collaboration et le rapport à l'innovation constituent des paramètres importants à considérer dans votre recherche d'alignement professionnel.

Des environnements spécifiques (startups, grands groupes, PME, secteur public) présentent des avantages et contraintes différenciés selon votre profil.`,

    // Partie II - Analyse Cognitive (4 sections)
    signature_centrale: `Votre fonctionnement cognitif s'organise principalement autour de ${input.cognitive.inhibitoryControl > input.cognitive.processingSpeed ? 'contrôle inhibiteur' : 'vitesse de traitement'}.

Cette dimension dominante influence votre manière de traiter l'information et de prendre des décisions dans les contextes professionnels.

Elle facilite certains types de tâches tout en pouvant complexifier d'autres situations, créant ainsi un profil cognitif unique.`,

    lecture_fonctionnelle: `Votre fonctionnement cognitif se caractérise par ${input.cognitive.processingSpeed >= 60 ? 'un rythme rapide et synthétique' : 'un rythme plus analytique et approfondi'}.

Face à la complexité, vous mobilisez ${input.cognitive.cognitiveFlexibility >= 60 ? 'une capacité à naviguer entre plusieurs perspectives' : 'une préférence pour des structures progressives et stables'}.

Votre mode de décision repose sur ${input.cognitive.inhibitoryControl >= 60 ? 'un processus décisionnel structuré et cohérent' : 'un processus décisionnel contextuel et adaptatif'}.`,

    tensions_cognitives: `Votre profil cognitif présente un équilibre général entre ses différentes dimensions.

Les scores mesurés (contrôle inhibiteur: ${input.cognitive.inhibitoryControl}%, vitesse: ${input.cognitive.processingSpeed}%, flexibilité: ${input.cognitive.cognitiveFlexibility}%) indiquent une cohérence globale.

Dans certains contextes très exigeants, des stratégies d'adaptation peuvent être nécessaires pour maintenir les performances.`,

    zones_vigilance: `Les contextes professionnels très éloignés de vos habitudes cognitives peuvent nécessiter une adaptation consciente.

Les environnements avec des rythmes très différents de votre fonctionnement naturel demandent une attention particulière.

Votre profil équilibré vous permet généralement de vous adapter, mais certains contextes extrêmes peuvent solliciter davantage vos ressources cognitives.`,

    // Partie III - Transformation (1 section)
    projection_ia: `L'intelligence artificielle transforme les environnements de travail en automatisant les tâches répétitives et standardisées.

Votre profil cognitif (${input.cognitive.processingSpeed >= 60 ? 'avec une bonne vitesse de traitement' : 'avec une approche réfléchie'}) vous positionne favorablement pour interagir avec ces nouvelles technologies.

Votre valeur ajoutée réside dans ${input.cognitive.cognitiveFlexibility >= 60 ? 'votre adaptabilité et créativité' : 'votre rigueur et fiabilité'}, qui complètent parfaitement les capacités algorithmiques.`,

    // Partie IV - Conclusion (1 section)
    conclusion: `Ce rapport décrit un fonctionnement cognitif spécifique basé sur des indicateurs comportementaux mesurés (${input.cognitive.inhibitoryControl}%, ${input.cognitive.processingSpeed}%, ${input.cognitive.cognitiveFlexibility}%, ${input.cognitive.accessFluency}%).

Il ne constitue ni un diagnostic, ni une prédiction, ni une évaluation normative. Il s'agit d'un outil de compréhension destiné à éclairer vos réflexions professionnelles.

Votre empreinte cognitive évolue avec l'expérience. Ce document propose une photographie actuelle qui peut servir de point de départ pour votre développement professionnel.

Les recommandations formulées visent à identifier les environnements où vos ressources cognitives s'expriment de manière optimale, favorisant ainsi votre épanouissement professionnel.`
  };
}

/* =======================
   UTILITAIRES
======================= */

/**
 * Valide que toutes les sections du rapport sont présentes et non vides
 */
function validateReportSections(report: CompleteReportSections): void {
  const requiredSections: (keyof CompleteReportSections)[] = [
    "cadre",
    "synthese",
    "valeurs_professionnelles",
    "parcours_professionnel",
    "croisement_riasec",
    "scenarios",
    "environnements_compatibles",
    "signature_centrale",
    "lecture_fonctionnelle",
    "tensions_cognitives",
    "zones_vigilance",
    "projection_ia",
    "conclusion",
  ];

  const missingOrEmpty = requiredSections.filter((key) => {
    // Skip chartSvgs as it's an object, not a string
    if (key === 'chartSvgs') return false;

    const content = report[key];
    return !content || (typeof content === 'string' && content.trim().length < 50);
  });

  if (missingOrEmpty.length > 0) {
    throw new Error(
      `⚠️ Sections incomplètes détectées: ${missingOrEmpty.join(", ")}\n` +
      `Le rapport ne peut pas être généré avec des sections vides.`
    );
  }
}

/**
 * Retourne un profil RIASEC par défaut (équilibré)
 */
function getDefaultRIASECProfile(): RIASECProfile {
  return {
    realistic: 50,
    investigative: 50,
    artistic: 50,
    social: 50,
    enterprising: 50,
    conventional: 50,
  };
}

/**
 * Génère un hash unique pour le rapport
 */
export function generateReportHash(input: ReportGeneratorInput): string {
  const data = JSON.stringify({
    cognitive: input.cognitiveSignature,
    riasec: input.riasecProfile,
    timestamp: Date.now(),
  });
  
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
    .slice(0, 16)
    .toUpperCase();
}

/* =======================
   LEGACY - COMPATIBILITÉ
======================= */

/**
 * @deprecated Utiliser assembleCompleteReport() à la place
 * Conservé temporairement pour compatibilité descendante
 */
export async function generateReportSections(
  input: ReportGeneratorInput
): Promise<CognitiveSections> {
  console.warn(
    "⚠️ generateReportSections() est déprécié. " +
    "Utilisez assembleCompleteReport() pour obtenir le rapport complet."
  );

  return await generateCognitiveSections(input);
}

/**
 * @deprecated Interface legacy - utiliser CompleteReportSections
 */
export interface GeneratedReportSections extends CognitiveSections {
  title: string;
}