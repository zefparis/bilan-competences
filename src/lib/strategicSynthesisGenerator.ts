/**
 * Strategic Synthesis Generator
 * 
 * Produces a comprehensive strategic analysis by cross-referencing:
 * - Cognitive profile (FORM/COLOR/VOLUME/SOUND)
 * - Cognitive insights (strengths, friction zones, styles)
 * - RIASEC dominant type
 * - Core values
 * 
 * Output is professional-grade, suitable for premium assessment reports.
 */

import type { CognitiveProfile } from "./cognitiveProfileEngine"
import type { CognitiveInsights } from "./cognitiveInsightsEngine"

// ============================================================================
// Types
// ============================================================================

export type RIASECType = "R" | "I" | "A" | "S" | "E" | "C"

export interface StrategicSynthesisInput {
  cognitiveProfile: {
    primaryProfile: CognitiveProfile
    secondaryProfile?: CognitiveProfile
    confidenceLevel: "low" | "medium" | "high"
  }
  insights: CognitiveInsights
  riasecDominant: RIASECType
  riasecSecondary?: RIASECType
  coreValues: string[] // Top 3-5 values
}

export interface StrategicSynthesis {
  strategicConclusion: string
  idealEnvironment: string
  vigilancePoints: string[]
  growthLevers: string[]
}

// ============================================================================
// Knowledge Base: Cross-Analysis Patterns
// ============================================================================

/** RIASEC type descriptions for synthesis */
const RIASEC_DESCRIPTORS: Record<RIASECType, {
  label: string
  orientation: string
  environments: string[]
}> = {
  R: {
    label: "Réaliste",
    orientation: "vers l'action concrète et les résultats tangibles",
    environments: ["ateliers techniques", "environnements de production", "terrains d'intervention"],
  },
  I: {
    label: "Investigateur",
    orientation: "vers la recherche, l'analyse et la compréhension approfondie",
    environments: ["laboratoires", "centres de recherche", "environnements d'expertise"],
  },
  A: {
    label: "Artistique",
    orientation: "vers la création, l'expression et l'innovation",
    environments: ["studios créatifs", "agences", "environnements culturels"],
  },
  S: {
    label: "Social",
    orientation: "vers l'accompagnement, la transmission et le développement humain",
    environments: ["structures d'accompagnement", "organisations à impact", "environnements collaboratifs"],
  },
  E: {
    label: "Entreprenant",
    orientation: "vers le leadership, l'influence et le développement d'activités",
    environments: ["directions opérationnelles", "start-ups", "environnements compétitifs"],
  },
  C: {
    label: "Conventionnel",
    orientation: "vers l'organisation, la fiabilité et l'excellence opérationnelle",
    environments: ["services structurés", "fonctions support", "environnements réglementés"],
  },
}

