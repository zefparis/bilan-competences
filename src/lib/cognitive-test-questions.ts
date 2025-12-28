export interface CognitiveQuestion {
  id: number
  category: "learning" | "work" | "communication" | "problem_solving"
  question: string
  options: Array<{
    label: string
    dimension: "form" | "color" | "volume" | "sound"
    weight: number
  }>
}

export const COGNITIVE_TEST_QUESTIONS: CognitiveQuestion[] = [
  {
    id: 1,
    category: "learning",
    question: "Quand vous apprenez un nouveau concept complexe, vous préférez :",
    options: [
      { label: "Lire un schéma logique ou un diagramme structuré", dimension: "form", weight: 4 },
      { label: "Voir des exemples visuels colorés et des illustrations", dimension: "color", weight: 4 },
      { label: "Manipuler des objets ou pratiquer physiquement", dimension: "volume", weight: 4 },
      { label: "Écouter une explication orale détaillée", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 2,
    category: "learning",
    question: "Pour retenir une information importante, vous avez tendance à :",
    options: [
      { label: "Créer un plan structuré avec des points numérotés", dimension: "form", weight: 3 },
      { label: "Utiliser des surligneurs de couleur et des mind maps", dimension: "color", weight: 3 },
      { label: "Refaire les gestes ou reproduire les actions", dimension: "volume", weight: 3 },
      { label: "Vous répéter l'info à voix haute ou en discuter", dimension: "sound", weight: 3 },
    ],
  },
  {
    id: 3,
    category: "learning",
    question: "Dans un cours ou une formation, vous êtes le plus attentif quand :",
    options: [
      { label: "Le formateur suit une progression logique claire", dimension: "form", weight: 4 },
      { label: "Les slides sont visuellement attrayantes et colorées", dimension: "color", weight: 4 },
      { label: "Vous pouvez tester et manipuler pendant la session", dimension: "volume", weight: 4 },
      { label: "Le formateur a une voix claire et un bon rythme", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 4,
    category: "learning",
    question: "Vous mémorisez mieux un trajet en :",
    options: [
      { label: "Mémorisant les directions (gauche, droite, distances)", dimension: "form", weight: 3 },
      { label: "Visualisant les bâtiments et repères visuels", dimension: "color", weight: 3 },
      { label: "Refaisant le trajet une ou deux fois", dimension: "volume", weight: 3 },
      { label: "Écoutant quelqu'un expliquer le chemin", dimension: "sound", weight: 3 },
    ],
  },
  {
    id: 5,
    category: "learning",
    question: "Pour comprendre un logiciel complexe, vous préférez :",
    options: [
      { label: "Lire la documentation technique structurée", dimension: "form", weight: 4 },
      { label: "Regarder des tutoriels vidéo avec captures d'écran", dimension: "color", weight: 4 },
      { label: "Tester directement toutes les fonctionnalités", dimension: "volume", weight: 4 },
      { label: "Demander à quelqu'un de vous l'expliquer oralement", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 6,
    category: "work",
    question: "Dans votre travail, vous êtes le plus efficace quand vous :",
    options: [
      { label: "Suivez un processus méthodique et structuré", dimension: "form", weight: 5 },
      { label: "Visualisez le résultat final et l'esthétique", dimension: "color", weight: 5 },
      { label: "Construisez et assemblez concrètement", dimension: "volume", weight: 5 },
      { label: "Discutez et échangez avec votre équipe", dimension: "sound", weight: 5 },
    ],
  },
  {
    id: 7,
    category: "work",
    question: "Face à un problème au travail, votre premier réflexe est de :",
    options: [
      { label: "Analyser la cause racine avec un framework logique", dimension: "form", weight: 4 },
      { label: "Imaginer plusieurs scénarios visuellement", dimension: "color", weight: 4 },
      { label: "Essayer différentes solutions pratiques", dimension: "volume", weight: 4 },
      { label: "En parler avec des collègues pour avoir leur avis", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 8,
    category: "work",
    question: "Vous organisez votre journée de travail via :",
    options: [
      { label: "Une to-do list structurée avec priorités", dimension: "form", weight: 3 },
      { label: "Un tableau Kanban visuel avec codes couleur", dimension: "color", weight: 3 },
      { label: "Des post-its que vous déplacez physiquement", dimension: "volume", weight: 3 },
      { label: "Des rappels vocaux ou discussions matinales", dimension: "sound", weight: 3 },
    ],
  },
  {
    id: 9,
    category: "work",
    question: "Dans un projet, vous préférez le rôle de :",
    options: [
      { label: "Architecte / Planificateur (structure le projet)", dimension: "form", weight: 5 },
      { label: "Designer / Créatif (imagine les visuels)", dimension: "color", weight: 5 },
      { label: "Builder / Exécutant (construit concrètement)", dimension: "volume", weight: 5 },
      { label: "Communicant / Facilitateur (coordonne l'équipe)", dimension: "sound", weight: 5 },
    ],
  },
  {
    id: 10,
    category: "work",
    question: "Vous êtes le plus concentré quand :",
    options: [
      { label: "Vous travaillez sur des données, des chiffres, des frameworks", dimension: "form", weight: 4 },
      { label: "Vous créez quelque chose de visuellement beau", dimension: "color", weight: 4 },
      { label: "Vous manipulez, assemblez, réparez quelque chose", dimension: "volume", weight: 4 },
      { label: "Vous échangez des idées en réunion ou au téléphone", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 11,
    category: "communication",
    question: "Pour expliquer une idée complexe, vous utilisez naturellement :",
    options: [
      { label: "Un argumentaire logique avec étapes numérotées", dimension: "form", weight: 4 },
      { label: "Des métaphores visuelles et des comparaisons imagées", dimension: "color", weight: 4 },
      { label: "Des gestes et une démonstration physique", dimension: "volume", weight: 4 },
      { label: "Une histoire ou un récit verbal captivant", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 12,
    category: "communication",
    question: "En réunion, vous retenez mieux l'information quand :",
    options: [
      { label: "L'ordre du jour est clair et suivi rigoureusement", dimension: "form", weight: 3 },
      { label: "Les slides sont bien conçues et visuellement claires", dimension: "color", weight: 3 },
      { label: "Vous pouvez prendre des notes manuscrites", dimension: "volume", weight: 3 },
      { label: "Les échanges oraux sont dynamiques et interactifs", dimension: "sound", weight: 3 },
    ],
  },
  {
    id: 13,
    category: "communication",
    question: "Vous préférez communiquer avec votre équipe via :",
    options: [
      { label: "Email structuré avec bullet points", dimension: "form", weight: 3 },
      { label: "Slides de présentation ou tableaux visuels", dimension: "color", weight: 3 },
      { label: "Whiteboard collaboratif en présentiel", dimension: "volume", weight: 3 },
      { label: "Call audio ou vidéo pour discuter", dimension: "sound", weight: 3 },
    ],
  },
  {
    id: 14,
    category: "communication",
    question: "Lors d'un brainstorming, vous contribuez en :",
    options: [
      { label: "Structurant les idées en catégories logiques", dimension: "form", weight: 4 },
      { label: "Dessinant des concepts visuels au tableau", dimension: "color", weight: 4 },
      { label: "Manipulant des objets ou construisant des prototypes", dimension: "volume", weight: 4 },
      { label: "Proposant des idées à voix haute spontanément", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 15,
    category: "communication",
    question: "Vous comprenez mieux un feedback quand il est :",
    options: [
      { label: "Structuré avec des points précis à améliorer", dimension: "form", weight: 3 },
      { label: "Illustré avec des exemples visuels concrets", dimension: "color", weight: 3 },
      { label: "Accompagné d'une démonstration pratique", dimension: "volume", weight: 3 },
      { label: "Expliqué oralement dans une discussion", dimension: "sound", weight: 3 },
    ],
  },
  {
    id: 16,
    category: "problem_solving",
    question: "Face à un bug informatique, vous commencez par :",
    options: [
      { label: "Analyser les logs et chercher le pattern logique", dimension: "form", weight: 5 },
      { label: "Visualiser le flow de données mentalement", dimension: "color", weight: 5 },
      { label: "Tester différentes configurations manuellement", dimension: "volume", weight: 5 },
      { label: "Demander conseil à un collègue expert", dimension: "sound", weight: 5 },
    ],
  },
  {
    id: 17,
    category: "problem_solving",
    question: "Pour résoudre un conflit d'équipe, vous préférez :",
    options: [
      { label: "Établir des règles claires et un process de résolution", dimension: "form", weight: 4 },
      { label: "Imaginer différents scénarios de compromis", dimension: "color", weight: 4 },
      { label: "Organiser une activité team-building concrète", dimension: "volume", weight: 4 },
      { label: "Faciliter une discussion ouverte entre les parties", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 18,
    category: "problem_solving",
    question: "Devant un défi technique inconnu, vous :",
    options: [
      { label: "Décomposez le problème en sous-problèmes logiques", dimension: "form", weight: 5 },
      { label: "Cherchez des inspirations visuelles similaires", dimension: "color", weight: 5 },
      { label: "Prototypez rapidement pour comprendre", dimension: "volume", weight: 5 },
      { label: "Consultez des experts ou des podcasts techniques", dimension: "sound", weight: 5 },
    ],
  },
  {
    id: 19,
    category: "problem_solving",
    question: "Pour améliorer un processus inefficace, vous :",
    options: [
      { label: "Mappez le workflow actuel et identifiez les goulots", dimension: "form", weight: 4 },
      { label: "Visualisez le processus idéal sous forme de diagramme", dimension: "color", weight: 4 },
      { label: "Testez empiriquement différentes approches", dimension: "volume", weight: 4 },
      { label: "Organisez des ateliers de co-création avec l'équipe", dimension: "sound", weight: 4 },
    ],
  },
  {
    id: 20,
    category: "problem_solving",
    question: "Vous validez qu'une solution fonctionne quand :",
    options: [
      { label: "Les métriques et KPIs montrent une amélioration logique", dimension: "form", weight: 4 },
      { label: "Le résultat est visuellement évident et clair", dimension: "color", weight: 4 },
      { label: "Vous pouvez la reproduire physiquement avec succès", dimension: "volume", weight: 4 },
      { label: "Les retours oraux des utilisateurs sont positifs", dimension: "sound", weight: 4 },
    ],
  },
]
