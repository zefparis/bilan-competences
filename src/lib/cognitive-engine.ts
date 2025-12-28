import { randomUUID } from "node:crypto"
import type { CognitiveProfile, TestResponse } from "@/lib/schemas/cognitive"
import { ARCHETYPES, CROSS_PATTERNS, EVOLUTION_LEVERS, CognitiveDimension } from "./cognitive-knowledge"

interface ScoreAccumulator {
  form: number
  color: number
  volume: number
  sound: number
}

export type CognitiveProfileDraft = Omit<CognitiveProfile, "createdAt" | "updatedAt"> & {
  createdAt?: string
  updatedAt?: string
}

export interface CognitiveAnalysis {
  archetype: {
    name: string
    description: string
    workEnvironment: string
  }
  dynamics: {
    dominant: CognitiveDimension
    secondary: CognitiveDimension | null
    detailLevel: "Vue d'ensemble" | "Équilibré" | "Détail expert"
  }
  traits: string[]
  strengths: string[]
  blindSpots: string[]
  evolutionLever: string
  strategicSynthesis: string
}

export function computeCognitiveProfile(userId: string, responses: TestResponse[]): CognitiveProfileDraft {
  const rawScores: ScoreAccumulator = responses.reduce(
    (acc, response) => {
      acc[response.dimension] += response.weight
      return acc
    },
    { form: 0, color: 0, volume: 0, sound: 0 }
  )

  const totalRaw = Object.values(rawScores).reduce((a, b) => a + b, 0)
  const normalizedScores = {
    form_score: totalRaw ? Math.round((rawScores.form / totalRaw) * 100) : 0,
    color_score: totalRaw ? Math.round((rawScores.color / totalRaw) * 100) : 0,
    volume_score: totalRaw ? Math.round((rawScores.volume / totalRaw) * 100) : 0,
    sound_score: totalRaw ? Math.round((rawScores.sound / totalRaw) * 100) : 0,
  }

  const sum = Object.values(normalizedScores).reduce((a, b) => a + b, 0)
  if (sum !== 100) {
    const diff = 100 - sum
    const maxDimension = (Object.entries(normalizedScores).sort(([, a], [, b]) => b - a)[0]?.[0] ??
      "form_score") as keyof typeof normalizedScores
    normalizedScores[maxDimension] += diff
  }

  const dominant = (Object.entries(normalizedScores).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "form_score")
    .replace("_score", "") as "form" | "color" | "volume" | "sound"

  const profileCode = generateProfileCode(normalizedScores, dominant)
  const communicationStyle = detectCommunicationStyle(dominant)
  const detailLevel = detectDetailLevel(normalizedScores)

  return {
    id: randomUUID(),
    userId,
    ...normalizedScores,
    dominant_cognition: dominant,
    profile_code: profileCode,
    communication_style: communicationStyle,
    detail_level: detailLevel,
    completed_at: new Date().toISOString(),
  }
}

function generateProfileCode(
  scores: { form_score: number; color_score: number; volume_score: number; sound_score: number },
  dominant: string
): string {
  const getLevel = (s: number) => (s >= 75 ? 4 : s >= 50 ? 3 : s >= 25 ? 2 : 1)
  const levels = `${getLevel(scores.form_score)}${getLevel(scores.color_score)}${getLevel(scores.volume_score)}${getLevel(scores.sound_score)}`
  return `HCS-U7|V:9.0|DOM:${dominant.toUpperCase()}|CX:${levels}`
}

function detectCommunicationStyle(
  dominant: "form" | "color" | "volume" | "sound"
): "analytical" | "visual" | "kinesthetic" | "auditory" {
  const map = {
    form: "analytical",
    color: "visual",
    volume: "kinesthetic",
    sound: "auditory",
  } as const

  return map[dominant]
}

function detectDetailLevel(scores: {
  form_score: number
  color_score: number
  volume_score: number
  sound_score: number
}): "high" | "medium" | "low" {
  if (scores.form_score >= 40) return "high"
  if (scores.form_score >= 25) return "medium"
  return "low"
}

