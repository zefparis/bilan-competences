import { createHash } from 'crypto'

export interface CognitiveSignatureData {
  inhibitoryControl: number
  processingSpeed: number
  cognitiveFlexibility: number
  accessFluency: number
  attentionDrift: number
}

export interface RIASECProfile {
  realistic: number
  investigative: number
  artistic: number
  social: number
  enterprising: number
  conventional: number
}

export interface PremiumReportInput {
  cognitiveSignature: CognitiveSignatureData
  riasec?: RIASECProfile
  userName?: string
}

/* ============================================================
   SECTION 1 — Signature cognitive centrale
============================================================ */
export function generateSignatureCentraleSection(
  sig: CognitiveSignatureData
): string {
  const scores = [
    { key: "control", value: sig.inhibitoryControl, label: "contrôle inhibiteur" },
    { key: "speed", value: sig.processingSpeed, label: "vitesse de traitement" },
    { key: "flexibility", value: sig.cognitiveFlexibility, label: "flexibilité cognitive" },
    { key: "fluency", value: sig.accessFluency, label: "fluidité d'accès" },
  ].sort((a, b) => b.value - a.value)

  const dominant = scores[0]

  let facilitation = ""
  let complexification = ""

  switch (dominant.key) {
    case "speed":
      facilitation =
        "Votre capacité à traiter rapidement les informations facilite la prise de décision dans des contextes dynamiques."
      complexification =
        "Dans des situations nécessitant une très grande précision, cette rapidité peut demander des stratégies de vérification."
      break
    case "control":
      facilitation =
        "Votre résistance aux interférences soutient une concentration stable sur des objectifs complexes."
      complexification =
        "Dans des contextes très ambigus ou non structurés, un temps d'ajustement peut être nécessaire."
      break
    case "flexibility":
      facilitation =
        "Votre adaptabilité cognitive facilite les transitions entre différents cadres de réflexion."
      complexification =
        "Dans des environnements très répétitifs ou rigides, cela peut générer une sensation de sous-stimulation."
      break
    case "fluency":
      facilitation =
        "Votre accès fluide aux représentations visuelles soutient la reconnaissance rapide de structures et de patterns."
      complexification =
        "Lorsque les informations sont très abstraites ou peu concrètes, un effort supplémentaire peut être requis."
      break
  }

  return `
Votre fonctionnement cognitif s’organise principalement autour du ${dominant.label}.  
Votre manière de traiter l’information et de prendre des décisions tend à refléter cette logique dominante.

### Ce que ce fonctionnement facilite
${facilitation}

### Ce que ce fonctionnement peut complexifier
${complexification}
`.trim()
}

/* ============================================================
   SECTION 2 — Lecture fonctionnelle du traitement de l'information
============================================================ */
export function generateLectureFonctionnelleSection(
  sig: CognitiveSignatureData
): string {
  const rythme =
    sig.processingSpeed >= 60
      ? "un rythme rapide et synthétique"
      : "un rythme plus analytique et approfondi"

  const complexite =
    sig.cognitiveFlexibility >= 60
      ? "une capacité à naviguer entre plusieurs perspectives"
      : "une préférence pour des structures progressives et stables"

  const decision =
    sig.inhibitoryControl >= 60
      ? "un processus décisionnel structuré et cohérent"
      : "un processus décisionnel contextuel et adaptatif"

  return `
### Lecture fonctionnelle du traitement de l'information

Votre fonctionnement cognitif se caractérise par ${rythme}.  
Face à la complexité, vous mobilisez ${complexite}.  
Votre mode de décision repose sur ${decision}.

Ces caractéristiques influencent directement votre confort dans différents contextes professionnels.
`.trim()
}

