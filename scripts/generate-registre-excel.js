const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Données du registre (5 traitements)
const traitements = [
  {
    numero: 1,
    nom: "Gestion des Comptes Utilisateurs",
    finalite: "Authentification et gestion des accès à la plateforme",
    baseJuridique: "Exécution du contrat (Art. 6.1.b RGPD)",
    personnesConcernees: "Utilisateurs inscrits",
    categoriesDonnees: "Identité (nom, prénom), Coordonnées (email), Connexion (mot de passe hashé, date inscription), Technique (IP, logs)",
    destinataires: "ia-solution uniquement",
    transfertsHorsUE: "Non",
    dureeConservation: "Durée du compte + 3 ans après dernière connexion",
    mesuresSecurite: "Mots de passe hashés (bcrypt), HTTPS (TLS 1.3), Protection CSRF, Rate limiting"
  },
  {
    numero: 2,
    nom: "Évaluations Professionnelles et Cognitives",
    finalite: "Fourniture du service d'évaluation (tests cognitifs, profil RIASEC, certification technique, rapports)",
    baseJuridique: "Exécution du contrat (Art. 6.1.b RGPD)",
    personnesConcernees: "Utilisateurs ayant passé l'évaluation",
    categoriesDonnees: "Cognitives (réponses tests), Professionnelles (expériences, compétences, objectifs), Évaluation (scores, type RIASEC, certification), Rapports (recommandations, analyses IA)",
    destinataires: "ia-solution, Anthropic (sous-traitant IA - DPA signé, données anonymisées : pas de nom/email, garanties : non-entraînement, suppression post-traitement, hébergement Europe)",
    transfertsHorsUE: "Oui (USA - Anthropic) - Garanties : Clauses Contractuelles Types + DPA RGPD",
    dureeConservation: "Durée du compte + 3 ans après dernière activité",
    mesuresSecurite: "Chiffrement BDD, Anonymisation données IA, DPA Anthropic (non-persistance), Logs d'accès"
  },
  {
    numero: 3,
    nom: "Gestion des Paiements",
    finalite: "Traitement des paiements pour déverrouillage évaluation (49€)",
    baseJuridique: "Exécution du contrat (Art. 6.1.b RGPD) + Obligation légale comptable (Art. 6.1.c RGPD)",
    personnesConcernees: "Utilisateurs ayant effectué un paiement",
    categoriesDonnees: "Transaction (montant, date, statut), Facturation (nom, prénom, email), Paiement (4 derniers chiffres carte via Stripe)",
    destinataires: "ia-solution (comptabilité), Stripe (processeur paiement certifié PCI-DSS)",
    transfertsHorsUE: "Oui (USA - Stripe) - Garanties : Certification PCI-DSS + DPA RGPD",
    dureeConservation: "10 ans (obligation légale comptable - Art. L123-22 Code Commerce)",
    mesuresSecurite: "Tokenisation Stripe (pas de données bancaires stockées), Chiffrement transactions (TLS 1.3), Conformité PCI-DSS"
  },
  {
    numero: 4,
    nom: "Support Client et Assistance",
    finalite: "Assistance utilisateurs (questions techniques, contestations IA, réclamations)",
    baseJuridique: "Intérêt légitime (Art. 6.1.f RGPD) - Amélioration qualité service",
    personnesConcernees: "Utilisateurs ayant contacté le support",
    categoriesDonnees: "Contact (email, nom), Communication (emails, tickets support), Technique (captures écran, logs erreurs)",
    destinataires: "ia-solution uniquement (Benjamin Barrere, Fondateur)",
    transfertsHorsUE: "Non",
    dureeConservation: "1 an après résolution du ticket",
    mesuresSecurite: "Accès restreint (fondateur uniquement), Emails chiffrés (TLS)"
  },
  {
    numero: 5,
    nom: "Statistiques et Amélioration des Services",
    finalite: "Analyse anonymisée pour amélioration algorithmes et expérience utilisateur",
    baseJuridique: "Intérêt légitime (Art. 6.1.f RGPD) - R&D et optimisation",
    personnesConcernees: "Tous les utilisateurs (données anonymisées)",
    categoriesDonnees: "Statistiques agrégées (taux réussite, scores moyens), Usage plateforme (pages visitées, temps passé - anonymisé), Performance (taux conversion, NPS)",
    destinataires: "ia-solution uniquement (équipe R&D)",
    transfertsHorsUE: "Non",
    dureeConservation: "Illimitée (données anonymisées - pas de données personnelles)",
    mesuresSecurite: "Anonymisation irréversible, Agrégation (pas de données individuelles)"
  }
];

