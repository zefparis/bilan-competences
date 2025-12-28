import { createClient } from "@libsql/client"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })
dotenv.config({ path: ".env" })

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

async function initCognitiveTables() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS cognitive_profiles (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,

      form_score INTEGER NOT NULL CHECK(form_score >= 0 AND form_score <= 100),
      color_score INTEGER NOT NULL CHECK(color_score >= 0 AND color_score <= 100),
      volume_score INTEGER NOT NULL CHECK(volume_score >= 0 AND volume_score <= 100),
      sound_score INTEGER NOT NULL CHECK(sound_score >= 0 AND sound_score <= 100),

      dominant_cognition TEXT NOT NULL CHECK(dominant_cognition IN ('form', 'color', 'volume', 'sound')),
      profile_code TEXT NOT NULL,

      communication_style TEXT CHECK(communication_style IN ('analytical', 'visual', 'kinesthetic', 'auditory')),
      detail_level TEXT CHECK(detail_level IN ('high', 'medium', 'low')),
      learning_preference TEXT,

      completed_at DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(userId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS cognitive_test_responses (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      questionId INTEGER NOT NULL,
      selectedOption TEXT NOT NULL,
      dimension TEXT NOT NULL CHECK(dimension IN ('form', 'color', 'volume', 'sound')),
      weight INTEGER NOT NULL,
      answeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(userId, questionId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`
    CREATE TABLE IF NOT EXISTS cognitive_insights (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      insight_type TEXT NOT NULL CHECK(insight_type IN ('strength', 'challenge', 'career', 'learning')),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      priority INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  await client.execute(`CREATE INDEX IF NOT EXISTS idx_cognitive_user ON cognitive_profiles(userId)`)
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_responses_user ON cognitive_test_responses(userId)`)
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_insights_user ON cognitive_insights(userId, insight_type)`)

  console.log("✅ Tables cognitives créées avec succès")
}

initCognitiveTables().catch((e) => {
  console.error(e)
  process.exit(1)
})
