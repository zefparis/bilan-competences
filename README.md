# PERSPECTA

**Plateforme d'évaluation cognitive et de bilan de compétences**

Une application premium conçue pour offrir une analyse approfondie du profil professionnel et cognitif des utilisateurs.

---

## 🎯 Fonctionnalités

- **Évaluation cognitive** : Tests basés sur 4 dimensions (Forme, Couleur, Volume, Son)
- **Test RIASEC** : Identification du profil professionnel
- **Bilan de compétences** : Analyse complète avec modules progressifs
- **Synthèse stratégique** : Rapport personnalisé avec recommandations
- **Mode clair/sombre** : Interface adaptative professionnelle

## 🛠️ Stack technique

- **Frontend** : Next.js 14 (App Router), React 18, TypeScript
- **Styling** : TailwindCSS, shadcn/ui
- **Backend** : API Routes Next.js, Prisma ORM
- **Base de données** : PostgreSQL (Supabase)
- **Authentification** : NextAuth.js + JWT
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

# Lancer en développement
pnpm dev
```

## ⚙️ Variables d'environnement

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL |
| `NEXTAUTH_URL` | URL de l'application |
| `NEXTAUTH_SECRET` | Secret pour NextAuth |
| `JWT_SECRET` | Secret pour les tokens JWT |

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/           # Routes API
│   ├── auth/          # Pages d'authentification
│   ├── dashboard/     # Interface utilisateur
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

## 👥 Équipe

Développé par **ia-solution**  
📍 Alès, France  
📧 contact@ia-solution.fr

---

© 2025 PERSPECTA. Tous droits réservés.
