/**
 * PERSPECTA - Générateur de Rapport Cognitif Professionnel
 * 
 * Ce module génère un rapport structuré en 10 sections basé sur :
 * - Profil RIASEC
 * - Signature cognitive comportementale
 * - Valeurs professionnelles
 * - Expériences clés
 * - Parcours chronologique
 */

export interface CognitiveSignatureData {
  inhibitoryControl: number
  processingSpeed: number
  cognitiveFlexibility: number
  accessFluency: number
  reactionVariance: number
  attentionDrift: number
  conflictErrors: number
  sequencingErrors: number
}

export interface RiasecProfile {
  realistic: number
  investigative: number
  artistic: number
  social: number
  enterprising: number
  conventional: number
  dominantCode: string
}

export interface UserValue {
  id: string
  name: string
  priority: number
}

export interface Experience {
  id: string
  title: string
  situation: string
  task: string
  action: string
  result: string
  competences: string[]
}

export interface LifeEvent {
  id: string
  title: string
  date: string
  type: string
  description: string
}

export interface ReportInput {
  userName: string
  cognitiveSignature: CognitiveSignatureData
  riasec?: RiasecProfile
  values?: UserValue[]
  experiences?: Experience[]
  lifeEvents?: LifeEvent[]
}

export interface ReportSection {
  id: string
  title: string
  content: string
}

export interface GeneratedReport {
  sections: ReportSection[]
  generatedAt: string
  version: string
}

/**
 * Détermine l'archétype cognitif basé sur la signature
 */
export function determineCognitiveArchetype(signature: CognitiveSignatureData): {
  archetype: string
  description: string
} {
  const { inhibitoryControl, processingSpeed, cognitiveFlexibility, accessFluency } = signature

  // Calculer le profil dominant
  const scores = [
    { dim: "control", value: inhibitoryControl },
    { dim: "speed", value: processingSpeed },
    { dim: "flexibility", value: cognitiveFlexibility },
    { dim: "fluency", value: accessFluency },
  ].sort((a, b) => b.value - a.value)

  const primary = scores[0]
  const secondary = scores[1]

  // Archétypes basés sur les combinaisons dominantes
  if (primary.dim === "speed" && processingSpeed >= 70) {
    if (secondary.dim === "flexibility") {
      return {
        archetype: "Stratège Réactif",
        description: "Traitement rapide avec capacité d'adaptation. Excelle dans les environnements dynamiques nécessitant des décisions rapides et des ajustements fréquents.",
      }
    }
    if (secondary.dim === "control") {
      return {
        archetype: "Exécutant Précis",
        description: "Rapidité d'exécution combinée à une forte maîtrise des interférences. Performant dans les contextes à haute pression avec objectifs clairs.",
      }
    }
    return {
      archetype: "Accélérateur",
      description: "Vitesse de traitement élevée. Optimisé pour les environnements à rythme soutenu avec flux d'informations continu.",
    }
  }

  if (primary.dim === "control" && inhibitoryControl >= 70) {
    if (secondary.dim === "flexibility") {
      return {
        archetype: "Architecte Méthodique",
        description: "Fort contrôle cognitif avec flexibilité. Capable de maintenir le cap tout en intégrant de nouvelles contraintes.",
      }
    }
    return {
      archetype: "Gardien de Focus",
      description: "Excellente résistance aux distractions. Performant dans les environnements complexes nécessitant concentration prolongée.",
    }
  }

  if (primary.dim === "flexibility" && cognitiveFlexibility >= 70) {
    if (secondary.dim === "fluency") {
      return {
        archetype: "Explorateur Cognitif",
        description: "Grande adaptabilité avec accès fluide aux représentations. Excelle dans les contextes créatifs et non linéaires.",
      }
    }
    return {
      archetype: "Navigateur Contextuel",
      description: "Forte capacité d'alternance entre règles et contextes. Adapté aux environnements multi-projets.",
    }
  }

  if (primary.dim === "fluency" && accessFluency >= 70) {
    return {
      archetype: "Processeur Fluide",
      description: "Accès automatisé et régulier aux informations. Performant dans les tâches de traitement visuel et reconnaissance de patterns.",
    }
  }

  // Profil équilibré
  const avgScore = (inhibitoryControl + processingSpeed + cognitiveFlexibility + accessFluency) / 4
  if (avgScore >= 60) {
    return {
      archetype: "Généraliste Équilibré",
      description: "Profil cognitif harmonieux sans dominante marquée. Polyvalent, adaptable à divers contextes professionnels.",
    }
  }

  return {
    archetype: "Profil en Développement",
    description: "Signature cognitive avec potentiel d'optimisation. Les stratégies d'adaptation peuvent compenser les zones de vigilance.",
  }
}

