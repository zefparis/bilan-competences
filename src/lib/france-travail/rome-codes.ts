// Référentiel complet des codes ROME France Travail
// Source : https://www.data.gouv.fr/fr/datasets/repertoire-operationnel-des-metiers-et-des-emplois-rome/

export interface ROMECode {
  code: string
  label: string
  domain: string
  riasecMatch: string[] // Codes Holland dominants
}

export const ROME_CODES: ROMECode[] = [
  // AGRICULTURE (A) - 25 codes
  { code: "A1101", label: "Conduite d'engins agricoles et forestiers", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1201", label: "Bûcheronnage et élagage", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1202", label: "Entretien des espaces naturels", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1203", label: "Entretien des espaces verts", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1204", label: "Protection du patrimoine naturel", domain: "Agriculture", riasecMatch: ["R", "I"] },
  { code: "A1301", label: "Conseil et assistance technique en agriculture", domain: "Agriculture", riasecMatch: ["I", "E"] },
  { code: "A1302", label: "Contrôle et diagnostic technique en agriculture", domain: "Agriculture", riasecMatch: ["I", "R"] },
  { code: "A1303", label: "Ingénierie en agriculture et environnement naturel", domain: "Agriculture", riasecMatch: ["I"] },
  { code: "A1401", label: "Aide agricole de production légumière ou végétale", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1402", label: "Aide d'élevage agricole et aquacole", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1403", label: "Aide de la pêche maritime", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1404", label: "Aquaculture", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1405", label: "Arboriculture et viticulture", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1406", label: "Encadrement équipage de la pêche", domain: "Agriculture", riasecMatch: ["R", "E"] },
  { code: "A1407", label: "Élevage bovin ou équin", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1408", label: "Élevage d'animaux sauvages ou de compagnie", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1409", label: "Élevage de lapins et volailles", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1410", label: "Élevage ovin ou caprin", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1411", label: "Élevage porcin", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1412", label: "Fabrication et affinage de fromages", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1413", label: "Fermentation de boissons alcoolisées", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1414", label: "Horticulture et maraîchage", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1415", label: "Pêche en mer", domain: "Agriculture", riasecMatch: ["R"] },
  { code: "A1416", label: "Polyculture, élevage", domain: "Agriculture", riasecMatch: ["R"] },

  // ARTS & SPECTACLE (L) - 21 codes
  { code: "L1101", label: "Animation musicale et scénique", domain: "Arts", riasecMatch: ["A"] },
  { code: "L1102", label: "Conception de contenus multimédias", domain: "Arts", riasecMatch: ["A", "I"] },
  { code: "L1201", label: "Musique et chant", domain: "Arts", riasecMatch: ["A"] },
  { code: "L1202", label: "Musique et chant - enseignement", domain: "Arts", riasecMatch: ["A", "S"] },
  { code: "L1203", label: "Gestion de patrimoine culturel", domain: "Arts", riasecMatch: ["C", "I"] },
  { code: "L1204", label: "Médiation culturelle et artistique", domain: "Arts", riasecMatch: ["A", "S"] },
  { code: "L1301", label: "Décoration d'espaces de vente et d'exposition", domain: "Arts", riasecMatch: ["A"] },
  { code: "L1302", label: "Production et administration spectacle, cinéma et audiovisuel", domain: "Arts", riasecMatch: ["E", "A"] },
  { code: "L1303", label: "Promotion d'artistes et de spectacles", domain: "Arts", riasecMatch: ["E", "A"] },
  { code: "L1304", label: "Réalisation cinématographique et audiovisuelle", domain: "Arts", riasecMatch: ["A"] },
  { code: "L1305", label: "Régisseur de spectacles", domain: "Arts", riasecMatch: ["R", "A"] },
  { code: "L1401", label: "Sportif professionnel", domain: "Sport", riasecMatch: ["R"] },
  { code: "L1402", label: "Enseignement sportif", domain: "Sport", riasecMatch: ["S", "R"] },
  { code: "L1501", label: "Artisanat d'art", domain: "Arts", riasecMatch: ["A", "R"] },
  { code: "L1502", label: "Arts du cirque et arts visuels", domain: "Arts", riasecMatch: ["A"] },
  { code: "L1503", label: "Décor et accessoires spectacle", domain: "Arts", riasecMatch: ["A", "R"] },
  { code: "L1504", label: "Éclairage spectacle", domain: "Arts", riasecMatch: ["R", "A"] },
  { code: "L1505", label: "Image cinématographique et télévisuelle", domain: "Arts", riasecMatch: ["A", "I"] },
  { code: "L1506", label: "Machinerie spectacle", domain: "Arts", riasecMatch: ["R"] },
  { code: "L1507", label: "Montage audiovisuel et post-production", domain: "Arts", riasecMatch: ["A", "I"] },
  { code: "L1508", label: "Prise de son et sonorisation", domain: "Arts", riasecMatch: ["R", "A"] },

  // BANQUE & ASSURANCE (C) - 16 codes
  { code: "C1101", label: "Accueil et services bancaires", domain: "Banque", riasecMatch: ["C", "E"] },
  { code: "C1102", label: "Conseil clientèle en assurances", domain: "Assurance", riasecMatch: ["E", "C"] },
  { code: "C1103", label: "Gestion de patrimoine financier", domain: "Banque", riasecMatch: ["E", "I"] },
  { code: "C1104", label: "Marché financier", domain: "Finance", riasecMatch: ["I", "E"] },
  { code: "C1105", label: "Études actuarielles en assurances", domain: "Assurance", riasecMatch: ["I", "C"] },
  { code: "C1201", label: "Analyse de crédits et risques bancaires", domain: "Banque", riasecMatch: ["C", "I"] },
  { code: "C1202", label: "Analyse de risques en assurances", domain: "Assurance", riasecMatch: ["I", "C"] },
  { code: "C1203", label: "Gestion de portefeuilles sur les marchés financiers", domain: "Finance", riasecMatch: ["I", "E"] },
  { code: "C1204", label: "Conception et expertise produits bancaires et financiers", domain: "Banque", riasecMatch: ["I", "E"] },
  { code: "C1205", label: "Conception et expertise produits d'assurances", domain: "Assurance", riasecMatch: ["I"] },
  { code: "C1301", label: "Front office marchés financiers", domain: "Finance", riasecMatch: ["E", "I"] },
  { code: "C1302", label: "Gestion back et middle-office marchés financiers", domain: "Finance", riasecMatch: ["C", "I"] },
  { code: "C1303", label: "Gestion de portefeuilles et de produits financiers", domain: "Finance", riasecMatch: ["I", "C"] },
  { code: "C1401", label: "Gestion en banque et assurance", domain: "Banque", riasecMatch: ["E", "C"] },
  { code: "C1501", label: "Contrôle technique et réglementaire du transport de personnes", domain: "Transport", riasecMatch: ["C", "I"] },
  { code: "C1502", label: "Pilotage d'opérations logistiques", domain: "Logistique", riasecMatch: ["E", "C"] },

  // BTP (F) - 45 codes
  { code: "F1101", label: "Architecture du BTP", domain: "BTP", riasecMatch: ["I", "A"] },
  { code: "F1102", label: "Conception - aménagement d'espaces intérieurs", domain: "BTP", riasecMatch: ["A", "I"] },
  { code: "F1103", label: "Contrôle et diagnostic technique du bâtiment", domain: "BTP", riasecMatch: ["I", "R"] },
  { code: "F1104", label: "Dessin BTP", domain: "BTP", riasecMatch: ["I", "R"] },
  { code: "F1105", label: "Études géologiques", domain: "BTP", riasecMatch: ["I"] },
  { code: "F1106", label: "Ingénierie et études du BTP", domain: "BTP", riasecMatch: ["I"] },
  { code: "F1201", label: "Conduite de travaux du BTP", domain: "BTP", riasecMatch: ["E", "R"] },
  { code: "F1202", label: "Direction de chantier du BTP", domain: "BTP", riasecMatch: ["E", "R"] },
  { code: "F1203", label: "Direction et ingénierie d'exploitation de gisements et de carrières", domain: "BTP", riasecMatch: ["E", "I"] },
  { code: "F1204", label: "Sécurité et protection santé du BTP", domain: "BTP", riasecMatch: ["C", "R"] },
  { code: "F1301", label: "Conduite de grue", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1302", label: "Conduite d'engins de terrassement et de carrière", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1401", label: "Extraction liquide et gazeuse", domain: "Industrie", riasecMatch: ["R"] },
  { code: "F1402", label: "Extraction solide", domain: "Industrie", riasecMatch: ["R"] },
  { code: "F1501", label: "Montage de structures et de charpentes bois", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1502", label: "Montage de structures métalliques", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1503", label: "Réalisation - installation d'ossatures bois", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1601", label: "Application et décoration en plâtre, stuc et staff", domain: "BTP", riasecMatch: ["R", "A"] },
  { code: "F1602", label: "Électricité bâtiment", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1603", label: "Installation d'équipements sanitaires et thermiques", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1604", label: "Montage d'agencements", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1605", label: "Montage de réseaux électriques et télécoms", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1606", label: "Peinture en bâtiment", domain: "BTP", riasecMatch: ["R", "A"] },
  { code: "F1607", label: "Pose de fermetures menuisées", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1608", label: "Pose de revêtements rigides", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1609", label: "Pose et restauration de couvertures", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1610", label: "Pose et restauration de menuiseries", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1611", label: "Réalisation et restauration de façades", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1612", label: "Taille et décoration de pierres", domain: "BTP", riasecMatch: ["R", "A"] },
  { code: "F1613", label: "Travaux d'étanchéité et d'isolation", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1701", label: "Construction en béton", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1702", label: "Construction de routes et voies", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1703", label: "Maçonnerie", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1704", label: "Préparation du gros œuvre et des travaux publics", domain: "BTP", riasecMatch: ["R"] },
  { code: "F1705", label: "Pose de canalisations", domain: "BTP", riasecMatch: ["R"] },

  // COMMERCE (D) - 40 codes
  { code: "D1101", label: "Boucherie", domain: "Commerce", riasecMatch: ["R", "E"] },
  { code: "D1102", label: "Boulangerie - viennoiserie", domain: "Commerce", riasecMatch: ["R", "A"] },
  { code: "D1103", label: "Charcuterie - traiteur", domain: "Commerce", riasecMatch: ["R", "A"] },
  { code: "D1104", label: "Pâtisserie, confiserie, chocolaterie et glacerie", domain: "Commerce", riasecMatch: ["R", "A"] },
  { code: "D1105", label: "Poissonnerie", domain: "Commerce", riasecMatch: ["R", "E"] },
  { code: "D1106", label: "Vente en alimentation", domain: "Commerce", riasecMatch: ["E", "S"] },
  { code: "D1201", label: "Achat vente d'objets d'art, anciens ou d'occasion", domain: "Commerce", riasecMatch: ["E", "A"] },
  { code: "D1202", label: "Coiffure", domain: "Services", riasecMatch: ["A", "S"] },
  { code: "D1203", label: "Gravure - ciselure", domain: "Artisanat", riasecMatch: ["A", "R"] },
  { code: "D1204", label: "Pressing", domain: "Services", riasecMatch: ["R"] },
  { code: "D1205", label: "Réparation d'articles en cuir et matériaux souples", domain: "Artisanat", riasecMatch: ["R"] },
  { code: "D1206", label: "Réparation d'articles en bois", domain: "Artisanat", riasecMatch: ["R"] },
  { code: "D1207", label: "Retouche en habillement", domain: "Artisanat", riasecMatch: ["R"] },
  { code: "D1208", label: "Soins esthétiques et corporels", domain: "Services", riasecMatch: ["A", "S"] },
  { code: "D1209", label: "Vente de végétaux", domain: "Commerce", riasecMatch: ["E", "R"] },
  { code: "D1210", label: "Vente en animalerie", domain: "Commerce", riasecMatch: ["E", "S"] },
  { code: "D1211", label: "Vente en articles de sport et loisirs", domain: "Commerce", riasecMatch: ["E", "S"] },
  { code: "D1212", label: "Vente en décoration et équipement du foyer", domain: "Commerce", riasecMatch: ["E", "A"] },
  { code: "D1213", label: "Vente en gros de matériel et équipement", domain: "Commerce", riasecMatch: ["E", "C"] },
  { code: "D1214", label: "Vente en habillement et accessoires de la personne", domain: "Commerce", riasecMatch: ["E", "A"] },
  { code: "D1301", label: "Management de magasin de détail", domain: "Commerce", riasecMatch: ["E"] },
  { code: "D1401", label: "Assistanat commercial", domain: "Commerce", riasecMatch: ["C", "E"] },
  { code: "D1402", label: "Relation commerciale grands comptes et entreprises", domain: "Commerce", riasecMatch: ["E"] },
  { code: "D1403", label: "Relation commerciale auprès de particuliers", domain: "Commerce", riasecMatch: ["E", "S"] },
  { code: "D1404", label: "Relation commerciale en vente de véhicules", domain: "Commerce", riasecMatch: ["E"] },
  { code: "D1405", label: "Conseil en information médicale", domain: "Santé", riasecMatch: ["S", "I"] },
  { code: "D1406", label: "Management en force de vente", domain: "Commerce", riasecMatch: ["E"] },
  { code: "D1407", label: "Relation technico-commerciale", domain: "Commerce", riasecMatch: ["E", "I"] },
  { code: "D1408", label: "Téléconseil et télévente", domain: "Commerce", riasecMatch: ["E", "S"] },
  { code: "D1501", label: "Animation de vente", domain: "Commerce", riasecMatch: ["E", "S"] },
  { code: "D1502", label: "Management/gestion de rayon produits alimentaires", domain: "Commerce", riasecMatch: ["E", "C"] },
  { code: "D1503", label: "Management/gestion de rayon produits non alimentaires", domain: "Commerce", riasecMatch: ["E", "C"] },
  { code: "D1504", label: "Direction de magasin de grande distribution", domain: "Commerce", riasecMatch: ["E"] },
  { code: "D1505", label: "Personnel de caisse", domain: "Commerce", riasecMatch: ["C"] },
  { code: "D1506", label: "Marchandisage", domain: "Commerce", riasecMatch: ["A", "E"] },
  { code: "D1507", label: "Mise en rayon libre-service", domain: "Commerce", riasecMatch: ["R"] },

  // COMMUNICATION (E) - 18 codes
  { code: "E1101", label: "Animation de site multimédia", domain: "Communication", riasecMatch: ["A", "I"] },
  { code: "E1102", label: "Écriture d'ouvrages, de livres", domain: "Communication", riasecMatch: ["A"] },
  { code: "E1103", label: "Communication", domain: "Communication", riasecMatch: ["A", "E"] },
  { code: "E1104", label: "Conception de contenus multimédias", domain: "Communication", riasecMatch: ["A", "I"] },
  { code: "E1105", label: "Coordination d'édition", domain: "Communication", riasecMatch: ["E", "A"] },
  { code: "E1106", label: "Journalisme et information média", domain: "Communication", riasecMatch: ["A", "I"] },
  { code: "E1107", label: "Organisation d'événementiel", domain: "Communication", riasecMatch: ["E", "A"] },
  { code: "E1108", label: "Traduction, interprétariat", domain: "Communication", riasecMatch: ["I"] },
  { code: "E1201", label: "Photographie", domain: "Arts", riasecMatch: ["A"] },
  { code: "E1202", label: "Stylisme", domain: "Arts", riasecMatch: ["A"] },
  { code: "E1203", label: "Production en laboratoire photographique", domain: "Arts", riasecMatch: ["R", "A"] },
  { code: "E1204", label: "Projection cinéma", domain: "Arts", riasecMatch: ["R"] },
  { code: "E1205", label: "Réalisation de contenus multimédias", domain: "Communication", riasecMatch: ["A", "I"] },
  { code: "E1301", label: "Conduite de machines d'impression", domain: "Industrie", riasecMatch: ["R"] },
  { code: "E1302", label: "Façonnage et routage", domain: "Industrie", riasecMatch: ["R"] },
  { code: "E1303", label: "Gravure - ciselure", domain: "Artisanat", riasecMatch: ["A", "R"] },
  { code: "E1304", label: "Préparation et correction en édition et presse", domain: "Communication", riasecMatch: ["C", "I"] },
  { code: "E1305", label: "Reprographie", domain: "Services", riasecMatch: ["R"] },

  // HÔTELLERIE & RESTAURATION (G) - 20 codes
  { code: "G1101", label: "Accueil touristique", domain: "Tourisme", riasecMatch: ["S", "E"] },
  { code: "G1102", label: "Promotion du tourisme local", domain: "Tourisme", riasecMatch: ["E", "S"] },
  { code: "G1201", label: "Accompagnement de voyages, d'activités culturelles ou sportives", domain: "Tourisme", riasecMatch: ["S", "E"] },
  { code: "G1202", label: "Animation d'activités culturelles ou ludiques", domain: "Animation", riasecMatch: ["S", "A"] },
  { code: "G1203", label: "Animation de loisirs auprès d'enfants ou d'adolescents", domain: "Animation", riasecMatch: ["S"] },
  { code: "G1204", label: "Éducation en activités sportives", domain: "Sport", riasecMatch: ["S", "R"] },
  { code: "G1301", label: "Conception de produits touristiques", domain: "Tourisme", riasecMatch: ["E", "A"] },
  { code: "G1401", label: "Assistance de direction d'hôtel-restaurant", domain: "Hôtellerie", riasecMatch: ["C", "E"] },
  { code: "G1402", label: "Management d'hôtel-restaurant", domain: "Hôtellerie", riasecMatch: ["E"] },
  { code: "G1403", label: "Gestion de structure de loisirs ou d'hébergement touristique", domain: "Tourisme", riasecMatch: ["E"] },
  { code: "G1501", label: "Personnel d'étage", domain: "Hôtellerie", riasecMatch: ["R"] },
  { code: "G1502", label: "Personnel polyvalent d'hôtellerie", domain: "Hôtellerie", riasecMatch: ["S", "R"] },
  { code: "G1503", label: "Management du personnel d'étage", domain: "Hôtellerie", riasecMatch: ["E"] },
  { code: "G1601", label: "Management du personnel de cuisine", domain: "Restauration", riasecMatch: ["E"] },
  { code: "G1602", label: "Personnel de cuisine", domain: "Restauration", riasecMatch: ["R", "A"] },
  { code: "G1603", label: "Personnel polyvalent en restauration", domain: "Restauration", riasecMatch: ["S", "R"] },
  { code: "G1702", label: "Personnel de hall", domain: "Hôtellerie", riasecMatch: ["S"] },
  { code: "G1703", label: "Réception en hôtellerie", domain: "Hôtellerie", riasecMatch: ["S", "C"] },
  { code: "G1801", label: "Café, bar brasserie", domain: "Restauration", riasecMatch: ["S", "E"] },
  { code: "G1802", label: "Management du service en restauration", domain: "Restauration", riasecMatch: ["E"] },
  { code: "G1803", label: "Service en restauration", domain: "Restauration", riasecMatch: ["S"] },

  // INFORMATIQUE (M) - 8 codes
  { code: "M1801", label: "Administration de systèmes d'information", domain: "Informatique", riasecMatch: ["I", "R"] },
  { code: "M1802", label: "Expertise et support en systèmes d'information", domain: "Informatique", riasecMatch: ["I"] },
  { code: "M1803", label: "Direction des systèmes d'information", domain: "Informatique", riasecMatch: ["E", "I"] },
  { code: "M1804", label: "Études et développement de réseaux de télécoms", domain: "Informatique", riasecMatch: ["I"] },
  { code: "M1805", label: "Études et développement informatique", domain: "Informatique", riasecMatch: ["I"] },
  { code: "M1806", label: "Conseil et maîtrise d'ouvrage en systèmes d'information", domain: "Informatique", riasecMatch: ["I", "E"] },
  { code: "M1807", label: "Conception de contenus multimédias", domain: "Informatique", riasecMatch: ["A", "I"] },
  { code: "M1810", label: "Production et exploitation de systèmes d'information", domain: "Informatique", riasecMatch: ["I", "R"] },

  // SANTÉ (J) - 20 codes
  { code: "J1101", label: "Médecine généraliste et spécialisée", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1102", label: "Médecine de prévention", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1103", label: "Médecine dentaire", domain: "Santé", riasecMatch: ["I", "R"] },
  { code: "J1104", label: "Psychologie", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1105", label: "Pharmacie", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1201", label: "Biologie médicale", domain: "Santé", riasecMatch: ["I"] },
  { code: "J1301", label: "Assistance médico-technique", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1302", label: "Analyses médicales", domain: "Santé", riasecMatch: ["I", "C"] },
  { code: "J1304", label: "Préparation en pharmacie", domain: "Santé", riasecMatch: ["C", "I"] },
  { code: "J1305", label: "Prothèses dentaires", domain: "Santé", riasecMatch: ["R", "I"] },
  { code: "J1306", label: "Imagerie médicale", domain: "Santé", riasecMatch: ["I", "R"] },
  { code: "J1401", label: "Audioprothèses", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1402", label: "Optique - lunetterie", domain: "Santé", riasecMatch: ["I", "S"] },
  { code: "J1501", label: "Soins d'hygiène, de confort du patient", domain: "Santé", riasecMatch: ["S", "R"] },
  { code: "J1502", label: "Coordination de services médicaux ou paramédicaux", domain: "Santé", riasecMatch: ["E", "S"] },
  { code: "J1503", label: "Soins infirmiers généralistes", domain: "Santé", riasecMatch: ["S", "I"] },
  { code: "J1504", label: "Soins infirmiers spécialisés en anesthésie", domain: "Santé", riasecMatch: ["S", "I"] },
  { code: "J1505", label: "Soins infirmiers spécialisés en bloc opératoire", domain: "Santé", riasecMatch: ["S", "I"] },
  { code: "J1506", label: "Soins infirmiers spécialisés en prévention", domain: "Santé", riasecMatch: ["S", "I"] },
  { code: "J1507", label: "Soins infirmiers spécialisés en puériculture", domain: "Santé", riasecMatch: ["S"] },

  // SERVICES À LA PERSONNE (K) - 14 codes
  { code: "K1101", label: "Accompagnement et médiation familiale", domain: "Services", riasecMatch: ["S"] },
  { code: "K1201", label: "Action sociale", domain: "Services", riasecMatch: ["S"] },
  { code: "K1202", label: "Éducation de jeunes enfants", domain: "Services", riasecMatch: ["S"] },
  { code: "K1203", label: "Encadrement technique en insertion professionnelle", domain: "Services", riasecMatch: ["S", "E"] },
  { code: "K1204", label: "Médiation sociale et facilitation de la vie en société", domain: "Services", riasecMatch: ["S"] },
  { code: "K1205", label: "Information sociale", domain: "Services", riasecMatch: ["S"] },
  { code: "K1206", label: "Intervention socioculturelle", domain: "Services", riasecMatch: ["S"] },
  { code: "K1207", label: "Intervention socioéducative", domain: "Services", riasecMatch: ["S"] },
  { code: "K1301", label: "Accompagnement médicosocial", domain: "Services", riasecMatch: ["S"] },
  { code: "K1302", label: "Assistance auprès d'adultes", domain: "Services", riasecMatch: ["S"] },
  { code: "K1303", label: "Assistance auprès d'enfants", domain: "Services", riasecMatch: ["S"] },
  { code: "K1304", label: "Services domestiques", domain: "Services", riasecMatch: ["S", "R"] },
  { code: "K1305", label: "Intervention sociale et familiale", domain: "Services", riasecMatch: ["S"] },
  { code: "K2503", label: "Sécurité et surveillance privées", domain: "Sécurité", riasecMatch: ["R", "C"] },

  // SUPPORT ENTREPRISE (M - hors info) - 25 codes
  { code: "M1201", label: "Analyse et ingénierie financière", domain: "Finance", riasecMatch: ["I", "C"] },
  { code: "M1202", label: "Audit et contrôle comptables et financiers", domain: "Finance", riasecMatch: ["I", "C"] },
  { code: "M1203", label: "Comptabilité", domain: "Gestion", riasecMatch: ["C"] },
  { code: "M1204", label: "Contrôle de gestion", domain: "Gestion", riasecMatch: ["I", "C"] },
  { code: "M1205", label: "Direction administrative et financière", domain: "Gestion", riasecMatch: ["E", "I"] },
  { code: "M1206", label: "Management de groupe ou de service comptable", domain: "Gestion", riasecMatch: ["E", "C"] },
  { code: "M1207", label: "Trésorerie et financement", domain: "Finance", riasecMatch: ["C", "I"] },
  { code: "M1401", label: "Assistanat de direction", domain: "Gestion", riasecMatch: ["C", "E"] },
  { code: "M1402", label: "Conseil en organisation et management d'entreprise", domain: "Conseil", riasecMatch: ["E", "I"] },
  { code: "M1403", label: "Études et prospectives socio-économiques", domain: "Conseil", riasecMatch: ["I"] },
  { code: "M1404", label: "Management et inspection de produits d'assurances", domain: "Assurance", riasecMatch: ["E", "C"] },
  { code: "M1501", label: "Assistanat en ressources humaines", domain: "RH", riasecMatch: ["C", "S"] },
  { code: "M1502", label: "Développement des ressources humaines", domain: "RH", riasecMatch: ["S", "E"] },
  { code: "M1503", label: "Management des ressources humaines", domain: "RH", riasecMatch: ["E", "S"] },
  { code: "M1601", label: "Accueil et renseignements", domain: "Services", riasecMatch: ["S"] },
  { code: "M1602", label: "Opérations administratives", domain: "Gestion", riasecMatch: ["C"] },
  { code: "M1603", label: "Secrétariat", domain: "Gestion", riasecMatch: ["C"] },
  { code: "M1604", label: "Assistanat de direction", domain: "Gestion", riasecMatch: ["C", "E"] },
  { code: "M1605", label: "Assistanat technique et administratif", domain: "Gestion", riasecMatch: ["C", "I"] },
  { code: "M1606", label: "Saisie de données", domain: "Gestion", riasecMatch: ["C"] },
  { code: "M1701", label: "Administration de bases de données", domain: "Informatique", riasecMatch: ["I", "C"] },
  { code: "M1704", label: "Management relation clientèle", domain: "Marketing", riasecMatch: ["E", "S"] },
  { code: "M1705", label: "Marketing", domain: "Marketing", riasecMatch: ["E", "A"] },
  { code: "M1706", label: "Promotion des ventes", domain: "Marketing", riasecMatch: ["E"] },
  { code: "M1707", label: "Stratégie commerciale", domain: "Commerce", riasecMatch: ["E", "I"] },

  // TRANSPORT & LOGISTIQUE (N) - 30 codes
  { code: "N1101", label: "Conduite de transport de particuliers", domain: "Transport", riasecMatch: ["R", "S"] },
  { code: "N1102", label: "Conduite de transport de marchandises sur longue distance", domain: "Transport", riasecMatch: ["R"] },
  { code: "N1103", label: "Magasinage et préparation de commandes", domain: "Logistique", riasecMatch: ["R", "C"] },
  { code: "N1104", label: "Manœuvre et conduite d'engins lourds de manutention", domain: "Logistique", riasecMatch: ["R"] },
  { code: "N1105", label: "Manutention manuelle de charges", domain: "Logistique", riasecMatch: ["R"] },
  { code: "N1201", label: "Affrètement transport", domain: "Transport", riasecMatch: ["E", "C"] },
  { code: "N1202", label: "Gestion des opérations de circulation internationale des marchandises", domain: "Transport", riasecMatch: ["C", "I"] },
  { code: "N1301", label: "Conception et organisation de la chaîne logistique", domain: "Logistique", riasecMatch: ["I", "E"] },
  { code: "N1302", label: "Direction de site logistique", domain: "Logistique", riasecMatch: ["E"] },
  { code: "N1303", label: "Intervention technique d'exploitation logistique", domain: "Logistique", riasecMatch: ["C", "R"] },
  { code: "N2101", label: "Navigation commerciale aérienne", domain: "Transport", riasecMatch: ["R", "I"] },
  { code: "N2102", label: "Pilotage et navigation technique aérienne", domain: "Transport", riasecMatch: ["R", "I"] },
  { code: "N2201", label: "Personnel au sol des transports", domain: "Transport", riasecMatch: ["S", "C"] },
  { code: "N2202", label: "Contrôle et sûreté des transports en commun", domain: "Transport", riasecMatch: ["C", "S"] },
  { code: "N3101", label: "Encadrement de la navigation maritime", domain: "Transport", riasecMatch: ["E", "R"] },
  { code: "N3102", label: "Équipage de la navigation maritime", domain: "Transport", riasecMatch: ["R"] },
  { code: "N3103", label: "Navigation fluviale", domain: "Transport", riasecMatch: ["R"] },
  { code: "N3201", label: "Exploitation du transport fluvial", domain: "Transport", riasecMatch: ["E", "R"] },
  { code: "N3202", label: "Exploitation du transport maritime", domain: "Transport", riasecMatch: ["E", "R"] },
  { code: "N4101", label: "Conduite de transport de marchandises sur longue distance", domain: "Transport", riasecMatch: ["R"] },
  { code: "N4102", label: "Conduite de transport de particuliers", domain: "Transport", riasecMatch: ["R", "S"] },
  { code: "N4103", label: "Conduite et livraison par tournées sur courte distance", domain: "Transport", riasecMatch: ["R"] },
  { code: "N4104", label: "Courses et livraisons express", domain: "Transport", riasecMatch: ["R"] },
  { code: "N4105", label: "Conduite et livraison de marchandises", domain: "Transport", riasecMatch: ["R"] },
  { code: "N4201", label: "Direction d'exploitation des transports routiers de marchandises", domain: "Transport", riasecMatch: ["E"] },
  { code: "N4202", label: "Direction d'exploitation des transports routiers de personnes", domain: "Transport", riasecMatch: ["E"] },
  { code: "N4203", label: "Intervention technique d'exploitation des transports routiers de marchandises", domain: "Transport", riasecMatch: ["C", "R"] },
  { code: "N4204", label: "Intervention technique d'exploitation des transports routiers de personnes", domain: "Transport", riasecMatch: ["C", "R"] },
  { code: "N4301", label: "Conduite sur rails", domain: "Transport", riasecMatch: ["R"] },
  { code: "N4302", label: "Contrôle des transports en commun", domain: "Transport", riasecMatch: ["C"] },
]

// Fonction de recherche
export function searchROMECodes(query: string): ROMECode[] {
  const normalized = query.toLowerCase()
  return ROME_CODES.filter(code => 
    code.label.toLowerCase().includes(normalized) ||
    code.code.includes(normalized.toUpperCase()) ||
    code.domain.toLowerCase().includes(normalized)
  ).slice(0, 20)
}

// Mapping RIASEC → Codes ROME
export function getROMEFromRIASEC(riasecProfile: {
  R: number
  I: number
  A: number
  S: number
  E: number
  C: number
}): string[] {
  const dominantTypes = Object.entries(riasecProfile)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
    .map(([type]) => type)
  
  return ROME_CODES
    .filter(code => 
      code.riasecMatch.some(match => dominantTypes.includes(match))
    )
    .map(code => code.code)
    .slice(0, 10)
}

// Helper: Get ROME code by label
export function getROMEByLabel(label: string): ROMECode | undefined {
  return ROME_CODES.find(code => code.label === label)
}

// Helper: Get ROME code by code
export function getROMEByCode(codeRome: string): ROMECode | undefined {
  return ROME_CODES.find(code => code.code === codeRome)
}

// Get all domains
export function getAllDomains(): string[] {
  return Array.from(new Set(ROME_CODES.map(code => code.domain))).sort()
}

// Get codes by domain
export function getROMEByDomain(domain: string): ROMECode[] {
  return ROME_CODES.filter(code => code.domain === domain)
}
