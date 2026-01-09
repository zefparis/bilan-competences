/**
 * PERSPECTA PDF - Processeur de données
 * Transformation des données brutes en données formatées pour le PDF
 */

import { ProfileData, JobCompatibility, CareerScenario, EnvironmentRecommendation } from '../data/types';
import { RiasecCode } from '../styles/tokens';
import { colors, riasecLabels } from '../styles/tokens';
import { optimizeRIASECProfile, type RIASECProfile } from './riasecOptimizer';

/**
 * Calcule les 3 dimensions RIASEC dominantes
 */
export function calculateDominantRiasec(riasec: ProfileData['riasec']): RiasecCode[] {
  const scores: { code: RiasecCode; score: number }[] = [
    { code: 'R', score: riasec.R },
    { code: 'I', score: riasec.I },
    { code: 'A', score: riasec.A },
    { code: 'S', score: riasec.S },
    { code: 'E', score: riasec.E },
    { code: 'C', score: riasec.C },
  ];

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.code);
}

/**
 * Génère la matrice de compatibilité métiers
 */
export function generateJobCompatibility(data: ProfileData): JobCompatibility[] {
  const { cognitive, riasec } = data;
  const jobs: JobCompatibility[] = [];

  // R&D Technique
  const rdScore = Math.min(5, Math.round(
    (riasec.I * 0.4 + riasec.R * 0.3 + cognitive.flexibility * 0.3) / 20
  ));
  jobs.push({
    family: 'R&D Technique',
    icon: '[R]',
    compatibility: Math.max(1, rdScore),
    why: cognitive.flexibility >= 70 ? 'Flexibilité + analyse profonde' : 'Rigueur analytique',
    vigilance: cognitive.processingSpeed < 30 ? 'Deadlines courts' : 'Pression constante',
  });

  // Management de projets
  const pmScore = Math.min(5, Math.round(
    (cognitive.inhibitoryControl * 0.4 + riasec.E * 0.3 + cognitive.flexibility * 0.3) / 20
  ));
  jobs.push({
    family: 'Management de projets',
    icon: '[M]',
    compatibility: Math.max(1, pmScore),
    why: cognitive.inhibitoryControl >= 70 ? 'Contrôle inhibiteur élevé' : 'Capacité d\'organisation',
    vigilance: 'Réunionnite intense',
  });

  // Consulting stratégique
  const consultScore = Math.min(5, Math.round(
    (riasec.I * 0.3 + riasec.E * 0.3 + cognitive.inhibitoryControl * 0.4) / 20
  ));
  jobs.push({
    family: 'Consulting strategique',
    icon: '[C]',
    compatibility: Math.max(1, consultScore),
    why: 'Pensée structurée',
    vigilance: cognitive.processingSpeed < 40 ? 'Clients impatients' : 'Charge variable',
  });

  // Entrepreneur
  const entrepScore = Math.min(5, Math.round(
    (riasec.E * 0.4 + cognitive.flexibility * 0.3 + riasec.R * 0.3) / 20
  ));
  jobs.push({
    family: 'Entrepreneur',
    icon: '[E]',
    compatibility: Math.max(1, entrepScore),
    why: riasec.E >= 60 ? 'Vision + engagement' : 'Autonomie valorisée',
    vigilance: cognitive.processingSpeed < 40 ? 'Exige rapidité' : 'Incertitude constante',
  });

  // Direction créative
  const creativeScore = Math.min(5, Math.round(
    (riasec.A * 0.4 + cognitive.flexibility * 0.3 + riasec.I * 0.3) / 20
  ));
  jobs.push({
    family: 'Direction creative',
    icon: '[D]',
    compatibility: Math.max(1, creativeScore),
    why: riasec.A >= 50 ? 'Créativité encadrée' : 'Vision stratégique',
    vigilance: 'Pression délais',
  });

  // Trier par compatibilité décroissante
  return jobs.sort((a, b) => b.compatibility - a.compatibility);
}

/**
 * Génère les scénarios d'évolution
 */