/**
 * Génère le prompt système pour l'IA
 */
export function generateSystemPrompt(): string {
  return `Tu es un expert en orientation professionnelle et analyse cognitive, spécialisé dans la traduction de données cognitives comportementales en recommandations professionnelles concrètes, stratégiques et actionnables.

Tu ne fais aucun diagnostic médical, aucune psychologie clinique, aucun discours motivationnel creux.

Ton objectif est de produire un dossier d'orientation professionnelle cognitive clair, structuré et utile à la prise de décision.

CONTRAINTES ABSOLUES :
- Pas de diagnostic médical
- Pas de promesses thérapeutiques
- Pas de jargon psychologique creux
- Pas de score unique type QI
- Pas de discours marketing
- Pas de métaphores floues

POSITIONNEMENT :
- L'analyse repose sur des mesures comportementales
- Les modèles sont issus de travaux de recherche protégés
- La cognition est utilisée comme outil d'orientation, pas de jugement

TON ATTENDU :
- Professionnel
- Structuré
- Sobre
- Engageant intellectuellement
- Orienté décision

FORMAT DE SORTIE :
Tu dois retourner un JSON valide avec la structure suivante :
{
  "sections": [
    { "id": "section_id", "title": "Titre", "content": "Contenu markdown" }
  ]
}`
}

/**
 * Génère le prompt utilisateur avec les données du profil
 */
