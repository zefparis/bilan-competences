# PERSPECTA PDF Generator

Système de génération de PDF premium pour les bilans cognitifs professionnels.

## 🚀 Quick Start

```typescript
import { generatePDFBlob, ProfileData } from '@/lib/pdf';

const profileData: Partial<ProfileData> = {
  meta: {
    id: 'PERSPECTA-123',
    date: '2025-01-01',
    userName: 'Jean Dupont',
  },
  cognitive: {
    flexibility: 85,
    inhibitoryControl: 72,
    processingSpeed: 45,
  },
  riasec: {
    R: 75, I: 82, A: 45, S: 38, E: 68, C: 32,
    dominant: ['I', 'R', 'E'],
  },
  values: [
    { name: 'Créativité', satisfaction: 4, importance: 5 },
    { name: 'Autonomie', satisfaction: 3, importance: 4 },
  ],
  career: [
    { year: 2020, role: 'Développeur', company: 'Tech Corp' },
  ],
};

// Générer le PDF
const blob = await generatePDFBlob(profileData);
```

## 📁 Architecture

```
src/lib/pdf/
├── index.ts              # Point d'entrée principal
├── generator.tsx         # Générateur PDF
├── components/           # Composants visuels réutilisables
│   ├── ScoreGauge.tsx    # Jauge de score
│   ├── RiasecHexagon.tsx # Hexagone RIASEC
│   ├── RadarChart.tsx    # Graphique radar
│   ├── Timeline.tsx      # Timeline parcours
│   └── ...
├── templates/            # Templates de pages
│   ├── CoverPage.tsx     # Page de couverture
│   ├── TableOfContents.tsx
│   ├── Part1Profile.tsx  # Pages 3-6
│   ├── Part2Analysis.tsx # Pages 7-9
│   ├── Part3Projections.tsx # Pages 10-11
│   └── Part4Actions.tsx  # Pages 12-14
├── styles/               # Design system
│   ├── tokens.ts         # Couleurs, espacements
│   ├── typography.ts     # Styles typographiques
│   └── layouts.ts        # Grilles et mises en page
├── utils/                # Utilitaires
│   ├── validator.ts      # Validation des données
│   ├── textGenerator.ts  # Génération de textes
│   └── dataProcessor.ts  # Traitement des données
└── data/
    ├── types.ts          # Types TypeScript
    └── sampleProfile.ts  # Données exemple
```

## 🎨 Design System

### Couleurs

```typescript
import { colors } from '@/lib/pdf';

colors.primary.blue      // #2563EB - Bleu principal
colors.success           // #10B981 - Vert succès
colors.warning           // #F59E0B - Orange attention
colors.danger            // #EF4444 - Rouge danger
colors.riasec.R          // #8B5CF6 - Violet Réaliste
colors.riasec.I          // #3B82F6 - Bleu Investigatif
// ...
```

### Espacements

```typescript
import { spacing } from '@/lib/pdf';

spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 16px
spacing.lg   // 24px
spacing.xl   // 32px
spacing.xxl  // 48px
```

## 📄 API Endpoints

### POST /api/pdf/generate
Génère le PDF pour l'utilisateur connecté.

**Authentification requise**: Oui

**Response**: `application/pdf`

### GET /api/pdf/generate
Vérifie si l'utilisateur peut générer un PDF.

**Response**:
```json
{
  "canGenerate": true,
  "hasData": {
    "cognitive": true,
    "riasec": true,
    "values": true
  },
  "message": "Prêt pour la génération du PDF"
}
```

### GET /api/pdf/demo
Génère un PDF de démonstration (sans authentification).

**Response**: `application/pdf`

## 🔧 Fonctions Utilitaires

### validateProfileData
Valide les données d'entrée.

```typescript
import { validateProfileData } from '@/lib/pdf';

const result = validateProfileData(data);
if (!result.isValid) {
  console.error(result.errors);
}
```

### generateAllTexts
Génère les textes personnalisés basés sur le profil.

```typescript
import { generateAllTexts } from '@/lib/pdf';

const texts = generateAllTexts(profileData);
// texts.signaturePhrase
// texts.strengthsAnalysis
// texts.sweetSpot
// ...
```

### enrichProfileData
Enrichit les données avec les calculs automatiques.

```typescript
import { enrichProfileData } from '@/lib/pdf';

const enrichedData = enrichProfileData(profileData);
// Ajoute: jobCompatibility, scenarios, environments
```

## 📊 Structure du PDF (14 pages)

| Page | Section | Contenu |
|------|---------|---------|
| 1 | Couverture | Logo, titre, nom utilisateur |
| 2 | Sommaire | Table des matières interactive |
| 3 | 1.1 | Signature cognitive (jauges) |
| 4 | 1.2 | Ce que cela signifie (forces) |
| 5 | 1.3 | Valeurs professionnelles (radar) |
| 6 | 1.4 | Profil RIASEC (hexagone) |
| 7 | 2.1 | Matrice compatibilité métiers |
| 8 | 2.2 | Parcours professionnel (timeline) |
| 9 | 2.3 | Zones de vigilance |
| 10 | 3.1 | Trois scénarios d'évolution |
| 11 | 3.2 | Environnements compatibles |
| 12 | 4.1 | Actions prioritaires (90 jours) |
| 13 | 4.2 | Ressources recommandées |
| 14 | 4.3 | Prochain pas + CTA accompagnement |

## 🧪 Test

```bash
# Générer un PDF de démo
curl http://localhost:3000/api/pdf/demo -o demo.pdf
```

## 📝 Types

```typescript
interface ProfileData {
  meta: ProfileMeta;
  cognitive: CognitiveProfile;
  riasec: RiasecProfile;
  values: ProfessionalValue[];
  career: CareerExperience[];
  // Optionnels (générés automatiquement si absents)
  jobCompatibility?: JobCompatibility[];
  scenarios?: CareerScenario[];
  environments?: EnvironmentRecommendation[];
  generatedTexts?: GeneratedTexts;
}
```

## ⚡ Performance

- Génération: < 3 secondes
- Taille PDF: ~500KB - 1MB
- Compatible: Adobe Reader, Preview, navigateurs modernes

## 🔒 Sécurité

- Authentification requise pour `/api/pdf/generate`
- Données utilisateur non exposées dans les logs
- PDF généré à la volée (non stocké)
