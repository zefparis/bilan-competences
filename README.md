# PERSPECTA

**Plateforme d'évaluation cognitive et de bilan de compétences**

Une application premium conçue pour offrir une analyse approfondie du profil professionnel et cognitif des utilisateurs.

---

## 🧩 Empreinte cognitive
PERSPECTA modélise une empreinte cognitive fonctionnelle : un ensemble d'indicateurs comportementaux décrivant la manière dont une personne traite l'information, prend des décisions et s'adapte à un contexte de travail.
Cette empreinte n'est ni un diagnostic médical, ni une mesure de QI, ni une évaluation clinique : elle sert uniquement d'outil d'orientation et de compréhension.

---

## 🎯 Fonctionnalités

### 🧠 Évaluation Cognitive PERSPECTA
- **4 Tests comportementaux** : Stroop, Temps de réaction, Trail Making, RAN Visuel
- **Signature cognitive** : Empreinte unique basée sur 4 dimensions (Forme, Couleur, Volume, Son)
- **Analyse HCS-U7** : Profil cognitif détaillé

### 📊 Bilan de Compétences (6 Modules)
1. **Parcours de Vie** : Timeline interactive et événements marquants
2. **Expériences STAR** : Analyse des expériences professionnelles (Situation, Tâche, Action, Résultat)
3. **Tri des Valeurs** : Hiérarchisation des valeurs fondamentales
4. **Test RIASEC** : Profil professionnel selon les 6 types Holland (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel)
5. **Profil Cognitif** : Analyse HCS-U7 (Forme/Couleur/Volume/Son)
6. **Évaluation Cognitive PERSPECTA** : Tests comportementaux + signature

### 📄 Synthèse et Reporting
- **Rapport PDF personnalisé** : Synthèse complète avec recommandations
- **Génération IA** : Sections stratégiques générées par OpenAI
- **Export professionnel** : Format PDF optimisé

### 💳 Expérience Utilisateur
- **Mode clair/sombre** : Interface adaptative professionnelle
- **Paiement Stripe** : Intégration paiement sécurisé
- **Dashboard progressif** : Suivi avancé de l'avancement (6/6 modules)
- **Interface responsive** : Optimisée desktop et mobile

---

## 🧠 À quoi sert PERSPECTA ?

- ✅ Identifier des environnements professionnels compatibles avec son fonctionnement cognitif
- ✅ Mieux comprendre ses leviers naturels d'apprentissage et d'adaptation
- ✅ Explorer des pistes d'évolution ou de reconversion dans un contexte de transformation du travail
- ✅ Mettre en lumière des compétences humaines difficilement automatisables
- ✅ Obtenir une signature cognitive unique pour l'orientation professionnelle

---

## 🛠️ Stack technique

### Frontend
- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Styling** : TailwindCSS, **shadcn/ui**, Framer Motion
- **Charts** : Recharts pour les visualisations

### Backend & Base de données
- **API Routes** Next.js, **Prisma ORM**
- **Base de données** : PostgreSQL (Supabase)
- **Authentification** : NextAuth.js + JWT

### Services externes
- **AI/ML** : OpenAI API (GPT-4)
- **Paiements** : Stripe
- **PDF** : @react-pdf/renderer, pdf-lib

### Outils de développement
- **Tests** : Vitest (unitaires), Playwright (E2E)
- **Linting** : ESLint, Prettier
- **Package manager** : pnpm
- **Déploiement** : Vercel

---

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/zefparis/bilan-competences.git
cd bilan-competences

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Générer le client Prisma
pnpm db:generate

