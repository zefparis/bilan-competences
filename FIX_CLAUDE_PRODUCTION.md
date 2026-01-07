# 🚨 URGENT : Claude n'est PAS appelé en Production

## Confirmation

Le rapport généré est **100% du fallback générique**, pas du contenu Claude personnalisé.

Texte fallback identifié :
- "Ce bilan cognitif professionnel PERSPECTA-COMPETENCES vise à éclairer..."
- "L'analyse repose sur une mesure de vos fonctions exécutives..."
- Contenu générique sans personnalisation

## Cause Probable

**La clé API Anthropic n'est PAS configurée sur Vercel** ou est invalide.

## Solution IMMÉDIATE

### **Étape 1 : Vérifier les variables d'environnement Vercel**

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `bilan-competences`
3. Settings → Environment Variables
4. **Cherchez** : `ANTHROPIC_API_KEY`

**Si elle n'existe PAS** → C'est le problème ! ✅

**Si elle existe** → Vérifiez qu'elle est bien :
- Activée pour "Production", "Preview", et "Development"
- Valeur correcte : `sk-ant-api03-...`

### **Étape 2 : Ajouter/Corriger la clé API**

Dans Vercel → Settings → Environment Variables :

1. **Name** : `ANTHROPIC_API_KEY`
2. **Value** : Votre clé API complète (depuis `.env.local`)
3. **Environments** : Cocher **Production**, **Preview**, **Development**
4. Cliquer sur "Save"

### **Étape 3 : Redéployer**

Après avoir ajouté/corrigé la variable :

**Option A : Redéploiement automatique**
```bash
git commit --allow-empty -m "trigger: Force redeploy to apply env vars"
git push origin main
```

**Option B : Redéploiement manuel**
1. Vercel Dashboard → Deployments
2. Latest deployment → Menu (⋯)
3. "Redeploy"
4. Cocher "Use existing Build Cache" → NO
5. Cliquer "Redeploy"

### **Étape 4 : Vérifier les logs**

Après redéploiement :

1. Vercel → Deployments → Latest → "View Function Logs"
2. Générer un nouveau rapport
3. **Chercher dans les logs** :

**✅ Si Claude fonctionne** :
```
🤖 [Claude API] Appel en cours...
📝 [Claude API] Prompt length: 1234 chars
✅ [Claude API] Réponse reçue en 2500 ms
📊 [Claude API] Tokens utilisés: 450 input + 890 output
```

**❌ Si erreur** :
```
❌ [Claude API] Erreur: Invalid API key
❌ [REPORT] Erreur assembleCompleteReport: ...
⚠️ [REPORT] FALLBACK ACTIVÉ
```

## Vérification Locale

Pour tester localement que Claude fonctionne :

```bash
# Vérifier que la clé existe
cat .env.local | grep ANTHROPIC_API_KEY

# Lancer le serveur local
npm run dev

# Générer un rapport
# Vérifier les logs dans le terminal
```

Si ça fonctionne en local mais pas en production → **C'est bien un problème de variable d'environnement Vercel**.

## Checklist

- [ ] Variable `ANTHROPIC_API_KEY` existe sur Vercel
- [ ] Variable activée pour Production
- [ ] Valeur correcte (commence par `sk-ant-api03-`)
- [ ] Redéploiement forcé après ajout de la variable
- [ ] Logs Vercel montrent les appels Claude
- [ ] Nouveau rapport généré avec contenu personnalisé

## Différence Attendue

### **AVANT (Fallback)** ❌
```
Ce bilan cognitif professionnel PERSPECTA-COMPETENCES vise à éclairer 
votre réflexion professionnelle en croisant votre fonctionnement cognitif...
```

### **APRÈS (Claude)** ✅
```
Bonjour [Prénom],

Vous avez pris le temps de réaliser ce bilan approfondi, et cette démarche 
témoigne d'une volonté claire de mieux comprendre votre fonctionnement 
professionnel. Votre profil cognitif révèle une force particulière en 
contrôle inhibiteur (94.6%), ce qui suggère une capacité remarquable à...

[Contenu personnalisé avec vos données réelles]
```

## Test Final

Après avoir configuré la clé API et redéployé :

1. **Supprimer le rapport existant** (via Prisma Studio)
2. **Générer un nouveau rapport**
3. **Vérifier le contenu** → Doit être personnalisé avec votre prénom, vos scores exacts, des exemples concrets

Si le contenu reste générique → Vérifier les logs Vercel pour voir l'erreur exacte.
