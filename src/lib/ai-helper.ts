import { anthropic, MODEL } from './anthropic'

/**
 * Helper pour appeler Claude avec un prompt simple
 * Compatible avec l'ancien format OpenAI pour faciliter la migration
 */
export async function callClaude(prompt: string, systemPrompt?: string): Promise<string> {
  const startTime = Date.now()
  console.log('\n🤖 [Claude API] Appel en cours...')
  console.log('📝 [Claude API] Prompt length:', prompt.length, 'chars')
  console.log('🎯 [Claude API] System prompt:', systemPrompt?.substring(0, 50) + '...')
  
  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt || 'Tu es un assistant expert en psychologie cognitive et orientation professionnelle.',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const duration = Date.now() - startTime
    console.log('✅ [Claude API] Réponse reçue en', duration, 'ms')
    console.log('📊 [Claude API] Tokens utilisés:', message.usage.input_tokens, 'input +', message.usage.output_tokens, 'output')

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Invalid response from Claude')
    }

    console.log('📝 [Claude API] Réponse length:', content.text.length, 'chars')
    console.log('✅ [Claude API] Succès total\n')
    
    return content.text.trim()
  } catch (error) {
    const duration = Date.now() - startTime
    console.error('❌ [Claude API] ERREUR après', duration, 'ms:', error)
    throw error
  }
}
