# PDF Profile Optimizers - Documentation

## Vue d'ensemble

Ce module contient 5 optimiseurs qui transforment les données brutes en profils différenciés et crédibles pour la génération du bilan PDF PERSPECTA.

## Problèmes Résolus

### ❌ Avant Optimisation
- **RIASEC** : Scores plats (7-8% partout) → Pas de différenciation
- **Cognitif** : Tout à 50% → Impression d'algorithme défaillant
- **Parcours** : Dates incohérentes, analyse vague
- **Recommandations** : Génériques, identiques pour tous
- **Statistiques** : Manquantes ou floues

### ✅ Après Optimisation
- **RIASEC** : Dominant ≥25%, Faible ≤10%, variance amplifiée 1.5x
- **Cognitif** : Scores réalistes 20-100% avec forces/faiblesses claires
- **Parcours** : Analyse de cohérence, progression, gaps identifiés
- **Recommandations** : TOP 5 formations scorées (match ≥40%)
- **Statistiques** : Salaires, demande marché, croissance compétences

---

## Modules

### 1. `riasecOptimizer.ts`

**Fonction** : `optimizeRIASECProfile(rawScores: RIASECProfile): RIASECProfile`

**Algorithme** :
1. Normalisation à 100%
2. Amplification variance (coefficient 1.5)
3. Renormalisation
4. Enforcement écarts minimums (dominant ≥25%, faible ≤10%)
5. Arrondi et ajustement final

**Exemple** :
```typescript
// Input (plat)
{ R: 17, I: 16, A: 17, S: 16, E: 17, C: 17 }

// Output (différencié)
{ R: 6, I: 32, A: 12, S: 8, E: 24, C: 18 }
// Code: IEC (clair)
```

**Helpers** :
- `getRIASECCode(profile)` → "IEC"
- `getDominantDimensions(profile)` → ['I', 'E', 'C']

---

### 2. `cognitiveOptimizer.ts`

**Fonction** : `optimizeCognitiveProfile(qualitative: QualitativeCognitiveProfile): CognitiveScores`

**Algorithme** :
1. Conversion qualitative → numérique avec variance
   - `low` → 35 ± 8 (range 20-50)
   - `medium` → 60 ± 8 (range 45-75)
   - `high` → 80 ± 10 (range 65-95)
2. Garantie au moins 1 force (≥70) et 1 faiblesse (≤45)

**Exemple** :
```typescript
// Input (qualitatif)
{
  inhibitionControl: 'high',
  workingMemory: 'medium',
  decisionSpeed: 'medium',
  cognitiveLoadTolerance: 'medium',
  verbalFluency: 'high'
}

// Output (numérique différencié)
{
  inhibitoryControl: 82,
  workingMemory: 58,
  decisionSpeed: 55,
  cognitiveLoadTolerance: 63,
  verbalFluency: 78
}
```

**Helpers** :
- `getCognitiveStrengths(scores)` → ['Contrôle inhibiteur', 'Fluidité verbale']
- `getCognitiveWeaknesses(scores)` → ['Vitesse de décision']

---

### 3. `careerAnalyzer.ts`

**Fonction** : `analyzeCareerPath(experiences, cognitiveScores, riasecProfile): CareerAnalysis`

**Analyse** :
1. **Temporelle** : Durée carrière, tenure moyenne
2. **Compétences** : Identification dominantes
3. **Progression** : Ascendante / Horizontale / Pivot
4. **Cohérence** : Scoring 0-100 (RIASEC × Cognitif × Parcours)
5. **Gaps** : Identification manques (management, stabilité, etc.)
6. **Recommandations** : Personnalisées selon profil

**Exemple Output** :
```typescript
{
  coherence: 82,
  progression: 'ascendante',
  careerLength: 7,
  avgTenure: 2.3,
  dominantSkills: ['Python', 'Architecture', 'Cloud', 'Leadership'],
  gaps: ['Profil E=24% mais aucune exp management'],
  recommendations: [
    'Progression cohérente (Dev → Lead → Architecte)',
    'Excellente cohérence (82%) avec profil IEC',
    'Visez Engineering Manager dans 2-3 ans'
  ],
  salaryPotential: {
    current: '75 000€/an',
    potential: '85 000€/an',
    increase: '+13%'
  }
}
```

---

### 4. `recommendationEngine.ts`

**Fonction** : `generatePersonalizedRecommendations(riasec, cognitive, careerGaps): PersonalizedRecommendations`

**Base de données** :
- 15 formations (I, E, C, A, S, R)
- 8 livres
- 5 outils

**Scoring Formations** (0-100) :
- **RIASEC match** : 40 points (20 pts par dimension dominante)
- **Cognitif match** : 30 points (10 pts par requirement satisfait)
- **Gap filling** : 30 points (comble un manque identifié)

**Seuil** : Sélection TOP 5 avec score ≥40

**Exemple Output** :
```typescript
{
  formations: [
    {
      name: 'Machine Learning Specialization',
      provider: 'Stanford | Coursera',
      matchScore: 85,
      reason: 'Profil I dominant (32%) : recherche avancée'
    },
    {
      name: 'Strategic Leadership',
      provider: 'HEC Paris',
      matchScore: 72,
      reason: 'Comble gap management (profil E=24%)'
    }
  ],
  books: [
    { title: 'Range', author: 'David Epstein', reason: 'Flexibilité cognitive' },
    { title: 'Deep Work', author: 'Cal Newport', reason: 'Contrôle inhibiteur élevé' }
  ],
  tools: [
    { name: 'Todoist', usage: 'To-do linéaire (mémoire travail modérée)' },
    { name: 'Forest App', usage: 'Timer anti-dispersion' }
  ]
}
```

---

### 5. `marketData.ts`

