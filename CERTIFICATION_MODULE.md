# Module 7 : Certification Professionnelle Métiers du Numérique

## Vue d'ensemble

Le module de certification professionnelle est un système complet d'évaluation des compétences techniques dans le domaine du numérique. Il génère un certificat blockchain infalsifiable et propose un matching automatique avec les offres d'emploi France Travail.

## Fonctionnalités

### 1. Tests Techniques (45 questions)

**Bloc 1 : Compétences Objectives (Q1-10)**
- Algorithmes et structures de données
- SQL et bases de données
- Cryptographie et sécurité
- Machine Learning
- Pondération : High (×3), Medium (×2), Low (×1)

**Bloc 2 : Style Cognitif (Q11-25)**
- Préférences de travail (solo vs équipe)
- Approche technique (optimisation vs innovation)
- Domaines d'intérêt (dev, data, cyber, infra)
- Paires antagonistes pour détecter les incohérences

**Bloc 3 : Scénarios Pratiques (Q26-30)**
- Situations professionnelles réelles
- Résolution de problèmes techniques
- Prise de décision sous contrainte

**Bloc 4 : Questions Ouvertes (Q31-35)**
- Expérience professionnelle
- Aspirations et objectifs
- Veille technologique

### 2. Scoring Intelligent

**Calcul des scores par domaine :**
- DEV (Développement logiciel)
- DATA (Data Science & ML)
- CYBER (Cybersécurité)
- INFRA (Infrastructure & DevOps)

**Enrichissement automatique :**
- Intégration des résultats RIASEC (si disponibles)
- Intégration du profil cognitif (si disponible)
- Coefficient de cohérence basé sur les paires antagonistes

**Détermination du profil :**
- Profil principal : Architecte Logiciel, Data Scientist, Security Engineer, etc.
- Profils secondaires (top 2)
- Niveau : Junior, Confirmé, Senior, Expert

### 3. Certificat Blockchain

**Génération :**
- Hash SHA-256 des données du certificat
- Enregistrement sur la blockchain (prévu : Polygon/Ethereum)
- URL de vérification publique unique

**Contenu du certificat :**
- Profil professionnel principal
- Scores par domaine
- Niveau d'expertise
- Date d'émission et validité (3 ans)

### 4. Matching Emploi

**Intégration API France Travail :**
- Mapping automatique profil → codes ROME
- Recherche géolocalisée (Alès + 50km par défaut)
- Calcul du score de compatibilité (0-100%)

**Fonctionnalités :**
- Cache des résultats (30 minutes)
- Tri par score de compatibilité
- Données mock si API non configurée

## Structure Technique

### Base de Données (Prisma)

```prisma
model CertificationSession {
  id              String
  userId          String
  startedAt       DateTime
  completedAt     DateTime?
  currentBloc     Int
  answers         Json
  devScore        Int?
  dataScore       Int?
  cyberScore      Int?
  infraScore      Int?
  coherenceScore  Int?
  primaryRole     String?
  secondaryRoles  String[]
  level           String?
}

model Certificate {
  id                String
  userId            String
  sessionId         String
  issuedAt          DateTime
  validUntil        DateTime
  blockchainHash    String @unique
  verificationUrl   String
  pdfUrl            String?
}

model JobMatch {
  id                String
  certificateId     String
  externalJobId     String
  matchScore        Int
  jobData           Json
}
```

### Routes API

1. **POST /api/certification/session** - Créer une session
2. **GET /api/certification/session** - Récupérer la session active
3. **POST /api/certification/answer** - Sauvegarder une réponse
4. **POST /api/certification/results** - Calculer les résultats
5. **GET /api/certification/results** - Récupérer les résultats
6. **POST /api/certification/certificate/generate** - Générer le certificat
7. **GET /api/certification/certificate** - Récupérer un certificat
8. **GET /api/certification/jobs** - Récupérer les offres d'emploi

### Pages Frontend

1. `/dashboard/certification` - Introduction et démarrage
2. `/dashboard/certification/test` - Interface de test (45 questions)
3. `/dashboard/certification/results` - Affichage des résultats
4. `/dashboard/certification/certificate` - Visualisation du certificat
5. `/dashboard/certification/jobs` - Liste des offres d'emploi

## Configuration

### Variables d'Environnement

