# Audit Homepage PERSPECTA - Janvier 2026

## 🎯 Contexte
PERSPECTA a évolué de "bilan tech-only" (v1.0-v2.0) vers "plateforme universelle de reconversion + handicap" (v3.1).
La homepage actuelle (`/app/new-homepage.tsx`) ne reflète **PAS** cette transformation majeure.

---

## ❌ INCOHÉRENCES CRITIQUES IDENTIFIÉES

### 1. Hero Section - Positionnement Tech-Only

**❌ Actuel (ligne 80-88)** :
```tsx
<h1>Bilan de compétences + Certification professionnelle + Emploi</h1>
<p>PERSPECTA valide vos compétences techniques, délivre un certificat blockchain 
   et vous connecte aux offres d'emploi France Travail.</p>
```

**✅ Attendu v3.1** :
```tsx
<h1>Votre reconversion professionnelle, étape par étape</h1>
<p>287 métiers français • Analyse IA GPT-4o • Module handicap inclusif</p>
```

**Impact** : Perte immédiate de 95% du marché (non-tech)

---

### 2. Meta Tags SEO - Keywords Tech-Only

**❌ Actuel (`/app/page.tsx` ligne 5-7)** :
```tsx
title: "PERSPECTA - Bilan de compétences + Certification Blockchain + Emploi"
description: "La seule plateforme qui valide vos compétences tech..."
keywords: "développeur, data scientist, devops, cybersécurité"
```

**✅ Attendu v3.1** :
```tsx
title: "PERSPECTA - Reconversion Professionnelle & Bilan de Compétences"
description: "287 métiers français • Analyse IA • Module handicap • 49€"
keywords: "reconversion professionnelle, bilan compétences, handicap RQTH, formation CPF"
```

**Impact SEO** : Invisible pour recherches "reconversion", "handicap", "CPF"

---

### 3. Stats Hero - Données Obsolètes

**❌ Actuel (ligne 106-119)** :
```tsx
<div>7 Modules</div>  // Faux : 11 modules en v3.1
<div>45 Questions tech</div>  // Trop tech-centré
<div>∞ Offres matchées</div>  // Vague
```

**✅ Attendu v3.1** :
```tsx
<div>287 Métiers français</div>
<div>98% Satisfaction</div>
<div>49€ Valeur 2000€</div>
```

---

### 4. Section "Modules" - Incomplet

**❌ Actuel** : Mentionne seulement 6 modules classiques + Module 7 (Certification tech)

**✅ Manquants v3.1** :
- Module 8 : Projet Professionnel (287 codes ROME)
- Module 8.5 : **Accessibilité & Handicap** (2,8M travailleurs)
- Module 9 : Formations CPF
- Module 10 : Rapport Final PDF

**Impact** : Valeur perçue divisée par 2

---

### 5. Tableau Comparatif - Comparaison Inadaptée

**❌ Actuel (ligne 287-288)** :
```tsx
<th>Marco (Pôle Emploi)</th>
```

**✅ Attendu v3.1** : Comparer avec :
- Bilan de compétences classique (1500-3000€)
- Test RIASEC seul (150€)
- Analyse cognitive seule (200€)

**Objectif** : Justifier le prix 49€ (valeur ~2000€)

---

### 6. Cas d'Usage - Personas Tech-Only

**❌ Actuel (ligne 702-710)** :
```tsx
"Développeur en reconversion"
"Je veux valider mes compétences autodidactes"
```

**✅ Attendu v3.1** : Personas diversifiés
1. **Plombier → Technicien maintenance** (reconversion métier manuel)
2. **Dev Junior → Data Analyst** (évolution tech)
3. **Assistant RH (RQTH) → Conseiller insertion** (handicap)

---

### 7. Module Handicap - ABSENT

**❌ Actuel** : Aucune mention du module accessibilité