export function generateScenarios(data: ProfileData): CareerScenario[] {
  const { cognitive, riasec, career } = data;
  const dominant = riasec.dominant;

  const scenarios: CareerScenario[] = [];

  // Scénario 1: Continuité optimisée
  const continuityProb = Math.min(5, Math.round(
    (cognitive.inhibitoryControl * 0.4 + 50 + (career?.length || 0) * 10) / 25
  ));
  
  const continuityPositions = [];
  if (dominant.includes('I')) continuityPositions.push('Lead R&D Engineer');
  if (dominant.includes('E')) continuityPositions.push('Senior Product Manager');
  if (dominant.includes('R')) continuityPositions.push('Directeur Technique');
  if (continuityPositions.length === 0) continuityPositions.push('Expert Senior', 'Manager d\'équipe');

  scenarios.push({
    id: 1,
    title: 'CONTINUITÉ OPTIMISÉE',
    color: 'blue',
    horizon: '3-5 ans',
    probability: Math.max(3, continuityProb),
    description: 'Vous continuez sur votre trajectoire actuelle en optimisant votre environnement pour mieux exploiter vos forces cognitives. Cette voie offre stabilité et progression naturelle.',
    positions: continuityPositions.slice(0, 3),
    skills: ['Leadership transversal', 'Gestion budgétaire', 'Influence stratégique'],
  });

  // Scénario 2: Pivot stratégique
  const pivotProb = Math.min(5, Math.round(
    (cognitive.flexibility * 0.5 + riasec.I * 0.3 + 30) / 25
  ));

  const pivotPositions = [];
  if (riasec.I >= 60) pivotPositions.push('Data Scientist');
  if (riasec.E >= 60) pivotPositions.push('Consultant transformation digitale');
  if (riasec.A >= 50) pivotPositions.push('UX Strategist');
  if (pivotPositions.length === 0) pivotPositions.push('Product Manager (nouvelle industrie)', 'Business Developer');

  scenarios.push({
    id: 2,
    title: 'PIVOT STRATÉGIQUE',
    color: 'green',
    horizon: '2-4 ans',
    probability: Math.max(2, pivotProb),
    description: 'Vous réorientez votre carrière vers un domaine adjacent qui valorise davantage votre profil cognitif unique. Nécessite un investissement en formation mais ouvre de nouvelles opportunités.',
    positions: pivotPositions.slice(0, 3),
    skills: ['Certifications sectorielles', 'Upskilling technique', 'Nouveau réseau professionnel'],
  });

  // Scénario 3: Rupture innovante
  const ruptureProb = Math.min(5, Math.round(
    (riasec.E * 0.4 + cognitive.flexibility * 0.3 + riasec.A * 0.3) / 25
  ));

  scenarios.push({
    id: 3,
    title: 'RUPTURE INNOVANTE',
    color: 'orange',
    horizon: '5+ ans',
    probability: Math.max(2, ruptureProb),
    description: 'Vous créez votre propre structure ou rejoignez un projet entrepreneurial. Cette voie maximise votre autonomie mais demande une préparation importante.',
    positions: ['Entrepreneur', 'Consultant indépendant', 'Enseignant-chercheur'],
    skills: ['Constitution capital (12-18 mois)', 'Réseau solide', 'Mentorat entrepreneurial'],
  });

  return scenarios;
}

/**
 * Génère les recommandations d'environnements
 */
export function generateEnvironments(data: ProfileData): EnvironmentRecommendation[] {
  const { cognitive, riasec } = data;
  const environments: EnvironmentRecommendation[] = [];

  // Environnements favorables
  if (cognitive.flexibility >= 60 && cognitive.inhibitoryControl >= 50) {
    environments.push({
      type: 'favorable',
      icon: '+',
      name: 'PME innovantes (50-200 pers.)',
      reason: 'Structure + flexibilité',
      example: 'Scale-up tech B2B',
    });
  }

  if (riasec.I >= 60) {
    environments.push({
      type: 'favorable',
      icon: '+',
      name: 'Grands groupes avec labs innovation',
      reason: 'Ressources + créativité',
      example: 'Orange Innovation, Airbus X',
    });
  }

  if (cognitive.processingSpeed < 50 && riasec.I >= 50) {
    environments.push({
      type: 'favorable',
      icon: '+',
      name: 'Organismes de recherche appliquee',
      reason: 'Profondeur + impact',
      example: 'INRIA, CEA Tech',
    });
  }

  if (riasec.E >= 50 && cognitive.inhibitoryControl >= 60) {
    environments.push({
      type: 'favorable',
      icon: '+',
      name: 'Cabinets de conseil strategique',
      reason: 'Analyse + diversité missions',
      example: 'BCG, Bain, boutiques spécialisées',
    });
  }

  // Environnements à éviter
  if (cognitive.processingSpeed < 40) {
    environments.push({
      type: 'avoid',
      icon: '-',
      name: 'Trading floors / salles de marche',
      reason: 'Vitesse exigée incompatible',
    });
  }

  if (cognitive.flexibility < 50) {
    environments.push({
      type: 'avoid',
      icon: '-',
      name: 'Startups pre-seed en chaos',
      reason: 'Trop d\'imprévu non structuré',
    });
  }

  if (cognitive.flexibility >= 70) {
    environments.push({
      type: 'avoid',
      icon: '-',
      name: 'Organisations ultra-hierarchiques',
      reason: 'Bride flexibilité cognitive',
    });
  }

  if (cognitive.inhibitoryControl >= 70) {
    environments.push({
      type: 'avoid',
      icon: '-',
      name: 'Environnements micro-management',
      reason: 'Frustration autonomie/contrôle',
    });
  }

  return environments;
}