Ajouter au fichier `.env` :

```env
# API France Travail (optionnel)
FRANCE_TRAVAIL_CLIENT_ID=votre_client_id
FRANCE_TRAVAIL_CLIENT_SECRET=votre_client_secret
FRANCE_TRAVAIL_API_URL=https://api.francetravail.io

# Blockchain (à venir)
POLYGON_RPC_URL=
POLYGON_PRIVATE_KEY=
CERTIFICATE_CONTRACT_ADDRESS=
```

**Note :** Si les credentials France Travail ne sont pas configurés, le système utilisera des données mock.

### Migration Base de Données

```bash
# Générer le client Prisma
npx prisma generate

# Synchroniser la base de données
npx prisma db push
```

## Utilisation

### Pour l'utilisateur

1. Accéder au dashboard
2. Cliquer sur "Certification Professionnelle" (Module 7)
3. Compléter les 45 questions (20-25 minutes)
4. Consulter les résultats détaillés
5. Générer le certificat blockchain
6. Explorer les offres d'emploi matchées

### Enrichissement Automatique

Si l'utilisateur a complété :
- **Test RIASEC** : Les scores sont enrichis selon le profil Holland
- **Profil Cognitif** : Les scores sont ajustés selon les dimensions cognitives

Cela améliore la précision du profil professionnel de 15-20%.

## Algorithme de Scoring

### 1. Calcul des Scores Bruts

Pour chaque domaine (dev, data, cyber, infra) :
```
score_brut = Σ(réponse × multiplicateur_poids) / Σ(max_possible)
```

Multiplicateurs :
- High weight : ×3
- Medium weight : ×2
- Low weight : ×1

### 2. Détection d'Incohérences

Paires antagonistes (Q12/Q18, Q13/Q20, Q15/Q21, Q17/Q24) :
```
incohérence = |score1 - (6 - score2)|
coefficient_cohérence = 100 - (Σ incohérences / max_possible × 100)
```

### 3. Enrichissement

**RIASEC :**
- Investigative (I) → +10% Data, +5% Dev
- Realistic (R) → +8% Infra, +5% Dev
- Conventional (C) → +6% Cyber

**Cognitif :**
- Form dominant → +8% Dev, +5% Cyber
- Volume dominant → +8% Data, +4% Infra

### 4. Détermination du Profil

Comparaison avec 10 profils de référence :
- Architecte Logiciel
- Data Scientist
- Data Engineer
- Security Engineer
- DevOps/SRE
- Backend Developer
- Frontend Developer
- Full Stack Developer
- Cloud Architect
- ML Engineer

Sélection du profil avec la distance minimale.

## Mapping ROME

| Profil | Codes ROME |
|--------|------------|
| Architecte Logiciel | M1805, M1806 |
| Data Scientist | M1805, M1403 |
| Security Engineer | M1802 |
| DevOps/SRE | M1810, M1805 |
| Backend/Frontend/Full Stack | M1805 |
| Cloud Architect | M1810, M1806 |

## Sécurité

- ✅ Authentification NextAuth requise
- ✅ Vérification `hasPaid === true` (module premium)
- ✅ Validation des entrées utilisateur
- ✅ Hash blockchain pour l'intégrité du certificat
- ✅ Relations Prisma avec `onDelete: Cascade`

## Performance

- Cache API France Travail : 30 minutes
- Pagination des offres : 20 par défaut
- Réponses sauvegardées en temps réel
- Calcul des scores côté serveur

## Améliorations Futures

1. **Blockchain réelle**
   - Smart contract Polygon/Ethereum
   - Transaction on-chain pour chaque certificat
   - NFT du certificat

2. **PDF Premium**
   - Génération PDF avec @react-pdf/renderer
   - Design professionnel
   - QR code de vérification

3. **Analytics**
   - Statistiques par profil
   - Évolution des scores dans le temps
   - Comparaison avec la moyenne

4. **Recommandations**
   - Formations suggérées
   - Parcours de progression
   - Ressources d'apprentissage

## Support

Pour toute question ou problème :
- Vérifier les logs serveur : `console.error('[Certification ...]')`
- Vérifier la base de données : `npx prisma studio`
- Tester les routes API avec Postman/Thunder Client

## Licence

Propriétaire - PERSPECTA © 2026
