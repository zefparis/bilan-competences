import { createClient } from '@libsql/client/web'

function getDb() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  
  if (!url || !authToken) {
    throw new Error(`Missing Turso credentials: URL=${!!url}, TOKEN=${!!authToken}`)
  }
  
  return createClient({
    url,
    authToken,
  })
}

export const db = getDb()

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
