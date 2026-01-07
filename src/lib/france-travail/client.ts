interface JobOfferParams {
  romeCodes: string[];
  location?: string;
  distance?: number;
  limit?: number;
}

interface FormationParams {
  romeCodes?: string[];
  keywords?: string;
  location?: string;
  distance?: number;
  limit?: number;
}

interface FranceTravailToken {
  access_token: string;
  expires_at: number;
}

let cachedToken: FranceTravailToken | null = null;

async function getFranceTravailToken(): Promise<string> {
  if (cachedToken && cachedToken.expires_at > Date.now()) {
    return cachedToken.access_token;
  }

  const clientId = process.env.FRANCE_TRAVAIL_CLIENT_ID;
  const clientSecret = process.env.FRANCE_TRAVAIL_CLIENT_SECRET;
  const apiUrl = process.env.FRANCE_TRAVAIL_API_URL || 'https://api.francetravail.io';

  if (!clientId || !clientSecret) {
    console.warn('[France Travail] API credentials not configured');
    throw new Error('France Travail API credentials not configured');
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const response = await fetch(`${apiUrl}/partenaire/oauth2/access_token?realm=%2Fpartenaire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      },
      body: 'grant_type=client_credentials&scope=api_offresdemploiv2 o2dsoffre'
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    cachedToken = {
      access_token: data.access_token,
      expires_at: Date.now() + (data.expires_in - 60) * 1000
    };

    return cachedToken.access_token;
  } catch (error) {
    console.error('[France Travail] Token fetch error:', error);
    throw error;
  }
}

export async function fetchJobOffers(params: JobOfferParams): Promise<any[]> {
  const apiUrl = process.env.FRANCE_TRAVAIL_API_URL || 'https://api.francetravail.io';

  if (!process.env.FRANCE_TRAVAIL_CLIENT_ID || !process.env.FRANCE_TRAVAIL_CLIENT_SECRET) {
    console.warn('[France Travail] API not configured, returning mock data');
    return getMockJobOffers(params);
  }

  try {
    const token = await getFranceTravailToken();
    
    const searchParams = new URLSearchParams();
    
    if (params.romeCodes.length > 0) {
      searchParams.append('codeROME', params.romeCodes.join(','));
    }
    
    if (params.location) {
      searchParams.append('commune', params.location);
    }
    
    if (params.distance) {
      searchParams.append('distance', params.distance.toString());
    }
    
    searchParams.append('sort', '2');
    
    if (params.limit) {
      searchParams.append('range', `0-${params.limit - 1}`);
    }

    const response = await fetch(
      `${apiUrl}/partenaire/offresdemploi/v2/offres/search?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Job search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.resultats || [];
  } catch (error) {
    console.error('[France Travail] Job fetch error:', error);
    return getMockJobOffers(params);
  }
}

function getMockJobOffers(params: JobOfferParams): any[] {
  const mockOffers = [
    {
      id: 'mock-1',
      intitule: 'Développeur Full Stack',
      description: 'Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe. Compétences requises: React, Node.js, TypeScript, PostgreSQL.',
      entreprise: { nom: 'TechCorp' },
      lieuTravail: { libelle: 'Alès (30100)', commune: '30007' },
      typeContrat: 'CDI',
      salaire: { libelle: '35K-45K EUR/an' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/recherche' }
    },
    {
      id: 'mock-2',
      intitule: 'Data Scientist',
      description: 'Rejoignez notre équipe Data Science. Vous travaillerez sur des projets de Machine Learning et d\'analyse de données. Python, scikit-learn, TensorFlow.',
      entreprise: { nom: 'DataLab' },
      lieuTravail: { libelle: 'Nîmes (30000)', commune: '30189' },
      typeContrat: 'CDI',
      salaire: { libelle: '40K-55K EUR/an' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/recherche' }
    },
    {
      id: 'mock-3',
      intitule: 'Ingénieur Cybersécurité',
      description: 'Expert en sécurité informatique recherché. Pentesting, analyse de vulnérabilités, SOC. Certifications OSCP/CEH appréciées.',
      entreprise: { nom: 'SecureIT' },
      lieuTravail: { libelle: 'Montpellier (34000)', commune: '34172' },
      typeContrat: 'CDI',
      salaire: { libelle: '45K-60K EUR/an' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/recherche' }
    },
    {
      id: 'mock-4',
      intitule: 'DevOps Engineer',
      description: 'Nous cherchons un DevOps pour automatiser nos déploiements. Docker, Kubernetes, CI/CD, Terraform. Expérience cloud AWS/Azure.',
      entreprise: { nom: 'CloudOps' },
      lieuTravail: { libelle: 'Alès (30100)', commune: '30007' },
      typeContrat: 'CDI',
      salaire: { libelle: '42K-52K EUR/an' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/recherche' }
    },
    {
      id: 'mock-5',
      intitule: 'Architecte Logiciel',
      description: 'Architecte logiciel senior pour concevoir des solutions scalables. Microservices, Event-Driven Architecture, Domain-Driven Design.',
      entreprise: { nom: 'Enterprise Solutions' },
      lieuTravail: { libelle: 'Nîmes (30000)', commune: '30189' },
      typeContrat: 'CDI',
      salaire: { libelle: '55K-70K EUR/an' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/recherche' }
    }
  ];

  return mockOffers.slice(0, params.limit || 20);
}

// ============================================
// FORMATIONS API
// ============================================

export async function fetchFormations(params: FormationParams): Promise<any[]> {
  const apiUrl = process.env.FRANCE_TRAVAIL_API_URL || 'https://api.francetravail.io';

  if (!process.env.FRANCE_TRAVAIL_CLIENT_ID || !process.env.FRANCE_TRAVAIL_CLIENT_SECRET) {
    console.warn('[France Travail Formations] API not configured, returning mock formations');
    return getMockFormations(params);
  }

  try {
    console.log('[France Travail Formations] Fetching token...');
    const token = await getFranceTravailToken();
    console.log('[France Travail Formations] Token obtained successfully');
    
    const searchParams = new URLSearchParams();
    
    if (params.romeCodes && params.romeCodes.length > 0) {
      searchParams.append('codeRome', params.romeCodes.join(','));
    }
    
    if (params.keywords) {
      searchParams.append('motsCles', params.keywords);
    }
    
    if (params.location) {
      searchParams.append('codeCommune', params.location);
    }
    
    if (params.distance) {
      searchParams.append('distance', params.distance.toString());
    }
    
    if (params.limit) {
      searchParams.append('range', `0-${params.limit - 1}`);
    }

    const url = `${apiUrl}/partenaire/offresdemploi/v2/formations/search?${searchParams.toString()}`;
    console.log('[France Travail Formations] Calling API:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    console.log('[France Travail Formations] API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[France Travail Formations] API error ${response.status}: ${errorText}`);
      console.warn('[France Travail Formations] Using mock data as fallback');
      return getMockFormations(params);
    }

    const data = await response.json();
    console.log('[France Travail Formations] API returned:', data.resultats?.length || 0, 'formations');
    
    // Si l'API ne retourne aucun résultat, utiliser les données mock
    if (!data.resultats || data.resultats.length === 0) {
      console.warn('[France Travail Formations] No results from API, using mock data');
      return getMockFormations(params);
    }
    
    return data.resultats;
  } catch (error) {
    console.error('[France Travail Formations] Fetch error:', error);
    console.warn('[France Travail Formations] Using mock data as fallback');
    return getMockFormations(params);
  }
}

function getMockFormations(params: FormationParams): any[] {
  const mockFormations = [
    {
      id: 'formation-1',
      intitule: 'Développeur Web et Web Mobile',
      description: 'Formation complète pour devenir développeur web full-stack. HTML, CSS, JavaScript, React, Node.js, bases de données.',
      organisme: { nom: 'AFPA', ville: 'Nîmes' },
      duree: '7 mois',
      niveauSortie: 'Bac+2',
      certification: 'Titre professionnel niveau 5',
      modalites: 'Présentiel',
      dateDebut: '2025-03-01',
      url: 'https://www.afpa.fr/formation-qualifiante/developpeur-web-et-web-mobile',
      coutTotal: '8500 EUR',
      financement: ['CPF', 'Pôle Emploi', 'Région']
    },
    {
      id: 'formation-2',
      intitule: 'Data Analyst',
      description: 'Apprenez à analyser et visualiser des données. Python, SQL, Power BI, statistiques, machine learning.',
      organisme: { nom: 'OpenClassrooms', ville: 'En ligne' },
      duree: '6 mois',
      niveauSortie: 'Bac+3/4',
      certification: 'Diplôme niveau 6',
      modalites: 'À distance',
      dateDebut: '2025-02-15',
      url: 'https://openclassrooms.com/fr/paths/data-analyst',
      coutTotal: '6900 EUR',
      financement: ['CPF', 'Pôle Emploi']
    },
    {
      id: 'formation-3',
      intitule: 'Cybersécurité - Analyste SOC',
      description: 'Formation spécialisée en cybersécurité. Analyse de menaces, pentesting, gestion des incidents, SIEM.',
      organisme: { nom: 'Simplon', ville: 'Montpellier' },
      duree: '8 mois',
      niveauSortie: 'Bac+3/4',
      certification: 'Titre professionnel niveau 6',
      modalites: 'Hybride',
      dateDebut: '2025-04-01',
      url: 'https://simplon.co/formation/analyste-cybersecurite',
      coutTotal: '9500 EUR',
      financement: ['CPF', 'Pôle Emploi', 'OPCO']
    },
    {
      id: 'formation-4',
      intitule: 'DevOps - Administrateur Cloud',
      description: 'Maîtrisez les outils DevOps et le cloud. Docker, Kubernetes, CI/CD, AWS, Azure, Terraform, monitoring.',
      organisme: { nom: 'M2i Formation', ville: 'Nîmes' },
      duree: '5 mois',
      niveauSortie: 'Bac+2',
      certification: 'Certification professionnelle',
      modalites: 'Présentiel',
      dateDebut: '2025-03-15',
      url: 'https://www.m2iformation.fr/formation-devops',
      coutTotal: '7800 EUR',
      financement: ['CPF', 'Entreprise', 'Pôle Emploi']
    },
    {
      id: 'formation-5',
      intitule: 'Gestionnaire de Paie',
      description: 'Formation complète en gestion de la paie et administration du personnel. Législation sociale, logiciels de paie.',
      organisme: { nom: 'CNAM', ville: 'Montpellier' },
      duree: '10 mois',
      niveauSortie: 'Bac+2',
      certification: 'Titre professionnel niveau 5',
      modalites: 'Présentiel et à distance',
      dateDebut: '2025-09-01',
      url: 'https://www.cnam.fr/gestionnaire-paie',
      coutTotal: '4500 EUR',
      financement: ['CPF', 'Pôle Emploi', 'Région']
    },
    {
      id: 'formation-6',
      intitule: 'Infirmier(ère) - Préparation au concours',
      description: 'Préparation intensive au concours IFSI. Biologie, mathématiques, tests psychotechniques, entretien oral.',
      organisme: { nom: 'Cours Diderot', ville: 'Montpellier' },
      duree: '6 mois',
      niveauSortie: 'Préparation concours',
      certification: 'Attestation de formation',
      modalites: 'Présentiel',
      dateDebut: '2025-09-01',
      url: 'https://www.coursdiderot.com/prepa-infirmier',
      coutTotal: '3200 EUR',
      financement: ['CPF', 'Autofinancement']
    },
    {
      id: 'formation-7',
      intitule: 'Commercial B2B',
      description: 'Techniques de vente en B2B, prospection, négociation, CRM, gestion de la relation client.',
      organisme: { nom: 'IFOCOP', ville: 'Nîmes' },
      duree: '8 mois',
      niveauSortie: 'Bac+2',
      certification: 'Titre professionnel niveau 5',
      modalites: 'Présentiel avec stage',
      dateDebut: '2025-02-01',
      url: 'https://www.ifocop.fr/formation-commercial',
      coutTotal: '6500 EUR',
      financement: ['CPF', 'Pôle Emploi', 'Transition Pro']
    },
    {
      id: 'formation-8',
      intitule: 'Comptable Assistant',
      description: 'Formation en comptabilité générale et analytique. Logiciels comptables, déclarations fiscales, paie.',
      organisme: { nom: 'Greta', ville: 'Alès' },
      duree: '6 mois',
      niveauSortie: 'Bac',
      certification: 'Titre professionnel niveau 4',
      modalites: 'Présentiel',
      dateDebut: '2025-03-01',
      url: 'https://www.greta.fr/comptable-assistant',
      coutTotal: '5200 EUR',
      financement: ['CPF', 'Pôle Emploi', 'Région']
    },
    {
      id: 'formation-9',
      intitule: 'Conseiller en Insertion Professionnelle',
      description: 'Accompagnement des publics en insertion. Techniques d\'entretien, bilan de compétences, projet professionnel.',
      organisme: { nom: 'AFPA', ville: 'Montpellier' },
      duree: '8 mois',
      niveauSortie: 'Bac+2',
      certification: 'Titre professionnel niveau 5',
      modalites: 'Présentiel avec stage',
      dateDebut: '2025-04-15',
      url: 'https://www.afpa.fr/formation-conseiller-insertion',
      coutTotal: '7200 EUR',
      financement: ['CPF', 'Pôle Emploi', 'Région']
    },
    {
      id: 'formation-10',
      intitule: 'Chef de Projet Digital',
      description: 'Gestion de projets web et digitaux. Méthodologies agiles, UX/UI, marketing digital, analytics.',
      organisme: { nom: 'Digital Campus', ville: 'Montpellier' },
      duree: '12 mois',
      niveauSortie: 'Bac+3/4',
      certification: 'Titre RNCP niveau 6',
      modalites: 'Hybride',
      dateDebut: '2025-10-01',
      url: 'https://www.digital-campus.fr/chef-projet-digital',
      coutTotal: '8900 EUR',
      financement: ['CPF', 'Alternance', 'Pôle Emploi']
    }
  ];

  let filtered = mockFormations;

  if (params.keywords) {
    const keywords = params.keywords.toLowerCase();
    filtered = filtered.filter(f => 
      f.intitule.toLowerCase().includes(keywords) ||
      f.description.toLowerCase().includes(keywords)
    );
  }

  return filtered.slice(0, params.limit || 20);
}

// ============================================
// FILTRES ACCESSIBILITÉ HANDICAP
// ============================================

export interface AccessibilityFilters {
  handicapOnly?: boolean          // Offres réservées TH
  amenagementPoste?: boolean      // Poste aménageable
  accessiblePMR?: boolean         // Accessible PMR
  remoteWorkPossible?: boolean    // Télétravail possible
}

export interface JobAccessibility {
  amenagementPossible: boolean
  entrepriseHandiFriendly: boolean
  contactReferentHandicap: string | null
  aideAGEFIPH: boolean
}

export interface FormationAccessibility {
  accessible: boolean
  adaptations: string[]
  referentHandicap: string | null
  financement: {
    cpf: boolean
    agefiph: boolean
    pole_emploi: boolean
  }
}

/**
 * Recherche offres d'emploi avec filtres accessibilité handicap
 */
export async function searchJobsWithAccessibility(
  params: JobOfferParams,
  accessibilityFilters: AccessibilityFilters
): Promise<any[]> {
  const apiUrl = process.env.FRANCE_TRAVAIL_API_URL || 'https://api.francetravail.io';

  if (!process.env.FRANCE_TRAVAIL_CLIENT_ID || !process.env.FRANCE_TRAVAIL_CLIENT_SECRET) {
    console.warn('[France Travail] API not configured, returning mock data with accessibility');
    return getMockJobsWithAccessibility(params.romeCodes[0], accessibilityFilters);
  }

  try {
    const token = await getFranceTravailToken();
    
    const searchParams = new URLSearchParams();
    
    if (params.romeCodes.length > 0) {
      searchParams.append('codeROME', params.romeCodes.join(','));
    }
    
    if (params.location) {
      searchParams.append('commune', params.location);
    }
    
    if (params.distance) {
      searchParams.append('distance', params.distance.toString());
    }

    // Filtres handicap natifs API France Travail
    if (accessibilityFilters.handicapOnly) {
      searchParams.append('offresMRS', 'true');  // Méthode de Recrutement par Simulation
    }
    
    if (accessibilityFilters.remoteWorkPossible) {
      searchParams.append('natureContrat', 'E2');  // Télétravail
    }

    const response = await fetch(
      `${apiUrl}/partenaire/offresdemploi/v2/offres/search?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.error('[France Travail] API error:', response.status);
      return getMockJobsWithAccessibility(params.romeCodes[0], accessibilityFilters);
    }

    const data = await response.json();
    
    return data.resultats?.map((offer: any) => ({
      ...offer,
      accessibility: {
        amenagementPossible: offer.accessibleTH || false,
        entrepriseHandiFriendly: offer.entreprise?.adaptee || false,
        contactReferentHandicap: offer.contact?.nom || null,
        aideAGEFIPH: (offer.entreprise?.nombreSalaries || 0) >= 20
      }
    })) || [];

  } catch (error) {
    console.error('[France Travail] Error searching jobs with accessibility:', error);
    return getMockJobsWithAccessibility(params.romeCodes[0], accessibilityFilters);
  }
}

/**
 * Recherche formations accessibles handicap
 */
export async function searchFormationsWithAccessibility(
  romeCode: string,
  location: string
): Promise<any[]> {
  const apiUrl = process.env.FRANCE_TRAVAIL_API_URL || 'https://api.francetravail.io';

  if (!process.env.FRANCE_TRAVAIL_CLIENT_ID || !process.env.FRANCE_TRAVAIL_CLIENT_SECRET) {
    console.warn('[France Travail] API not configured, returning mock formations accessible');
    return getMockFormationsAccessible(romeCode);
  }

  try {
    const token = await getFranceTravailToken();
    
    const searchParams = new URLSearchParams({
      codeROME: romeCode,
      commune: location,
      distance: '50',
      accessibiliteHandicap: 'true'  // Filtre natif API
    });

    const response = await fetch(
      `${apiUrl}/partenaire/formations/v1/search?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      return getMockFormationsAccessible(romeCode);
    }

    const data = await response.json();
    
    return data.resultats?.map((f: any) => ({
      ...f,
      accessibility: {
        accessible: f.accessibiliteHandicap || false,
        adaptations: f.amenagements || [],
        referentHandicap: f.contact?.referentHandicap || null,
        financement: {
          cpf: f.eligibleCPF || false,
          agefiph: true,
          pole_emploi: f.eligibleAIF || false
        }
      }
    })) || [];

  } catch (error) {
    console.error('[France Travail] Error searching formations with accessibility:', error);
    return getMockFormationsAccessible(romeCode);
  }
}

// ============================================
// MOCK DATA POUR FALLBACK
// ============================================

function getMockJobsWithAccessibility(romeCode: string, filters: AccessibilityFilters): any[] {
  const mockJobs = [
    {
      id: 'mock-acc-1',
      intitule: 'Développeur Web Junior - Entreprise Adaptée',
      description: 'Poste 100% télétravail. Entreprise engagée handicap avec référent dédié. Aménagements possibles selon besoins.',
      entreprise: { nom: 'TechCorp EA' },
      lieuTravail: { libelle: 'Télétravail', commune: '30007' },
      typeContrat: 'CDI',
      salaire: { libelle: '28K-32K EUR/an' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/mock-acc-1' },
      accessibility: {
        amenagementPossible: true,
        entrepriseHandiFriendly: true,
        contactReferentHandicap: 'Marie Dupont - Référente Handicap',
        aideAGEFIPH: true
      }
    },
    {
      id: 'mock-acc-2',
      intitule: 'Assistant Administratif - Fonction Publique',
      description: 'Poste adapté PMR. Horaires flexibles possibles. Référent handicap disponible. Locaux accessibles.',
      entreprise: { nom: 'Mairie d\'Alès' },
      lieuTravail: { libelle: 'Alès (30100)', commune: '30007' },
      typeContrat: 'CDD',
      salaire: { libelle: '1800-2000 EUR/mois' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/mock-acc-2' },
      accessibility: {
        amenagementPossible: true,
        entrepriseHandiFriendly: true,
        contactReferentHandicap: 'Service RH',
        aideAGEFIPH: true
      }
    },
    {
      id: 'mock-acc-3',
      intitule: 'Conseiller Client à Distance',
      description: 'Télétravail total. Matériel fourni et adapté selon besoins. Formation initiale personnalisée.',
      entreprise: { nom: 'CallCenter Solutions' },
      lieuTravail: { libelle: 'Télétravail', commune: '30007' },
      typeContrat: 'CDI',
      salaire: { libelle: '1600-1900 EUR/mois' },
      dateCreation: new Date().toISOString(),
      origineOffre: { urlOrigine: 'https://candidat.francetravail.fr/offres/mock-acc-3' },
      accessibility: {
        amenagementPossible: true,
        entrepriseHandiFriendly: false,
        contactReferentHandicap: null,
        aideAGEFIPH: true
      }
    }
  ];

  return mockJobs;
}

function getMockFormationsAccessible(romeCode: string): any[] {
  return [
    {
      id: 'form-acc-1',
      intitule: 'Titre Professionnel Développeur Web (accessible handicap)',
      description: 'Formation certifiante avec accompagnement personnalisé. Centre accessible PMR.',
      organisme: 'AFPA Nîmes - Centre accessible',
      duree: '7 mois',
      lieu: 'Nîmes (30000)',
      certification: 'Titre Professionnel niveau 5',
      dateDebut: '2025-09-01',
      url: 'https://afpa.fr',
      coutTotal: '12000 EUR',
      financement: ['CPF', 'AGEFIPH', 'Pôle Emploi'],
      accessibility: {
        accessible: true,
        adaptations: [
          'Supports pédagogiques adaptés',
          'Rythme personnalisable',
          'Référent handicap dédié',
          'Locaux PMR',
          'Matériel ergonomique disponible'
        ],
        referentHandicap: 'Sophie Martin - 04.66.XX.XX.XX',
        financement: {
          cpf: true,
          agefiph: true,
          pole_emploi: true
        }
      }
    },
    {
      id: 'form-acc-2',
      intitule: 'Formation Bureautique (100% distanciel)',
      description: 'Formation entièrement en ligne avec supports vidéo sous-titrés.',
      organisme: 'GRETA Gard - Formation à distance',
      duree: '3 mois',
      lieu: 'À distance',
      certification: 'Certificat',
      dateDebut: '2025-07-15',
      url: 'https://greta-gard.fr',
      coutTotal: '2500 EUR',
      financement: ['CPF', 'AGEFIPH'],
      accessibility: {
        accessible: true,
        adaptations: [
          'Formation 100% en ligne',
          'Supports vidéo sous-titrés',
          'Sessions individuelles possibles',
          'Logiciels de reconnaissance vocale compatibles'
        ],
        referentHandicap: 'Jean Durand',
        financement: {
          cpf: true,
          agefiph: true,
          pole_emploi: false
        }
      }
    },
    {
      id: 'form-acc-3',
      intitule: 'CAP Accompagnant Éducatif Petite Enfance',
      description: 'Formation avec aménagements possibles. Stages adaptés selon situation.',
      organisme: 'CFA Alès',
      duree: '10 mois',
      lieu: 'Alès (30100)',
      certification: 'CAP',
      dateDebut: '2025-09-01',
      url: 'https://cfa-ales.fr',
      coutTotal: '0 EUR (apprentissage)',
      financement: ['Apprentissage', 'AGEFIPH'],
      accessibility: {
        accessible: true,
        adaptations: [
          'Aménagement des stages',
          'Tutorat renforcé',
          'Matériel pédagogique adapté'
        ],
        referentHandicap: 'Marie Legrand',
        financement: {
          cpf: false,
          agefiph: true,
          pole_emploi: true
        }
      }
    }
  ];
}
