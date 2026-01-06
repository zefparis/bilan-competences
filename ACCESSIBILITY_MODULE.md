# Module Accessibilité Handicap - PERSPECTA v3.1

## 🎯 Objectif

Rendre PERSPECTA accessible aux **2,8 millions de travailleurs handicapés** en France en intégrant un système de matching emploi/formation adapté avec filtres spécifiques France Travail.

---

## 📊 Marché & Impact

### Chiffres Clés
- **2,8M** de travailleurs handicapés actifs en France
- **6%** d'obligation d'emploi dans les entreprises de +20 salariés
- **987K** bénéficiaires de la RQTH (Reconnaissance Qualité Travailleur Handicapé)
- **80%** des handicaps sont invisibles (maladies chroniques, troubles psychiques...)

### Aides AGEFIPH
- Aide à l'insertion professionnelle : jusqu'à **4 000€**
- Aide à la formation : prise en charge totale ou partielle
- Aide à l'adaptation du poste : jusqu'à **10 000€**
- Aide à la création d'entreprise : jusqu'à **6 000€**

---

## 🏗️ Architecture Technique

### 1. Base de Données

**Nouveau modèle `Accessibility`** (Prisma)

```prisma
model Accessibility {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Déclaration handicap
  hasDisability           Boolean   @default(false)
  disabilityType          String?   // "moteur" | "visuel" | "auditif" | "cognitif" | "psychique" | "multiple" | "invisible"
  
  // Reconnaissance officielle
  hasRQTH                 Boolean   @default(false)
  rqthNumber              String?
  rqthExpiryDate          DateTime?
  
  // Besoins d'aménagement
  needsWorkstationAdaptation    Boolean   @default(false)
  needsScheduleFlexibility      Boolean   @default(false)
  needsRemoteWork               Boolean   @default(false)
  needsAccessibleTransport      Boolean   @default(false)
  needsAssistiveTechnology      Boolean   @default(false)
  otherNeeds                    String?   @db.Text
  
  // Compétences compensatoires
  compensatorySkills      String[]  @default([])
  
  // Préférences emploi
  preferDisabilityFriendlyCompanies  Boolean   @default(false)
  interestedInAGEFIPHAid             Boolean   @default(false)
  
  // Confidentialité
  shareWithEmployers      Boolean   @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
}
```

**Migration appliquée** : `20260106214920_add_accessibility_module`

---

### 2. API Routes

#### `/api/accessibility`

**GET** - Récupérer le profil accessibilité
```typescript
Response: {
  accessibility: Accessibility | null
}
```

**POST** - Créer/Mettre à jour le profil
```typescript
Request: {
  hasDisability: boolean
  disabilityType?: string
  hasRQTH?: boolean
  rqthNumber?: string
  rqthExpiryDate?: string
  needsWorkstationAdaptation?: boolean
  needsScheduleFlexibility?: boolean
  needsRemoteWork?: boolean
  needsAccessibleTransport?: boolean
  needsAssistiveTechnology?: boolean
  otherNeeds?: string
  compensatorySkills?: string[]
  preferDisabilityFriendlyCompanies?: boolean
  interestedInAGEFIPHAid?: boolean
  shareWithEmployers?: boolean
}

Response: {
  accessibility: Accessibility
}
```

---

### 3. Extension Client France Travail

**Nouvelles fonctions** dans `/src/lib/france-travail/client.ts`

#### `searchJobsWithAccessibility()`
Recherche d'offres avec filtres handicap natifs API France Travail :
- `offresMRS=true` : Offres Méthode de Recrutement par Simulation (inclut handicap)
- `natureContrat=E2` : Télétravail
- Enrichissement avec données accessibilité

#### `searchFormationsWithAccessibility()`
Recherche de formations accessibles :
- `accessibiliteHandicap=true` : Filtre natif API
- Informations sur adaptations pédagogiques
- Contact référent handicap
- Aides financières (CPF, AGEFIPH, Pôle Emploi)

**Interfaces TypeScript**
```typescript
interface AccessibilityFilters {
  handicapOnly?: boolean
  amenagementPoste?: boolean
  accessiblePMR?: boolean
  remoteWorkPossible?: boolean
}

interface JobAccessibility {
  amenagementPossible: boolean
  entrepriseHandiFriendly: boolean
  contactReferentHandicap: string | null
  aideAGEFIPH: boolean
}

interface FormationAccessibility {
  accessible: boolean
  adaptations: string[]
  referentHandicap: string | null
  financement: {
    cpf: boolean
    agefiph: boolean
    pole_emploi: boolean
  }
}
```

