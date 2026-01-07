import { createHash } from 'crypto'
import { callClaude } from './ai-helper'

export interface CognitiveSignatureData {
  inhibitoryControl: number
  processingSpeed: number
  cognitiveFlexibility: number
  accessFluency: number
  attentionDrift: number
  reactionVariance?: number
  conflictErrors?: number
  sequencingErrors?: number
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
   SECTION 2.1 — Signature cognitive centrale
============================================================ */
export async function generateSignatureCentraleSection(
  sig: CognitiveSignatureData
): Promise<string> {
  const prompt = `Tu es un expert en neurosciences cognitives et en psychologie du travail. Analyse la signature cognitive suivante et rédige une section de 600-800 mots.

**Données** :
- Contrôle inhibiteur : ${sig.inhibitoryControl}/100
- Vitesse de traitement : ${sig.processingSpeed}/100
- Flexibilité cognitive : ${sig.cognitiveFlexibility}/100
- Fluidité d'accès : ${sig.accessFluency}/100

**Tâche** :
1. Identifie la dimension cognitive DOMINANTE (la plus élevée)
2. Explique ce que cette dominance signifie concrètement dans le travail quotidien
3. Décris comment les autres dimensions SOUTIENNENT ou COMPENSENT la dimension dominante
4. Donne 3 exemples concrets de situations professionnelles où cette signature excelle
5. Donne 2 exemples de situations où cette signature pourrait rencontrer des difficultés
6. Propose 2 stratégies d'adaptation pour les situations difficiles

**Ton** : Expert mais accessible, avec métaphores et exemples concrets
**Format** : Prose fluide avec sous-titres (### en Markdown)
**Longueur** : 600-800 mots

**Structure suggérée** :
### Architecture cognitive dominante
[Explication de la dimension dominante]

### Orchestration des ressources cognitives
[Comment les dimensions interagissent]

### Contextes d'excellence
[3 situations où ce profil brille]

### Zones de vigilance
[2 situations délicates + stratégies]`

  try {
    return await callClaude(prompt)
  } catch (error) {
    console.error("Erreur génération signature centrale:", error)
    return "Erreur lors de la génération de la signature cognitive centrale."
  }
}

/* ============================================================
   SECTION 2.2 — Lecture fonctionnelle du traitement de l'information
============================================================ */
export async function generateLectureFonctionnelleSection(
  sig: CognitiveSignatureData
): Promise<string> {
  const prompt = `Tu es un expert en ergonomie cognitive. Analyse comment cette personne TRAITE l'information au quotidien.

**Données** :
- Vitesse de traitement : ${sig.processingSpeed}/100
- Contrôle inhibiteur : ${sig.inhibitoryControl}/100
- Flexibilité cognitive : ${sig.cognitiveFlexibility}/100
- Erreurs de conflit (Stroop) : ${sig.conflictErrors || 0}%
- Erreurs de séquençage (Trail) : ${sig.sequencingErrors || 0}

**Tâche** :
1. Décris le RYTHME de traitement : rapide/réfléchi/variable ?
2. Explique la gestion de la COMPLEXITÉ : comment cette personne gère-t-elle les informations multiples ?
3. Analyse le MODE DE DÉCISION : impulsif, analytique, intuitif, méthodique ?
4. Identifie les CANAUX SENSORIELS préférés (visuel, auditif, kinesthésique) basé sur les tests
5. Donne 4 recommandations pratiques pour OPTIMISER son environnement de travail :
   - Organisation de l'espace
   - Gestion des interruptions
   - Structuration des tâches
   - Outils et supports adaptés

**Ton** : Pragmatique et actionnable
**Format** : Prose avec sous-titres et listes à puces pour les recommandations
**Longueur** : 700-900 mots

**Structure suggérée** :
### Rythme et tempo cognitif
[Description du rythme]

### Navigation dans la complexité
[Gestion de l'information multiple]

### Style décisionnel
[Comment les décisions sont prises]

### Optimisations environnementales
- **Aménagement spatial** : [recommandation]
- **Gestion temporelle** : [recommandation]
- **Structuration des tâches** : [recommandation]
- **Outils de support** : [recommandation]`

  try {
    return await callClaude(prompt)
  } catch (error) {
    console.error("Erreur génération lecture fonctionnelle:", error)
    return "Erreur lors de la génération de la lecture fonctionnelle."
  }
}

/* ============================================================
   SECTION 2.3 — Carte des tensions cognitives
============================================================ */
export async function generateCarteTensionsSection(
  sig: CognitiveSignatureData
): Promise<string> {
  const prompt = `Tu es un psychologue du travail spécialisé en prévention des risques psychosociaux. Identifie les TENSIONS potentielles dans ce profil cognitif.

**Données** :
- Contrôle inhibiteur : ${sig.inhibitoryControl}/100
- Vitesse de traitement : ${sig.processingSpeed}/100
- Flexibilité cognitive : ${sig.cognitiveFlexibility}/100
- Fluidité d'accès : ${sig.accessFluency}/100
- Dérive attentionnelle : ${sig.attentionDrift}/100
- Variance de réaction : ${sig.reactionVariance || 0}/100

**Tâche** :
1. Identifie les ÉCARTS significatifs entre dimensions (>30 points)
2. Pour chaque écart, explique :
   - Quelle tension cela crée
   - Dans quels contextes professionnels cette tension s'exprime
   - Quel coût énergétique cela représente
3. Analyse les COMPENSATIONS : quelles dimensions compensent les faiblesses ?
4. Donne 3 signaux d'alerte de surcharge cognitive
5. Propose 3 stratégies de régulation

**Important** : Si le profil est ÉQUILIBRÉ (écarts <20 points), explique que c'est une FORCE et décris les avantages de cette harmonie.

**Ton** : Bienveillant mais lucide, focus prévention
**Format** : Prose avec encadrés pour les signaux d'alerte
**Longueur** : 600-800 mots

**Structure suggérée** :
### Cartographie des écarts
[Analyse des tensions ou de l'harmonie]

### Expression situationnelle
[Quand ces tensions se manifestent]

### Signaux d'alerte précoces
⚠️ [Signal 1]
⚠️ [Signal 2]
⚠️ [Signal 3]

### Stratégies de régulation
✓ [Stratégie 1]
✓ [Stratégie 2]
✓ [Stratégie 3]`

  try {
    return await callClaude(prompt)
  } catch (error) {
    console.error("Erreur génération tensions cognitives:", error)
    return "Erreur lors de la génération de la carte des tensions cognitives."
  }
}

/* ============================================================
   SECTION 2.4 — Zones de vigilance cognitive
============================================================ */
export async function generateZonesVigilanceSection(
  sig: CognitiveSignatureData,
  riasec?: RIASECProfile
): Promise<string> {
  const prompt = `Tu es un consultant en performance cognitive. Identifie les situations professionnelles à RISQUE pour ce profil.

**Données** :
- Profil cognitif complet : ${JSON.stringify(sig)}
- Profil RIASEC : ${JSON.stringify(riasec || {})}

**Tâche** :
1. Identifie 4 TYPES DE SITUATIONS à risque :
   - Charge cognitive élevée
   - Conditions dégradées (stress, fatigue, bruit)
   - Exigences contradictoires
   - Environnements inadaptés
2. Pour chaque type, donne :
   - Description concrète de la situation
   - Pourquoi ce profil est vulnérable
   - Signes avant-coureurs de difficulté
   - 2 tactiques de compensation
3. Propose un PROTOCOLE de récupération cognitive (micro-pauses, routines)

**Ton** : Préventif et pratique, focus outils
**Format** : Fiches situations avec bullet points
**Longueur** : 700-900 mots

**Structure suggérée** :
### Situation 1 : [Nom]
**Description** : [contexte]
**Vulnérabilité** : [pourquoi]
**Signaux** : [liste]
**Tactiques** : [2 actions]

[Répéter pour 4 situations]

### Protocole de récupération
[Routine de micro-pauses, exercices, etc.]`

  try {
    return await callClaude(prompt)
  } catch (error) {
    console.error("Erreur génération zones vigilance:", error)
    return "Erreur lors de la génération des zones de vigilance cognitive."
  }
}

/* ============================================================
   SECTION 5 — Environnements professionnels compatibles
============================================================ */
export function generateEnvironnementsCompatiblesSection(
  sig: CognitiveSignatureData
): string {
  const favorables: string[] = []
  const couteux: string[] = []

  if (sig.processingSpeed >= 60) {
    favorables.push("Rythme soutenu avec priorités claires")
  } else {
    couteux.push("Urgences constantes et imprévisibles")
  }

  if (sig.cognitiveFlexibility >= 60) {
    favorables.push("Variété de situations et ajustements fréquents")
  } else {
    couteux.push("Environnements instables sans repères")
  }

  if (sig.inhibitoryControl >= 60) {
    favorables.push("Cadres exigeants avec objectifs définis")
  } else {
    couteux.push("Distractions permanentes et interruptions multiples")
  }

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
