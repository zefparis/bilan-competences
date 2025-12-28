// Base de connaissances pour l'analyse cognitive HCS-U7
// Contient les définitions statiques des profils, traits et recommandations.

export type CognitiveDimension = "form" | "color" | "volume" | "sound";

export interface CognitiveArchetype {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  strengths: string[];
  blindSpots: string[];
  workEnvironment: string;
}

export const ARCHETYPES: Record<CognitiveDimension, CognitiveArchetype> = {
  form: {
    id: "form",
    name: "L'Architecte Structurel",
    description: "Vous privilégiez la logique, l'ordre et la cohérence. Votre pensée s'organise en systèmes et processus.",
    keywords: ["Structure", "Logique", "Processus", "Analyse"],
    strengths: [
      "Capacité à structurer le chaos",
      "Rigueur méthodologique",
      "Vision systémique",
      "Fiabilité opérationnelle"
    ],
    blindSpots: [
      "Peut manquer de flexibilité face à l'imprévu",
      "Risque de sur-analyse paralysante",
      "Difficulté avec l'ambiguïté émotionnelle"
    ],
    workEnvironment: "Organisé, prévisible, doté de règles claires et d'objectifs définis."
  },
  color: {
    id: "color",
    name: "Le Visionnaire Intuitif",
    description: "Vous naviguez par l'intuition et l'image. Votre pensée est globale, rapide et orientée vers l'impact visuel.",
    keywords: ["Intuition", "Vision", "Créativité", "Impact"],
    strengths: [
      "Perception rapide des opportunités",
      "Créativité conceptuelle",
      "Sens de l'esthétique et de l'harmonie",
      "Communication inspirante"
    ],
    blindSpots: [
      "Peut négliger les détails pratiques",
      "Difficulté à justifier logiquement ses intuitions",
      "Énergie fluctuante"
    ],
    workEnvironment: "Dynamique, visuel, stimulant et ouvert à l'innovation."
  },
  volume: {
    id: "volume",
    name: "Le Bâtisseur Expérientiel",
    description: "Vous apprenez et comprenez par l'action. Votre intelligence est spatiale, concrète et orientée terrain.",
    keywords: ["Action", "Expérience", "Terrain", "Concret"],
    strengths: [
      "Pragmatisme à toute épreuve",
      "Intelligence situationnelle",
      "Capacité à concrétiser les idées",
      "Endurance dans l'action"
    ],
    blindSpots: [
      "Impatience face à la théorie pure",
      "Difficulté à se projeter à très long terme",
      "Besoin de résultats immédiats"
    ],
    workEnvironment: "Concret, actif, permettant l'expérimentation et le mouvement."
  },
  sound: {
    id: "sound",
    name: "Le Connecteur Résonant",
    description: "Vous vibrez par l'échange et le rythme. Votre intelligence est verbale, relationnelle et séquentielle.",
    keywords: ["Échange", "Rythme", "Verbal", "Relation"],
    strengths: [
      "Intelligence relationnelle",
      "Fluidité verbale et communication",
      "Capacité à fédérer et influencer",
      "Sens du timing"
    ],
    blindSpots: [
      "Sensibilité au bruit et aux dissonances",
      "Besoin constant d'interaction",
      "Peut se disperser dans les échanges"
    ],
    workEnvironment: "Collaboratif, communicant, humain et rythmé."
  }
};

export const CROSS_PATTERNS = {
  "form-color": {
    name: "Le Stratège Créatif",
    description: "Alliance de la rigueur et de la vision. Capable de structurer l'innovation."
  },
  "form-volume": {
    name: "L'Ingénieur Pragmatique",
    description: "La logique au service de l'action. Construit des systèmes solides et fonctionnels."
  },
  "form-sound": {
    name: "Le Pédagogue Structuré",
    description: "Clarté du discours et de la pensée. Excelle à expliquer des concepts complexes."
  },
  "color-volume": {
    name: "Le Designer Maker",
    description: "L'idée devient immédiatement réalité. Profil d'artisan-créateur."
  },
  "color-sound": {
    name: "Le Communicant Inspirant",
    description: "Impact visuel et verbal. Capacité à emporter l'adhésion par l'émotion."
  },
  "volume-sound": {
    name: "L'Animateur de Terrain",
    description: "Action et relation. Fédère les équipes dans l'effort et le mouvement."
  }
};

export const EVOLUTION_LEVERS = {
  form: "Accepter l'imperfection pour gagner en vélocité.",
  color: "Ancrer les intuitions dans des faits vérifiables.",
  volume: "Prendre du recul pour anticiper les conséquences à long terme.",
  sound: "Cultiver le silence pour approfondir la réflexion."
};
