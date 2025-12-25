import { createClient } from '@libsql/client'

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
