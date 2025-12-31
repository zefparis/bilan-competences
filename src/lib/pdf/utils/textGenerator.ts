/**
 * PERSPECTA PDF - Générateur de textes
 * Génération de textes personnalisés basés sur le profil
 */

import { ProfileData, CognitiveProfile, RiasecProfile } from '../data/types';
import { RiasecCode, riasecLabels } from '../styles/tokens';

/**
 * Génère la phrase signature du profil cognitif
 */
export function generateSignaturePhrase(cognitive: CognitiveProfile): string {
  const { flexibility, inhibitoryControl, processingSpeed } = cognitive;

  let mainTrait = '';
  let secondaryTrait = '';
  let pace = '';

  // Trait principal basé sur la flexibilité
  if (flexibility >= 80) {
    mainTrait = 'flexible et adaptable';
  } else if (flexibility >= 60) {
    mainTrait = 'équilibré et polyvalent';
  } else if (flexibility >= 40) {
    mainTrait = 'méthodique et structuré';
  } else {
    mainTrait = 'focalisé et spécialisé';
  }

  // Trait secondaire basé sur le contrôle inhibiteur
  if (inhibitoryControl >= 80) {
    secondaryTrait = 'avec une excellente capacité de concentration';
  } else if (inhibitoryControl >= 60) {
    secondaryTrait = 'avec un bon contrôle attentionnel';
  } else if (inhibitoryControl >= 40) {
    secondaryTrait = 'avec une attention modulable';
  } else {
    secondaryTrait = 'avec une pensée divergente';
  }

  // Rythme basé sur la vitesse
  if (processingSpeed >= 70) {
    pace = 'Vous excellez dans les environnements dynamiques qui demandent réactivité.';
  } else if (processingSpeed >= 40) {
    pace = 'Vous trouvez votre rythme entre réflexion et action.';
  } else {
    pace = 'Vous privilégiez la profondeur d\'analyse à la rapidité d\'exécution.';
  }

  return `Vous êtes un penseur ${mainTrait}, ${secondaryTrait}. ${pace}`;
}

/**
 * Génère l'analyse des forces
 */
export function generateStrengthsAnalysis(data: ProfileData): string {
  const { cognitive, riasec } = data;
  const dominant = riasec.dominant;

  const strengths: string[] = [];

  // Forces cognitives
  if (cognitive.flexibility >= 70) {
    strengths.push('une capacité d\'adaptation remarquable face aux changements');
  }
  if (cognitive.inhibitoryControl >= 70) {
    strengths.push('une concentration soutenue même en environnement perturbé');
  }
  if (cognitive.processingSpeed >= 70) {
    strengths.push('une rapidité de traitement qui vous permet de gérer l\'urgence');
  }
  if (cognitive.processingSpeed < 30 && cognitive.inhibitoryControl >= 60) {
    strengths.push('une approche analytique approfondie qui minimise les erreurs');
  }

  // Forces RIASEC
  if (dominant.includes('R') && dominant.includes('I')) {
    strengths.push('une combinaison rare de pragmatisme et de curiosité intellectuelle');
  }
  if (dominant.includes('E') && dominant.includes('S')) {
    strengths.push('un leadership naturel orienté vers les autres');
  }
  if (dominant.includes('A') && dominant.includes('I')) {
    strengths.push('une créativité nourrie par la réflexion analytique');
  }

  if (strengths.length === 0) {
    strengths.push('un profil équilibré qui vous permet de vous adapter à diverses situations');
  }

  return `Votre combinaison unique de flexibilité cognitive (${cognitive.flexibility.toFixed(1)}%) et de contrôle inhibiteur (${cognitive.inhibitoryControl.toFixed(1)}%) vous confère ${strengths.join(', ')}. Cette configuration cognitive est particulièrement adaptée aux rôles qui valorisent ${cognitive.flexibility >= 60 ? 'la polyvalence' : 'l\'expertise approfondie'}.`;
}

/**
 * Génère l'analyse du sweet spot
 */