**✅ Attendu v3.1** : Section dédiée
- 2,8M travailleurs handicapés ciblés
- Aides AGEFIPH (jusqu'à 10 000€)
- Matching entreprises engagées (>6% TH)
- RQTH, aménagements, formations accessibles

**Impact social** : Perte de crédibilité sur l'engagement inclusif

---

### 8. CTA - Messaging Inadapté

**❌ Actuel (ligne 94)** :
```tsx
<Button>Commencer - 49€</Button>
```

**✅ Attendu v3.1** :
```tsx
<Button>Démarrer mon bilan gratuit</Button>
<p>Modules 1-6 gratuits • Paiement uniquement pour certification + PDF</p>
```

**Raison** : Freemium > Paywall immédiat

---

### 9. Section "Pourquoi 49€" - ABSENTE

**❌ Actuel** : Pas de justification du prix

**✅ Attendu v3.1** : Tableau comparatif valeur

| Prestation | Valeur marché | PERSPECTA |
|------------|---------------|-----------|
| Bilan compétences classique | 1500-3000€ | ✅ Inclus |
| Test RIASEC | 150€ | ✅ Inclus |
| Analyse cognitive | 200€ | ✅ Inclus |
| Analyse IA GPT-4o | 100€ | ✅ Inclus |
| Module handicap | N/A | ✅ Inclus |
| **TOTAL** | **~2000€** | **49€** |

---

### 10. Roadmap & Métriques - ABSENTES

**❌ Actuel** : Aucune preuve sociale, aucune roadmap

**✅ Attendu v3.1** :
- **Métriques** : 98% satisfaction, 67% trouvent une formation, 42% entretien sous 3 mois
- **Roadmap** : v3.2 (API AGEFIPH), v3.3 (IA avancée), v4.0 (Marketplace)

---

## 📊 IMPACT BUSINESS ESTIMÉ

### Avant (Homepage actuelle tech-only)
- **Cible** : ~500K professionnels IT en France
- **Taux de rebond** : ~70% (non-tech partent immédiatement)
- **Conversion** : ~1% (positionnement flou)

### Après (Homepage v3.1 universelle)
- **Cible** : ~30M actifs en France (287 métiers)
- **Taux de rebond** : ~40% (messaging clair)
- **Conversion** : ~3% (value proposition forte)

**ROI estimé** : x60 en volume de marché adressable

---

## 🎯 PRIORITÉS DE REFONTE

### P0 - Critique (Bloquer déploiement)
1. ✅ Changer Hero Section (tech → universel)
2. ✅ Mettre à jour Meta Tags SEO
3. ✅ Ajouter Module 8.5 Handicap
4. ✅ Corriger stats (7 → 11 modules, 287 métiers)

### P1 - Important (Déployer sous 48h)
5. ✅ Ajouter section "Pourquoi 49€"
6. ✅ Personas diversifiés (3 cas d'usage)
7. ✅ Section "Pour qui ?" (Reconversion, Évolution, Handicap)

### P2 - Nice to have (Déployer sous 1 semaine)
8. ✅ Métriques & confiance
9. ✅ Roadmap publique
10. ✅ Témoignages réels

---

## 🚨 RISQUES SI NON CORRIGÉ

1. **Perte de crédibilité** : Annonce v3.1 mais homepage v2.0
2. **SEO catastrophique** : Invisible sur mots-clés stratégiques
3. **Taux de rebond élevé** : Non-tech quittent immédiatement
4. **Confusion utilisateurs** : Messaging incohérent
5. **Perte opportunité handicap** : 2,8M personnes ignorées

---

## ✅ VALIDATION POST-REFONTE

### Checklist technique
- [ ] Grep "développeurs" → 0 résultats (sauf contexte tech explicite)
- [ ] Grep "tech-only" → 0 résultats
- [ ] Grep "287 métiers" → ≥3 mentions
- [ ] Grep "handicap" → ≥2 mentions
- [ ] Meta title contient "Reconversion Professionnelle"
- [ ] 11 modules affichés (pas 7)

### Checklist UX
- [ ] Hero parle de "reconversion" (pas "tech")
- [ ] 3 personas diversifiés (manuel, tech, handicap)
- [ ] Section "Pourquoi 49€" visible
- [ ] Module handicap mis en avant
- [ ] CTA freemium (pas paywall)

### Checklist SEO
- [ ] Title : "Reconversion Professionnelle"
- [ ] Description : "287 métiers + handicap"
- [ ] Keywords : "reconversion, handicap, CPF, RQTH"
- [ ] OG image mise à jour

---

**Date audit** : 6 janvier 2026  
**Version actuelle** : v2.0 (tech-only)  
**Version cible** : v3.1 (universelle + handicap)  
**Statut** : 🔴 CRITIQUE - Refonte urgente requise