/** Cognitive-RIASEC synergy patterns */
const COGNITIVE_RIASEC_SYNERGIES: Record<CognitiveProfile, Record<RIASECType, string>> = {
  FORM: {
    R: "Votre rigueur analytique combinée à votre orientation pratique vous positionne idéalement pour des rôles d'ingénierie ou de gestion technique où la précision est valorisée.",
    I: "L'alliance de votre pensée structurée et de votre curiosité intellectuelle fait de vous un profil naturel pour la recherche appliquée ou l'expertise métier.",
    A: "Votre capacité à structurer s'enrichit d'une sensibilité créative, vous permettant d'exceller dans des domaines comme le design technique ou l'architecture.",
    S: "Votre approche méthodique au service des autres vous oriente vers des fonctions de conseil, de formation ou d'accompagnement structuré.",
    E: "Votre sens de l'organisation combiné à votre ambition vous prédispose à des rôles de direction de projets ou de pilotage opérationnel.",
    C: "Votre profil présente une cohérence remarquable entre votre mode de pensée et vos intérêts, vous orientant vers des fonctions d'expertise réglementaire ou de qualité.",
  },
  COLOR: {
    R: "Votre créativité trouve un ancrage concret dans votre goût pour l'action, vous orientant vers des métiers de conception-réalisation ou de prototypage.",
    I: "L'association de votre pensée divergente et de votre curiosité intellectuelle vous positionne pour l'innovation ou la recherche exploratoire.",
    A: "Votre profil présente une forte cohérence créative, vous destinant naturellement aux métiers artistiques, de communication ou de direction créative.",
    S: "Votre créativité au service du collectif vous oriente vers l'animation, la facilitation ou les approches pédagogiques innovantes.",
    E: "Votre vision originale combinée à votre énergie entrepreneuriale fait de vous un profil d'intrapreneur ou de développeur de concepts.",
    C: "Votre créativité peut apporter un regard neuf dans des environnements structurés, notamment dans l'amélioration des processus ou l'expérience utilisateur.",
  },
  VOLUME: {
    R: "Votre orientation vers l'action et les résultats s'aligne parfaitement avec votre goût du concret, vous positionnant pour des rôles de management opérationnel.",
    I: "Votre capacité décisionnelle enrichie d'une dimension analytique vous oriente vers des fonctions de direction technique ou de conseil stratégique.",
    A: "Votre énergie exécutive au service de la création vous positionne pour des rôles de production artistique ou de direction de projets créatifs.",
    S: "Votre leadership naturel combiné à votre orientation sociale vous destine à des fonctions de direction d'équipes ou de conduite du changement.",
    E: "Votre profil présente une synergie remarquable entre votre mode opératoire et vos aspirations, vous orientant vers l'entrepreneuriat ou la direction générale.",
    C: "Votre capacité à décider et agir dans un cadre structuré vous positionne pour des fonctions de direction administrative ou de pilotage de la performance.",
  },
  SOUND: {
    R: "Votre aisance relationnelle enrichit votre orientation pratique, vous positionnant pour des rôles de coordination terrain ou de management de proximité.",
    I: "Votre capacité à communiquer des concepts complexes vous oriente vers la vulgarisation scientifique, l'enseignement supérieur ou le conseil expert.",
    A: "Votre sensibilité relationnelle au service de la création vous destine aux métiers de médiation culturelle, de direction artistique collaborative ou de storytelling.",
    S: "Votre profil présente une cohérence forte entre votre mode de fonctionnement et vos aspirations, vous orientant vers les métiers de l'accompagnement et du développement humain.",
    E: "Votre intelligence relationnelle au service de vos ambitions vous positionne pour des rôles de développement commercial, de négociation ou de leadership inspirant.",
    C: "Votre capacité à créer du lien dans des environnements structurés vous oriente vers des fonctions de coordination, de support client ou de gestion de la relation.",
  },
}

/** Environment descriptors by cognitive profile */
const COGNITIVE_ENVIRONMENTS: Record<CognitiveProfile, {
  structure: string
  rhythm: string
  culture: string
}> = {
  FORM: {
    structure: "un cadre clair avec des processus établis et des objectifs mesurables",
    rhythm: "un rythme permettant l'analyse approfondie et la planification",
    culture: "une culture valorisant la rigueur, l'expertise et la qualité",
  },
  COLOR: {
    structure: "un environnement flexible laissant place à l'expérimentation",
    rhythm: "un rythme varié alternant phases de création et de réalisation",
    culture: "une culture encourageant l'innovation, la prise d'initiative et l'originalité",
  },
  VOLUME: {
    structure: "un environnement orienté résultats avec une autonomie décisionnelle",
    rhythm: "un rythme dynamique avec des défis réguliers et des objectifs ambitieux",
    culture: "une culture de la performance, de la responsabilisation et de l'action",
  },
  SOUND: {
    structure: "un environnement collaboratif favorisant les interactions",
    rhythm: "un rythme permettant les échanges et le travail en équipe",
    culture: "une culture bienveillante valorisant l'entraide et la communication",
  },
}

/** Growth levers by cognitive profile */
const GROWTH_LEVERS_BASE: Record<CognitiveProfile, string[]> = {
  FORM: [
    "Développer la tolérance à l'ambiguïté pour gagner en agilité",
    "Cultiver la délégation pour démultiplier votre impact",
    "Explorer des approches plus intuitives en complément de l'analyse",
  ],
  COLOR: [
    "Structurer vos idées pour maximiser leur impact",
    "Développer la persévérance sur les projets de long terme",
    "Renforcer votre capacité à prioriser parmi vos nombreuses idées",
  ],
  VOLUME: [
    "Cultiver l'écoute active pour enrichir vos décisions",
    "Développer la patience stratégique sur les enjeux complexes",
    "Renforcer la dimension collaborative de votre leadership",
  ],
  SOUND: [
    "Affirmer votre positionnement pour gagner en impact",
    "Développer votre capacité à trancher dans les situations délicates",
    "Cultiver des moments de travail en autonomie pour la réflexion profonde",
  ],
}