**Fonction** : `getMarketInsights(currentRole, targetRoles, skills, riasecCode, yearsExp): MarketInsights`

**Données** :
- **Salaires** : 15 rôles × 3 niveaux (junior/mid/senior)
- **Demande** : 8 profils RIASEC (métiers chauds, croissance, délai embauche)
- **Compétences** : 18 skills (demande, taux croissance)

**Exemple Output** :
```typescript
{
  salaryInsights: {
    current: '75 000€/an',
    potential: '85 000€/an',
    increase: '+13%'
  },
  demandInsights: {
    hotRoles: ['Data Scientist', 'Product Manager', 'Solutions Architect'],
    growthRate: '+18%/an',
    timeToHire: '45 jours'
  },
  skillsInsights: {
    hotSkills: ['Python', 'Cloud'],
    recommendations: ['Kubernetes', 'Machine Learning']
  }
}
```

---

## Intégration

### Fichier Principal : `profileOptimizer.ts`

**Fonction** : `optimizeProfile(input: RawProfileInput): OptimizedProfileData`

**Pipeline** :
```
RawProfileInput
  ↓
1. optimizeRIASECProfile()      → RIASEC différencié
  ↓
2. optimizeCognitiveProfile()   → Scores cognitifs réalistes
  ↓
3. analyzeCareerPath()          → Analyse parcours + cohérence
  ↓
4. generateRecommendations()    → TOP 5 formations personnalisées
  ↓
5. getMarketInsights()          → Données marché
  ↓
OptimizedProfileData (prêt pour PDF)
```

**Utilisation** :
```typescript
import { optimizeProfile } from './profileOptimizer';

const rawInput = {
  riasecScores: { R: 15, I: 35, A: 12, S: 10, E: 20, C: 18 },
  cognitiveProfile: {
    inhibitionControl: 'high',
    workingMemory: 'medium',
    decisionSpeed: 'medium',
    cognitiveLoadTolerance: 'medium',
    verbalFluency: 'high'
  },
  experiences: [...],
  currentRole: 'Architecte Solutions',
  skills: ['Python', 'Cloud', 'Architecture'],
  targetRoles: ['Engineering Manager']
};

const optimized = optimizeProfile(rawInput);

// Utiliser dans génération PDF
generatePDF(optimized);
```

---

## Tests

### Test 1 : Variance RIASEC
```typescript
const flat = { R: 17, I: 16, A: 17, S: 16, E: 17, C: 17 };
const optimized = optimizeRIASECProfile(flat);

// Vérifier
assert(Math.max(...Object.values(optimized)) >= 25); // Dominant ≥25%
assert(Math.min(...Object.values(optimized)) <= 10); // Faible ≤10%
assert(optimized.R + optimized.I + ... === 100);      // Total = 100%
```

### Test 2 : Scores Cognitifs
```typescript
const qualitative = {
  inhibitionControl: 'high',
  workingMemory: 'low',
  decisionSpeed: 'medium',
  cognitiveLoadTolerance: 'medium',
  verbalFluency: 'high'
};

const scores = optimizeCognitiveProfile(qualitative);

// Vérifier
assert(scores.inhibitoryControl >= 65);  // high → ≥65
assert(scores.workingMemory <= 50);      // low → ≤50
assert(Object.values(scores).some(v => v >= 70)); // Au moins 1 force
```

### Test 3 : Recommandations Différenciées
```typescript
const profile1 = optimizeProfile({ riasecScores: { I: 40, ... }, ... });
const profile2 = optimizeProfile({ riasecScores: { E: 40, ... }, ... });

// Vérifier
assert(profile1.recommendations.formations[0].name.includes('Data')); // I dominant
assert(profile2.recommendations.formations[0].name.includes('Leadership')); // E dominant
```

---

## Résultats Attendus

### Avant vs Après

| Métrique | Avant | Après |
|----------|-------|-------|
| **RIASEC variance** | 6-8% partout | 6-32% (écart 26 pts) |
| **Cognitif variance** | 50% partout | 25-95% (écart 70 pts) |
| **Cohérence parcours** | Non calculée | Score 0-100% affiché |
| **Formations** | Génériques | TOP 5 scorées (match ≥40%) |
| **Statistiques** | Absentes | Salaires + demande + croissance |

### Impact Crédibilité

- ✅ **Profils uniques** : Chaque bilan différent
- ✅ **Forces/Faiblesses claires** : Pas de profil plat
- ✅ **Analyse personnalisée** : Cohérence cognitif × parcours
- ✅ **Recommandations ciblées** : Justification du match score
- ✅ **Données concrètes** : Salaires, croissance, délais

### Valeur Perçue

**Avant** : "Algorithme générique, pas personnalisé"  
**Après** : "Analyse approfondie, vraiment adapté à mon profil"

**Justification prix 49€** : ✅ Crédibilité maximale

---

## Maintenance

### Enrichir les Données

**Formations** : Ajouter dans `recommendationEngine.ts` → `ALL_FORMATIONS`
```typescript
{
  name: 'Nouvelle Formation',
  provider: 'Provider',
  riasecMatch: ['I', 'E'],
  cognitiveRequirements: { inhibitoryControl: 60 },
  ...
}
```

**Salaires** : Mettre à jour `marketData.ts` → `AVERAGE_SALARIES`
```typescript
'Nouveau Rôle': { junior: 40000, mid: 55000, senior: 75000 }
```

**Compétences** : Ajouter dans `marketData.ts` → `SKILLS_DEMAND`
```typescript
'Nouvelle Skill': { demand: 'Très élevée', growthRate: '+30%/an' }
```

---

## Auteur

**Windsurf AI** - Optimisation Bilan PDF PERSPECTA  
Date : Janvier 2025  
Version : 1.0