---

### 4. Interface Utilisateur

**Page** : `/dashboard/accessibility`

#### Sections du formulaire

1. **Situation de handicap**
   - Déclaration oui/non
   - Type de handicap (7 catégories)

2. **RQTH**
   - Reconnaissance oui/non
   - Numéro RQTH
   - Date d'expiration

3. **Besoins d'aménagement**
   - Aménagement poste de travail
   - Horaires flexibles
   - Télétravail
   - Accessibilité transport
   - Technologies d'assistance
   - Autres besoins (texte libre)

4. **Compétences compensatoires**
   - 9 compétences prédéfinies :
     - Résilience exceptionnelle
     - Capacité d'adaptation accrue
     - Créativité dans la résolution de problèmes
     - Empathie développée
     - Organisation rigoureuse
     - Gestion du stress
     - Communication claire et directe
     - Travail en autonomie
     - Persévérance

5. **Préférences de recherche**
   - Prioriser entreprises engagées handicap
   - Informations aides AGEFIPH

6. **Confidentialité**
   - Autorisation partage avec employeurs
   - Alerte sur impact visibilité candidatures

#### Ressources intégrées
- AGEFIPH : https://www.agefiph.fr
- FIPHFP : https://www.fiphfp.fr
- MDPH : https://www.mdph.fr
- Cap Emploi : https://www.cap-emploi.fr

---

## 🎨 UX/UI

### Design System

**Couleur principale** : Bleu (`blue-600`)
**Icône** : Heart (Lucide React)

### Badges Accessibilité

Dans les résultats d'offres d'emploi et formations :

```tsx
<Badge variant="secondary">Entreprise engagée handicap</Badge>
<Badge variant="secondary">Poste aménageable</Badge>
<Badge variant="secondary">Aide AGEFIPH disponible</Badge>
<Badge variant="secondary">Accessible handicap</Badge>
```

### Alertes RGPD

```tsx
<Alert className="border-blue-500 bg-blue-50">
  <Shield className="w-4 h-4" />
  <AlertDescription>
    Protection des données : Ces informations ne sont jamais partagées 
    sans votre consentement explicite.
  </AlertDescription>
</Alert>
```

---

## 📦 Données Mock

### Offres d'Emploi (3 exemples)

1. **Développeur Web Junior - Entreprise Adaptée**
   - Télétravail 100%
   - Référent handicap : Marie Dupont
   - Aide AGEFIPH disponible

2. **Assistant Administratif - Fonction Publique**
   - Poste adapté PMR
   - Horaires flexibles
   - Locaux accessibles

3. **Conseiller Client à Distance**
   - Télétravail total
   - Matériel fourni et adapté
   - Formation personnalisée

### Formations (3 exemples)

1. **Titre Professionnel Développeur Web**
   - AFPA Nîmes - Centre accessible PMR
   - 7 mois, 12 000€
   - Financement : CPF, AGEFIPH, Pôle Emploi
   - Adaptations : supports adaptés, rythme personnalisable, référent dédié

2. **Formation Bureautique (100% distanciel)**
   - GRETA Gard
   - 3 mois, 2 500€
   - Vidéos sous-titrées, sessions individuelles

3. **CAP Accompagnant Éducatif Petite Enfance**
   - CFA Alès
   - 10 mois, gratuit (apprentissage)
   - Aménagement stages, tutorat renforcé

---

## 🔐 Sécurité & RGPD

### Protection des Données

- **Consentement explicite** requis pour partage avec employeurs
- **Chiffrement** des données sensibles (numéro RQTH)
- **Suppression en cascade** si suppression compte utilisateur
- **Accès restreint** : uniquement l'utilisateur et admins autorisés

### Conformité

- ✅ RGPD Article 9 : Données de santé
- ✅ Loi Handicap 2005
- ✅ Convention ONU droits personnes handicapées

---

## 🚀 Intégration Dashboard

### Module 8.5 (Optionnel)

```typescript
{
  number: 8.5,
  title: "Accessibilité & Handicap",
  description: "Module optionnel pour matching emploi adapté",
  href: "/dashboard/accessibility",
  icon: Heart,
  optional: true,
  badge: "Optionnel"
}
```

### Navigation

