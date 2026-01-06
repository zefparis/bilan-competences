export interface QuestionOption {
  value: string;
  label: string;
  score?: number;
}

export interface Question {
  id: string;
  bloc: 1 | 2 | 3 | 4;
  type: 'objective' | 'cognitive' | 'scenario' | 'open';
  text: string;
  domain: 'dev' | 'data' | 'cyber' | 'infra' | 'cross';
  weight: 'high' | 'medium' | 'low';
  antagonistPair?: string;
  options?: QuestionOption[];
}

export const CERTIFICATION_QUESTIONS: Question[] = [
  {
    id: 'q1',
    bloc: 1,
    type: 'objective',
    text: 'Je suis capable d\'écrire un algorithme de tri (tri fusion, tri rapide) sans documentation',
    domain: 'dev',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q2',
    bloc: 1,
    type: 'objective',
    text: 'Je maîtrise les requêtes SQL complexes (jointures, sous-requêtes, agrégations)',
    domain: 'data',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q3',
    bloc: 1,
    type: 'objective',
    text: 'Je comprends les principes de cryptographie (chiffrement symétrique/asymétrique, hachage)',
    domain: 'cyber',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q4',
    bloc: 1,
    type: 'objective',
    text: 'Je sais configurer et gérer des conteneurs Docker en production',
    domain: 'infra',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q5',
    bloc: 1,
    type: 'objective',
    text: 'Je peux implémenter des modèles de Machine Learning (régression, classification)',
    domain: 'data',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q6',
    bloc: 1,
    type: 'objective',
    text: 'Je maîtrise les design patterns (Singleton, Factory, Observer, etc.)',
    domain: 'dev',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q7',
    bloc: 1,
    type: 'objective',
    text: 'Je sais détecter et corriger les vulnérabilités OWASP Top 10',
    domain: 'cyber',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q8',
    bloc: 1,
    type: 'objective',
    text: 'Je peux configurer un pipeline CI/CD (GitLab CI, GitHub Actions, Jenkins)',
    domain: 'infra',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q9',
    bloc: 1,
    type: 'objective',
    text: 'Je suis à l\'aise avec les architectures microservices et API REST',
    domain: 'dev',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q10',
    bloc: 1,
    type: 'objective',
    text: 'Je maîtrise au moins un framework de visualisation de données (D3.js, Plotly, Tableau)',
    domain: 'data',
    weight: 'low',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q11',
    bloc: 2,
    type: 'cognitive',
    text: 'Je préfère travailler sur des problèmes techniques complexes plutôt que sur la gestion de projet',
    domain: 'cross',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q12',
    bloc: 2,
    type: 'cognitive',
    text: 'J\'aime travailler seul(e) sur du code plutôt qu\'en équipe',
    domain: 'cross',
    weight: 'medium',
    antagonistPair: 'q18',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q13',
    bloc: 2,
    type: 'cognitive',
    text: 'Je préfère optimiser du code existant plutôt que créer de nouvelles fonctionnalités',
    domain: 'cross',
    weight: 'medium',
    antagonistPair: 'q20',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q14',
    bloc: 2,
    type: 'cognitive',
    text: 'Je suis attiré(e) par les défis de sécurité et les tests d\'intrusion',
    domain: 'cyber',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q15',
    bloc: 2,
    type: 'cognitive',
    text: 'Je préfère analyser des données et trouver des insights plutôt que développer des interfaces',
    domain: 'data',
    weight: 'high',
    antagonistPair: 'q21',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q16',
    bloc: 2,
    type: 'cognitive',
    text: 'J\'aime automatiser les tâches répétitives et créer des scripts',
    domain: 'infra',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q17',
    bloc: 2,
    type: 'cognitive',
    text: 'Je préfère suivre des méthodologies établies plutôt qu\'expérimenter',
    domain: 'cross',
    weight: 'low',
    antagonistPair: 'q24',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q18',
    bloc: 2,
    type: 'cognitive',
    text: 'Je m\'épanouis dans le travail collaboratif et les revues de code',
    domain: 'cross',
    weight: 'medium',
    antagonistPair: 'q12',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q19',
    bloc: 2,
    type: 'cognitive',
    text: 'Je suis passionné(e) par l\'architecture système et la scalabilité',
    domain: 'infra',
    weight: 'high',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q20',
    bloc: 2,
    type: 'cognitive',
    text: 'J\'aime concevoir et prototyper de nouvelles solutions innovantes',
    domain: 'dev',
    weight: 'medium',
    antagonistPair: 'q13',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q21',
    bloc: 2,
    type: 'cognitive',
    text: 'Je préfère créer des interfaces utilisateur intuitives et esthétiques',
    domain: 'dev',
    weight: 'medium',
    antagonistPair: 'q15',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q22',
    bloc: 2,
    type: 'cognitive',
    text: 'Je suis attiré(e) par les problématiques de conformité et de gouvernance des données',
    domain: 'data',
    weight: 'low',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q23',
    bloc: 2,
    type: 'cognitive',
    text: 'Je m\'intéresse aux aspects forensics et à l\'analyse d\'incidents de sécurité',
    domain: 'cyber',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q24',
    bloc: 2,
    type: 'cognitive',
    text: 'J\'aime tester de nouvelles technologies et sortir de ma zone de confort',
    domain: 'cross',
    weight: 'low',
    antagonistPair: 'q17',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q25',
    bloc: 2,
    type: 'cognitive',
    text: 'Je préfère résoudre des problèmes de performance et d\'optimisation',
    domain: 'infra',
    weight: 'medium',
    options: [
      { value: '1', label: 'Pas du tout d\'accord', score: 1 },
      { value: '2', label: 'Plutôt pas d\'accord', score: 2 },
      { value: '3', label: 'Neutre', score: 3 },
      { value: '4', label: 'Plutôt d\'accord', score: 4 },
      { value: '5', label: 'Tout à fait d\'accord', score: 5 }
    ]
  },
  {
    id: 'q26',
    bloc: 3,
    type: 'scenario',
    text: 'Votre application web subit une attaque DDoS. Quelle est votre première action ?',
    domain: 'cyber',
    weight: 'high',
    options: [
      { value: 'a', label: 'Activer un WAF et mettre en place du rate limiting', score: 5 },
      { value: 'b', label: 'Redémarrer les serveurs', score: 1 },
      { value: 'c', label: 'Bloquer toutes les connexions entrantes', score: 2 },
      { value: 'd', label: 'Analyser les logs pour identifier la source', score: 4 }
    ]
  },
  {
    id: 'q27',
    bloc: 3,
    type: 'scenario',
    text: 'Vous devez traiter 10 millions de lignes de données. Quelle approche choisissez-vous ?',
    domain: 'data',
    weight: 'high',
    options: [
      { value: 'a', label: 'Charger tout en mémoire avec pandas', score: 2 },
      { value: 'b', label: 'Utiliser un traitement par batch avec Spark ou Dask', score: 5 },
      { value: 'c', label: 'Traiter ligne par ligne avec un script Python', score: 1 },
      { value: 'd', label: 'Utiliser des requêtes SQL optimisées sur la base de données', score: 4 }
    ]
  },
  {
    id: 'q28',
    bloc: 3,
    type: 'scenario',
    text: 'Votre API REST répond lentement. Comment diagnostiquez-vous le problème ?',
    domain: 'dev',
    weight: 'high',
    options: [
      { value: 'a', label: 'Augmenter les ressources serveur', score: 2 },
      { value: 'b', label: 'Profiler le code et analyser les requêtes N+1', score: 5 },
      { value: 'c', label: 'Ajouter du cache sur toutes les routes', score: 3 },
      { value: 'd', label: 'Vérifier les logs d\'erreur uniquement', score: 1 }
    ]
  },
  {
    id: 'q29',
    bloc: 3,
    type: 'scenario',
    text: 'Vous devez déployer une application critique avec zéro downtime. Quelle stratégie ?',
    domain: 'infra',
    weight: 'high',
    options: [
      { value: 'a', label: 'Déploiement blue-green avec bascule progressive', score: 5 },
      { value: 'b', label: 'Arrêter l\'ancien serveur puis démarrer le nouveau', score: 1 },
      { value: 'c', label: 'Déployer en dehors des heures de bureau', score: 2 },
      { value: 'd', label: 'Utiliser un load balancer avec rolling update', score: 4 }
    ]
  },
  {
    id: 'q30',
    bloc: 3,
    type: 'scenario',
    text: 'Vous découvrez une faille de sécurité en production. Quelle est votre priorité ?',
    domain: 'cyber',
    weight: 'high',
    options: [
      { value: 'a', label: 'Documenter la faille pour le rapport', score: 1 },
      { value: 'b', label: 'Patcher immédiatement et notifier les parties prenantes', score: 5 },
      { value: 'c', label: 'Attendre la prochaine release planifiée', score: 1 },
      { value: 'd', label: 'Tester le patch en développement d\'abord', score: 3 }
    ]
  },
  {
    id: 'q31',
    bloc: 4,
    type: 'open',
    text: 'Décrivez un projet technique dont vous êtes particulièrement fier(e)',
    domain: 'cross',
    weight: 'medium',
    options: []
  },
  {
    id: 'q32',
    bloc: 4,
    type: 'open',
    text: 'Quelle technologie ou framework aimeriez-vous maîtriser dans les 6 prochains mois ?',
    domain: 'cross',
    weight: 'low',
    options: []
  },
  {
    id: 'q33',
    bloc: 4,
    type: 'open',
    text: 'Comment restez-vous à jour avec les évolutions technologiques ?',
    domain: 'cross',
    weight: 'low',
    options: []
  },
  {
    id: 'q34',
    bloc: 4,
    type: 'open',
    text: 'Décrivez une situation où vous avez dû résoudre un problème technique complexe',
    domain: 'cross',
    weight: 'medium',
    options: []
  },
  {
    id: 'q35',
    bloc: 4,
    type: 'open',
    text: 'Quel type d\'environnement de travail vous permet de donner le meilleur de vous-même ?',
    domain: 'cross',
    weight: 'low',
    options: []
  }
];

export const BLOC_DESCRIPTIONS = {
  1: {
    title: 'Compétences Techniques Objectives',
    description: 'Évaluez vos compétences techniques dans les domaines clés du numérique',
    duration: '5 minutes'
  },
  2: {
    title: 'Style Cognitif et Préférences',
    description: 'Identifiez vos préférences de travail et votre style professionnel',
    duration: '5 minutes'
  },
  3: {
    title: 'Scénarios Pratiques',
    description: 'Résolvez des situations professionnelles concrètes',
    duration: '5 minutes'
  },
  4: {
    title: 'Questions Ouvertes',
    description: 'Partagez votre expérience et vos aspirations',
    duration: '5 minutes'
  }
};

export function getQuestionsByBloc(bloc: 1 | 2 | 3 | 4): Question[] {
  return CERTIFICATION_QUESTIONS.filter(q => q.bloc === bloc);
}

export function getQuestionById(id: string): Question | undefined {
  return CERTIFICATION_QUESTIONS.find(q => q.id === id);
}

export function getAntagonistPairs(): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  CERTIFICATION_QUESTIONS.forEach(q => {
    if (q.antagonistPair && q.id < q.antagonistPair) {
      pairs.push([q.id, q.antagonistPair]);
    }
  });
  return pairs;
}
