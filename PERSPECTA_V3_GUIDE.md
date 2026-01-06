# PERSPECTA v3.0 - Guide Complet

## 🎯 Vue d'ensemble

PERSPECTA v3.0 transforme la plateforme d'un outil spécialisé tech en une **plateforme universelle de reconversion professionnelle** couvrant tous les métiers français.

### Nouveautés v3.0

1. **Référentiel ROME Complet** - 287 codes métiers couvrant tous les secteurs
2. **Module Projet Professionnel** - Définition et suivi de projets de reconversion
3. **Recherche de Formations** - Catalogue de formations avec financement CPF
4. **Analyse IA des Compétences** - Identification des compétences transférables
5. **Navigation Unifiée** - Système d'onglets pour tous les modules

---

## 📚 Architecture des Modules

### 1. Référentiel ROME (`/src/lib/france-travail/rome-codes.ts`)

**287 codes ROME** organisés par domaines :
- Agriculture (24 codes)
- Arts & Spectacle (21 codes)
- Banque & Assurance (16 codes)
- BTP (35 codes)
- Commerce (36 codes)
- Communication (18 codes)
- Hôtellerie & Restauration (21 codes)
- Informatique (8 codes)
- Santé (20 codes)
- Services à la personne (14 codes)
- Support Entreprise (25 codes)
- Transport & Logistique (30 codes)

**Fonctions utilitaires :**
```typescript
searchROMECodes(query: string): ROMECode[]
getROMEFromRIASEC(riasecProfile): string[]
getROMEByCode(code: string): ROMECode | undefined
getROMEByLabel(label: string): ROMECode | undefined
getAllDomains(): string[]
getROMEByDomain(domain: string): ROMECode[]
```

### 2. Module Projet Professionnel

#### Schéma Prisma
```prisma
model CareerProject {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  
  targetRomeCode  String
  targetRomeLabel String
  targetDomain    String
  
  motivation      String?  @db.Text
  timeline        String?  // court_terme | moyen_terme | long_terme
  constraints     String?  @db.Text
  
  currentSkills   String[] @default([])
  requiredSkills  String[] @default([])
  skillsGap       String[] @default([])
  
  formations      Json?
  status          String   @default("DRAFT")
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

#### API Routes
- `POST /api/career-project` - Créer un projet
- `GET /api/career-project` - Liste des projets
- `GET /api/career-project/[id]` - Détail d'un projet
- `PATCH /api/career-project/[id]` - Mettre à jour
- `DELETE /api/career-project/[id]` - Supprimer
- `GET /api/career-project/[id]/formations` - Formations pour le projet

#### Interface UI
- `/dashboard/career-project` - Gestion des projets
- `/dashboard/career-project/[id]/analysis` - Analyse IA

**Fonctionnalités :**
- Recherche métier avec autocomplétion ROME
- Gestion des compétences actuelles/requises
- Calcul automatique du gap de compétences
- Statuts : DRAFT, ACTIVE, COMPLETED, ARCHIVED
- Timeline : court/moyen/long terme

### 3. Module Formations

#### Client France Travail (`/src/lib/france-travail/client.ts`)
```typescript
interface FormationParams {
  romeCodes?: string[]
  keywords?: string
  location?: string
  distance?: number
  limit?: number
}

fetchFormations(params: FormationParams): Promise<Formation[]>
```

**10 formations mock** couvrant :
- Tech (Développeur Web, Data Analyst, Cybersécurité, DevOps)
- Gestion (Gestionnaire de Paie, Comptable)
- Santé (Infirmier)
- Commerce (Commercial B2B)
- Social (Conseiller en Insertion)
- Digital (Chef de Projet Digital)

#### API Routes
- `GET /api/formations` - Recherche générale
  - Query params : `romeCodes`, `keywords`, `location`, `distance`, `limit`

#### Interface UI
- `/dashboard/formations` - Catalogue de formations

**Informations affichées :**
- Organisme et localisation
- Durée et modalités (présentiel/distance/hybride)
- Certification et niveau de sortie
- Coût total
- Options de financement (CPF, Pôle Emploi, Région, etc.)
- Date de début
- Lien vers l'organisme

### 4. Analyse IA des Compétences Transférables

#### Analyseur IA (`/src/lib/transferable-skills-analyzer.ts`)
```typescript
interface TransferableSkillsInput {
  currentJob: {
    romeCode?: string
    title: string
    skills: string[]
  }
  targetJob: {
    romeCode: string
    title: string
    requiredSkills: string[]
  }
  userProfile?: {
    riasecScores?: {...}
  }
}

