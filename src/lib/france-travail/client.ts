interface JobOfferParams {
  romeCodes: string[];
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
