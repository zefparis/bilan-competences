import { createClient, type Client } from '@libsql/client/web'

let _db: Client | null = null

export function getDb(): Client {
  if (!_db) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN
    
    if (!url || !authToken) {
      throw new Error(`Missing Turso credentials: URL=${!!url}, TOKEN=${!!authToken}`)
    }
    
    _db = createClient({
      url,
      authToken,
    })
  }
  return _db
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
