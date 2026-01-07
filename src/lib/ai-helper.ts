import { anthropic, MODEL } from './anthropic'

/**
 * Helper pour appeler Claude avec un prompt simple
 * Compatible avec l'ancien format OpenAI pour faciliter la migration
 */
export async function callClaude(prompt: string, systemPrompt?: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Invalid response from Claude')
  }

  return content.text.trim()
}
