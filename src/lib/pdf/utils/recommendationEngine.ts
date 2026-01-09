/**
 * Personalized Recommendation Engine
 * Generates formations, books, tools based on profile matching
 */

import { RIASECProfile, RIASECCode, getDominantDimensions } from './riasecOptimizer';
import { CognitiveScores } from './cognitiveOptimizer';

export interface Formation {
  name: string;
  provider: string;
  url: string;
  duration: string;
  cost: string;
  matchScore: number;
  reason: string;
  riasecMatch: RIASECCode[];
  cognitiveRequirements: Partial<Record<keyof CognitiveScores, number>>;
}

export interface Book {
  title: string;
  author: string;
  reason: string;
  riasecMatch: RIASECCode[];
}

export interface Tool {
  name: string;
  url: string;
  cost: string;
  usage: string;
}

export interface PersonalizedRecommendations {
  formations: Formation[];
  books: Book[];
  tools: Tool[];
}

const ALL_FORMATIONS: Omit<Formation, 'matchScore'>[] = [
  // INVESTIGATIF (I)
  {
    name: 'Data Analysis with Python',
    provider: 'IBM | Coursera',
    url: 'https://coursera.org/professional-certificates/ibm-data-analyst',
    duration: '4 semaines, 5h/semaine',
    cost: 'Certification 39€',
    reason: 'Approfondit analyse quantitative (profil I)',
    riasecMatch: ['I'],
    cognitiveRequirements: { inhibitoryControl: 60, decisionSpeed: 40 },
  },
  {
    name: 'Machine Learning Specialization',
    provider: 'Stanford | Coursera',
    url: 'https://coursera.org/specializations/machine-learning',
    duration: '3 mois, 10h/semaine',
    cost: '49€/mois',
    reason: 'Recherche avancée (I) + résolution problèmes complexes',
    riasecMatch: ['I'],
    cognitiveRequirements: { inhibitoryControl: 70, workingMemory: 60 },
  },
  {
    name: 'UX Research Methods',
    provider: 'Nielsen Norman Group',
    url: 'https://nngroup.com/courses/',
    duration: '2 jours intensif',
    cost: '1200€',
    reason: 'Investigation utilisateur (I) + créativité (A)',
    riasecMatch: ['I', 'A'],
    cognitiveRequirements: { workingMemory: 55 },
  },

  // ENTREPRENANT (E)
  {
    name: 'Strategic Leadership',
    provider: 'HEC Paris | Coursera',
    url: 'https://coursera.org/learn/strategic-leadership',
    duration: '8 semaines, 4h/semaine',
    cost: 'Audit gratuit',
    reason: 'Développe leadership (E) et structuration (C)',
    riasecMatch: ['E', 'C'],
    cognitiveRequirements: { decisionSpeed: 50 },
  },
  {
    name: 'Entrepreneurship Essentials',
    provider: 'Harvard Business School',
    url: 'https://online.hbs.edu/courses/entrepreneurship-essentials/',
    duration: '4 semaines',
    cost: '1500€',
    reason: 'Initiative entrepreneuriale (E élevé)',
    riasecMatch: ['E'],
    cognitiveRequirements: { decisionSpeed: 60, workingMemory: 50 },
  },
  {
    name: 'Negotiation Mastery',
    provider: 'Yale | Coursera',
    url: 'https://coursera.org/learn/negotiation',
    duration: '6 semaines, 3h/semaine',
    cost: 'Gratuit (certification 49€)',
    reason: 'Influence et persuasion (E)',
    riasecMatch: ['E', 'S'],
    cognitiveRequirements: { inhibitoryControl: 55 },
  },

  // CONVENTIONNEL (C)
  {
    name: 'Project Management Professional (PMP)',
    provider: 'PMI',
    url: 'https://pmi.org/certifications/project-management-pmp',
    duration: '35h cours + exam',
    cost: '555€',
    reason: 'Structure et processus (C) + gestion (E)',
    riasecMatch: ['C', 'E'],
    cognitiveRequirements: { inhibitoryControl: 65, workingMemory: 60 },
  },
  {
    name: 'Six Sigma Green Belt',
    provider: 'ASQ',
    url: 'https://asq.org/cert/six-sigma-green-belt',
    duration: '40h préparation',
    cost: '438€',
    reason: 'Optimisation processus (C)',
    riasecMatch: ['C', 'I'],
    cognitiveRequirements: { inhibitoryControl: 60 },
  },

  // ARTISTIQUE (A)
  {
    name: 'Design Thinking',
    provider: 'Stanford d.school | Coursera',
    url: 'https://coursera.org/learn/design-thinking-innovation',
    duration: '6 semaines, 3h/semaine',
    cost: 'Gratuit',
    reason: 'Créativité (A) + investigation (I)',
    riasecMatch: ['A', 'I'],
    cognitiveRequirements: { workingMemory: 55 },
  },
  {
    name: 'Creative Problem Solving',
    provider: 'University of Minnesota',
    url: 'https://coursera.org/learn/creative-problem-solving',
    duration: '4 semaines',
    cost: 'Gratuit (certification 49€)',
    reason: 'Innovation et créativité (A)',
    riasecMatch: ['A'],
    cognitiveRequirements: { decisionSpeed: 50 },
  },

  // SOCIAL (S)
  {
    name: 'Coaching & Mentoring',
    provider: 'ICF',
    url: 'https://coachingfederation.org/credentials-and-standards',
    duration: '60h + supervision',
    cost: '2500€',
    reason: 'Accompagnement humain (S élevé)',
    riasecMatch: ['S'],
    cognitiveRequirements: { workingMemory: 60, verbalFluency: 50 },
  },
  {
    name: 'Facilitation Skills',
    provider: 'IAF',
    url: 'https://iaf-world.org/site/professional/cpf',
    duration: '3 jours',
    cost: '1200€',
    reason: 'Animation groupes (S) + structuration (C)',
    riasecMatch: ['S', 'C'],
    cognitiveRequirements: { verbalFluency: 55 },
  },

  // RÉALISTE (R)
  {
    name: 'AWS Certified Solutions Architect',
    provider: 'Amazon Web Services',
    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    duration: '40h préparation',
    cost: '150€ exam',
    reason: 'Mise en œuvre technique (R) + analyse (I)',
    riasecMatch: ['R', 'I'],
    cognitiveRequirements: { inhibitoryControl: 60 },
  },
  {
    name: 'DevOps Foundation',
    provider: 'DevOps Institute',
    url: 'https://devopsinstitute.com/certifications/devops-foundation/',
    duration: '2 jours',
    cost: '600€',
    reason: 'Pratique opérationnelle (R)',
    riasecMatch: ['R', 'C'],
    cognitiveRequirements: { inhibitoryControl: 55 },
  },
];