export function generateUserPrompt(input: ReportInput): string {
  const archetype = determineCognitiveArchetype(input.cognitiveSignature)
  
  const cognitiveDescription = `
SIGNATURE COGNITIVE :
- Contrôle inhibiteur : ${input.cognitiveSignature.inhibitoryControl}/100
- Vitesse de traitement : ${input.cognitiveSignature.processingSpeed}/100
- Flexibilité cognitive : ${input.cognitiveSignature.cognitiveFlexibility}/100
- Fluidité d'accès : ${input.cognitiveSignature.accessFluency}/100
- Régularité des réponses : ${input.cognitiveSignature.reactionVariance}/100
- Maintien de l'attention : ${input.cognitiveSignature.attentionDrift}/100
- Erreurs sous conflit : ${input.cognitiveSignature.conflictErrors}%
- Erreurs de séquençage : ${input.cognitiveSignature.sequencingErrors}

ARCHÉTYPE COGNITIF : ${archetype.archetype}
${archetype.description}`

  let riasecDescription = ""
  if (input.riasec) {
    riasecDescription = `
PROFIL RIASEC :
- Réaliste : ${input.riasec.realistic}%
- Investigateur : ${input.riasec.investigative}%
- Artistique : ${input.riasec.artistic}%
- Social : ${input.riasec.social}%
- Entreprenant : ${input.riasec.enterprising}%
- Conventionnel : ${input.riasec.conventional}%
- Code dominant : ${input.riasec.dominantCode}`
  }

  let valuesDescription = ""
  if (input.values && input.values.length > 0) {
    valuesDescription = `
VALEURS PROFESSIONNELLES (par ordre de priorité) :
${input.values.map((v, i) => `${i + 1}. ${v.name}`).join("\n")}`
  }

  let experiencesDescription = ""
  if (input.experiences && input.experiences.length > 0) {
    experiencesDescription = `
EXPÉRIENCES CLÉS :
${input.experiences.map(e => `- ${e.title} : ${e.competences.join(", ")}`).join("\n")}`
  }

  let lifeEventsDescription = ""
  if (input.lifeEvents && input.lifeEvents.length > 0) {
    lifeEventsDescription = `
PARCOURS CHRONOLOGIQUE :
${input.lifeEvents.map(e => `- ${e.date} : ${e.title} (${e.type})`).join("\n")}`
  }

  return `Génère un rapport d'orientation professionnelle cognitive complet pour ${input.userName || "l'utilisateur"}.

DONNÉES DU PROFIL :
${cognitiveDescription}
${riasecDescription}
${valuesDescription}
${experiencesDescription}
${lifeEventsDescription}

STRUCTURE OBLIGATOIRE DU DOCUMENT (10 sections) :

1. "cadre" - Page d'ouverture — Cadre du bilan
Explique brièvement : ce qu'est un bilan cognitif professionnel, ce que mesure ce document, comment l'utiliser pour prendre des décisions. Ton posé, sérieux, orienté utilité.

2. "synthese" - Synthèse exécutive (SECTION CRITIQUE)
6-8 lignes maximum répondant à : « Quelle est la logique professionnelle globale de ce profil ? »
Inclure : fonctionnement cognitif dominant, dynamique générale, type d'environnements favorables, point de vigilance principal, direction professionnelle globale.

3. "fonctionnement" - Fonctionnement cognitif détaillé
Décrire le mode de fonctionnement, pas la personnalité : comment la personne traite l'information, décide, s'adapte, réagit à la complexité et au rythme. Langage fonctionnel et professionnel.

4. "forces" - Forces cognitives naturelles
3 à 5 capacités clés : ce que le cerveau fait bien spontanément, ce qui demande peu d'effort, ce qui peut devenir un avantage professionnel. Formulation valorisante mais factuelle.

5. "vigilance" - Points de vigilance cognitifs
Ce qui fatigue le cerveau, ce qui peut dégrader la performance, ce qui peut générer frustration ou usure à long terme. Orienté prévention de mauvais choix professionnels.

6. "croisement" - Croisement COGNITION × RIASEC
Analyser comment les intérêts professionnels sont soutenus ou freinés par la cognition. Montrer cohérences fortes, tensions potentielles, zones de compromis intelligentes.

7. "scenarios" - Scénarios professionnels possibles (OBLIGATOIRE)
3 scénarios maximum : Continuité optimisée, Pivot professionnel cohérent, Repositionnement/reconversion.
Pour chaque : type d'environnement, nature des missions, conditions de réussite, points de vigilance.
Logique professionnelle, pas fiches métiers.

8. "environnements" - Environnements à privilégier / à éviter
Décrire concrètement : rythme, niveau d'interaction, structure, autonomie, pression sensorielle.
Permettre une auto-évaluation immédiate des contextes futurs.

9. "leviers" - Leviers d'évolution et de progression
Ce que la personne peut travailler, comment équilibrer son fonctionnement, comment sécuriser une trajectoire long terme. Conseils sobres et applicables.

10. "conclusion" - Conclusion stratégique
Vision globale, direction claire, invitation à l'action réfléchie. Pas de répétition, pas de résumé.

Retourne UNIQUEMENT un JSON valide avec la structure demandée.`
}

/**
 * Génère un rapport statique de fallback (sans IA)
 */
