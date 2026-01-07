// src/lib/general-report-sections.ts

import { callClaude } from "./ai-helper";
import type { CompleteReportInput } from '@/types/report';

export interface GeneralReportInput extends Omit<CompleteReportInput, 'user'> {
  userName?: string;
  age?: number;
  occupation?: string;
  experience?: string;
}

export interface GeneralReportSections {
  cadre: string;
  synthese: string;
  valeurs_professionnelles: string;
  parcours_professionnel: string;
  croisement_riasec: string;
  scenarios: string;
  environnements_compatibles: string;
}

/**
 * Génère la section "Cadre stratégique"
 */
async function generateCadreStrategique(
  input: GeneralReportInput
): Promise<string> {
  const prompt = `Tu es un consultant en orientation professionnelle spécialisé en psychologie cognitive et bilan de compétences.

**CONTEXTE**
Profil utilisateur :
${input.userName ? `- Nom : ${input.userName}` : ""}
${input.age ? `- Âge : ${input.age} ans` : ""}
${input.occupation ? `- Fonction actuelle : ${input.occupation}` : ""}
${input.experience ? `- Expérience : ${input.experience}` : ""}

Signature cognitive (scores sur 100) :
- Contrôle inhibiteur : ${input.cognitive.inhibitoryControl}/100
- Vitesse de traitement : ${input.cognitive.processingSpeed}/100
- Flexibilité cognitive : ${input.cognitive.cognitiveFlexibility}/100
- Fluidité d'accès : ${input.cognitive.accessFluency}/100
- Dérive attentionnelle : ${input.cognitive.attentionDrift}/100

Profil RIASEC (scores sur 100) :
- Réaliste (R) : ${input.riasec.realistic}/100
- Investigateur (I) : ${input.riasec.investigative}/100
- Artistique (A) : ${input.riasec.artistic}/100
- Social (S) : ${input.riasec.social}/100
- Entreprenant (E) : ${input.riasec.enterprising}/100
- Conventionnel (C) : ${input.riasec.conventional}/100

**CONSIGNE**
Rédige la section "Cadre stratégique" (800-1000 mots) qui :

1. Explique le contexte et l'objectif de ce bilan cognitif professionnel
2. Présente brièvement la méthodologie PERSPECTA (croisement cognition × intérêts)
3. Décrit les bénéfices attendus pour le bénéficiaire
4. Pose le cadre de lecture des sections suivantes

**FORMAT**
- 4-5 paragraphes fluides et professionnels
- Ton bienveillant et expert
- Pas de bullet points, uniquement de la prose
- Éviter le jargon technique excessif

**IMPORTANT**
- Ne mentionne PAS les scores bruts dans cette section
- Reste général et introductif
- Prépare le terrain pour l'analyse détaillée à suivre`;

  try {
    return await callClaude(
      prompt,
      "Tu es un expert en orientation professionnelle et psychologie cognitive."
    );
  } catch (error) {
    console.error("❌ Erreur génération cadre stratégique:", error);
    // Fallback content
    return `Ce bilan cognitif professionnel PERSPECTA vise à éclairer votre réflexion professionnelle en croisant votre fonctionnement cognitif avec vos intérêts professionnels selon le modèle RIASEC.

L'analyse repose sur une mesure de vos fonctions exécutives (contrôle inhibiteur, vitesse de traitement, flexibilité cognitive, fluidité d'accès) et de vos préférences d'activité professionnelle.

Cette approche permet d'identifier les environnements dans lesquels vos ressources cognitives pourront s'exprimer pleinement, sans coût d'adaptation excessif.`;
  }
}

/**
 * Génère la section "Synthèse générale"
 */