# Lancer en développement
pnpm dev
```

---

## ⚙️ Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | ✅ |
| `NEXTAUTH_URL` | URL de l'application | ✅ |
| `NEXTAUTH_SECRET` | Secret pour NextAuth (générer avec `openssl rand -base64 32`) | ✅ |
| `OPENAI_API_KEY` | Clé API OpenAI pour les fonctionnalités IA | ✅ |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | ✅ |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe | ✅ |

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/                 # Routes API
│   │   ├── auth/           # Authentification NextAuth
│   │   ├── cognitive/      # Tests cognitifs & sessions
│   │   ├── report/         # Génération de rapports PDF
│   │   ├── stripe/         # Intégration paiements
│   │   └── user/           # Gestion utilisateur
│   ├── auth/               # Pages d'authentification
│   ├── dashboard/          # Interface utilisateur principale
│   │   ├── parcours/       # Module parcours de vie
│   │   ├── experiences/    # Module expériences STAR
│   │   ├── valeurs/        # Module tri des valeurs
│   │   ├── riasec/         # Module test RIASEC
│   │   ├── cognitive/      # Module profil cognitif HCS-U7
│   │   ├── cognitive-assessment/ # Évaluation PERSPECTA
│   │   └── report/         # Page génération rapport
│   ├── methodology/        # Cadre méthodologique
│   ├── payment/            # Pages paiement Stripe
│   ├── pricing/            # Pages tarifs
│   └── (legal)/            # Pages légales (RGPD, CGU)
├── components/             # Composants UI réutilisables
│   ├── ui/                # Composants shadcn/ui
│   ├── cognitive-tests/   # Composants tests cognitifs
│   └── pdf/               # Composants génération PDF
├── lib/                   # Utilitaires et configuration
│   ├── auth.ts            # Configuration NextAuth
│   ├── db.ts              # Client Prisma
│   ├── stripe.ts          # Configuration Stripe
│   ├── openai.ts          # Client OpenAI
│   ├── pdf-renderer.tsx   # Génération PDF
│   ├── report-generator.ts # Logique génération rapports
│   └── utils.ts           # Utilitaires divers
└── prisma/                # Schéma de base de données
    ├── schema.prisma      # Définition des modèles
    └── seed.ts           # Données de test
```

---

## 🚀 Déploiement

L'application est configurée pour un déploiement automatique sur Vercel :

1. **Connecter le repository GitHub** à Vercel
2. **Configurer les variables d'environnement** dans le dashboard Vercel
3. **Déployer automatiquement** à chaque push sur main

### Prérequis déploiement :
- Variables d'environnement configurées
- Base de données PostgreSQL accessible
- Clés API valides (OpenAI, Stripe)

---

## 📄 Pages légales & Méthodologie

- `/mentions-legales` - Mentions légales
- `/politique-confidentialite` - Politique RGPD
- `/cgu` - Conditions générales d'utilisation
- `/methodologie` - Cadre méthodologique et éthique

> **⚠️ Important** : PERSPECTA n'est pas conçu pour le recrutement, la sélection ou l'évaluation de candidats. C'est un outil d'orientation personnelle.

---

## 🧪 Tests et développement

```bash
# Lancer les tests unitaires (Vitest)
pnpm test

# Lancer les tests E2E (Playwright)
pnpm test:e2e

# Ouvrir Prisma Studio (interface base de données)
pnpm db:studio

# Peupler la base de données avec des données de test
pnpm db:seed

# Générer le client Prisma après modification du schéma
pnpm db:generate

# Appliquer les migrations de base de données
pnpm db:migrate
```

---

## 💳 Intégration Stripe

L'intégration Stripe permet :
- ✅ **Paiement sécurisé par carte** (CB, Visa, MasterCard)
- ✅ **Webhooks pour confirmation** automatique des paiements
- ✅ **Gestion des sessions** de paiement
- ✅ **Interface de paiement personnalisée** intégrée à l'UI

### Flux de paiement :
1. Sélection du tarif premium
2. Création d'une session Stripe
3. Redirection vers Stripe Checkout
4. Retour automatique après paiement
5. Déblocage des fonctionnalités premium

---

## 📊 Métriques & Analytics

- **Taux de completion** : Suivi des abandons par module
- **Performance cognitive** : Métriques des tests comportementaux
- **Génération de rapports** : Statistiques d'utilisation IA
- **Satisfaction utilisateur** : Feedback et améliorations continues

---

## 👥 Équipe & Support

**Développé par ia-solution**
- 📍 Alès, France
- 📧 contact@ia-solution.fr
- 🌐 [ia-solution.fr](https://ia-solution.fr)

### Support technique :
- 📧 support@ia-solution.fr
- 📋 [Issues GitHub](https://github.com/zefparis/bilan-competences/issues)

---

## 🔄 Mises à jour récentes

### v1.0.0 (Décembre 2024)
- ✅ **Correction dashboard** : Indicateurs de progression précis (6/6 modules)
- ✅ **Amélioration évaluation cognitive** : Logique de completion améliorée
- ✅ **Optimisation UI/UX** : Interface plus fluide et intuitive
- ✅ **Corrections bugs** : Tests de réaction sans faux positifs
- ✅ **Documentation** : README mis à jour et complet

---

© 2025 PERSPECTA. Tous droits réservés.

*Plateforme développée avec ❤️ pour l'orientation professionnelle et cognitive.*
