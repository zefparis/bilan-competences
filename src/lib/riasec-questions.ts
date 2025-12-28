export type RiasecCategory = "R" | "I" | "A" | "S" | "E" | "C"

export type RiasecQuestion = {
  id: string
  text: string
  category: RiasecCategory
}

export const RIASEC_QUESTIONS: RiasecQuestion[] = [
  { id: "r1", text: "Réparer ou entretenir un équipement", category: "R" },
  { id: "r2", text: "Assembler des objets (montage, bricolage)", category: "R" },
  { id: "r3", text: "Travailler en extérieur", category: "R" },
  { id: "r4", text: "Utiliser des outils ou des machines", category: "R" },
  { id: "r5", text: "Installer ou dépanner du matériel", category: "R" },
  { id: "r6", text: "Effectuer des tâches manuelles précises", category: "R" },
  { id: "r7", text: "Suivre un protocole technique", category: "R" },
  { id: "r8", text: "Conduire ou manœuvrer des véhicules/engins", category: "R" },
  { id: "r9", text: "Tester le bon fonctionnement d’un système", category: "R" },
  { id: "r10", text: "Optimiser un processus matériel (atelier, production)", category: "R" },

  { id: "i1", text: "Analyser des données", category: "I" },
  { id: "i2", text: "Résoudre un problème complexe", category: "I" },
  { id: "i3", text: "Comprendre comment/ pourquoi quelque chose fonctionne", category: "I" },
  { id: "i4", text: "Faire des recherches (documentation, études)", category: "I" },
  { id: "i5", text: "Construire une hypothèse et la vérifier", category: "I" },
  { id: "i6", text: "Interpréter des résultats (mesures, graphiques)", category: "I" },
  { id: "i7", text: "Apprendre de nouveaux concepts théoriques", category: "I" },
  { id: "i8", text: "Expérimenter pour améliorer une solution", category: "I" },
  { id: "i9", text: "Programmer ou modéliser une solution", category: "I" },
  { id: "i10", text: "Décomposer un problème en étapes", category: "I" },

  { id: "a1", text: "Créer un visuel (dessin, design)", category: "A" },
  { id: "a2", text: "Écrire (articles, histoires, scripts)", category: "A" },
  { id: "a3", text: "Imaginer des concepts originaux", category: "A" },
  { id: "a4", text: "Travailler sur une identité de marque", category: "A" },
  { id: "a5", text: "Composer ou produire du contenu (audio/vidéo)", category: "A" },
  { id: "a6", text: "Chercher des idées et alternatives créatives", category: "A" },
  { id: "a7", text: "Créer une expérience utilisateur esthétique", category: "A" },
  { id: "a8", text: "Improviser et sortir du cadre", category: "A" },
  { id: "a9", text: "Exprimer une émotion par un moyen artistique", category: "A" },
  { id: "a10", text: "Prototyper rapidement une idée", category: "A" },

  { id: "s1", text: "Aider quelqu’un à résoudre un problème", category: "S" },
  { id: "s2", text: "Expliquer/enseigner", category: "S" },
  { id: "s3", text: "Écouter activement et comprendre l’autre", category: "S" },
  { id: "s4", text: "Accompagner une personne vers un objectif", category: "S" },
  { id: "s5", text: "Travailler en équipe et coopérer", category: "S" },
  { id: "s6", text: "Faciliter un échange/atelier", category: "S" },
  { id: "s7", text: "Prendre soin (santé, social, bien-être)", category: "S" },
  { id: "s8", text: "Gérer des situations relationnelles délicates", category: "S" },
  { id: "s9", text: "Soutenir et motiver", category: "S" },
  { id: "s10", text: "Construire un climat de confiance", category: "S" },

  { id: "e1", text: "Convaincre et négocier", category: "E" },
  { id: "e2", text: "Prendre des décisions rapidement", category: "E" },
  { id: "e3", text: "Lancer un projet/une initiative", category: "E" },
  { id: "e4", text: "Diriger une équipe", category: "E" },
  { id: "e5", text: "Développer une stratégie", category: "E" },
  { id: "e6", text: "Vendre un produit/une idée", category: "E" },
  { id: "e7", text: "Prendre la parole et influencer", category: "E" },
  { id: "e8", text: "Définir des objectifs et piloter", category: "E" },
  { id: "e9", text: "Gérer un budget/une performance", category: "E" },
  { id: "e10", text: "Identifier des opportunités", category: "E" },

  { id: "c1", text: "Organiser et classer des informations", category: "C" },
  { id: "c2", text: "Travailler avec des chiffres", category: "C" },
  { id: "c3", text: "Respecter des procédures", category: "C" },
  { id: "c4", text: "Planifier et structurer un travail", category: "C" },
  { id: "c5", text: "Assurer la qualité et la conformité", category: "C" },
  { id: "c6", text: "Gérer des fichiers/administratif", category: "C" },
  { id: "c7", text: "Suivre des indicateurs", category: "C" },
  { id: "c8", text: "Rédiger des documents structurés", category: "C" },
  { id: "c9", text: "Maintenir un système d’archivage", category: "C" },
  { id: "c10", text: "Vérifier des données et corriger des erreurs", category: "C" }
]
