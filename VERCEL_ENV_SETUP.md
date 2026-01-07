# Configuration Variables d'Environnement Vercel

## 🚨 Variables REQUISES pour le déploiement

Allez sur **Vercel Dashboard** → Votre projet → **Settings** → **Environment Variables**

### 1. Base de données (Supabase PostgreSQL)
```
DATABASE_URL=postgresql://postgres:PASSWORD@db.animktcvgoyzmccbxvvo.supabase.co:5432/postgres?sslmode=require
```

### 2. Authentification NextAuth
```
NEXTAUTH_URL=https://votre-domaine.vercel.app
NEXTAUTH_SECRET=dev-secret-change-me-20c1b0f3a58d4b1a9d2a7e9e4d1c8f6b
JWT_SECRET=6dab22c6c75c3b943d2b3f1a56fbe758b941c9eb8c279eaeed19925fe90f2396d0cdc86ac2ae38ab3be8459e6ec514268ffb713469b59df8aeddbebe104674a9
```

### 3. Supabase Storage (pour avatars)
```
NEXT_PUBLIC_SUPABASE_URL=https://animktcvgoyzmccbxvvo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuaW1rdGN2Z295em1jY2J4dnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjM1NjMsImV4cCI6MjA4MDEzOTU2M30.gDlnQo8SvTDhgEfSR3o41L4BDTvowAlKN72webUEpMY
```

### 4. Anthropic Claude AI
```
ANTHROPIC_API_KEY=sk-ant-api03-VOTRE_CLE_ICI
```

### 5. Stripe (paiements)
```
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE
STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_SECRET
```

### 6. France Travail API (optionnel)
```
FRANCE_TRAVAIL_CLIENT_ID=votre_client_id
FRANCE_TRAVAIL_CLIENT_SECRET=votre_secret
FRANCE_TRAVAIL_API_URL=https://api.francetravail.io
```

## 📋 Checklist de déploiement

- [ ] Toutes les variables ci-dessus ajoutées dans Vercel
- [ ] Bucket `avatars` créé dans Supabase Storage (public)
- [ ] Clé API Anthropic valide et testée
- [ ] Webhook Stripe configuré vers `https://votre-domaine.vercel.app/api/stripe/webhook`
- [ ] `NEXTAUTH_URL` mis à jour avec le domaine de production

## 🔧 Comment ajouter les variables sur Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **Environment Variables**
4. Pour chaque variable :
   - Name: `NOM_VARIABLE`
   - Value: `valeur`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
5. Cliquez **Save**
6. **Redéployez** le projet après avoir ajouté toutes les variables

## ⚠️ Notes importantes

- Les variables `NEXT_PUBLIC_*` sont exposées côté client (navigateur)
- Les autres variables sont **privées** (serveur uniquement)
- Après modification des variables, **redéployez** pour appliquer les changements
