# Migration OpenAI → Anthropic Claude 3.5 Sonnet

## ✅ Étapes complétées

1. ✅ Installation `@anthropic-ai/sdk`
2. ✅ Création `src/lib/anthropic.ts` (client configuré)
3. ✅ Création `src/lib/ai-helper.ts` (helper pour appels simplifiés)
4. ✅ Migration `src/lib/transferable-skills-analyzer.ts`

## ⚠️ Fichiers à migrer manuellement

Les fichiers suivants contiennent encore des appels OpenAI et doivent être migrés :

### 1. `src/lib/general-report-sections.ts`
- 7 appels `openai.chat.completions.create()` à remplacer
- Utiliser `callClaude(prompt, systemPrompt)` du helper

### 2. `src/lib/premium-report-sections.ts`
- Vérifier les appels OpenAI
- Migrer vers Claude

## 🔧 Pattern de remplacement

### Ancien (OpenAI)
```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "System prompt" },
    { role: "user", content: prompt }
  ],
  temperature: 0.7,
  max_tokens: 2000,
})
return completion.choices[0]?.message?.content?.trim() || "Fallback"
```

### Nouveau (Claude)
```typescript
const response = await callClaude(prompt, "System prompt")
return response || "Fallback"
```

## 📝 Variables d'environnement

Ajouter à `.env.local` :
```env
ANTHROPIC_API_KEY=votre_clé_anthropic
```

## 🧪 Tests

Créer `src/scripts/test-claude-migration.ts` pour tester :
- Transferable skills analysis
- Report generation
- Toutes les sections de rapport

## 📚 Documentation

Mettre à jour README.md :
- Remplacer "OpenAI GPT-4o" par "Anthropic Claude 3.5 Sonnet"
- Ajouter mention "hébergé EU" pour conformité RGPD