export function generateSweetSpot(data: ProfileData): string {
  const { cognitive, riasec } = data;
  const dominant = riasec.dominant;

  const characteristics: string[] = [];
  const avoidances: string[] = [];

  // Caractéristiques positives
  if (cognitive.flexibility >= 70) {
    characteristics.push('Gestion de projets multiples');
  }
  if (cognitive.inhibitoryControl >= 70) {
    characteristics.push('Travail de fond nécessitant concentration');
  }
  if (cognitive.processingSpeed < 40) {
    characteristics.push('Analyse approfondie et décisions stratégiques');
  }
  if (cognitive.processingSpeed >= 60) {
    characteristics.push('Environnements dynamiques et réactifs');
  }

  // Environnements à éviter
  if (cognitive.processingSpeed < 30) {
    avoidances.push('Environnements ultra-rapides avec micro-décisions en continu');
  }
  if (cognitive.flexibility < 40) {
    avoidances.push('Rôles nécessitant des changements de contexte fréquents');
  }
  if (cognitive.inhibitoryControl < 40) {
    avoidances.push('Open spaces bruyants sans possibilité d\'isolement');
  }

  const charText = characteristics.length > 0 
    ? `• ${characteristics.join('\n• ')}`
    : '• Rôles équilibrés sans exigences extrêmes';

  const avoidText = avoidances.length > 0
    ? avoidances.join(', ')
    : 'Environnements trop rigides ou trop chaotiques';

  return `Vos meilleures performances seront dans des rôles combinant :

${charText}

Evitez : ${avoidText}`;
}

/**
 * Génère l'analyse de trajectoire
 */
export function generateTrajectoryAnalysis(data: ProfileData): string {
  const { career, cognitive, riasec } = data;

  if (!career || career.length === 0) {
    return `Votre profil cognitif suggère une affinité naturelle pour des rôles combinant ${riasec.dominant.map(c => riasecLabels[c].toLowerCase()).join(' et ')}. Vos forces en ${cognitive.flexibility >= 60 ? 'flexibilité' : 'concentration'} vous prédisposent à exceller dans des environnements qui valorisent ${cognitive.processingSpeed >= 50 ? 'la réactivité' : 'la réflexion approfondie'}.`;
  }

  const roles = career.map(c => c.role).join(', ');
  const hasProgression = career.length >= 2;

  let analysis = `Votre parcours (${roles}) `;

  if (hasProgression) {
    analysis += `montre une progression cohérente qui s'appuie sur vos forces cognitives naturelles. `;
  } else {
    analysis += `révèle une expertise qui s'aligne avec votre profil cognitif. `;
  }

  // Analyse de l'alignement
  const alignmentFactors: string[] = [];
  
  if (cognitive.flexibility >= 70) {
    alignmentFactors.push('Flexibilité pour naviguer entre différents contextes');
  }
  if (cognitive.inhibitoryControl >= 70) {
    alignmentFactors.push('Contrôle pour maintenir la qualité sous pression');
  }
  if (cognitive.processingSpeed < 40) {
    alignmentFactors.push('Approche analytique pour des décisions éclairées');
  }

  if (alignmentFactors.length > 0) {
    analysis += `Cette evolution s'appuie sur :\n\n- ${alignmentFactors.join('\n- ')}`;
  }

  return analysis;
}

/**
 * Génère l'analyse des vigilances
 */
export function generateVigilanceAnalysis(data: ProfileData): string {
  const { cognitive } = data;
  const vigilances: string[] = [];

  if (cognitive.processingSpeed < 30) {
    vigilances.push('Votre vitesse de traitement suggère de négocier des délais raisonnables et d\'éviter les environnements qui exigent des décisions instantanées.');
  }

  if (cognitive.flexibility >= 80) {
    vigilances.push('Votre haute flexibilité peut vous rendre vulnérable à la dispersion. Limitez-vous à 3 projets simultanés maximum.');
  }

  if (cognitive.inhibitoryControl < 50) {
    vigilances.push('Votre contrôle inhibiteur modéré suggère de privilégier des environnements calmes pour le travail de fond.');
  }

  if (vigilances.length === 0) {
    vigilances.push('Votre profil est relativement équilibré. Restez attentif à ne pas vous surcharger et maintenez des pauses régulières.');
  }

  return vigilances.join('\n\n');
}

/**
 * Génère tous les textes personnalisés
 */
export function generateAllTexts(data: ProfileData): ProfileData['generatedTexts'] {
  return {
    signaturePhrase: generateSignaturePhrase(data.cognitive),
    strengthsAnalysis: generateStrengthsAnalysis(data),
    vigilanceAnalysis: generateVigilanceAnalysis(data),
    trajectoryAnalysis: generateTrajectoryAnalysis(data),
    sweetSpot: generateSweetSpot(data),
  };
}