const ALL_BOOKS: Book[] = [
  {
    title: 'Range: Why Generalists Triumph',
    author: 'David Epstein',
    reason: 'Valorise généralistes (flexibilité cognitive)',
    riasecMatch: ['I', 'A'],
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    reason: 'Concentration profonde (contrôle inhibiteur élevé)',
    riasecMatch: ['I', 'C'],
  },
  {
    title: 'The Startup of You',
    author: 'Reid Hoffman',
    reason: 'Mindset entrepreneurial (E élevé)',
    riasecMatch: ['E'],
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    reason: 'Systèmes et processus (C élevé)',
    riasecMatch: ['C'],
  },
  {
    title: 'Creativity Inc',
    author: 'Ed Catmull',
    reason: 'Innovation et leadership créatif',
    riasecMatch: ['A', 'E'],
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    reason: 'Compréhension biais cognitifs (I)',
    riasecMatch: ['I'],
  },
  {
    title: 'Dare to Lead',
    author: 'Brené Brown',
    reason: 'Leadership vulnérable (S + E)',
    riasecMatch: ['S', 'E'],
  },
  {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    reason: 'Méthodologie entrepreneuriale (E)',
    riasecMatch: ['E', 'R'],
  },
];

/**
 * Generate personalized recommendations based on profile
 */
export function generatePersonalizedRecommendations(
  riasecProfile: RIASECProfile,
  cognitiveScores: CognitiveScores,
  careerGaps: string[]
): PersonalizedRecommendations {
  const dominantRiasec = getDominantDimensions(riasecProfile);

  // Score formations
  const scoredFormations = ALL_FORMATIONS.map(formation => {
    let score = 0;

    // 1. RIASEC match (40 points max)
    formation.riasecMatch.forEach(dimension => {
      if (dominantRiasec.includes(dimension)) {
        score += 20;
      }
    });

    // 2. Cognitive requirements (30 points max)
    Object.entries(formation.cognitiveRequirements).forEach(([dim, req]) => {
      const userScore = cognitiveScores[dim as keyof CognitiveScores];
      if (userScore >= req) {
        score += 10;
      } else if (userScore >= req - 10) {
        score += 5;
      }
    });

    // 3. Career gap filling (30 points max)
    if (careerGaps.length > 0) {
      const fillsGap = careerGaps.some(gap =>
        gap.toLowerCase().includes(formation.name.toLowerCase().split(' ')[0]) ||
        gap.toLowerCase().includes('management') && formation.riasecMatch.includes('E')
      );
      if (fillsGap) score += 30;
    }

    return { ...formation, matchScore: Math.min(100, score) };
  });

  // Select top 5 formations (score >= 40)
  const selectedFormations = scoredFormations
    .filter(f => f.matchScore >= 40)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  // Select books matching RIASEC
  const selectedBooks = ALL_BOOKS
    .filter(book => book.riasecMatch.some(d => riasecProfile[d] >= 20))
    .slice(0, 3);

  // Generate tools based on cognitive profile
  const tools: Tool[] = [];

  if (cognitiveScores.workingMemory >= 60) {
    tools.push({
      name: 'Notion',
      url: 'notion.so',
      cost: 'Gratuit',
      usage: 'Gestion projets multiples (haute mémoire de travail)',
    });
  } else {
    tools.push({
      name: 'Todoist',
      url: 'todoist.com',
      cost: 'Gratuit',
      usage: 'To-do linéaire simple (mémoire de travail modérée)',
    });
  }

  if (cognitiveScores.inhibitoryControl < 60) {
    tools.push({
      name: 'Forest App',
      url: 'forestapp.cc',
      cost: '3€',
      usage: 'Timer Pomodoro anti-dispersion',
    });
  }

  if (cognitiveScores.decisionSpeed < 50) {
    tools.push({
      name: 'Calm',
      url: 'calm.com',
      cost: 'Freemium',
      usage: 'Récupération cognitive (vitesse modérée)',
    });
  }

  if (cognitiveScores.verbalFluency >= 65) {
    tools.push({
      name: 'Grammarly',
      url: 'grammarly.com',
      cost: 'Freemium',
      usage: 'Optimise communication écrite (fluidité verbale élevée)',
    });
  }

  return {
    formations: selectedFormations,
    books: selectedBooks,
    tools: tools.slice(0, 3),
  };
}
