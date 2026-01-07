# 🔍 Debug du Rapport - Vérification Claude vs Fallback

## Problème Rapporté

L'utilisateur signale que :
1. ❌ Le contenu du rapport semble trop basique / "comme un mauvais mock"
2. ❌ Le bouton de régénération est grisé après la 1ère génération
3. ❓ La 2ème génération n'a pas fonctionné

## Causes Possibles

### 1. **Claude n'est PAS appelé → Fallback utilisé**

Si vous voyez ce contenu générique dans le rapport, c'est le fallback :

```
"Ce bilan cognitif professionnel PERSPECTA-COMPETENCES vise à éclairer votre réflexion professionnelle en croisant votre fonctionnement cognitif avec vos intérêts professionnels selon le modèle RIASEC."
```

**Pourquoi le fallback serait utilisé ?**
- ❌ Clé API Anthropic invalide ou expirée
- ❌ Quota API dépassé
- ❌ Erreur réseau vers l'API Claude
- ❌ Timeout de l'API (>30s)

### 2. **Bouton de régénération grisé**

**Cause identifiée** : `setCanRegenerate(false)` était appelé après chaque génération.

**Fix appliqué** : Changé en `setCanRegenerate(true)` pour permettre la régénération.

## 🔧 Comment Vérifier

### **Étape 1 : Vérifier les logs serveur**

Lors de la génération du rapport, vous devriez voir dans les logs :

**✅ Si Claude fonctionne :**
```
🚀 Démarrage génération rapport complet (13 sections)...
🚀 Génération sections générales avec Claude 3.5 Sonnet...

🤖 [Claude API] Appel en cours...
📝 [Claude API] Prompt length: 1234 chars
✅ [Claude API] Réponse reçue en 2500 ms
📊 [Claude API] Tokens utilisés: 450 input + 890 output

🤖 Génération des sections cognitives avec Claude 3.5 Sonnet...
✅ [Claude API] Réponse reçue en 1800 ms

✅ Rapport complet généré (13 sections)
```

**❌ Si le fallback est utilisé :**
```
❌ [REPORT] Erreur assembleCompleteReport: [détails erreur]
⚠️ [REPORT] FALLBACK ACTIVÉ - Utilisation du rapport de secours complet
⚠️ [REPORT] Cela signifie que Claude n'a PAS généré le contenu!
```

### **Étape 2 : Vérifier la clé API**

```bash
# Dans le terminal du serveur
echo $ANTHROPIC_API_KEY
```

Devrait afficher : `sk-ant-api03-...` (votre clé API complète)

### **Étape 3 : Tester l'API Claude manuellement**

Créer un fichier de test :

```typescript
// test-claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function testClaude() {
  try {
    console.log('🧪 Test API Claude...');
    
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: 'Dis bonjour en français',
        },
      ],
    });

    console.log('✅ Réponse Claude:', message.content[0]);
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testClaude();
```

Lancer : `npx tsx test-claude.ts`

## 🛠️ Solutions

### **Solution 1 : Si la clé API est invalide**

1. Vérifier que `ANTHROPIC_API_KEY` est bien définie dans `.env.local`
2. Redémarrer le serveur Next.js : `npm run dev`

### **Solution 2 : Si le quota est dépassé**

1. Vérifier le dashboard Anthropic : https://console.anthropic.com/
2. Vérifier les limites de taux (rate limits)
3. Attendre ou upgrader le plan

### **Solution 3 : Si timeout**

Augmenter le timeout dans `ai-helper.ts` :

```typescript
const message = await anthropic.messages.create({
  model: MODEL,
  max_tokens: 4096,
  timeout: 60000, // 60 secondes au lieu de 30
  // ...
});
```

### **Solution 4 : Forcer la régénération**

Si le bouton reste grisé malgré le fix :

1. Ouvrir la console navigateur (F12)
2. Vérifier l'état : `canRegenerate`, `generationCount`, `remainingFreeGenerations`
3. Rafraîchir la page (F5)

## 📊 Différence entre Contenu Claude vs Fallback

### **Contenu Claude (personnalisé)** ✅
```
Bonjour [Prénom],

Vous avez pris le temps de réaliser ce bilan approfondi, et cette démarche 
témoigne d'une volonté claire de mieux comprendre votre fonctionnement 
professionnel. Votre profil cognitif révèle des caractéristiques spécifiques...

[Contenu adapté avec des scores précis, des exemples concrets, un ton chaleureux]
```

### **Contenu Fallback (générique)** ❌
```
Ce bilan cognitif professionnel PERSPECTA-COMPETENCES vise à éclairer votre 
réflexion professionnelle en croisant votre fonctionnement cognitif avec vos 
intérêts professionnels selon le modèle RIASEC.

L'analyse repose sur une mesure de vos fonctions exécutives...

[Contenu générique sans personnalisation]
```

## 🎯 Action Immédiate

**Pour diagnostiquer le problème :**

1. **Regarder les logs du serveur** pendant la génération
2. **Chercher** les messages `🤖 [Claude API]` ou `⚠️ [REPORT] FALLBACK`
3. **Si fallback** → Vérifier la clé API et les quotas
4. **Si Claude fonctionne** → Le contenu devrait être personnalisé

**Pour tester la régénération :**

1. Rafraîchir la page du rapport (F5)
2. Le bouton "Régénérer (1 gratuite)" devrait être actif
3. Cliquer dessus
4. Vérifier les logs serveur pour voir si Claude est appelé

## 📝 Checklist de Vérification

- [ ] Migration Prisma exécutée (`npx prisma migrate dev`)
- [ ] Serveur redémarré après les modifications
- [ ] Variable `ANTHROPIC_API_KEY` présente dans `.env.local`
- [ ] Logs serveur affichent les appels Claude
- [ ] Bouton de régénération actif après génération
- [ ] Badge "Génération #1/2" visible
- [ ] Contenu du rapport personnalisé (pas générique)