- Accessible depuis le dashboard principal
- Bouton "Passer cette étape" si non concerné
- Retour au dashboard après enregistrement

---

## 📈 Métriques de Succès

### KPIs

1. **Taux d'adoption** : % utilisateurs déclarant un handicap
2. **Matching qualité** : Score moyen offres accessibles vs standard
3. **Taux de conversion** : % candidatures abouties
4. **Satisfaction** : NPS spécifique module accessibilité

### Objectifs

- **Court terme** (3 mois) : 100 utilisateurs handicap actifs
- **Moyen terme** (6 mois) : 500 utilisateurs, partenariat AGEFIPH
- **Long terme** (12 mois) : 2 000 utilisateurs, label "Accessible"

---

## 🔮 Évolutions Futures

### Phase 2 (Q2 2025)

- [ ] Intégration API AGEFIPH pour aides en temps réel
- [ ] Matching avancé avec score accessibilité
- [ ] Notifications offres entreprises adaptées
- [ ] Export PDF profil accessibilité

### Phase 3 (Q3 2025)

- [ ] Partenariat Cap Emploi
- [ ] Module accompagnement personnalisé
- [ ] Réseau mentors handicap
- [ ] Webinaires thématiques

### Phase 4 (Q4 2025)

- [ ] IA prédictive : recommandations métiers adaptés
- [ ] Marketplace aides techniques
- [ ] Communauté entraide
- [ ] Label "Entreprise Inclusive PERSPECTA"

---

## 📚 Documentation Technique

### Fichiers Créés

```
prisma/
  └── migrations/
      └── 20260106214920_add_accessibility_module/
          └── migration.sql

src/
  ├── app/
  │   ├── api/
  │   │   └── accessibility/
  │   │       └── route.ts
  │   └── dashboard/
  │       └── accessibility/
  │           └── page.tsx
  └── lib/
      └── france-travail/
          └── client.ts (extended)
```

### Fichiers Modifiés

```
prisma/schema.prisma
  - Ajout modèle Accessibility
  - Relation User.accessibility

src/lib/france-travail/client.ts
  - searchJobsWithAccessibility()
  - searchFormationsWithAccessibility()
  - Interfaces AccessibilityFilters, JobAccessibility, FormationAccessibility
  - Mock data enrichi
```

---

## 🎓 Formation Équipe

### Points Clés

1. **Sensibilisation handicap** : Formation 2h pour toute l'équipe
2. **Vocabulaire inclusif** : "Personne en situation de handicap" (pas "handicapé")
3. **RQTH** : Comprendre le processus et les droits
4. **AGEFIPH** : Connaître les aides disponibles
5. **Accessibilité numérique** : WCAG 2.1 niveau AA

---

## 📞 Support & Ressources

### Contacts Utiles

- **AGEFIPH** : 0 800 11 10 09
- **Cap Emploi** : Trouver son conseiller sur cap-emploi.fr
- **MDPH** : Annuaire sur mdph.fr
- **Défenseur des Droits** : 09 69 39 00 00

### Documentation

- Guide AGEFIPH : https://www.agefiph.fr/ressources-handicap-formation
- Référentiel accessibilité : https://accessibilite.numerique.gouv.fr
- Loi Handicap : https://www.legifrance.gouv.fr

---

## ✅ Checklist Déploiement

- [x] Migration base de données appliquée
- [x] Client Prisma régénéré
- [x] API route `/api/accessibility` créée
- [x] Extension client France Travail
- [x] Page UI `/dashboard/accessibility` créée
- [x] Mock data accessibilité
- [ ] Tests E2E module accessibilité
- [ ] Documentation utilisateur
- [ ] Formation équipe support
- [ ] Communication lancement

---

## 🏆 Impact Social

### Engagement PERSPECTA

En intégrant ce module, PERSPECTA s'engage à :

1. **Inclusion** : Rendre la reconversion accessible à tous
2. **Non-discrimination** : Garantir égalité des chances
3. **Valorisation** : Mettre en avant les compétences compensatoires
4. **Accompagnement** : Orienter vers les bonnes ressources

### Citation

> "Le handicap n'est pas une limite, c'est une différence qui enrichit."
> 
> — PERSPECTA, plateforme universelle de reconversion professionnelle

---

**Version** : 3.1.0  
**Date** : 6 janvier 2025  
**Statut** : ✅ Module Implémenté  
**Prochaine étape** : Tests & Déploiement
