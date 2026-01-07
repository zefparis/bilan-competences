import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Claude 3.5 Haiku - Latest fast model (October 2024)
// Excellent for structured outputs and JSON parsing
export const MODEL = 'claude-3-5-haiku-20241022'