async function generateSyntheseGenerale(
  input: GeneralReportInput
): Promise<string> {
  const prompt = `Tu es un consultant en orientation professionnelle.

**DONNÉES**
Signature cognitive :
${JSON.stringify(input.cognitive, null, 2)}

Profil RIASEC :
${JSON.stringify(input.riasec, null, 2)}

**CONSIGNE**
Rédige une synthèse générale (1000-1200 mots) qui :

1. **Profil cognitif dominant** : Identifie les 2-3 dimensions cognitives les plus marquantes (hautes ou basses) et leur signification
2. **Profil RIASEC dominant** : Identifie le code Holland (3 lettres dominantes) et leurs implications professionnelles
3. **Cohérence globale** : Analyse la cohérence entre profil cognitif et intérêts professionnels
4. **Messages clés** : 3-4 insights stratégiques pour l'orientation

**FORMAT**
- Prose fluide en 5-6 paragraphes
- Utilise des transitions naturelles
- Ton professionnel mais accessible
- Aucun bullet point

**INTERDICTIONS**
- Ne liste pas les scores en tableaux
- Ne fais pas de liste à puces
- Évite les répétitions`;

  try {
    return await callClaude(
      prompt,
      "Tu es un psychologue du travail expert en orientation professionnelle."
    );
  } catch (error) {
    console.error("❌ Erreur génération synthèse:", error);
    // Fallback content
    return `Votre profil cognitif présente des caractéristiques spécifiques qui orientent vers certains types d'environnements professionnels. 

Les dimensions mesurées (contrôle inhibiteur à ${input.cognitive.inhibitoryControl}%, vitesse de traitement à ${input.cognitive.processingSpeed}%, flexibilité cognitive à ${input.cognitive.cognitiveFlexibility}%) dessinent un fonctionnement cognitif qui trouve sa cohérence dans le croisement avec vos préférences d'activité professionnelle.

Votre profil RIASEC révèle des préférences marquées qui, articulées avec votre architecture cognitive, suggèrent des voies d'orientation à explorer. Cette combinaison unique constitue une signature professionnelle distinctive qui mérite d'être valorisée dans votre évolution de carrière.`;
  }
}

/**
 * Génère la section "Croisement Cognition × RIASEC"
 */
async function generateCroisementRIASEC(
  input: GeneralReportInput
): Promise<string> {
  const topRIASEC = Object.entries(input.riasec)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type);

  const prompt = `Tu es un psychologue du travail expert en orientation.

**DONNÉES**
Cognition :
${JSON.stringify(input.cognitive, null, 2)}

RIASEC (top 3: ${topRIASEC.join(", ")}) :
${JSON.stringify(input.riasec, null, 2)}

**CONSIGNE**
Rédige l'analyse croisée Cognition × RIASEC (1200-1500 mots) :

1. **Synergies** : Comment les forces cognitives soutiennent les intérêts RIASEC dominants ?
   Exemple : Flexibilité cognitive élevée + profil Artistique → capacité d'innovation

2. **Tensions potentielles** : Y a-t-il des décalages entre cognition et intérêts ?
   Exemple : Vitesse de traitement basse + profil Entreprenant → défis dans rythme commercial

3. **Recommandations d'alignement** : Comment optimiser la cohérence profil cognitif/intérêts ?

4. **Illustrations concrètes** : Donne 2-3 exemples de métiers/environnements qui incarnent cette cohérence

**FORMAT**
- 6-7 paragraphes structurés
- Transitions fluides entre idées
- Approche analytique mais pédagogique
- Pas de listes, uniquement de la prose

**ATTENDU**
- Profondeur d'analyse
- Exemples concrets
- Nuances (pas de jugement binaire)`;

  try {
    return await callClaude(
      prompt,
      "Tu es un expert en psychologie différentielle et orientation professionnelle."
    );
  } catch (error) {
    console.error("❌ Erreur génération croisement RIASEC:", error);
    // Fallback content
    return `L'articulation entre votre fonctionnement cognitif et vos intérêts professionnels révèle des synergies potentielles.

Les dimensions cognitives les plus développées soutiennent vos préférences d'activité dominantes, créant des conditions favorables pour certains types d'environnements professionnels.

Il existe également des zones de tension potentielle à anticiper, où l'écart entre ressources cognitives et exigences professionnelles pourrait nécessiter des stratégies d'adaptation spécifiques.`;
  }
}

/**
 * Génère la section "Scénarios professionnels"
 */