// Informations responsable
const responsable = {
  raisonSociale: "ia-solution",
  statut: "Auto-entrepreneur",
  siret: "438 055 097",
  siege: "Alès (30100), Occitanie, France",
  responsable: "Benjamin Barrere",
  email: "contact@ia-solution.fr",
  telephone: "07 58 06 05 56",
  dateMaj: "Janvier 2025"
};

// Création du workbook
const wb = XLSX.utils.book_new();

// FEUILLE 1 : Informations Responsable
const wsResponsable = XLSX.utils.json_to_sheet([
  { Champ: "Raison sociale", Valeur: responsable.raisonSociale },
  { Champ: "Statut", Valeur: responsable.statut },
  { Champ: "SIRET", Valeur: responsable.siret },
  { Champ: "Siège social", Valeur: responsable.siege },
  { Champ: "Responsable du traitement", Valeur: responsable.responsable },
  { Champ: "Email DPO/Contact", Valeur: responsable.email },
  { Champ: "Téléphone", Valeur: responsable.telephone },
  { Champ: "Date de mise à jour", Valeur: responsable.dateMaj }
]);
XLSX.utils.book_append_sheet(wb, wsResponsable, "Responsable");

// FEUILLE 2 : Registre des Traitements
const wsTraitements = XLSX.utils.json_to_sheet(traitements.map(t => ({
  "N°": t.numero,
  "Nom du traitement": t.nom,
  "Finalité": t.finalite,
  "Base juridique": t.baseJuridique,
  "Personnes concernées": t.personnesConcernees,
  "Catégories de données": t.categoriesDonnees,
  "Destinataires": t.destinataires,
  "Transferts hors UE": t.transfertsHorsUE,
  "Durée de conservation": t.dureeConservation,
  "Mesures de sécurité": t.mesuresSecurite
})));
XLSX.utils.book_append_sheet(wb, wsTraitements, "Registre Traitements");

// FEUILLE 3 : Sous-traitants
const sousTraitants = [
  {
    nom: "Anthropic",
    activite: "Traitement IA (génération recommandations)",
    traitement: "Évaluations professionnelles (n°2)",
    localisation: "USA (serveurs Europe)",
    garantiesRGPD: "DPA signé, Clauses Contractuelles Types, Non-utilisation entraînement, Suppression post-traitement"
  },
  {
    nom: "Stripe",
    activite: "Processeur de paiement",
    traitement: "Gestion des paiements (n°3)",
    localisation: "USA",
    garantiesRGPD: "Certification PCI-DSS, DPA RGPD, Tokenisation (pas de données bancaires stockées)"
  },
  {
    nom: "LWS (Line Web Services)",
    activite: "Hébergement web",
    traitement: "Tous les traitements",
    localisation: "France",
    garantiesRGPD: "Hébergeur français, Conformité RGPD"
  }
];

const wsSousTraitants = XLSX.utils.json_to_sheet(sousTraitants.map(st => ({
  "Nom du sous-traitant": st.nom,
  "Activité": st.activite,
  "Traitement concerné": st.traitement,
  "Localisation": st.localisation,
  "Garanties RGPD": st.garantiesRGPD
})));
XLSX.utils.book_append_sheet(wb, wsSousTraitants, "Sous-traitants");

// Génération du fichier
const outputDir = path.join(__dirname, '../public/legal');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'Registre-RGPD-PERSPECTA.xlsx');
XLSX.writeFile(wb, outputPath);

console.log('✅ Registre RGPD généré avec succès :', outputPath);