/* ============================================================
   SECTION 3 — Carte des tensions cognitives
============================================================ */
export function generateCarteTensionsSection(
  sig: CognitiveSignatureData
): string {
  const tensions: string[] = []

  if (sig.processingSpeed >= 60 && sig.inhibitoryControl < 50) {
    tensions.push(
      `Votre vitesse de traitement (${sig.processingSpeed}%) combinée à un contrôle inhibiteur plus modéré (${sig.inhibitoryControl}%) peut créer une tension entre réactivité rapide et nécessité de précision. Dans certains contextes exigeant une grande exactitude, cette dynamique peut demander des stratégies de vérification consciemment mises en place.`
    )
  }

  if (sig.cognitiveFlexibility >= 60 && sig.inhibitoryControl < 50) {
    tensions.push(
      `Votre flexibilité cognitive élevée (${sig.cognitiveFlexibility}%) associée à un contrôle inhibiteur modéré (${sig.inhibitoryControl}%) génère une tension entre exploration de nouvelles approches et maintien du focus. Dans des environnements très structurés, cette caractéristique peut entraîner une recherche de stimulation externe pour préserver l'engagement.`
    )
  }

  if (sig.inhibitoryControl >= 60 && sig.cognitiveFlexibility < 50) {
    tensions.push(
      `Votre excellent contrôle inhibiteur (${sig.inhibitoryControl}%) couplé à une flexibilité cognitive plus mesurée (${sig.cognitiveFlexibility}%) crée une tension entre stabilité et adaptation. Face à des situations exigeant une créativité spontanée, ce profil peut nécessiter un temps d'ajustement pour sortir des cadres établis.`
    )
  }

  if (sig.processingSpeed >= 70 && sig.accessFluency < 40) {
    tensions.push(
      `Votre vitesse de traitement très élevée (${sig.processingSpeed}%) contrastant avec une fluidité d'accès plus limitée (${sig.accessFluency}%) peut générer une tension entre rapidité de réaction et traitement visuel approfondi. Dans des contextes avec informations complexes, cette dynamique peut créer un besoin de structuration visuelle externe.`
    )
  }

  if (tensions.length === 0) {
    tensions.push(
      `Votre profil cognitif équilibré (vitesse: ${sig.processingSpeed}%, contrôle: ${sig.inhibitoryControl}%, flexibilité: ${sig.cognitiveFlexibility}%) présente une harmonie globale. Les tensions éventuelles dépendront principalement des exigences extrêmes des contextes professionnels spécifiques.`
    )
  }

  return tensions.slice(0, 3).join("\n\n")
}

/* ============================================================
   SECTION 4 — Zones de vigilance cognitive
============================================================ */
export function generateZonesVigilanceSection(
  sig: CognitiveSignatureData
): string {
  const zones: string[] = []

  // Zone 1: Double pression (vitesse faible + contrôle faible)
  if (sig.processingSpeed < 40 && sig.inhibitoryControl < 50) {
    zones.push(
      `Les situations combinant urgence et surcharge informationnelle peuvent générer une fatigue rapide pour votre profil (vitesse: ${sig.processingSpeed}%, contrôle: ${sig.inhibitoryControl}%). La vigilance s'impose lors des pics d'activité simultanés où les urgences se multiplient.`
    )
  }

  // Zone 2: Changements brusques (flexibilité par tranches)
  if (sig.cognitiveFlexibility < 40) {
    zones.push(
      `Les changements brusques de cadre ou de règles peuvent nécessiter un temps d'adaptation significatif pour votre profil (flexibilité: ${sig.cognitiveFlexibility}%). Les transitions non préparées peuvent demander un effort cognitif supplémentaire.`
    )
  } else if (sig.cognitiveFlexibility < 60) {
    zones.push(
      `Les transitions fréquentes peuvent demander une concentration consciente pour votre profil (flexibilité: ${sig.cognitiveFlexibility}%). Une anticipation des changements peut aider à maintenir l'efficacité.`
    )
  }

  // Zone 3: Interfaces complexes (fluidité par tranches)
  if (sig.accessFluency < 40) {
    zones.push(
      `Les interfaces visuellement denses et les informations multiples peuvent entraîner une fatigue progressive pour votre profil (fluidité: ${sig.accessFluency}%). La segmentation des tâches complexes est recommandée.`
    )
  } else if (sig.accessFluency < 60) {
    zones.push(
      `Les sessions longues sur des systèmes complexes peuvent nécessiter des pauses régulières pour votre profil (fluidité: ${sig.accessFluency}%). L'organisation visuelle de l'information peut optimiser le traitement.`
    )
  }

  // Zone 4: Sous-stimulation (vitesse élevée + flexibilité élevée)
  if (sig.processingSpeed >= 70 && sig.cognitiveFlexibility >= 60) {
    zones.push(
      `Les environnements avec faible stimulation et tâches très répétitives peuvent générer une sensation de sous-stimulation pour votre profil (vitesse: ${sig.processingSpeed}%, flexibilité: ${sig.cognitiveFlexibility}%). La recherche de défis intellectuels peut être nécessaire pour maintenir l'engagement.`
    )
  }

  // Zone par défaut si aucune condition spécifique
  if (zones.length === 0) {
    zones.push(
      `Les contextes très éloignés de vos habitudes peuvent nécessiter une adaptation consciente pour votre profil équilibré (vitesse: ${sig.processingSpeed}%, contrôle: ${sig.inhibitoryControl}%, flexibilité: ${sig.cognitiveFlexibility}%).`
    )
  }

  return zones.slice(0, 3).join("\n\n")
}

