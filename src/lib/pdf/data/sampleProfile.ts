/**
 * PERSPECTA PDF - Données exemple
 * Profil de démonstration pour tester la génération PDF
 */

import { ProfileData } from './types';
import { RiasecCode } from '../styles/tokens';

export const sampleProfileData: ProfileData = {
  meta: {
    id: 'PERSPECTA-2.0-DEMO',
    date: new Date().toISOString().split('T')[0],
    userName: 'Marie Dupont',
    userEmail: 'marie.dupont@example.com',
  },

  cognitive: {
    flexibility: 85.2,
    inhibitoryControl: 72.8,
    processingSpeed: 34.5,
    attentionDrift: 18.3,
    fluency: 67.4,
    conflictErrors: 2,
    sequencingErrors: 1,
  },

  riasec: {
    R: 45,
    I: 82,
    A: 58,
    S: 42,
    E: 71,
    C: 35,
    dominant: ['I', 'E', 'A'] as RiasecCode[],
  },

  values: [
    { name: 'Créativité', satisfaction: 4, importance: 5 },
    { name: 'Autonomie', satisfaction: 3, importance: 5 },
    { name: 'Impact social', satisfaction: 2, importance: 4 },
    { name: 'Équilibre vie pro/perso', satisfaction: 3, importance: 4 },
    { name: 'Reconnaissance', satisfaction: 3, importance: 3 },
  ],

  career: [
    {
      year: 2018,
      role: 'Développeuse Junior',
      company: 'StartupTech',
      cognitiveSkill: 'Apprentissage rapide',
      description: 'Développement web full-stack',
    },
    {
      year: 2020,
      role: 'Développeuse Senior',
      company: 'InnovateCorp',
      cognitiveSkill: 'Flexibilité cognitive',
      description: 'Lead technique sur projets innovants',
    },
    {
      year: 2022,
      role: 'Tech Lead',
      company: 'DataVision',
      cognitiveSkill: 'Contrôle inhibiteur',
      description: 'Management d\'équipe et architecture',
    },
    {
      year: 2024,
      role: 'Head of Engineering',
      company: 'FutureLab',
      cognitiveSkill: 'Flexibilité + Leadership',
      description: 'Direction technique et stratégie produit',
    },
  ],

  generatedTexts: {
    signaturePhrase: 'Vous êtes une penseuse flexible et analytique, avec une excellente capacité de concentration. Vous privilégiez la profondeur d\'analyse à la rapidité d\'exécution, ce qui vous permet de prendre des décisions éclairées dans des contextes complexes.',
    strengthsAnalysis: 'Votre combinaison unique de flexibilité cognitive (85.2%) et de contrôle inhibiteur (72.8%) vous confère une capacité d\'adaptation remarquable face aux changements, une concentration soutenue même en environnement perturbé, et une approche analytique approfondie qui minimise les erreurs. Cette configuration cognitive est particulièrement adaptée aux rôles qui valorisent la polyvalence.',
    vigilanceAnalysis: 'Votre vitesse de traitement (34.5%) suggère de négocier des délais raisonnables et d\'éviter les environnements qui exigent des décisions instantanées. Votre haute flexibilité peut vous rendre vulnérable à la dispersion - limitez-vous à 3 projets simultanés maximum.',
    trajectoryAnalysis: 'Votre parcours (Développeuse Junior, Développeuse Senior, Tech Lead, Head of Engineering) montre une progression cohérente qui s\'appuie sur vos forces cognitives naturelles. Cette évolution s\'appuie sur :\n\n→ Flexibilité pour naviguer entre différents contextes\n→ Contrôle pour maintenir la qualité sous pression\n→ Approche analytique pour des décisions éclairées',
    sweetSpot: 'Vos meilleures performances seront dans des rôles combinant :\n\n• Gestion de projets multiples\n• Travail de fond nécessitant concentration\n• Analyse approfondie et décisions stratégiques\n\n→ Évitez : Environnements ultra-rapides avec micro-décisions en continu',
  },
};

export default sampleProfileData;