/** Vigilance points by cognitive profile */
const VIGILANCE_POINTS_BASE: Record<CognitiveProfile, string[]> = {
  FORM: [
    "Veiller à ne pas sur-analyser au détriment de l'action",
    "Rester ouvert aux approches non conventionnelles",
    "Accepter l'imperfection comme partie du processus",
  ],
  COLOR: [
    "Veiller à finaliser les projets avant d'en initier de nouveaux",
    "Maintenir un niveau de rigueur suffisant dans l'exécution",
    "Canaliser votre énergie créative vers des objectifs définis",
  ],
  VOLUME: [
    "Veiller à consulter avant les décisions à fort impact",
    "Prendre le recul nécessaire sur les enjeux stratégiques",
    "Maintenir l'attention aux détails dans l'exécution",
  ],
  SOUND: [
    "Veiller à préserver du temps pour vos propres priorités",
    "Maintenir vos positions face aux pressions relationnelles",
    "Équilibrer disponibilité et efficacité personnelle",
  ],
}

// ============================================================================
// Synthesis Generation Functions
// ============================================================================

/**
 * Generate the strategic conclusion paragraph.
 */
function generateStrategicConclusion(input: StrategicSynthesisInput): string {
  const { cognitiveProfile, riasecDominant, riasecSecondary, coreValues, insights } = input
  const primary = cognitiveProfile.primaryProfile
  const secondary = cognitiveProfile.secondaryProfile
  const riasec = RIASEC_DESCRIPTORS[riasecDominant]
  
  // Opening: cognitive-RIASEC synergy
  const synergy = COGNITIVE_RIASEC_SYNERGIES[primary][riasecDominant]
  
  // Values integration
  const valuesText = coreValues.length >= 2
    ? `Vos valeurs fondamentales – notamment ${coreValues.slice(0, 3).join(", ")} – constituent le socle de votre engagement professionnel et orientent naturellement vos choix de carrière.`
    : "Vos valeurs fondamentales constituent le socle de votre engagement professionnel."
  
  // Secondary profile nuance
  let secondaryText = ""
  if (secondary) {
    const secondaryLabel = secondary === "FORM" ? "analytique" :
      secondary === "COLOR" ? "créative" :
      secondary === "VOLUME" ? "décisionnelle" : "relationnelle"
    secondaryText = ` Cette orientation principale est enrichie par une dimension ${secondaryLabel} secondaire qui élargit votre spectre de compétences.`
  }
  
  // RIASEC secondary integration
  let riasecSecondaryText = ""
  if (riasecSecondary) {
    const secRiasec = RIASEC_DESCRIPTORS[riasecSecondary]
    riasecSecondaryText = ` Votre intérêt secondaire ${secRiasec.label} apporte une complémentarité précieuse à votre profil.`
  }
  
  // Confidence qualifier
  const confidenceQualifier = cognitiveProfile.confidenceLevel === "high"
    ? "avec une cohérence remarquable"
    : cognitiveProfile.confidenceLevel === "medium"
    ? "de manière significative"
    : "avec des nuances à explorer"
  
  // Compose conclusion
  return `${synergy}${secondaryText}${riasecSecondaryText}

${valuesText}

L'analyse croisée de votre profil cognitif et de vos intérêts professionnels converge ${confidenceQualifier} vers une orientation ${riasec.orientation}. Vos forces naturelles – ${insights.strengths.slice(0, 2).join(" et ").toLowerCase()} – constituent des atouts différenciants sur le marché du travail.

Cette synthèse stratégique vous invite à capitaliser sur cette cohérence pour construire un projet professionnel aligné avec votre fonctionnement naturel et vos aspirations profondes.`
}

/**
 * Generate the ideal environment description.
 */