export function generateFallbackReport(input: ReportInput): GeneratedReport {
  const archetype = determineCognitiveArchetype(input.cognitiveSignature)
  const sig = input.cognitiveSignature

  const sections: ReportSection[] = [
    {
      id: "cadre",
      title: "Cadre du Bilan Cognitif Professionnel",
      content: `## Qu'est-ce qu'un bilan cognitif professionnel ?

Ce document présente une analyse de votre fonctionnement cognitif basée sur des mesures comportementales objectives. Contrairement aux tests déclaratifs, les données proviennent de votre performance réelle sur des tâches standardisées.

### Ce que mesure ce document

- **Contrôle inhibiteur** : capacité à résister aux interférences et distractions
- **Vitesse de traitement** : rapidité de réaction et de décision
- **Flexibilité cognitive** : aptitude à alterner entre règles et contextes
- **Fluidité d'accès** : automatisation de la reconnaissance visuelle

### Comment utiliser ce rapport

Ce bilan n'est pas un diagnostic. C'est un outil d'aide à la décision professionnelle. Utilisez-le pour :
- Comprendre vos modes de fonctionnement naturels
- Identifier les environnements qui vous correspondent
- Anticiper les sources potentielles de fatigue ou de friction
- Orienter vos choix de carrière de manière éclairée`,
    },
    {
      id: "synthese",
      title: "Synthèse Exécutive",
      content: `Votre profil cognitif révèle un fonctionnement de type **${archetype.archetype}**. ${archetype.description}

${sig.processingSpeed >= 60 ? "Votre vitesse de traitement vous permet d'évoluer dans des environnements dynamiques." : "Votre approche plus délibérée favorise la précision sur la rapidité."}
${sig.inhibitoryControl >= 60 ? "Votre contrôle inhibiteur soutient une bonne résistance aux distractions." : "Les environnements à forte charge informationnelle peuvent nécessiter des stratégies d'organisation."}
${sig.cognitiveFlexibility >= 60 ? "Votre flexibilité cognitive facilite l'adaptation aux changements de contexte." : "Les environnements structurés et prévisibles correspondent mieux à votre fonctionnement."}

**Direction professionnelle** : Privilégiez les contextes qui exploitent vos forces naturelles tout en minimisant l'exposition prolongée à vos zones de vigilance.`,
    },
    {
      id: "fonctionnement",
      title: "Fonctionnement Cognitif Détaillé",
      content: `### Traitement de l'information

${sig.processingSpeed >= 70 
  ? "Vous traitez l'information rapidement, ce qui vous permet de réagir efficacement aux stimuli. Cette caractéristique est un atout dans les environnements à flux tendu."
  : sig.processingSpeed >= 40
    ? "Votre vitesse de traitement est équilibrée, permettant un bon compromis entre rapidité et précision."
    : "Vous adoptez une approche plus analytique du traitement de l'information, privilégiant la précision à la vitesse."}

### Prise de décision

${sig.inhibitoryControl >= 70
  ? "Vous maintenez efficacement votre focus malgré les informations contradictoires, ce qui soutient des décisions cohérentes même sous pression."
  : sig.inhibitoryControl >= 40
    ? "Votre capacité décisionnelle est satisfaisante dans la plupart des contextes, avec une sensibilité modérée aux interférences."
    : "Les situations à forte charge cognitive peuvent ralentir votre processus décisionnel. Des environnements plus calmes favorisent votre efficacité."}

### Adaptation au changement

${sig.cognitiveFlexibility >= 70
  ? "Vous naviguez aisément entre différentes règles et contextes mentaux. Les environnements non linéaires vous conviennent."
  : sig.cognitiveFlexibility >= 40
    ? "Vous gérez les transitions de manière satisfaisante, avec un coût cognitif modéré lors des changements fréquents."
    : "Vous performez mieux dans des environnements stables avec des règles claires et peu de changements imprévus."}

### Réaction à la complexité

${sig.accessFluency >= 70
  ? "Votre accès aux représentations visuelles est fluide et automatisé, facilitant le traitement d'informations complexes."
  : sig.accessFluency >= 40
    ? "Vous traitez la complexité visuelle de manière satisfaisante, avec une attention aux détails."
    : "Les environnements visuellement chargés peuvent nécessiter plus d'effort. Privilégiez les interfaces épurées."}`,
    },
    {
      id: "forces",
      title: "Forces Cognitives Naturelles",
      content: generateForcesSection(sig),
    },
    {
      id: "vigilance",
      title: "Points de Vigilance Cognitifs",
      content: generateVigilanceSection(sig),
    },
    {
      id: "croisement",
      title: "Croisement Cognition × RIASEC",
      content: input.riasec 
        ? generateCroisementSection(sig, input.riasec)
        : `*Profil RIASEC non disponible. Complétez le test RIASEC pour obtenir une analyse croisée de vos intérêts professionnels et de votre fonctionnement cognitif.*`,
    },
    {
      id: "scenarios",
      title: "Scénarios Professionnels Possibles",
      content: generateScenariosSection(sig, archetype),
    },
    {
      id: "environnements",
      title: "Environnements à Privilégier / À Éviter",
      content: generateEnvironmentsSection(sig),
    },
    {
      id: "leviers",
      title: "Leviers d'Évolution et de Progression",
      content: generateLeviersSection(sig),
    },
    {
      id: "conclusion",
      title: "Conclusion Stratégique",
      content: `Votre signature cognitive de type **${archetype.archetype}** constitue une base solide pour orienter vos choix professionnels.

Les données comportementales révèlent un fonctionnement qui sera optimisé dans des environnements correspondant à vos forces naturelles : ${sig.processingSpeed >= 60 ? "rythme soutenu" : "rythme modéré"}, ${sig.cognitiveFlexibility >= 60 ? "contextes variés" : "cadre structuré"}, ${sig.inhibitoryControl >= 60 ? "autonomie décisionnelle" : "objectifs clairs"}.

**Prochaine étape recommandée** : Évaluez vos opportunités actuelles et futures à travers le prisme de ce rapport. Identifiez les correspondances et les écarts avec votre fonctionnement naturel.

Ce bilan n'est pas une destination, mais un outil de navigation. Utilisez-le pour prendre des décisions éclairées, pas pour vous enfermer dans une catégorie.

---
*Rapport généré par PERSPECTA — Méthodologie propriétaire basée sur des mesures comportementales.*`,
    },
  ]

  return {
    sections,
    generatedAt: new Date().toISOString(),
    version: "1.0.0",
  }
}

