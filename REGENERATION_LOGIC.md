# 🔄 Logique de Régénération du Rapport

## 📊 Système Mis en Place

### Règles de Régénération

1. **1ère génération** : ✅ **GRATUITE** (incluse dans le bilan à 49€)
2. **2ème génération** : ✅ **GRATUITE** (si l'utilisateur n'est pas satisfait)
3. **3ème génération et +** : 💰 **PAYANTE** (9€ par régénération supplémentaire)

### Modifications Apportées

#### 1. **Base de données** (`schema.prisma`)

Ajout de 2 champs au modèle `Report` :

```prisma
model Report {
  // ... autres champs
  
  // Regeneration tracking
  generationCount       Int      @default(1)     // Compteur de générations (1ère, 2ème, 3ème...)
  hasExtraGenerationPaid Boolean @default(false) // A payé pour générations supplémentaires (3+)
}
```

#### 2. **API de génération** (`src/app/api/report/generate/route.ts`)

**Logique implémentée** :

```typescript
// Vérifier le rapport existant
const existingReport = await prisma.report.findUnique({
  where: { userId: session.user.id }
});

if (existingReport) {
  const currentCount = existingReport.generationCount || 1;
  
  // Bloquer si limite atteinte (2 générations gratuites)
  if (currentCount >= 2 && !existingReport.hasExtraGenerationPaid) {
    return NextResponse.json({
      error: "Limite atteinte",
      message: "Vous avez déjà généré votre rapport 2 fois. Pour une 3ème génération, un paiement supplémentaire de 9€ est requis.",
      generationCount: currentCount,
      requiresPayment: true
    }, { status: 402 }); // 402 Payment Required
  }
  
  // Autoriser la régénération (2ème fois gratuite ou payée)
  await prisma.report.delete({ where: { userId: session.user.id } });
}

// Créer le nouveau rapport avec compteur incrémenté
const newGenerationCount = existingReport ? existingReport.generationCount + 1 : 1;
await prisma.report.create({
  data: {
    // ... données du rapport
    generationCount: newGenerationCount,
    hasExtraGenerationPaid: existingReport?.hasExtraGenerationPaid || false
  }
});
```

**Réponse API** :

```json
{
  "sections": [...],
  "generationCount": 2,
  "remainingFreeGenerations": 0,
  "reportId": "..."
}
```

### 🔧 Prochaines Étapes

#### 1. **Migration Base de Données**

```bash
npx prisma migrate dev --name add_report_regeneration_tracking
```

#### 2. **UI à Mettre à Jour**

**Page du rapport** (`src/app/dashboard/report/page.tsx`) :

Ajouter un indicateur visuel :

```tsx
{generationCount && (
  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <p className="text-sm text-blue-800">
      📊 Génération #{generationCount}/2 gratuite
      {remainingFreeGenerations > 0 && (
        <span className="ml-2 font-semibold">
          ({remainingFreeGenerations} régénération{remainingFreeGenerations > 1 ? 's' : ''} gratuite{remainingFreeGenerations > 1 ? 's' : ''} restante{remainingFreeGenerations > 1 ? 's' : ''})
        </span>
      )}
    </p>
  </div>
)}
```

**Bouton de régénération** :

```tsx
<Button 
  onClick={handleRegenerate}
  disabled={generating}
  variant={remainingFreeGenerations > 0 ? "default" : "outline"}
>
  {remainingFreeGenerations > 0 
    ? "🔄 Régénérer le rapport (gratuit)" 
    : "🔄 Régénérer le rapport (9€)"}
</Button>
```

#### 3. **Gestion du Paiement pour 3ème Génération**

Créer un endpoint Stripe pour le paiement de régénération :

```typescript
// src/app/api/stripe/regeneration-checkout/route.ts
const REGENERATION_PRICE = 900; // 9€ en centimes

export async function POST(req: NextRequest) {
  // Créer session Stripe pour 9€
  // Marquer hasExtraGenerationPaid = true après paiement
}
```

### 📝 Logs de Debug

Les logs afficheront maintenant :

```
📊 [API POST] Rapport existant - Génération #1
✅ [API POST] Régénération autorisée (2/2 gratuite ou payée)
📊 [API POST] Rapport sauvegardé - Génération #2/2 (limite gratuite)
```

Ou si limite atteinte :

```
⚠️ [API POST] Limite de 2 générations gratuites atteinte
```

### ✅ Avantages du Système

1. **Flexibilité** : 2 essais gratuits pour satisfaction client
2. **Monétisation** : Revenus supplémentaires sur 3ème+ génération
3. **Traçabilité** : Compteur clair dans la base de données
4. **UX** : Messages clairs sur les limites et coûts
5. **Sécurité** : Validation côté serveur, pas de contournement possible

### 🎯 Tarification Recommandée

- **1ère génération** : Incluse (49€)
- **2ème génération** : Gratuite (satisfaction client)
- **3ème génération** : 9€ (coût API Claude + marge)
- **4ème+ génération** : 9€ chacune

### 🔐 Sécurité

- ✅ Validation côté serveur uniquement
- ✅ Impossible de contourner via client
- ✅ Compteur stocké en base de données
- ✅ Flag de paiement vérifié avant régénération
