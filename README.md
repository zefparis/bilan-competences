# PERSPECTA-COMPETENCES v3.3 🎯

![Version](https://img.shields.io/badge/version-3.3.0-blue) ![Status](https://img.shields.io/badge/status-Production-success) ![License](https://img.shields.io/badge/license-Proprietary-red) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Prisma](https://img.shields.io/badge/Prisma-5.22-green)

**Outil d'orientation professionnelle et d'analyse de compétences**

---

## 🚀 En 30 secondes

- ✅ **Analyse de compétences** : Couverture de 287 métiers français (codes ROME)
- 🤖 **Analyse IA Claude 3.5** : Identification des compétences transférables
- 💼 **Recherche emploi + formations** : API France Travail intégrée
- 🏆 **Certificat numérique** : Hash blockchain de vos résultats
- 📄 **Rapport PDF** : Document structuré avec recommandations
- ♿ **Module accessibilité** : Prise en compte des besoins spécifiques
- 💰 **Modèle freemium** : Modules 1-6 gratuits, 7-11 payants (49€)

**URL Production** : [perspecta.fr](https://perspecta.fr)

---

## 💡 Comment l'outil fonctionne

### Exemple : Reconversion depuis métier manuel

**Entrées utilisateur** :
- Parcours professionnel (ex: 20 ans plomberie)
- Tests cognitifs (Stroop, RAN, Trail Making, Réaction)
- Profil RIASEC (préférences Réaliste/Conventionnel)
- Localisation (ville, code postal, département)

**Traitement automatisé** :
- Analyse IA identifie compétences transférables (diagnostic, plans, autonomie)
- Matching codes ROME compatibles (I1304, I1302)
- Calcul gap technique (électricité, automatismes)
- Recherche formations CPF dans rayon 50km
- Recherche offres France Travail géolocalisées

**Sortie (PDF)** :
- 3-5 pistes métiers avec scores de compatibilité
- Liste formations accessibles géographiquement
- Plan d'action avec temps estimé
- Offres France Travail à titre indicatif

**Important** : Les offres affichées sont publiques (API France Travail). Nous ne garantissons pas l'obtention de ces postes.

---

## ⚠️ Cadre d'utilisation

### Ce que PERSPECTA fait ✅
- Analyse votre profil cognitif via tests scientifiques
- Identifie vos compétences transférables par IA
- Calcule la compatibilité avec 287 métiers français
- Propose des formations financées (CPF)
- Génère un rapport structuré exploitable

### Ce que PERSPECTA ne fait PAS ❌
- Garantir l'obtention d'un emploi ou entretien
- Remplacer un conseiller en évolution professionnelle
- Contacter les employeurs/organismes à votre place
- Assurer l'acceptation dans une formation
- Fournir un accompagnement humain personnalisé

**Recommandation** : Utilisez PERSPECTA comme complément à un accompagnement humain (France Travail, Cap Emploi, mission locale).

---

## 💰 Tarification

**49€ TTC** - Paiement unique, accès à vie

### Inclus dans le paiement

| Fonctionnalité | Coût réel estimé |
|----------------|------------------|
| 4 tests cognitifs scientifiques | ~200€ (prestation psy) |
| Analyse IA Claude 3.5 personnalisée | ~3€ (coût API réel) |
| Profil RIASEC professionnel | ~150€ |
| Matching 287 codes ROME | Développement propriétaire |
| Rapport PDF 40+ pages | ~100€ (prestation) |
| Certificat blockchain | Technologie unique |

### Politique commerciale

- ✅ Accès immédiat après paiement
- ✅ Pas d'abonnement, accès à vie
- 📧 Support technique : support@ia-solution.fr (48-72h)
- 🔄 Mises à jour et correctifs inclus
- ⚠️ **Vente finale** : Aucun remboursement sauf bug bloquant avéré

**Limitation de responsabilité** : PERSPECTA est un outil d'orientation, pas un service de placement. Nous ne garantissons pas l'obtention d'un emploi, d'une formation, ou la réussite de votre reconversion.

---

## 🎯 Nouveautés v3.3 - Optimisation & Localisation (Janvier 2026)

### 🆕 Améliorations Majeures (v3.3)

#### 1. Optimisation Profils PDF - Différenciation Intelligente
- 🎯 **RIASEC Optimisé** : Amplification variance automatique (6-32% au lieu de 7-8%)
  - Détection profils plats (variance < 15%)
  - Dominant garanti ≥ 25%, Faible ≤ 10%
  - Algorithme d'amplification 1.5x avec renormalisation
- 🧠 **Cognitif Optimisé** : Scores différenciés (30-90% au lieu de 50%)
  - Détection uniformité (tous scores 45-55%)
  - Au moins 1 force (≥ 65%) et 1 zone vigilance (≤ 45%)
  - Amplification 2.5x + variance aléatoire pour unicité
- ✅ **Sécurité** : Try-catch avec fallback gracieux sur données originales
- 📊 **Logs** : Console détaillée pour debugging optimisations

#### 2. Localisation Géographique - Filtrage Intelligent
- 📍 **Profil Utilisateur** : Nouveaux champs (ville, code postal, département)
- 🎯 **Formations Localisées** : Rayon 50km autour du code postal utilisateur
- 💼 **Offres d'Emploi Localisées** : Matching géographique automatique
- 🔄 **Migration Base** : `add_user_location` appliquée en production
- ⚠️ **Fallback** : Recherche nationale si pas de localisation
- 🗺️ **API France Travail** : Paramètres `location` et `distance` utilisés

**Impact** : Résultats pertinents géographiquement, évite formations/emplois dans d'autres régions

#### 3. Page "Comment ça marche" - Guide Utilisateur
- 📖 **Nouvelle page** : `/how-it-works` avec guide complet
- 🎯 **Parcours en 4 étapes** : Inscription, Modules gratuits, Premium, Action
- 🆓 **Comparaison Gratuit vs Premium** : Tableau détaillé des fonctionnalités
- 📍 **Importance Localisation** : Section dédiée avec exemples concrets
- ⚠️ **Alerte visible** : Rappel d'ajouter ville, code postal, département
- 📝 **Guide pas-à-pas** : Instructions pour renseigner sa localisation
- 🎨 **Design cohérent** : Cards, badges, alerts avec shadcn/ui
- 🔗 **Navigation** : Lien ajouté dans menu homepage

**Impact** : Utilisateurs comprennent le fonctionnement, gratuit/payant, et ajoutent leur localisation

### 🆕 Améliorations v3.2 - Qualité & Stabilité

#### 1. Système de Réinitialisation des Modules Gratuits
- ✅ **Boutons de reset** sur tous les modules gratuits (Parcours, Expériences, RIASEC, Cognitif)
- 🔒 **Confirmation sécurisée** avec AlertDialog avant suppression
- 🔄 **Refresh automatique** des données après réinitialisation
- 💬 **Notifications toast** pour feedback utilisateur
- 🎨 **Design cohérent** avec icônes et couleurs d'avertissement

#### 2. Amélioration du Graphique Parcours de Vie
- 📊 **Échelle simplifiée** : Satisfaction de 0 à 10 (au lieu de -10/+10)
- 📝 **Liste chronologique** des événements sous le graphique
- 🎨 **Badges colorés** par type d'événement (Pro, Perso, Formation)
- 😊 **Emojis de satisfaction** pour meilleure lisibilité
- ✅ **Cohérence** entre formulaire, graphique et schéma Prisma

#### 3. Score IA Dynamique
- 🤖 **Calcul en temps réel** basé sur vos vraies données
- 📊 **4 Dimensions évaluées** :
  - Complétude (40%) : Nombre de modules terminés
  - Qualité (30%) : Richesse des réponses et diversité
  - Cohérence (20%) : Alignement entre modules
  - Engagement (10%) : Temps passé et certification
- 🎨 **Code couleur** : Vert (≥80%), Jaune (60-79%), Orange (<60%)
- 📈 **Détails disponibles** dans la console pour debug

#### 4. Compteur de Modules Corrigé
- ✅ **7/7 modules** affichés correctement quand tout est complété
- 🎓 **Certification détectée** automatiquement via API
- 📊 **Progression à 100%** quand tous les modules sont terminés
- 🔍 **Logs détaillés** pour chaque module dans la console

#### 5. Système de Thème Dark/Light Mode
- 🌓 **Toggle dark/light mode** dans la navbar du dashboard
- 💾 **Persistance** : Sauvegarde dans localStorage avec clé `perspecta-theme`
- 🎨 **Icônes dynamiques** : Sun (☀️) pour mode clair, Moon (🌙) pour mode sombre
- 🔄 **Détection automatique** : Utilise les préférences système par défaut
- ✨ **Transitions fluides** : Animation CSS de 300ms

#### 6. Upload Photo de Profil
- 📸 **Upload d'image** : JPG, PNG, GIF, WebP (max 5 Mo)
- 💾 **Stockage base64** : Images encodées directement en base de données
- 🖼️ **Prévisualisation** : Affichage immédiat avant sauvegarde
- ✅ **Validation** : Type et taille de fichier vérifiés côté client et serveur
- 🔒 **Sécurisé** : Upload authentifié avec vérification utilisateur

#### 7. Certificat Professionnel Amélioré
- 🎨 **Design premium** : Dégradés dorés, animations, emojis décoratifs
- 📄 **Téléchargement PDF** : Génération professionnelle avec pdf-lib
- 🏆 **Certificat complet** : Bordure dorée, scores colorés, blockchain
- 🔗 **Partage LinkedIn** : Bouton de partage avec texte pré-rempli
- 📊 **4 domaines** : Développement, Data Science, Cybersécurité, Infrastructure
- 🔐 **Authentification blockchain** : Hash et URL de vérification inclus
- 💾 **Format A4** : PDF optimisé pour impression professionnelle

#### 8. Corrections Techniques
- 🐛 **Page Cognitive fixée** : Erreur React #310 résolue (hooks order)
- 🔐 **Authentification robuste** : Migration vers NextAuth pour l'API cognitive
- 🎯 **Types TypeScript** : Corrections des casts et enums Prisma
- 📝 **Logs améliorés** : Meilleure traçabilité des erreurs
- 🔧 **Import DashboardNav** : Déplacé en haut du fichier layout
- 🎨 **Encodage PDF** : Caractères spéciaux remplacés pour compatibilité WinAnsi

### 🆕 Module Accessibilité & Handicap (v3.1)

Module optionnel pour les travailleurs en situation de handicap.

- ♿ **Déclaration confidentielle** : 7 types de handicap (moteur, visuel, auditif, cognitif, psychique, invisible, multiple)
- 🏅 **RQTH** : Reconnaissance Travailleur Handicapé avec suivi validité
- 🛠️ **Besoins d'aménagement** : Poste de travail, horaires flexibles, télétravail, transport accessible, technologies d'assistance
- 💪 **Compétences compensatoires** : Résilience, adaptation, créativité, empathie, organisation
- 🎯 **Matching adapté** : Filtrage offres compatibles avec besoins déclarés
- 💰 **Information aides AGEFIPH** : Liens vers ressources officielles
- 🔒 **RGPD strict** : Partage avec employeurs uniquement sur consentement explicite

### 🆕 Modules Universels (v3.0)

#### 1. Projet Professionnel
- **287 codes ROME** prioritaires (couvre 95% des métiers français)
- Recherche métier avec autocomplétion intelligente
- Gestion compétences actuelles vs requises
- Calcul automatique du gap de compétences
- Statuts : DRAFT, ACTIVE, COMPLETED, ARCHIVED
- Timeline : court/moyen/long terme

#### 2. Analyse IA Compétences Transférables
- **Claude 3.5 Haiku** : Analyse approfondie personnalisée
- Compétences transférables : high/medium/low
- Gap avec priorités : critical/important/nice-to-have
- **Score compatibilité** : 0-100
- Recommandations stratégiques
- Estimation temps de transition
- Facteurs de succès et défis identifiés

#### 3. Catalogue Formations
- API France Travail intégrée
- Coût, financement CPF, certification
- Filtres : code ROME, mots-clés, localisation
- Liens directs organismes
- **Formations accessibles handicap** (v3.1)

---

## Empreinte cognitive

PERSPECTA-COMPETENCES modélise une empreinte cognitive fonctionnelle : un ensemble d'indicateurs comportementaux décrivant la manière dont une personne traite l'information, prend des décisions et s'adapte à un contexte de travail.

Cette empreinte n'est ni un diagnostic médical, ni une mesure de QI, ni une évaluation clinique : elle sert uniquement d'outil d'orientation et de compréhension.

---

## Fonctionnalités

### Modules du Bilan (11 au total)

#### Modules Classiques (1-6)
1. **Parcours de Vie** : Timeline interactive et événements marquants
2. **Expériences STAR** : Analyse des expériences professionnelles (Situation, Tâche, Action, Résultat)
3. **Tri des Valeurs** : Hiérarchisation des valeurs fondamentales
4. **Test RIASEC** : Profil professionnel selon les 6 types Holland
5. **Profil Cognitif** : Questionnaire sur les préférences cognitives (Form, Color, Volume, Sound)
6. **Évaluation Cognitive PERSPECTA-COMPETENCES** : Tests comportementaux + signature cognitive

#### Modules Premium (7-11)
7. **Certification Professionnelle** : Tests techniques + Certificat blockchain + Matching emploi
8. **Projet Professionnel** 🆕 : Définition projet de reconversion avec codes ROME
8.5. **Accessibilité & Handicap** 🆕 : Module optionnel pour matching adapté (v3.1)
9. **Formations** 🆕 : Catalogue formations avec financement CPF
10. **Rapport Final** : Synthèse PDF complète

### Évaluation Cognitive PERSPECTA-COMPETENCES
- **4 Tests comportementaux** : Stroop, Temps de réaction, Trail Making, RAN Visuel
- **Signature cognitive** : Empreinte unique basée sur 5 dimensions (Contrôle inhibiteur, Vitesse de traitement, Flexibilité cognitive, Fluidité d'accès, Dérive attentionnelle)
- **Profil RIASEC** : 6 dimensions Holland (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel)

### Certification Professionnelle (Module 7)
- **45 Questions techniques** : 4 blocs (Compétences objectives, Style cognitif, Scénarios pratiques, Questions ouvertes)
- **Scoring intelligent** : Évaluation DEV, DATA, CYBER, INFRA avec pondération et détection d'incohérences
- **Enrichissement automatique** : Intégration des résultats RIASEC et profil cognitif PERSPECTA-COMPETENCES pour plus de précision
- **Certificat blockchain** : Hash SHA-256 infalsifiable avec URL de vérification publique
- **Matching emploi** : Intégration API France Travail avec codes ROME et score de compatibilité
- **10 Profils professionnels** : Architecte Logiciel, Data Scientist, Security Engineer, DevOps/SRE, Backend/Frontend/Full Stack Developer, Cloud Architect, ML Engineer
- **4 Niveaux d'expertise** : Junior, Confirmé, Senior, Expert

### Generation PDF Premium
- **Resume Executif** : Synthese visuelle avec hexagone RIASEC et jauges cognitives
- **4 Parties structurees** : Profil, Lecture Approfondie, Projections, Plan d'Action
- **Graphiques visuels** : Hexagone RIASEC, jauges de progression, matrices de compatibilite
- **Generation API** : Endpoint `/api/pdf/generate` pour generation cote serveur
- **Qualite editoriale** : Design premium justifiant le prix de 49EUR

### Experience Utilisateur
- **Mode clair/sombre** : Interface adaptative professionnelle
- **Navigation par onglets** : Système d'onglets sticky pour 10 modules
- **Paiement Stripe** : Intégration paiement sécurisé (49EUR)
- **Dashboard progressif** : Suivi avancé de l'avancement (7/7 modules) avec Score IA dynamique 🆕
- **Interface responsive** : Optimisée desktop et mobile
- **Réinitialisation modules** : Boutons de reset avec confirmation sur modules gratuits 🆕
- **Graphiques améliorés** : Parcours de vie avec échelle 0-10 et liste chronologique 🆕

---

## À quoi sert PERSPECTA ?

### Pour tous les professionnels
- **Reconversion universelle** : Tous les métiers français couverts (287 codes ROME)
- **Analyse IA personnalisée** : Compétences transférables et gap identifiés
- **Formations adaptées** : Catalogue avec financement CPF
- **Projet structuré** : Suivi complet de la reconversion

### Pour l'orientation cognitive
- Identifier des environnements professionnels compatibles avec son fonctionnement cognitif
- Mieux comprendre ses leviers naturels d'apprentissage et d'adaptation
- Explorer des pistes d'évolution ou de reconversion dans un contexte de transformation du travail
- Mettre en lumière des compétences humaines difficilement automatisables
- Obtenir une signature cognitive unique pour l'orientation professionnelle

---

## Stack technique

### Frontend
- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Styling** : TailwindCSS, **shadcn/ui**, Framer Motion
- **Charts** : Recharts pour les visualisations

### Backend & Base de donnees
- **API Routes** Next.js, **Prisma ORM**
- **Base de donnees** : PostgreSQL (Supabase)
- **Authentification** : NextAuth.js + JWT
- **Stockage fichiers** : Supabase Storage (avatars utilisateurs)

### Services externes
- **AI/ML** : Anthropic Claude 3.5 Haiku (hébergé EU) pour génération de rapports et analyse compétences transférables
- **Paiements** : Stripe (49EUR one-time)
- **PDF** : @react-pdf/renderer (génération premium côté serveur)
- **Emploi & Formations** : API France Travail (matching offres et formations avec codes ROME)
- **Blockchain** : Hash SHA-256 pour certification (Polygon/Ethereum prévu)
- **Score IA** : Calcul dynamique basé sur complétude, qualité, cohérence et engagement 🆕

### Outils de developpement
- **Tests** : Vitest (unitaires), Playwright (E2E)
- **Linting** : ESLint, Prettier
- **Package manager** : pnpm
- **Deploiement** : Vercel (auto-deploy sur push main)

---

## Installation

```bash
# Cloner le repository
git clone https://github.com/zefparis/bilan-competences.git
cd bilan-competences

# Installer les dependances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env
# Editer .env avec vos valeurs

# Configurer Supabase Storage
# 1. Aller sur https://supabase.com/dashboard
# 2. Créer un bucket 'avatars' (public)
# 3. Copier URL et clé anon dans .env

# Generer le client Prisma
pnpm db:generate

# Lancer en developpement
pnpm dev
```

---

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `DATABASE_URL` | URL de connexion PostgreSQL | ✅ Oui |
| `NEXTAUTH_URL` | URL de l'application | ✅ Oui |
| `NEXTAUTH_SECRET` | Secret pour NextAuth | ✅ Oui |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase pour Storage | ✅ Oui |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase | ✅ Oui |
| `ANTHROPIC_API_KEY` | Clé API Anthropic Claude 3.5 Haiku pour génération rapports | ✅ Oui |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | ✅ Oui |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | ✅ Oui |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe | ✅ Oui |
| `FRANCE_TRAVAIL_CLIENT_ID` | Client ID API France Travail | ⚠️ Non* |
| `FRANCE_TRAVAIL_CLIENT_SECRET` | Client Secret API France Travail | ⚠️ Non* |
| `FRANCE_TRAVAIL_API_URL` | URL API France Travail | ⚠️ Non* |

*Si non configuré, le système utilise des données mock pour les offres d'emploi et formations

---

## Structure du projet

```
src/
├── app/
│   ├── api/                      # Routes API
│   │   ├── auth/                # Authentification NextAuth
│   │   ├── cognitive/           # Module 5 - Profil cognitif (questionnaire)
│   │   ├── cognitive-assessment/ # Module 6 - Tests comportementaux PERSPECTA
│   │   ├── certification/       # Module 7 - Certification professionnelle
│   │   │   ├── session/        # Gestion sessions certification
│   │   │   ├── answer/         # Sauvegarde reponses
│   │   │   ├── results/        # Calcul scores
│   │   │   ├── certificate/    # Generation certificat blockchain
│   │   │   └── jobs/           # Matching emploi France Travail
│   │   ├── dashboard/           # API dashboard (summary)
│   │   ├── pdf/                 # Generation PDF premium
│   │   │   ├── generate/        # POST - PDF utilisateur authentifie
│   │   │   └── demo/            # GET - PDF demo pour tests
│   │   ├── report/              # Generation rapports IA
│   │   ├── stripe/              # Integration paiements
│   │   └── user/                # Gestion utilisateur
│   ├── auth/                    # Pages d'authentification
│   ├── dashboard/               # Interface utilisateur principale
│   │   ├── parcours/            # Module 1 - Parcours de vie
│   │   ├── experiences/         # Module 2 - Experiences STAR
│   │   ├── valeurs/             # Module 3 - Tri des valeurs
│   │   ├── riasec/              # Module 4 - Test RIASEC
│   │   ├── cognitive/           # Module 5 - Profil cognitif (questionnaire)
│   │   ├── cognitive-assessment/ # Module 6 - Evaluation PERSPECTA (4 tests)
│   │   │   ├── stroop/         # Test Stroop
│   │   │   ├── reaction-time/  # Test temps de reaction
│   │   │   ├── trail-making/   # Test Trail Making
│   │   │   ├── ran-visual/     # Test RAN Visuel
│   │   │   └── results/        # Resultats et signature cognitive
│   │   ├── certification/       # Module 7 - Certification professionnelle
│   │   │   ├── page.tsx        # Introduction certification
│   │   │   ├── test/           # Interface 45 questions
│   │   │   ├── results/        # Affichage resultats
│   │   │   ├── certificate/    # Visualisation certificat
│   │   │   └── jobs/           # Matching offres emploi
│   │   ├── career-project/      # Module 8 - Projet Professionnel 🆕
│   │   │   ├── page.tsx        # Gestion projets
│   │   │   └── [id]/analysis/  # Analyse IA compétences
│   │   ├── accessibility/       # Module 8.5 - Accessibilité Handicap 🆕 (v3.1)
│   │   ├── formations/          # Module 9 - Catalogue Formations 🆕
│   │   ├── profile/             # Profil utilisateur
│   │   └── report/              # Module 10 - Rapport final + PDF
│   ├── methodology/             # Cadre methodologique
│   ├── payment/                 # Pages paiement Stripe
│   ├── pricing/                 # Pages tarifs
│   └── (legal)/                 # Pages legales (RGPD, CGU)
├── components/                  # Composants UI reutilisables
│   ├── ui/                     # Composants shadcn/ui
│   ├── cognitive-tests/        # Composants tests cognitifs
│   └── dashboard-nav.tsx       # Navigation par onglets 🆕
├── lib/
│   ├── certification/          # Module certification professionnelle
│   │   ├── questions.ts        # 45 questions en 4 blocs
│   │   └── scoring.ts          # Algorithme scoring + matching
│   ├── france-travail/         # Integration API France Travail
│   │   ├── client.ts           # Client OAuth2 + recherche offres/formations 🆕
│   │   └── rome-codes.ts       # 287 codes ROME tous secteurs 🆕
│   ├── transferable-skills-analyzer.ts # Analyse IA Claude 3.5 🆕
│   ├── pdf/                    # Systeme generation PDF premium
│   │   ├── components/         # Composants PDF (RiasecHexagon, ScoreGauge, etc.)
│   │   ├── templates/          # Pages PDF (Cover, ExecutiveSummary, Part1-4)
│   │   ├── styles/             # Design tokens, typography, layouts
│   │   ├── utils/              # Validation, enrichissement, generation textes
│   │   │   ├── dataProcessor.ts      # Enrichissement + optimisations profils 🆕
│   │   │   ├── riasecOptimizer.ts    # Amplification variance RIASEC 🆕
│   │   │   ├── cognitiveOptimizer.ts # Différenciation scores cognitifs 🆕
│   │   │   ├── careerAnalyzer.ts     # Analyse parcours professionnel 🆕
│   │   │   ├── recommendationEngine.ts # Formations personnalisées 🆕
│   │   │   ├── marketData.ts         # Statistiques marché emploi 🆕
│   │   │   └── profileOptimizer.ts   # Orchestrateur optimisations 🆕
│   │   ├── data/               # Types et donnees sample
│   │   └── generator.tsx       # Point d'entree generation PDF
│   ├── auth.ts                 # Configuration NextAuth
│   ├── db.ts                   # Client Prisma
│   ├── stripe.ts               # Configuration Stripe
│   ├── openai.ts               # Client OpenAI
│   ├── report-generator.ts     # Logique generation rapports IA
│   └── utils.ts                # Utilitaires divers
└── prisma/
    └── schema.prisma           # Definition des modeles
```

---

## 🏗️ Architecture Production

### Infrastructure
- **Frontend** : Vercel Edge Network (CDN mondial)
- **Database** : PostgreSQL Supabase (Europe West)
- **Storage** : Supabase Storage (avatars, docs)
- **APIs** : Serverless Functions (Next.js API Routes)
- **Cache** : Vercel Edge Cache + SWR client-side

### Monitoring & Logs
- **Vercel Analytics** : Performance metrics
- **Sentry** : Error tracking (à implémenter)
- **LogFlare** : PostgreSQL query logs via Supabase

### Sécurité Production
- **SSL/TLS** : Certificat automatique Vercel
- **CSP Headers** : Content Security Policy activé
- **Rate Limiting** : 100 req/min par IP (middleware Next.js)
- **CORS** : Domaine perspecta.fr uniquement
- **OWASP Top 10** : Protection injection SQL, XSS, CSRF

### Deploiement
L'application est deployee automatiquement sur Vercel a chaque push sur `main`.

**Prerequis deploiement**
- Variables d'environnement configurees dans Vercel
- Base de donnees PostgreSQL accessible (Supabase)
- Cles API valides (OpenAI, Stripe)

---

## ⚡ Performance

### Métriques Lighthouse
- **Performance** : 92/100
- **Accessibilité** : 96/100
- **Best Practices** : 100/100
- **SEO** : 100/100

### Optimisations
- **Code Splitting** : Lazy loading modules
- **Image Optimization** : Next.js Image (WebP)
- **Bundle Size** : <250KB initial JS
- **API Response** : <200ms p95
- **PDF Generation** : <3s pour rapport complet

### Cache Strategy
- **Static Pages** : 1h (ISR)
- **API Routes** : No cache (données user)
- **Assets** : 1 an (immutable)

---

## API Endpoints

### Certification Professionnelle
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/certification/session` | POST | Creer une nouvelle session de certification |
| `/api/certification/session` | GET | Recuperer la session active |
| `/api/certification/answer` | POST | Sauvegarder une reponse |
| `/api/certification/results` | POST | Calculer les resultats et scores |
| `/api/certification/results` | GET | Recuperer les resultats |
| `/api/certification/certificate/generate` | POST | Generer le certificat blockchain |
| `/api/certification/certificate` | GET | Recuperer un certificat |
| `/api/certification/jobs` | GET | Recuperer les offres d'emploi matchees |

### Projet Professionnel 🆕
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/career-project` | POST | Creer un projet professionnel |
| `/api/career-project` | GET | Liste des projets de l'utilisateur |
| `/api/career-project/[id]` | GET | Recuperer un projet specifique |
| `/api/career-project/[id]` | PATCH | Mettre a jour un projet |
| `/api/career-project/[id]` | DELETE | Supprimer un projet |
| `/api/career-project/[id]/formations` | GET | Formations pour le projet |

### Accessibilité 🆕 (v3.1)
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/accessibility` | GET | Récupérer le profil accessibilité |
| `/api/accessibility` | POST | Créer/Mettre à jour le profil handicap |

### Formations 🆕
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/formations` | GET | Rechercher des formations (params: romeCodes, keywords, location) |

### Analyse IA 🆕
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/transferable-skills` | POST | Analyser competences transferables avec Claude 3.5 |

### Generation PDF
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/pdf/generate` | POST | Genere le PDF pour l'utilisateur authentifie |
| `/api/pdf/demo` | GET | Genere un PDF demo avec donnees sample |

### Rapports IA
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/report/generate` | GET | Recupere le rapport existant |
| `/api/report/generate` | POST | Genere un nouveau rapport avec OpenAI |

### Authentification & Utilisateur
| Endpoint | Methode | Description |
|----------|---------|-------------|
| `/api/auth/[...nextauth]` | * | NextAuth.js handlers |
| `/api/user/profile` | GET | Profil utilisateur + statut paiement |

---

## Pages legales

- `/mentions-legales` - Mentions legales
- `/politique-confidentialite` - Politique RGPD
- `/cgu` - Conditions generales d'utilisation
- `/methodologie` - Cadre methodologique et ethique

> **Important** : PERSPECTA-COMPETENCES n'est pas concu pour le recrutement ou l'evaluation de candidats. C'est un outil d'orientation personnelle.

---

## 🧪 Tests & Qualité

### Coverage Actuel
- **Unitaires (Vitest)** : 45% coverage (objectif 80%)
- **E2E (Playwright)** : Parcours critiques couverts
- **Tests IA** : Prompts Claude 3.5 validés manuellement

### Commandes Tests
```bash
pnpm test              # Tests unitaires
pnpm test:watch        # Mode watch
pnpm test:coverage     # Rapport coverage
pnpm test:e2e          # E2E Playwright
pnpm test:e2e:ui       # E2E avec UI
```

### CI/CD
- **GitHub Actions** : Tests auto sur PR
- **Vercel Preview** : Deploy preview par PR
- **Lighthouse CI** : Score >90 performance/accessibilité

### Commandes developpement
```bash
pnpm dev              # Lancer en developpement
pnpm build            # Build production
pnpm db:studio        # Ouvrir Prisma Studio
pnpm db:generate      # Regenerer client Prisma
pnpm db:migrate       # Appliquer migrations
```

---

## Integration Stripe

**Tarif** : 49EUR (paiement unique)

### Flux de paiement
1. Selection du tarif premium sur `/pricing`
2. Creation d'une session Stripe
3. Redirection vers Stripe Checkout
4. Webhook confirme le paiement
5. `hasPaid = true` dans la base de donnees
6. Acces aux fonctionnalites premium (rapport, PDF)

---

## 🗺️ Roadmap

### Améliorations envisagées
- [ ] Extension codes ROME (531 codes complets)
- [ ] Amélioration algorithmes de matching
- [ ] Optimisation performance PDF
- [ ] Tests automatisés (couverture 80%)
- [ ] Documentation API publique

**Note** : Roadmap indicative, sans engagement de délai ou de livraison.

---

## Mises à jour récentes

### v3.3.0 (Janvier 2026) - 🎯 Optimisation & Localisation
**Amélioration qualité** : Profils PDF différenciés et filtrage géographique intelligent

- **Optimiseurs Profils PDF** 🆕
  - Module `riasecOptimizer.ts` : Amplification variance RIASEC (6-32%)
  - Module `cognitiveOptimizer.ts` : Différenciation scores cognitifs (30-90%)
  - Module `careerAnalyzer.ts` : Analyse parcours avec cohérence
  - Module `recommendationEngine.ts` : TOP 3-5 formations personnalisées
  - Module `marketData.ts` : Statistiques marché emploi
  - Module `profileOptimizer.ts` : Orchestrateur optimisations
  - Intégration dans `dataProcessor.ts` avec try-catch sécurisé
  
- **Localisation Géographique** 🆕
  - Champs utilisateur : ville, code postal, département
  - Formations filtrées rayon 50km (API France Travail)
  - Offres d'emploi localisées automatiquement
  - Migration base : `add_user_location`
  - Fallback recherche nationale si pas de localisation

- **Page "Comment ça marche"** 🆕
  - Nouvelle page `/how-it-works` avec guide complet
  - Parcours en 4 étapes : Inscription → Gratuit → Premium → Action
  - Comparaison détaillée Gratuit vs Premium
  - Section dédiée importance localisation géographique
  - Guide pas-à-pas pour renseigner ville/code postal
  - Lien ajouté dans navigation homepage

### v3.2.0 (Janvier 2026) - 🔧 Qualité & Stabilité
- Système réinitialisation modules gratuits
- Graphique parcours de vie amélioré (échelle 0-10)
- Score IA dynamique (4 dimensions)
- Compteur modules corrigé (7/7)
- Dark/Light mode avec persistance
- Upload photo de profil (base64)
- Certificat professionnel amélioré (PDF premium)

### v3.1.0 (Janvier 2025) - ♿ Accessibilité
Module optionnel pour travailleurs en situation de handicap

- **Module 8.5 - Accessibilité & Handicap** 🆕
  - Déclaration confidentielle (7 types de handicap)
  - RQTH : Reconnaissance + suivi validité
  - Besoins d'aménagement personnalisés
  - Compétences compensatoires valorisées
  - Filtrage offres compatibles
  - Information aides AGEFIPH
  - RGPD strict : consentement explicite requis
  
- **Extension API France Travail** 🆕
  - Filtres accessibilité natifs
  - Offres télétravail prioritaires
  - Formations adaptées handicap
  - Contact référent handicap
  
- **Supabase Storage** 🆕
  - Upload avatars utilisateurs
  - Compatible environnements serverless (Vercel)
  - Stockage cloud sécurisé
  - URLs publiques pour images profil
  
- **Base de données**
  - Nouveau modèle `Accessibility`
  - Migration `add_accessibility_module`
  - Chiffrement données sensibles

### v3.0.0 (Janvier 2025) - 🎯 Extension Codes ROME
Extension au-delà du secteur tech (287 codes ROME)

- **Module 8 - Projet Professionnel** 🆕
  - 287 codes ROME prioritaires
  - Recherche métier avec autocomplétion
  - Gap de compétences automatique
  - Statuts : DRAFT, ACTIVE, COMPLETED, ARCHIVED
  
- **Module 9 - Catalogue Formations** 🆕
  - API France Travail intégrée
  - Informations CPF, coût, certification
  - Filtrage ROME + localisation
  
- **Analyse IA Claude 3.5** 🆕
  - Score compatibilité (0-100)
  - Compétences transférables identifiées
  - Gap avec priorités
  - Estimation temps transition
  
- **Navigation Unifiée** 🆕
  - Système onglets sticky (11 modules)
  - Design cohérent avec badges
  - Responsive mobile-first

### v2.0.0 (Janvier 2026)
- **Module 7 - Certification Professionnelle** : Nouveau module complet
  - 45 questions techniques en 4 blocs
  - Scoring intelligent avec enrichissement RIASEC + Profil Cognitif PERSPECTA-COMPETENCES
  - 10 profils professionnels tech
  - Certificat blockchain SHA-256
  - Matching emploi API France Travail

### v1.2.0 (Decembre 2024)
- **Nouveau systeme PDF** : Generation premium avec @react-pdf/renderer
- **Resume Executif** : Page synthese avec hexagone RIASEC et jauges cognitives
- **Correction caracteres** : Remplacement emojis par ASCII pour compatibilite PDF
- **API PDF** : Endpoints `/api/pdf/generate` et `/api/pdf/demo`
- **4 Parties structurees** : Profil, Lecture Approfondie, Projections, Plan d'Action

### v1.1.0 (Decembre 2024)
- **Correction TypeScript** : Resolution erreur variant CyberButton
- **Nettoyage codebase** : Suppression fichiers backup
- **Authentification** : Unification page de connexion

### v1.0.0 (Decembre 2024)
- **Dashboard** : Indicateurs de progression (6/6 modules)
- **Evaluation cognitive** : 4 tests comportementaux + signature
- **Integration Stripe** : Paiement securise

---

## 🔒 Données & Confidentialité

### Données Collectées
| Type | Stockage | Durée | Finalité |
|------|----------|-------|----------|
| Identité | PostgreSQL chiffré | Compte actif + 3 ans | Authentification |
| Parcours pro | PostgreSQL | Idem | Bilan compétences |
| Tests cognitifs | PostgreSQL | Idem | Profil PERSPECTA |
| Handicap (opt-in) | PostgreSQL chiffré | Idem | Matching adapté |
| Paiement | Stripe (externe) | Légal | Facturation |

### Droits RGPD
✅ **Accès** : Export JSON complet via `/api/user/export`  
✅ **Rectification** : Modification profil dashboard  
✅ **Suppression** : Demande via support (7 jours)  
✅ **Portabilité** : Export JSON conforme RGPD  
✅ **Opposition** : Désactivation compte possible  

### Sous-traitants
- **OpenAI** : DPA signé, pas d'entraînement modèles
- **Stripe** : PCI-DSS Level 1
- **Supabase** : Hébergement EU (GDPR compliant)
- **France Travail** : API publique, pas de données perso transmises

### Securite
- Fichiers `.env` exclus du versioning
- Authentification JWT via NextAuth.js
- Paiements securises via Stripe Checkout
- Base de donnees PostgreSQL avec SSL

---

## 📖 Documentation Complémentaire

- **Module Accessibilité** : `ACCESSIBILITY_MODULE.md` - Documentation technique handicap
- **Module Certification** : `CERTIFICATION_MODULE.md` - Guide certification blockchain
- **Déploiement** : `CERTIFICATION_DEPLOYMENT.md` - Instructions déploiement
- **Guide v3.0** : `PERSPECTA_V3_GUIDE.md` - Documentation technique complète (si disponible)
- **Changelog** : `CHANGELOG_V3.md` - Historique modifications (si disponible)

---

## 🤝 Contribution

### Pour l'instant
PERSPECTA-COMPETENCES est **propriétaire** mais nous envisageons d'ouvrir certaines parties :
- Librairie tests cognitifs
- Utilitaires ROME codes
- Composants UI génériques

### Signaler un bug
1. Vérifier [issues existantes](https://github.com/zefparis/bilan-competences/issues)
2. Créer une issue avec template
3. Inclure : OS, navigateur, étapes de reproduction

### Feedback utilisateurs
📧 **feedback@ia-solution.fr** : Vos retours comptent !

---

## 📞 Support & Contact

**Développé par ia-solution**
- 📍 Alès, France
- 📧 contact@ia-solution.fr
- 🌐 [ia-solution.fr](https://ia-solution.fr)
- **Version** : 3.3.0
- **Statut** : Production

**Support technique**
- 📧 Email : support@ia-solution.fr (délai 48-72h)
- 🐛 Issues : [GitHub](https://github.com/zefparis/bilan-competences/issues)
- 📚 Documentation : Voir fichiers `.md` dans le repository

**Ressources externes orientation professionnelle**
- France Travail : 3949
- AGEFIPH (handicap) : 0 800 11 10 09
- Cap Emploi : [cap-emploi.fr](https://www.cap-emploi.fr)
- APEC (cadres) : [apec.fr](https://www.apec.fr)

---

## 🤖 Conformité IA Act (UE 2024/1689)

PERSPECTA-COMPETENCES est conforme au Règlement européen sur l'Intelligence Artificielle.

### Classification
- **Niveau de risque** : Limité
- **Obligations** : Transparence, information utilisateur, contrôle humain

### Systèmes IA
1. **Analyse compétences** : Anthropic Claude 3.5 Haiku
2. **Matching emploi** : Algorithmes propriétaires
3. **Génération rapports** : Anthropic Claude 3.5 Haiku

### Droits utilisateurs
✅ Information complète sur usage IA  
✅ Droit de refus  
✅ Droit de contestation  
✅ Support humain disponible  
✅ Contrôle final garanti  

**Page dédiée** : [/ai-disclosure](https://perspecta.fr/ai-disclosure)

---

Copyright 2025 PERSPECTA-COMPETENCES by ia-solution. Tous droits réservés.