function generateForcesSection(sig: CognitiveSignatureData): string {
  const forces: string[] = []

  if (sig.processingSpeed >= 60) {
    forces.push(`**Réactivité décisionnelle** — Votre vitesse de traitement (${sig.processingSpeed}/100) vous permet de réagir rapidement aux situations. Cette capacité est particulièrement valorisée dans les environnements dynamiques, la gestion de crise, ou les fonctions nécessitant des arbitrages rapides.`)
  }

  if (sig.inhibitoryControl >= 60) {
    forces.push(`**Résistance aux interférences** — Votre contrôle inhibiteur (${sig.inhibitoryControl}/100) vous permet de maintenir votre concentration malgré les distractions. Atout majeur pour les postes nécessitant une attention soutenue ou la gestion de priorités multiples.`)
  }

  if (sig.cognitiveFlexibility >= 60) {
    forces.push(`**Adaptabilité contextuelle** — Votre flexibilité cognitive (${sig.cognitiveFlexibility}/100) facilite les transitions entre différentes tâches ou règles. Précieux dans les environnements multi-projets ou les fonctions transversales.`)
  }

  if (sig.accessFluency >= 60) {
    forces.push(`**Traitement visuel fluide** — Votre fluidité d'accès (${sig.accessFluency}/100) indique une automatisation efficace de la reconnaissance visuelle. Avantage pour les métiers impliquant analyse de données visuelles, design, ou surveillance.`)
  }

  if (sig.reactionVariance >= 60) {
    forces.push(`**Stabilité attentionnelle** — Votre régularité de performance (${sig.reactionVariance}/100) témoigne d'une attention constante dans la durée. Qualité essentielle pour les tâches prolongées nécessitant vigilance.`)
  }

  if (forces.length === 0) {
    forces.push(`**Potentiel d'optimisation** — Votre profil présente des marges de progression sur plusieurs dimensions. Cette configuration invite à développer des stratégies compensatoires et à choisir des environnements adaptés.`)
  }

  return forces.join("\n\n")
}