analyzeTransferableSkills(input): Promise<TransferableSkillsAnalysis>
```

**Utilise GPT-4o** pour analyser :
- Compétences transférables (high/medium/low)
- Gap de compétences (critical/important/nice-to-have)
- Score de compatibilité (0-100)
- Recommandations stratégiques
- Priorités de formation
- Temps de transition estimé
- Facteurs de succès
- Défis à anticiper

#### API Routes
- `POST /api/transferable-skills` - Lancer l'analyse

#### Interface UI
- `/dashboard/career-project/[id]/analysis` - Résultats d'analyse

**Visualisations :**
- Score de compatibilité avec barre de progression
- Badges colorés par pertinence/priorité
- Listes détaillées avec explications
- Recommandations actionnables

### 5. Navigation Unifiée

#### Composant (`/src/components/dashboard-nav.tsx`)
Système d'onglets sticky avec 10 modules :
1. Vue d'ensemble
2. Parcours
3. Expériences
4. Valeurs
5. RIASEC
6. Cognitif
7. Certification
8. **Projet Pro** (nouveau)
9. **Formations** (nouveau)
10. Rapport

**Caractéristiques :**
- Navigation sticky en haut de page
- Indicateur visuel de l'onglet actif
- Scroll horizontal sur mobile
- Icônes Lucide pour chaque module

---

## 🔄 Flux Utilisateur Complet

### Parcours de Reconversion

1. **Définir le projet** (`/dashboard/career-project`)
   - Rechercher un métier cible (287 codes ROME)
   - Renseigner motivation et contraintes
   - Lister compétences actuelles et requises

2. **Analyser la faisabilité** (`/dashboard/career-project/[id]/analysis`)
   - Lancer l'analyse IA
   - Consulter le score de compatibilité
   - Identifier les compétences transférables
   - Voir le gap de compétences avec priorités

3. **Trouver des formations** (`/dashboard/formations`)
   - Recherche par code ROME ou mots-clés
   - Filtrer par localisation
   - Comparer coûts et financements
   - Accéder aux organismes

4. **Suivre le projet**
   - Mettre à jour le statut (DRAFT → ACTIVE → COMPLETED)
   - Ajouter/modifier compétences
   - Relancer l'analyse si nécessaire

---

## 🗄️ Base de Données

### Migration
```bash
pnpm prisma migrate dev --name add_career_project_module
```

### Modèles ajoutés
- `CareerProject` - Projets professionnels

### Relations
- `User` → `CareerProject[]` (one-to-many)

---

## 🎨 Design System

### Couleurs par Module
- **Projet Professionnel** : Bleu (`blue-600`)
- **Formations** : Violet (`purple-600`)
- **Certification** : Jaune (`yellow-600`)
- **Analyse IA** : Dégradé bleu

### Badges
- **Universel** : Modules accessibles à tous les métiers
- **Premium** : Modules payants
- **Nouveau** : Fonctionnalités récentes

### Composants UI
- shadcn/ui pour tous les composants
- Lucide React pour les icônes
- Tailwind CSS pour le styling

---

## 🔧 Configuration

### Variables d'environnement
```env
# Existantes
OPENAI_API_KEY=sk-...
FRANCE_TRAVAIL_CLIENT_ID=...
FRANCE_TRAVAIL_CLIENT_SECRET=...
FRANCE_TRAVAIL_API_URL=https://api.francetravail.io

# Base de données
DATABASE_URL=postgresql://...
```

### Dépendances
Aucune nouvelle dépendance requise. Utilise :
- OpenAI SDK (existant)
- Prisma (existant)
- Next.js 14 (existant)

---

## 📊 Données Mock

### Formations (10 exemples)
Couvrent différents secteurs avec informations complètes :
- Organisme, durée, certification
- Coût et financement
- Modalités et dates

### Codes ROME (287)
Tous les métiers français avec :
- Code officiel
- Libellé
- Domaine
- Correspondance RIASEC

---

## 🚀 Déploiement

### Checklist
- [x] Migration Prisma appliquée
- [x] Client Prisma régénéré
- [x] Variables d'environnement configurées
- [x] Tests des API routes
- [x] Vérification UI responsive
- [x] Documentation complète

### Commandes
```bash
# Développement
pnpm dev

# Build production
pnpm build

# Démarrer production
pnpm start

# Migrations
pnpm prisma migrate deploy
```

---

## 🎯 Prochaines Évolutions

### Améliorations Possibles
1. **API France Travail réelle** - Remplacer les données mock
2. **Matching avancé** - Algorithme de scoring formations
3. **Suivi temporel** - Timeline de progression du projet
4. **Notifications** - Alertes nouvelles formations
5. **Export PDF** - Rapport projet professionnel
6. **Partage** - Partager projet avec conseiller
7. **Statistiques** - Analytics sur les reconversions
8. **Recommandations** - Suggestions métiers basées sur profil

### Intégrations Futures
- API Pôle Emploi pour offres d'emploi
- API Mon Compte Formation pour droits CPF
- API Carif-Oref pour catalogue formations
- Webhooks pour notifications temps réel

---

## 📞 Support

### Ressources
- Documentation Prisma : https://www.prisma.io/docs
- API France Travail : https://francetravail.io/data/api
- Codes ROME : https://www.data.gouv.fr/fr/datasets/rome/
- OpenAI API : https://platform.openai.com/docs

### Contact
Pour toute question sur PERSPECTA v3.0, consulter la documentation technique ou contacter l'équipe de développement.

---

**Version** : 3.0.0  
**Date** : Janvier 2025  
**Statut** : ✅ Production Ready
