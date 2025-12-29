# PERSPECTA

**Plateforme d'évaluation cognitive et de bilan de compétences**

Une application premium conçue pour offrir une analyse approfondie du profil professionnel et cognitif des utilisateurs.

---

## 🧩 Empreinte cognitive
PERSPECTA modélise une empreinte cognitive fonctionnelle : un ensemble d'indicateurs comportementaux décrivant la manière dont une personne traite l'information, prend des décisions et s'adapte à un contexte de travail.  
Cette empreinte n'est ni un diagnostic médical, ni une mesure de QI, ni une évaluation clinique : elle sert uniquement d'outil d'orientation et de compréhension.

---

## 🎯 Fonctionnalités

- **Évaluation cognitive** : Tests basés sur 4 dimensions (Forme, Couleur, Volume, Son)
- **Test RIASEC** : Identification du profil professionnel
- **Bilan de compétences** : Analyse complète avec modules progressifs
- **Synthèse stratégique** : Rapport personnalisé avec recommandations
- **Mode clair/sombre** : Interface adaptative professionnelle
- **Paiement Stripe** : Intégration paiement sécurisé
- **Génération PDF** : Export des rapports au format PDF
- **Tests E2E** : Suite de tests automatisés avec Playwright

## 🧠 À quoi sert PERSPECTA ?
- Identifier des environnements professionnels compatibles avec son fonctionnement cognitif
- Mieux comprendre ses leviers naturels d'apprentissage et d'adaptation
- Explorer des pistes d'évolution ou de reconversion dans un contexte de transformation du travail
- Mettre en lumière des compétences humaines difficilement automatisables

## 🛠️ Stack technique

- **Frontend** : Next.js 14 (App Router), React 18, TypeScript
- **Styling** : TailwindCSS, shadcn/ui, Framer Motion
- **Backend** : API Routes Next.js, Prisma ORM
- **Base de données** : PostgreSQL (Supabase)
- **Authentification** : NextAuth.js + JWT
- **Paiements** : Stripe
- **AI/ML** : OpenAI API
- **Tests** : Vitest (unitaires), Playwright (E2E)
- **PDF** : React PDF, PDF-lib
- **Déploiement** : Vercel

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

## ⚙️ Variables d'environnement

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL |
| `NEXTAUTH_URL` | URL de l'application |
| `NEXTAUTH_SECRET` | Secret pour NextAuth (générer avec `openssl rand -base64 32`) |
| `OPENAI_API_KEY` | Clé API OpenAI pour les fonctionnalités IA |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe |
| `STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe |

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/           # Routes API
│   │   ├── auth/      # Authentification
│   │   ├── cognitive/ # Tests cognitifs
│   │   ├── stripe/    # Paiements
│   │   └── user/      # Gestion utilisateur
│   ├── auth/          # Pages d'authentification
│   ├── dashboard/     # Interface utilisateur
│   ├── methodology/   # Cadre méthodologique
│   ├── payment/       # Pages paiement
│   ├── pricing/       # Pages tarifs
│   └── (legal)/       # Pages légales
├── components/        # Composants UI réutilisables
├── lib/               # Utilitaires et configuration
└── prisma/            # Schéma de base de données
```

## 🚀 Déploiement

L'application est configurée pour un déploiement automatique sur Vercel :

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer

## 📄 Pages légales

- `/mentions-legales` - Mentions légales
- `/politique-confidentialite` - Politique RGPD
- `/cgu` - Conditions générales d'utilisation
- `/methodologie` - Cadre méthodologique et éthique

> PERSPECTA n'est pas conçu pour le recrutement, la sélection ou l'évaluation de candidats.

## 🧪 Tests

```bash
# Lancer les tests unitaires
pnpm test

# Lancer les tests E2E
pnpm test:e2e

# Ouvrir Prisma Studio
pnpm db:studio

# Peupler la base de données
pnpm db:seed
```

## 💳 Paiement

L'intégration Stripe permet :
- Paiement sécurisé par carte
- Webhooks pour la confirmation
- Gestion des abonnements
- Interface de paiement personnalisée

## 👥 Équipe

Développé par **ia-solution**  
📍 Alès, France  
📧 contact@ia-solution.fr

---

© 2025 PERSPECTA. Tous droits réservés.