/**
 * Safely optimize RIASEC profile with error handling
 * Only optimizes if variance is too low (< 15%)
 */
function safeOptimizeRiasec(data: ProfileData): ProfileData {
  try {
    const { riasec } = data;
    const scores = [riasec.R, riasec.I, riasec.A, riasec.S, riasec.E, riasec.C];
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const variance = max - min;

    // Only optimize if profile is too flat (variance < 15%)
    if (variance < 15) {
      console.log('[DataProcessor] RIASEC variance too low:', variance, '- optimizing...');
      const optimized = optimizeRIASECProfile({
        R: riasec.R,
        I: riasec.I,
        A: riasec.A,
        S: riasec.S,
        E: riasec.E,
        C: riasec.C,
      });

      data.riasec = {
        R: optimized.R,
        I: optimized.I,
        A: optimized.A,
        S: optimized.S,
        E: optimized.E,
        C: optimized.C,
        dominant: calculateDominantRiasec({
          ...optimized,
          dominant: [],
        }),
      };
      console.log('[DataProcessor] RIASEC optimized:', data.riasec);
    }
  } catch (error) {
    console.warn('[DataProcessor] RIASEC optimization failed, using original:', error);
  }
  return data;
}

/**
 * Safely optimize cognitive profile with error handling
 * Only optimizes if all scores are around 50% (45-55%)
 */
function safeOptimizeCognitive(data: ProfileData): ProfileData {
  try {
    const { cognitive } = data;
    const scores = [
      cognitive.flexibility,
      cognitive.inhibitoryControl,
      cognitive.processingSpeed,
    ];

    // Check if all scores are around 50% (too uniform)
    const allNear50 = scores.every(s => s >= 45 && s <= 55);

    if (allNear50) {
      console.log('[DataProcessor] Cognitive scores too uniform - optimizing...');
      
      // Add variance based on relative differences
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      // Create differentiated scores
      const flexDiff = cognitive.flexibility - avgScore;
      const inhibDiff = cognitive.inhibitoryControl - avgScore;
      const speedDiff = cognitive.processingSpeed - avgScore;
      
      // Amplify differences and add some randomness for uniqueness
      const amplifier = 2.5;
      const randomOffset = () => Math.floor(Math.random() * 10) - 5;
      
      data.cognitive = {
        ...cognitive,
        flexibility: Math.max(30, Math.min(90, Math.round(50 + flexDiff * amplifier + randomOffset()))),
        inhibitoryControl: Math.max(30, Math.min(90, Math.round(50 + inhibDiff * amplifier + randomOffset() + 15))),
        processingSpeed: Math.max(30, Math.min(90, Math.round(50 + speedDiff * amplifier + randomOffset() - 10))),
      };
      
      // Ensure at least one strength (>= 65) and one area to improve (<= 45)
      const newScores = [data.cognitive.flexibility, data.cognitive.inhibitoryControl, data.cognitive.processingSpeed];
      if (!newScores.some(s => s >= 65)) {
        // Boost the highest
        const maxIdx = newScores.indexOf(Math.max(...newScores));
        if (maxIdx === 0) data.cognitive.flexibility = 72;
        else if (maxIdx === 1) data.cognitive.inhibitoryControl = 72;
        else data.cognitive.processingSpeed = 72;
      }
      if (!newScores.some(s => s <= 45)) {
        // Lower the lowest
        const minIdx = newScores.indexOf(Math.min(...newScores));
        if (minIdx === 0) data.cognitive.flexibility = 42;
        else if (minIdx === 1) data.cognitive.inhibitoryControl = 42;
        else data.cognitive.processingSpeed = 42;
      }
      
      console.log('[DataProcessor] Cognitive optimized:', data.cognitive);
    }
  } catch (error) {
    console.warn('[DataProcessor] Cognitive optimization failed, using original:', error);
  }
  return data;
}

/**
 * Enrichit les données du profil avec les données calculées
 */
export function enrichProfileData(data: ProfileData): ProfileData {
  // Apply safe optimizations with error handling
  data = safeOptimizeRiasec(data);
  data = safeOptimizeCognitive(data);

  // Calculer les dimensions dominantes si non fournies
  if (!data.riasec.dominant || data.riasec.dominant.length !== 3) {
    data.riasec.dominant = calculateDominantRiasec(data.riasec);
  }

  // Générer les données si non fournies
  if (!data.jobCompatibility) {
    data.jobCompatibility = generateJobCompatibility(data);
  }

  if (!data.scenarios) {
    data.scenarios = generateScenarios(data);
  }

  if (!data.environments) {
    data.environments = generateEnvironments(data);
  }

  return data;
}