function generateVigilanceSection(sig: CognitiveSignatureData): string {
  const vigilances: string[] = []

  if (sig.processingSpeed < 40) {
    vigilances.push(`**Environnements à rythme intense** — Une vitesse de traitement modérée (${sig.processingSpeed}/100) peut générer de la fatigue dans les contextes à flux tendu. Privilégiez les postes permettant un temps de réflexion.`)
  }

  if (sig.inhibitoryControl < 40) {
    vigilances.push(`**Contextes à forte charge informationnelle** — Un contrôle inhibiteur en développement (${sig.inhibitoryControl}/100) rend vulnérable aux environnements bruyants ou aux interruptions fréquentes. L'open space peut être épuisant.`)
  }

  if (sig.cognitiveFlexibility < 40) {
    vigilances.push(`**Changements fréquents de contexte** — Une flexibilité cognitive modérée (${sig.cognitiveFlexibility}/100) peut rendre coûteux les environnements imprévisibles. Les transitions fréquentes entre projets peuvent générer de la friction.`)
  }

  if (sig.accessFluency < 40) {
    vigilances.push(`**Surcharge visuelle** — Une fluidité d'accès en développement (${sig.accessFluency}/100) peut ralentir le traitement dans les environnements visuellement denses. Préférez les interfaces épurées.`)
  }

  if (sig.attentionDrift < 40) {
    vigilances.push(`**Tâches prolongées sans pause** — Une dérive attentionnelle notable (${sig.attentionDrift}/100) suggère une fatigue progressive sur les tâches longues. Structurez votre travail en blocs avec pauses régulières.`)
  }

  if (sig.conflictErrors > 20) {
    vigilances.push(`**Situations de conflit cognitif** — Un taux d'erreurs sous conflit de ${sig.conflictErrors}% indique une vulnérabilité aux situations ambiguës. Clarifiez les priorités avant d'agir.`)
  }

  if (vigilances.length === 0) {
    vigilances.push(`Votre profil ne présente pas de zone de vigilance majeure. Restez attentif à l'équilibre global et évitez la surcharge prolongée.`)
  }

  return vigilances.join("\n\n")
}

