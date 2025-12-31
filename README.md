# PERSPECTA

**Plateforme d'evaluation cognitive et de bilan de competences professionnelles**

Application premium concue pour offrir une analyse approfondie du profil professionnel et cognitif des utilisateurs, avec generation de PDF editorial de qualite.

**URL Production** : [perspecta.ia-solution.fr](https://perspecta.ia-solution.fr)

---

## Empreinte cognitive

PERSPECTA modelise une empreinte cognitive fonctionnelle : un ensemble d'indicateurs comportementaux decrivant la maniere dont une personne traite l'information, prend des decisions et s'adapte a un contexte de travail.

Cette empreinte n'est ni un diagnostic medical, ni une mesure de QI, ni une evaluation clinique : elle sert uniquement d'outil d'orientation et de comprehension.

---

## Fonctionnalites

### Evaluation Cognitive PERSPECTA
- **4 Tests comportementaux** : Stroop, Temps de reaction, Trail Making, RAN Visuel
- **Signature cognitive** : Empreinte unique basee sur 5 dimensions (Controle inhibiteur, Vitesse de traitement, Flexibilite cognitive, Fluidite d'acces, Derive attentionnelle)
- **Profil RIASEC** : 6 dimensions Holland (Realiste, Investigateur, Artistique, Social, Entreprenant, Conventionnel)

### Bilan de Competences (6 Modules)
1. **Parcours de Vie** : Timeline interactive et evenements marquants
2. **Experiences STAR** : Analyse des experiences professionnelles (Situation, Tache, Action, Resultat)
3. **Tri des Valeurs** : Hierarchisation des valeurs fondamentales
4. **Test RIASEC** : Profil professionnel selon les 6 types Holland
5. **Profil Cognitif** : Analyse des dimensions cognitives
6. **Evaluation Cognitive PERSPECTA** : Tests comportementaux + signature

### Generation PDF Premium
- **Resume Executif** : Synthese visuelle avec hexagone RIASEC et jauges cognitives
- **4 Parties structurees** : Profil, Lecture Approfondie, Projections, Plan d'Action
- **Graphiques visuels** : Hexagone RIASEC, jauges de progression, matrices de compatibilite
- **Generation API** : Endpoint `/api/pdf/generate` pour generation cote serveur
- **Qualite editoriale** : Design premium justifiant le prix de 49EUR

### Experience Utilisateur
- **Mode clair/sombre** : Interface adaptative professionnelle
- **Paiement Stripe** : Integration paiement securise (49EUR)
- **Dashboard progressif** : Suivi avance de l'avancement (6/6 modules)
- **Interface responsive** : Optimisee desktop et mobile

---

## A quoi sert PERSPECTA ?

- Identifier des environnements professionnels compatibles avec son fonctionnement cognitif
- Mieux comprendre ses leviers naturels d'apprentissage et d'adaptation
- Explorer des pistes d'evolution ou de reconversion dans un contexte de transformation du travail
- Mettre en lumiere des competences humaines difficilement automatisables
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

### Services externes
- **AI/ML** : OpenAI API (GPT-4) pour generation de rapports
- **Paiements** : Stripe (49EUR one-time)
- **PDF** : @react-pdf/renderer (generation premium cote serveur)

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

# Generer le client Prisma
pnpm db:generate

# Lancer en developpement
pnpm dev
```

---

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `DATABASE_URL` | URL de connexion PostgreSQL | Oui |
| `NEXTAUTH_URL` | URL de l'application | Oui |
| `NEXTAUTH_SECRET` | Secret pour NextAuth | Oui |
| `OPENAI_API_KEY` | Cle API OpenAI pour generation rapports | Oui |
| `STRIPE_SECRET_KEY` | Cle secrete Stripe | Oui |
| `STRIPE_PUBLISHABLE_KEY` | Cle publique Stripe | Oui |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe | Oui |

---

## Structure du projet

```
src/
├── app/
│   ├── api/                      # Routes API
│   │   ├── auth/                # Authentification NextAuth
│   │   ├── cognitive/           # Tests cognitifs & sessions
│   │   ├── pdf/                 # Generation PDF premium
│   │   │   ├── generate/        # POST - PDF utilisateur authentifie
│   │   │   └── demo/            # GET - PDF demo pour tests
│   │   ├── report/              # Generation rapports IA
│   │   ├── stripe/              # Integration paiements
│   │   └── user/                # Gestion utilisateur
│   ├── auth/                    # Pages d'authentification
│   ├── dashboard/               # Interface utilisateur principale
│   │   ├── parcours/            # Module parcours de vie
│   │   ├── experiences/         # Module experiences STAR
│   │   ├── valeurs/             # Module tri des valeurs
│   │   ├── riasec/              # Module test RIASEC
│   │   ├── cognitive-assessment/ # Evaluation PERSPECTA (4 tests)
│   │   └── report/              # Page generation rapport + PDF
│   ├── methodology/             # Cadre methodologique
│   ├── payment/                 # Pages paiement Stripe
│   ├── pricing/                 # Pages tarifs
│   └── (legal)/                 # Pages legales (RGPD, CGU)
├── components/                  # Composants UI reutilisables
│   ├── ui/                     # Composants shadcn/ui
│   └── cognitive-tests/        # Composants tests cognitifs
├── lib/
│   ├── pdf/                    # Systeme generation PDF premium
│   │   ├── components/         # Composants PDF (RiasecHexagon, ScoreGauge, etc.)
│   │   ├── templates/          # Pages PDF (Cover, ExecutiveSummary, Part1-4)
│   │   ├── styles/             # Design tokens, typography, layouts
│   │   ├── utils/              # Validation, enrichissement, generation textes
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

## Deploiement

L'application est deployee automatiquement sur Vercel a chaque push sur `main`.

### Prerequis deploiement
- Variables d'environnement configurees dans Vercel
- Base de donnees PostgreSQL accessible (Supabase)
- Cles API valides (OpenAI, Stripe)

---

## API Endpoints

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

> **Important** : PERSPECTA n'est pas concu pour le recrutement ou l'evaluation de candidats. C'est un outil d'orientation personnelle.

---

## Commandes developpement

```bash
pnpm dev              # Lancer en developpement
pnpm build            # Build production
pnpm test             # Tests unitaires (Vitest)
pnpm test:e2e         # Tests E2E (Playwright)
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

## Mises a jour recentes

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

## Securite

- Fichiers `.env` exclus du versioning
- Authentification JWT via NextAuth.js
- Paiements securises via Stripe Checkout
- Base de donnees PostgreSQL avec SSL

---

## Equipe & Support

**Developpe par ia-solution**
- Ales, France
- contact@ia-solution.fr
- [ia-solution.fr](https://ia-solution.fr)

**Support** : support@ia-solution.fr | [Issues GitHub](https://github.com/zefparis/bilan-competences/issues)

---

Copyright 2025 PERSPECTA. Tous droits reserves.
