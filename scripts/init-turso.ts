import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
  throw new Error(
    `Missing Turso env vars. TURSO_DATABASE_URL=${String(url)}, TURSO_AUTH_TOKEN=${authToken ? "[set]" : "[missing]"}. ` +
      `Please set them in .env.local (recommended) or .env.`
  )
}

const client = createClient({
  url,
  authToken,
})

async function main() {
  console.log('Creating tables in Turso...')

  // Create users table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT DEFAULT 'BENEFICIAIRE',
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      resetToken TEXT,
      resetTokenExpiry DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('✓ Users table created')

  await client.execute(`
    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS life_paths (
      id TEXT PRIMARY KEY,
      assessmentId TEXT NOT NULL UNIQUE,
      FOREIGN KEY (assessmentId) REFERENCES assessments(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS life_events (
      id TEXT PRIMARY KEY,
      lifePathId TEXT NOT NULL,
      year INTEGER NOT NULL,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      sentiment INTEGER NOT NULL,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lifePathId) REFERENCES life_paths(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS experiences (
      id TEXT PRIMARY KEY,
      assessmentId TEXT NOT NULL,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      startDate DATETIME NOT NULL,
      endDate DATETIME,
      situation TEXT,
      task TEXT,
      action TEXT,
      result TEXT,
      skills TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assessmentId) REFERENCES assessments(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS user_values (
      id TEXT PRIMARY KEY,
      assessmentId TEXT NOT NULL,
      valueName TEXT NOT NULL,
      "order" INTEGER NOT NULL,
      gapScore INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assessmentId) REFERENCES assessments(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS riasec_results (
      id TEXT PRIMARY KEY,
      assessmentId TEXT NOT NULL UNIQUE,
      scoreR INTEGER NOT NULL,
      scoreI INTEGER NOT NULL,
      scoreA INTEGER NOT NULL,
      scoreS INTEGER NOT NULL,
      scoreE INTEGER NOT NULL,
      scoreC INTEGER NOT NULL,
      topCode TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assessmentId) REFERENCES assessments(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      assessmentId TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      strengths TEXT,
      weaknesses TEXT,
      opportunities TEXT,
      threats TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assessmentId) REFERENCES assessments(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS action_steps (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      action TEXT NOT NULL,
      deadline DATETIME,
      status TEXT NOT NULL DEFAULT 'TODO',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
    )
  `)

  console.log('✓ Bilan tables created')
  console.log('Database schema initialized successfully!')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