function generateCroisementSection(sig: CognitiveSignatureData, riasec: RiasecProfile): string {
  const code = riasec.dominantCode.toUpperCase()
  let analysis = ""

  if (code.includes("R")) {
    analysis += `### Dimension Réaliste (${riasec.realistic}%)
${sig.processingSpeed >= 50 
  ? "✓ Votre vitesse de traitement soutient les activités pratiques nécessitant réactivité."
  : "⚠ Les tâches manuelles rapides peuvent être plus exigeantes pour vous."}
${sig.accessFluency >= 50
  ? "✓ Votre fluidité visuelle facilite le travail avec des objets et outils."
  : ""}\n\n`
  }

  if (code.includes("I")) {
    analysis += `### Dimension Investigatrice (${riasec.investigative}%)
${sig.cognitiveFlexibility >= 50
  ? "✓ Votre flexibilité cognitive soutient l'exploration de problèmes complexes."
  : "⚠ Les problèmes très ouverts peuvent nécessiter plus de structure."}
${sig.inhibitoryControl >= 50
  ? "✓ Votre contrôle inhibiteur favorise la concentration analytique prolongée."
  : ""}\n\n`
  }

  if (code.includes("A")) {
    analysis += `### Dimension Artistique (${riasec.artistic}%)
${sig.cognitiveFlexibility >= 50
  ? "✓ Votre flexibilité cognitive soutient la créativité et l'exploration."
  : "⚠ Les processus créatifs très libres peuvent être déstabilisants."}
${sig.accessFluency >= 50
  ? "✓ Votre fluidité visuelle facilite le travail esthétique."
  : ""}\n\n`
  }

  if (code.includes("S")) {
    analysis += `### Dimension Sociale (${riasec.social}%)
${sig.inhibitoryControl >= 50
  ? "✓ Votre contrôle inhibiteur vous aide à gérer les interactions multiples."
  : "⚠ Les environnements très sociaux peuvent être cognitivement coûteux."}
${sig.cognitiveFlexibility >= 50
  ? "✓ Votre flexibilité facilite l'adaptation aux différents interlocuteurs."
  : ""}\n\n`
  }

  if (code.includes("E")) {
    analysis += `### Dimension Entreprenante (${riasec.enterprising}%)
${sig.processingSpeed >= 50
  ? "✓ Votre vitesse de traitement soutient la prise de décision rapide."
  : "⚠ Les contextes très compétitifs peuvent être exigeants."}
${sig.inhibitoryControl >= 50
  ? "✓ Votre contrôle inhibiteur aide à maintenir le cap malgré les pressions."
  : ""}\n\n`
  }

  if (code.includes("C")) {
    analysis += `### Dimension Conventionnelle (${riasec.conventional}%)
${sig.reactionVariance >= 50
  ? "✓ Votre stabilité attentionnelle soutient les tâches répétitives et précises."
  : "⚠ Les tâches très routinières peuvent générer de la fatigue."}
${sig.inhibitoryControl >= 50
  ? "✓ Votre contrôle inhibiteur favorise le respect des procédures."
  : ""}\n\n`
  }

  return analysis || "Analyse croisée non disponible pour ce profil RIASEC."
}

function generateScenariosSection(
  sig: CognitiveSignatureData, 
  archetype: { archetype: string; description: string }
): string {
  return `### Scénario 1 : Continuité Optimisée

**Type d'environnement** : ${sig.processingSpeed >= 50 ? "Dynamique avec flux régulier" : "Structuré avec rythme modéré"}
**Nature des missions** : ${sig.cognitiveFlexibility >= 50 ? "Projets variés, coordination transverse" : "Missions définies, expertise approfondie"}
**Conditions de réussite** : 
- Environnement correspondant à votre profil ${archetype.archetype}
- ${sig.inhibitoryControl >= 50 ? "Autonomie décisionnelle" : "Objectifs clairs et feedback régulier"}
- ${sig.accessFluency >= 50 ? "Outils visuels performants" : "Interfaces épurées"}

**Points de vigilance** : Éviter ${sig.processingSpeed < 50 ? "la pression temporelle excessive" : sig.cognitiveFlexibility < 50 ? "les changements de contexte trop fréquents" : "la surcharge informationnelle prolongée"}

---

### Scénario 2 : Pivot Professionnel Cohérent

**Type d'environnement** : ${sig.cognitiveFlexibility >= 50 ? "Innovation, transformation, nouveaux marchés" : "Secteur stable avec évolution progressive"}
**Nature des missions** : Transition vers des fonctions exploitant davantage ${sig.processingSpeed >= sig.cognitiveFlexibility ? "votre réactivité" : "votre adaptabilité"}
**Conditions de réussite** :
- Période de transition accompagnée
- Montée en compétence progressive
- Validation des acquis cognitifs dans le nouveau contexte

**Points de vigilance** : ${sig.attentionDrift < 50 ? "Gérer la fatigue de l'apprentissage" : "Maintenir l'engagement sur la durée"}

---

### Scénario 3 : Repositionnement / Reconversion

**Type d'environnement** : Rupture avec le contexte actuel, nouveau secteur ou nouvelle fonction
**Nature des missions** : Reconstruction d'une trajectoire alignée avec votre fonctionnement cognitif naturel
**Conditions de réussite** :
- Analyse approfondie des environnements cibles
- Validation terrain avant engagement
- Filet de sécurité financier et psychologique

**Points de vigilance** : Ce scénario est le plus exigeant cognitivement. À envisager si les scénarios 1 et 2 ne sont pas viables.`
}