async function generateScenariosProfessionnels(
  input: GeneralReportInput
): Promise<string> {
  const prompt = `Tu es un conseiller en évolution professionnelle.

**PROFIL COMPLET**
${JSON.stringify({ cognitive: input.cognitive, riasec: input.riasec }, null, 2)}

**CONSIGNE**
Propose 3 scénarios professionnels concrets (1500-1800 mots au total) :

**SCÉNARIO 1 : Continuité optimisée**
- Aligné avec le profil actuel
- Exploite les forces principales
- Évolutions possibles sur 3-5 ans
- Exemples de postes/secteurs

**SCÉNARIO 2 : Pivot stratégique**
- Mobilise compétences transférables
- Ouvre vers nouveaux horizons
- Nécessite formation/adaptation
- Exemples de transitions réalistes

**SCÉNARIO 3 : Rupture innovante**
- Explore chemins moins conventionnels
- Croise plusieurs dimensions du profil
- Nécessite audace/préparation
- Exemples de parcours atypiques

**FORMAT**
- Chaque scénario = 2-3 paragraphes
- Prose narrative (pas de bullet points)
- Ton inspirant mais réaliste
- Mentionner risques ET opportunités

**EXIGENCE**
- Scénarios DISTINCTS et crédibles
- Basés sur données cognitives + RIASEC
- Exemples de métiers précis (pas "secteur tech")`;

  try {
    return await callClaude(
      prompt,
      "Tu es un conseiller en évolution professionnelle spécialisé dans les transitions de carrière."
    );
  } catch (error) {
    console.error("❌ Erreur génération scénarios:", error);
    // Fallback content
    return `Plusieurs trajectoires professionnelles s'offrent à vous en fonction de votre profil.

Un premier scénario de continuité permettrait d'optimiser vos ressources actuelles dans des environnements alignés avec vos forces cognitives.

Un second scénario de pivot stratégique mobiliserait vos compétences transférables vers de nouveaux horizons nécessitant une adaptation progressive.

Un troisième scénario de rupture innovante explorerait des chemins moins conventionnels, croisant plusieurs dimensions de votre profil de manière originale.`;
  }
}

/**
 * Génère la section "Environnements professionnels compatibles"
 */
async function generateEnvironnementsCompatibles(
  input: GeneralReportInput
): Promise<string> {
  const prompt = `Tu es un expert en psychologie des organisations.

**PROFIL**
${JSON.stringify({ cognitive: input.cognitive, riasec: input.riasec }, null, 2)}

**CONSIGNE**
Décris les environnements professionnels compatibles (1000-1200 mots) :

1. **Culture organisationnelle** : Quel type de culture d'entreprise convient ?
   (hiérarchie vs. horizontalité, stabilité vs. disruption, individuel vs. collectif)

2. **Rythme et structure** : Quel cadre de travail optimal ?
   (routines vs. imprévu, deadlines serrés vs. long terme, autonomie vs. encadrement)

3. **Modalités de collaboration** : Quelles interactions sociales ?
   (solo vs. équipe, leadership vs. exécution, communication fréquente vs. concentration)

4. **Rapport à l'innovation** : Quel degré de changement ?
   (processus établis vs. expérimentation, optimisation vs. création)

5. **Exemples d'environnements** : 3-4 types d'organisations concrètes (startup, grand groupe, PME, etc.)

**FORMAT**
- 5-6 paragraphes thématiques
- Prose argumentée (pas de listes)
- Nuances (pas de jugement absolu)
- Exemples contextualisés

**IMPORTANT**
- Justifier chaque recommandation par le profil
- Mentionner environnements À ÉVITER si pertinent
- Rester pragmatique (pas utopique)`;

  try {
    return await callClaude(
      prompt,
      "Tu es un consultant en psychologie des organisations et management."
    );
  } catch (error) {
    console.error("❌ Erreur génération environnements:", error);
    // Fallback content
    return `Les environnements professionnels compatibles avec votre profil présentent certaines caractéristiques structurelles.

En termes de culture organisationnelle, certains types d'organisations correspondent mieux à votre fonctionnement cognitif et à vos préférences d'activité.

Le rythme de travail, les modalités de collaboration et le rapport à l'innovation constituent des paramètres importants à considérer dans votre recherche d'alignement professionnel.

Des environnements spécifiques (startups, grands groupes, PME, secteur public) présentent des avantages et contraintes différenciés selon votre profil.`;
  }
}

/**
 * NOUVELLE SECTION : Valeurs professionnelles
 */
