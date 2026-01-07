// Script de test direct de l'API Claude
import { config } from 'dotenv'
import { resolve } from 'path'
import Anthropic from '@anthropic-ai/sdk'

// Charger les variables d'environnement depuis .env.local
config({ path: resolve(process.cwd(), '.env.local') })

async function testClaudeAPI() {
  console.log('🧪 Test de connexion Claude API\n')
  
  // Vérifier la clé API
  const apiKey = process.env.ANTHROPIC_API_KEY
  console.log('📋 ANTHROPIC_API_KEY présente:', !!apiKey)
  console.log('📋 Longueur clé:', apiKey?.length || 0)
  console.log('📋 Début clé:', apiKey?.substring(0, 15) + '...\n')
  
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY manquante dans .env.local')
    process.exit(1)
  }
  
  try {
    console.log('🔌 Tentative de connexion à Claude...')
    const anthropic = new Anthropic({ apiKey })
    
    // Tester plusieurs modèles pour trouver celui disponible
    const modelsToTest = [
      'claude-3-5-sonnet-20241022',  // Latest Claude 3.5 Sonnet
      'claude-3-5-sonnet-20240620',  // Previous Claude 3.5 Sonnet
      'claude-3-5-haiku-20241022',   // Claude 3.5 Haiku (newest)
      'claude-3-opus-20240229',      // Claude 3 Opus
      'claude-3-sonnet-20240229',    // Claude 3 Sonnet
      'claude-3-haiku-20240307'      // Claude 3 Haiku
    ]
    
    let workingModel = null
    
    for (const model of modelsToTest) {
      try {
        console.log(`  Essai avec ${model}...`)
        const message = await anthropic.messages.create({
          model,
          max_tokens: 50,
          messages: [{
            role: 'user',
            content: 'OK?'
          }]
        })
        workingModel = model
        console.log(`  ✅ ${model} fonctionne!`)
        break
      } catch (err: any) {
        console.log(`  ❌ ${model} non disponible (${err.status})`)
      }
    }
    
    if (!workingModel) {
      throw new Error('Aucun modèle Claude disponible avec cette clé API')
    }
    
    console.log('\n🎯 Modèle fonctionnel trouvé:', workingModel)
    
    const message = await anthropic.messages.create({
      model: workingModel,
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Réponds simplement "OK" si tu me reçois.'
      }]
    })
    
    const response = message.content[0]
    if (response.type === 'text') {
      console.log('✅ Connexion réussie!')
      console.log('📨 Réponse de Claude:', response.text)
      console.log('\n✅ Claude est opérationnel!')
    }
    
  } catch (error: any) {
    console.error('❌ Erreur de connexion Claude:')
    console.error('Type:', error.constructor.name)
    console.error('Message:', error.message)
    if (error.status) console.error('Status:', error.status)
    if (error.error) console.error('Error details:', error.error)
    process.exit(1)
  }
}

testClaudeAPI()