export function analyzeCognitiveProfile(profile: CognitiveProfile | CognitiveProfileDraft): CognitiveAnalysis {
  const scores = {
    form: profile.form_score,
    color: profile.color_score,
    volume: profile.volume_score,
    sound: profile.sound_score,
  }

  // 1. Identifier la dominante
  const dominant = profile.dominant_cognition as CognitiveDimension
  const archetype = ARCHETYPES[dominant]

  // 2. Identifier la secondaire (si score > 20 et écart < 15 avec la dominante)
  const sortedDimensions = Object.entries(scores)
    .sort(([, a], [, b]) => b - a) as [CognitiveDimension, number][]
  
  const dominantScore = sortedDimensions[0][1]
  const potentialSecondary = sortedDimensions[1]
  
  let secondary: CognitiveDimension | null = null
  if (potentialSecondary[1] >= 20 && (dominantScore - potentialSecondary[1] < 15)) {
    secondary = potentialSecondary[0]
  }

  // 3. Déterminer le niveau de détail
  let detailLevel: "Vue d'ensemble" | "Équilibré" | "Détail expert" = "Équilibré"
  if (dominantScore > 45) detailLevel = "Détail expert"
  if (dominantScore < 30) detailLevel = "Vue d'ensemble" // Cas rare de profil plat

  // 4. Construire la synthèse
  let synthesis = `Votre profil est dominé par la dimension ${archetype.name}. ${archetype.description} `
  let name = archetype.name

  if (secondary) {
    const key = `${dominant}-${secondary}` as keyof typeof CROSS_PATTERNS
    const crossPattern = CROSS_PATTERNS[key] || CROSS_PATTERNS[`${secondary}-${dominant}` as keyof typeof CROSS_PATTERNS]
    
    if (crossPattern) {
      name = crossPattern.name
      synthesis += `\n\nCette dominante est nuancée par une forte composante ${ARCHETYPES[secondary].name.split("Le ")[1]}, créant un profil de "${name}". ${crossPattern.description}`
    }
  }

  return {
    archetype: {
      name: name,
      description: archetype.description,
      workEnvironment: archetype.workEnvironment
    },
    dynamics: {
      dominant,
      secondary,
      detailLevel
    },
    traits: archetype.keywords,
    strengths: archetype.strengths,
    blindSpots: archetype.blindSpots,
    evolutionLever: EVOLUTION_LEVERS[dominant],
    strategicSynthesis: synthesis
  }
}

export function generateInsights(profile: CognitiveProfile | CognitiveProfileDraft): Array<{
  type: "strength" | "challenge" | "career" | "learning"
  title: string
  description: string
  priority: number
}> {
  const analysis = analyzeCognitiveProfile(profile)
  const insights: Array<{
    type: "strength" | "challenge" | "career" | "learning"
    title: string
    description: string
    priority: number
  }> = []

  // 1. Insight Principal (Archetype)
  insights.push({
    type: "strength",
    title: analysis.archetype.name,
    description: analysis.strategicSynthesis,
    priority: 100,
  })

  // 2. Forces (Top 2)
  analysis.strengths.slice(0, 2).forEach((strength, i) => {
    insights.push({
      type: "strength",
      title: `Force clé #${i + 1}`,
      description: strength,
      priority: 90 - i,
    })
  })

  // 3. Zone de friction (Challenge)
  analysis.blindSpots.slice(0, 1).forEach((spot) => {
    insights.push({
      type: "challenge",
      title: "Point de vigilance",
      description: spot,
      priority: 85,
    })
  })

  // 4. Environnement Idéal
  insights.push({
    type: "career",
    title: "Environnement Idéal",
    description: analysis.archetype.workEnvironment,
    priority: 80,
  })

  // 5. Levier d'évolution
  insights.push({
    type: "learning",
    title: "Levier d'évolution",
    description: analysis.evolutionLever,
    priority: 70,
  })

  return insights
}