function generateEnvironmentsSection(sig: CognitiveSignatureData): string {
  const toPrivilege: string[] = []
  const toAvoid: string[] = []

  // Rythme
  if (sig.processingSpeed >= 60) {
    toPrivilege.push("**Rythme** : Environnements dynamiques, flux d'activité soutenu")
  } else {
    toPrivilege.push("**Rythme** : Environnements permettant réflexion, délais raisonnables")
    toAvoid.push("**Rythme** : Pression temporelle constante, urgences permanentes")
  }

  // Interaction
  if (sig.inhibitoryControl >= 60) {
    toPrivilege.push("**Interaction** : Open space gérable, réunions fréquentes acceptables")
  } else {
    toPrivilege.push("**Interaction** : Espaces calmes, temps de concentration protégé")
    toAvoid.push("**Interaction** : Open space bruyant, interruptions fréquentes")
  }

  // Structure
  if (sig.cognitiveFlexibility >= 60) {
    toPrivilege.push("**Structure** : Environnements agiles, règles évolutives")
  } else {
    toPrivilege.push("**Structure** : Cadre clair, processus définis, prévisibilité")
    toAvoid.push("**Structure** : Chaos organisationnel, règles changeantes")
  }

  // Autonomie
  if (sig.inhibitoryControl >= 60 && sig.processingSpeed >= 50) {
    toPrivilege.push("**Autonomie** : Forte autonomie décisionnelle, responsabilité directe")
  } else {
    toPrivilege.push("**Autonomie** : Autonomie encadrée, feedback régulier")
    toAvoid.push("**Autonomie** : Isolement décisionnel sans support")
  }

  // Pression sensorielle
  if (sig.accessFluency >= 60 && sig.inhibitoryControl >= 50) {
    toPrivilege.push("**Environnement sensoriel** : Interfaces riches, multiples sources d'information")
  } else {
    toPrivilege.push("**Environnement sensoriel** : Interfaces épurées, information hiérarchisée")
    toAvoid.push("**Environnement sensoriel** : Surcharge visuelle, notifications permanentes")
  }

  return `## Environnements à Privilégier

${toPrivilege.join("\n")}

## Environnements à Éviter

${toAvoid.length > 0 ? toAvoid.join("\n") : "Aucune contre-indication majeure identifiée. Restez vigilant sur l'équilibre global."}`
}

function generateLeviersSection(sig: CognitiveSignatureData): string {
  const leviers: string[] = []

  if (sig.processingSpeed < 50) {
    leviers.push(`**Optimiser la vitesse de traitement**
- Pratiquer des exercices de réactivité (jeux cognitifs, sport)
- Automatiser les tâches répétitives pour libérer de la bande passante
- Préparer les décisions à l'avance quand c'est possible`)
  }

  if (sig.inhibitoryControl < 50) {
    leviers.push(`**Renforcer le contrôle inhibiteur**
- Structurer l'environnement de travail (notifications off, plages protégées)
- Pratiquer la méditation de pleine conscience
- Utiliser des listes de priorités claires`)
  }

  if (sig.cognitiveFlexibility < 50) {
    leviers.push(`**Développer la flexibilité cognitive**
- S'exposer progressivement à des contextes variés
- Pratiquer des activités nécessitant alternance (musique, langues)
- Anticiper les transitions plutôt que les subir`)
  }

  if (sig.attentionDrift < 50) {
    leviers.push(`**Stabiliser l'attention dans la durée**
- Structurer le travail en blocs de 45-90 minutes
- Intégrer des pauses actives régulières
- Varier les types de tâches au cours de la journée`)
  }

  leviers.push(`**Sécuriser la trajectoire long terme**
- Choisir des environnements alignés avec votre fonctionnement naturel
- Développer des stratégies compensatoires pour vos zones de vigilance
- Réévaluer régulièrement l'adéquation poste/profil`)

  return leviers.join("\n\n")
}