async function generateValeursProfessionnelles(
  input: GeneralReportInput
): Promise<string> {
  if (!input.values || input.values.values.length === 0) {
    return "Cette section nécessite la complétion du module de tri des valeurs professionnelles. Les valeurs professionnelles constituent un pilier essentiel de l'orientation, permettant d'identifier les environnements organisationnels alignés avec vos priorités personnelles.";
  }

  const topValues = input.values.values.slice(0, 5);
  const valuesText = topValues.map(v => `${v.name} (priorité: ${v.order}, satisfaction actuelle: ${v.gapScore}/5)`).join('\n');

  const prompt = `Tu es un consultant en orientation professionnelle spécialisé en psychologie du travail.

**PROFIL COMPLET**
Signature cognitive :
${JSON.stringify(input.cognitive, null, 2)}

Profil RIASEC :
${JSON.stringify(input.riasec, null, 2)}

**VALEURS PROFESSIONNELLES (Top 5 par ordre de priorité)**
${valuesText}

**CONSIGNE**
Rédige une analyse approfondie des valeurs professionnelles (800-1000 mots) qui :

1. **Hiérarchie des valeurs** : Analyse des 5 valeurs prioritaires, leur signification profonde et ce qu'elles révèlent sur les motivations intrinsèques
2. **Alignement cognitif** : Comment le profil cognitif (contrôle inhibiteur, flexibilité, vitesse) soutient naturellement ces valeurs
3. **Cohérence RIASEC** : Liens entre les valeurs exprimées et les intérêts professionnels dominants
4. **Analyse des écarts** : Pour les valeurs avec faible satisfaction (gapScore < 3), identifier les sources de tension et proposer des axes d'amélioration concrets
5. **Environnements alignés** : Types d'organisations, cultures d'entreprise et modalités de travail qui honorent ces valeurs

**FORMAT**
- 5-6 paragraphes en prose fluide et professionnelle
- Ton bienveillant, analytique et constructif
- Pas de bullet points, uniquement de la prose
- Exemples concrets d'environnements, secteurs ou types de postes

**IMPORTANT**
- Ne pas juger les valeurs (toutes sont légitimes)
- Systématiquement relier chaque valeur au profil cognitif ET aux intérêts RIASEC
- Pour les gaps importants (≥2 points), proposer des stratégies d'action réalistes
- Valoriser la cohérence ou expliquer les tensions constructivement`;

  try {
    return await callClaude(
      prompt,
      "Tu es un expert en psychologie du travail et orientation professionnelle, spécialisé dans l'analyse des valeurs et leur impact sur la satisfaction professionnelle."
    );
  } catch (error) {
    console.error("❌ Erreur génération valeurs:", error);
    // Fallback content
    return `Vos valeurs professionnelles constituent un pilier essentiel de votre épanouissement au travail.

L'analyse de vos valeurs prioritaires révèle les moteurs profonds qui animent votre engagement professionnel et guident vos choix de carrière.

L'alignement entre vos valeurs fondamentales et votre environnement de travail constitue un facteur déterminant de votre satisfaction et de votre performance professionnelle.`;
  }
}

/**
 * NOUVELLE SECTION : Parcours professionnel et compétences
 */