/* ============================================================
   SECTION 5 — Environnements professionnels compatibles
============================================================ */
export function generateEnvironnementsCompatiblesSection(
  sig: CognitiveSignatureData
): string {
  const favorables: string[] = []
  const couteux: string[] = []

  sig.processingSpeed >= 60
    ? favorables.push("Rythme soutenu avec priorités claires")
    : couteux.push("Urgences constantes et imprévisibles")

  sig.cognitiveFlexibility >= 60
    ? favorables.push("Variété de situations et ajustements fréquents")
    : couteux.push("Environnements instables sans repères")

  sig.inhibitoryControl >= 60
    ? favorables.push("Cadres exigeants avec objectifs définis")
    : couteux.push("Distractions permanentes et interruptions multiples")

  return `
### Environnements favorables
${favorables.map(v => `- ${v}`).join("\n")}

### Environnements cognitivement coûteux
${couteux.map(v => `- ${v}`).join("\n")}
`.trim()
}

/* ============================================================
   SECTION 6 — Projection IA & transformation du travail
============================================================ */
export function generateProjectionIATransformationSection(
  sig: CognitiveSignatureData
): string {
  const iaIntroduction = 
    sig.processingSpeed >= 70 
      ? `Dans un contexte de transformation numérique, votre vitesse de traitement élevée (${sig.processingSpeed}%) constitue un atout majeur pour interagir efficacement avec les systèmes d'IA.`
      : sig.processingSpeed >= 50
        ? `Votre vitesse de traitement modérée (${sig.processingSpeed}%) vous permet d'intégrer progressivement les outils d'IA dans vos pratiques professionnelles.`
        : `Face aux systèmes d'IA, votre approche réfléchie (vitesse: ${sig.processingSpeed}%) favorise une intégration profonde et maîtrisée des nouvelles technologies.`

  const valeurHumaine =
    sig.cognitiveFlexibility >= 60
      ? `votre capacité d'adaptation (${sig.cognitiveFlexibility}%) et de recomposition face à l'imprévu, que les algorithmes peinent à reproduire`
      : `votre capacité à structurer et fiabiliser les processus (flexibilité: ${sig.cognitiveFlexibility}%), essentielle pour encadrer les systèmes automatisés`

  const complementarite =
    sig.inhibitoryControl >= 60
      ? `votre excellent contrôle inhibiteur (${sig.inhibitoryControl}%) complète parfaitement l'IA en filtrant les informations pertinentes et en maintenant le focus sur les objectifs stratégiques.`
      : `votre sensibilité contextuelle (contrôle: ${sig.inhibitoryControl}%) apporte une nuance humaine précieuse aux traitements algorithmiques standardisés.`

  return `
### Empreinte cognitive et transformation du travail

${iaIntroduction}

L'intelligence artificielle automatise efficacement les tâches répétitives et standardisées.  
Votre valeur cognitive réside dans ${valeurHumaine}.

Cette complémentarité humain-IA constitue un levier durable d'évolution professionnelle, où ${complementarite}

Ce rapport propose une lecture, non une prédiction.
`.trim()
}