function generateIdealEnvironment(input: StrategicSynthesisInput): string {
  const { cognitiveProfile, riasecDominant, coreValues } = input
  const primary = cognitiveProfile.primaryProfile
  const env = COGNITIVE_ENVIRONMENTS[primary]
  const riasec = RIASEC_DESCRIPTORS[riasecDominant]
  
  // Select relevant RIASEC environment
  const riasecEnv = riasec.environments[0]
  
  // Values-based culture element
  const valuesCulture = coreValues.length > 0
    ? ` où ${coreValues[0].toLowerCase()} est une valeur partagée`
    : ""
  
  return `Votre environnement professionnel idéal combine ${env.structure}, ${env.rhythm}, et ${env.culture}${valuesCulture}.

Concrètement, vous vous épanouirez dans des contextes tels que les ${riasecEnv}, ou plus généralement dans toute organisation offrant ${env.structure.replace("un ", "")}.

La compatibilité culturelle est essentielle : recherchez des structures dont les valeurs résonnent avec les vôtres pour maximiser votre engagement et votre performance durable.`
}

/**
 * Generate vigilance points combining profile and insights.
 */
function generateVigilancePoints(input: StrategicSynthesisInput): string[] {
  const { cognitiveProfile, insights } = input
  const primary = cognitiveProfile.primaryProfile
  
  const points: string[] = []
  
  // Add profile-based vigilance points (first 2)
  points.push(...VIGILANCE_POINTS_BASE[primary].slice(0, 2))
  
  // Add friction zone-based point if available
  if (insights.frictionZones.length > 0) {
    // Transform friction zone into vigilance point
    const friction = insights.frictionZones[0]
    if (!points.some(p => p.toLowerCase().includes(friction.toLowerCase().slice(0, 20)))) {
      points.push(`Anticiper les situations où ${friction.toLowerCase().replace("les ", "").replace("peuvent", "pourraient")}`)
    }
  }
  
  // Limit to 4 points
  return points.slice(0, 4)
}

/**
 * Generate growth levers combining profile, RIASEC, and values.
 */
function generateGrowthLevers(input: StrategicSynthesisInput): string[] {
  const { cognitiveProfile, riasecDominant, coreValues } = input
  const primary = cognitiveProfile.primaryProfile
  const secondary = cognitiveProfile.secondaryProfile
  
  const levers: string[] = []
  
  // Add profile-based growth levers (first 2)
  levers.push(...GROWTH_LEVERS_BASE[primary].slice(0, 2))
  
  // Add secondary profile lever if exists
  if (secondary && secondary !== primary) {
    const secondaryLever = GROWTH_LEVERS_BASE[secondary][0]
    if (!levers.includes(secondaryLever)) {
      levers.push(`Explorer votre dimension ${secondary === "FORM" ? "analytique" : secondary === "COLOR" ? "créative" : secondary === "VOLUME" ? "décisionnelle" : "relationnelle"} pour enrichir votre approche`)
    }
  }
  
  // Add RIASEC-aligned lever
  const riasecLevers: Record<RIASECType, string> = {
    R: "Renforcer vos compétences techniques pour accroître votre expertise",
    I: "Approfondir un domaine de spécialisation pour devenir référent",
    A: "Développer un portfolio de réalisations démontrant votre singularité",
    S: "Élargir votre réseau professionnel et votre influence positive",
    E: "Cultiver votre vision stratégique et votre capacité d'influence",
    C: "Maîtriser les outils et méthodologies de votre domaine d'expertise",
  }
  
  const riasecLever = riasecLevers[riasecDominant]
  if (!levers.includes(riasecLever)) {
    levers.push(riasecLever)
  }
  
  // Limit to 4 levers
  return levers.slice(0, 4)
}

// ============================================================================
// Main Export
// ============================================================================

/**
 * Generate comprehensive strategic synthesis from all assessment data.
 * 
 * @param input - Cognitive profile, insights, RIASEC, and values
 * @returns Professional-grade strategic synthesis
 * 
 * @example
 * ```ts
 * const synthesis = generateStrategicSynthesis({
 *   cognitiveProfile: {
 *     primaryProfile: "FORM",
 *     secondaryProfile: "VOLUME",
 *     confidenceLevel: "high"
 *   },
 *   insights: { strengths: [...], frictionZones: [...], ... },
 *   riasecDominant: "I",
 *   riasecSecondary: "C",
 *   coreValues: ["Excellence", "Autonomie", "Impact"]
 * })
 * ```
 */
export function generateStrategicSynthesis(input: StrategicSynthesisInput): StrategicSynthesis {
  return {
    strategicConclusion: generateStrategicConclusion(input),
    idealEnvironment: generateIdealEnvironment(input),
    vigilancePoints: generateVigilancePoints(input),
    growthLevers: generateGrowthLevers(input),
  }
}