async function generateParcoursProfessionnel(
  input: GeneralReportInput
): Promise<string> {
  if (!input.experiences || input.experiences.experiences.length === 0) {
    return "Cette section nécessite la complétion du module d'expériences professionnelles. L'analyse du parcours permet d'identifier les patterns de réussite, les compétences transférables et les trajectoires d'évolution cohérentes avec votre profil.";
  }

  const experiencesText = input.experiences.experiences
    .slice(0, 5)
    .map(e => 
      `**${e.title}** chez ${e.company} (${e.startDate.getFullYear()}${e.endDate ? `-${e.endDate.getFullYear()}` : ''})\n` +
      `Compétences mobilisées: ${e.skills.slice(0, 5).join(', ')}\n` +
      `Résultat obtenu: ${e.result.substring(0, 200)}${e.result.length > 200 ? '...' : ''}` 
    ).join('\n\n');

  const prompt = `Tu es un conseiller en évolution professionnelle et expert en analyse de parcours.

**PROFIL COMPLET**
Signature cognitive :
${JSON.stringify(input.cognitive, null, 2)}

Profil RIASEC :
${JSON.stringify(input.riasec, null, 2)}

**EXPÉRIENCES PROFESSIONNELLES (extraits)**
${experiencesText}

**CONSIGNE**
Rédige une analyse stratégique du parcours professionnel (1000-1200 mots) qui :

1. **Fil conducteur** : Identifier la cohérence narrative dans le parcours, les thématiques récurrentes, les fils rouges qui relient les expériences
2. **Cartographie des compétences** : Analyser les compétences récurrentes et les relier explicitement aux dimensions cognitives (ex: compétences analytiques ↔ contrôle inhibiteur élevé)
3. **Patterns de réussite** : Identifier les contextes, types de missions et environnements où la personne excelle, en croisant les résultats obtenus avec le profil RIASEC
4. **Développement cognitif** : Expliquer comment les expériences ont probablement renforcé ou sollicité certaines dimensions cognitives
5. **Trajectoire future** : Proposer 2-3 évolutions de carrière logiques basées sur l'historique + le profil cognitif/RIASEC (continuité, pivot, rupture)

**FORMAT**
- 6-7 paragraphes structurés en prose
- Ton valorisant mais réaliste et analytique
- Pas de listes à puces, uniquement de la prose narrative
- Citer spécifiquement des éléments des expériences (postes, résultats, compétences)

**IMPORTANT**
- Valoriser les résultats concrets (méthode STAR)
- Établir des liens explicites : compétences démontrées → cognition → RIASEC
- Proposer des évolutions cohérentes avec l'historique ET le profil
- Identifier les compétences transférables vers d'autres secteurs/métiers`;

  try {
    return await callClaude(
      prompt,
      "Tu es un expert en gestion de carrière, analyse de parcours professionnels et conseil en évolution. Tu maîtrises l'approche par compétences et l'analyse des trajectoires."
    );
  } catch (error) {
    console.error("❌ Erreur génération parcours:", error);
    // Fallback content
    return `Votre parcours professionnel dessine une trajectoire cohérente marquée par des expériences significatives et des apprentissages continus.

L'analyse de vos expériences passées met en évidence des compétences transférables et des patterns de réussite qui peuvent être valorisés dans votre évolution professionnelle.

Les leçons tirées de votre parcours constituent un atout précis pour orienter vos prochains choix stratégiques et optimiser votre développement professionnel.`;
  }
}

/**
 * Fonction principale - génère toutes les sections générales
 */
export async function generateGeneralReport(
  input: GeneralReportInput
): Promise<GeneralReportSections> {
  console.log("🚀 Génération sections générales avec Claude 3.5 Sonnet...");

  try {
    // Génération en parallèle pour optimiser le temps
    const [cadre, synthese, valeurs, parcours, croisement, scenarios, environnements] =
      await Promise.all([
        generateCadreStrategique(input),
        generateSyntheseGenerale(input),
        generateValeursProfessionnelles(input),
        generateParcoursProfessionnel(input),
        generateCroisementRIASEC(input),
        generateScenariosProfessionnels(input),
        generateEnvironnementsCompatibles(input),
      ]);

    // Validation
    const sections = {
      cadre,
      synthese,
      valeurs_professionnelles: valeurs,
      parcours_professionnel: parcours,
      croisement_riasec: croisement,
      scenarios,
      environnements_compatibles: environnements,
    };

    // Vérifier que toutes les sections ont du contenu
    const empty = Object.entries(sections)
      .filter(([, content]) => !content || content.length < 50) // Réduire à 50 caractères pour les fallbacks
      .map(([key]) => key);

    if (empty.length > 0) {
      console.error("❌ Sections vides ou trop courtes:", empty);
      console.warn("⚠️ Utilisation du rapport de fallback");
      return generateFallbackReport(input);
    }

    console.log("✅ Sections générales générées avec succès");
    return sections;
  } catch (error) {
    console.error("❌ Erreur génération rapport général:", error);
    console.warn("⚠️ Utilisation du rapport de fallback en raison d'erreur");
    return generateFallbackReport(input);
  }
}

// Dans src/lib/general-report-sections.ts - AJOUTER à la fin

/**
 * Génère un rapport de secours en cas d'échec API
 */
export function generateFallbackReport(input: GeneralReportInput): GeneralReportSections {
  return {
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

Des environnements spécifiques (startups, grands groupes, PME, secteur public) présentent des avantages et contraintes différenciés selon votre profil.`
  };
}