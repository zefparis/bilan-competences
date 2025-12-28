import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"
import { analyzeCognitiveProfile, CognitiveAnalysis } from "@/lib/cognitive-engine"

export const runtime = "nodejs"

type Summary = {
  assessmentId: string
  user: {
    email: string
    firstName: string | null
    lastName: string | null
    title: string | null
    bio: string | null
    image: string | null
  } | null
  lifePath: { id: string; events: Array<{ id: string; year: number; title: string; type: string; sentiment: number; description?: string | null }> } | null
  experiences: Array<{ id: string; title: string; company: string; startDate: string; endDate?: string | null; skills: string }>
  values: Array<{ id: string; valueName: string; order: number; gapScore?: number | null }>
  riasecResult: {
    id: string
    scoreR: number
    scoreI: number
    scoreA: number
    scoreS: number
    scoreE: number
    scoreC: number
    topCode: string
  } | null
  cognitiveAnalysis: CognitiveAnalysis | null
  cognitiveInsights: Array<{
    id: string
    insight_type: "strength" | "challenge" | "career" | "learning"
    title: string
    description: string
    priority: number
  }>
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
  }

  // Active assessment (create if missing)
  let assessment = await prisma.assessment.findFirst({
    where: { userId, status: "IN_PROGRESS" },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  })

  if (!assessment) {
    assessment = await prisma.assessment.create({
      data: { userId, status: "IN_PROGRESS" },
      select: { id: true },
    })
  }

  const assessmentId = assessment.id

  const userRow = await (prisma as any).user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      title: true,
      bio: true,
      image: true,
    }
  })

  const lifePathRow = await prisma.lifePath.findUnique({
    where: { assessmentId },
    select: { id: true },
  })

  let lifePath: Summary["lifePath"] = null

  if (lifePathRow?.id) {
    const events = await prisma.lifeEvent.findMany({
      where: { lifePathId: lifePathRow.id },
      orderBy: { year: "asc" },
      select: { id: true, year: true, title: true, type: true, sentiment: true, description: true },
    })

    lifePath = {
      id: lifePathRow.id,
      events: events.map((e) => ({
        id: e.id,
        year: e.year,
        title: e.title,
        type: e.type,
        sentiment: e.sentiment,
        description: e.description ?? null,
      })),
    }
  }

  const experiencesRows = await prisma.experience.findMany({
    where: { assessmentId },
    orderBy: { startDate: "desc" },
    select: { id: true, title: true, company: true, startDate: true, endDate: true, skills: true },
  })

  const experiences: Summary["experiences"] = experiencesRows.map((r) => ({
    id: r.id,
    title: r.title,
    company: r.company,
    startDate: r.startDate.toISOString(),
    endDate: r.endDate ? r.endDate.toISOString() : null,
    skills: r.skills,
  }))

  const valuesRows = await prisma.userValue.findMany({
    where: { assessmentId },
    orderBy: { order: "asc" },
    select: { id: true, valueName: true, order: true, gapScore: true },
  })

  const values: Summary["values"] = valuesRows.map((r) => ({
    id: r.id,
    valueName: r.valueName,
    order: r.order,
    gapScore: r.gapScore ?? null,
  }))

  const riasec = await prisma.riasecResult.findUnique({
    where: { assessmentId },
    select: { id: true, scoreR: true, scoreI: true, scoreA: true, scoreS: true, scoreE: true, scoreC: true, topCode: true },
  })

  const riasecResult: Summary["riasecResult"] = riasec
    ? {
        id: riasec.id,
        scoreR: riasec.scoreR,
        scoreI: riasec.scoreI,
        scoreA: riasec.scoreA,
        scoreS: riasec.scoreS,
        scoreE: riasec.scoreE,
        scoreC: riasec.scoreC,
        topCode: riasec.topCode,
      }
    : null

  const cognitive = await (prisma as any).cognitiveProfile.findUnique({
    where: { userId },
    select: {
      id: true,
      dominant_cognition: true,
      profile_code: true,
      communication_style: true,
      detail_level: true,
    },
  })

  let cognitiveAnalysis: CognitiveAnalysis | null = null

  if (cognitive) {
    // Transformation en analyse qualitative via le moteur
    // On ne renvoie JAMAIS les scores bruts au front
    cognitiveAnalysis = analyzeCognitiveProfile({
        ...cognitive,
        dominant_cognition: cognitive.dominant_cognition as any
    })
  }

  const insightsRows = await (prisma as any).cognitiveInsight.findMany({
    where: { userId },
    orderBy: { priority: "desc" },
    select: { id: true, insight_type: true, title: true, description: true, priority: true },
  })

  const cognitiveInsights: Summary["cognitiveInsights"] = insightsRows.map((r: {
    id: string
    insight_type: string
    title: string
    description: string
    priority: number
  }) => ({
    id: r.id,
    insight_type: r.insight_type as any,
    title: r.title,
    description: r.description,
    priority: r.priority,
  }))

  const payload: Summary = {
    assessmentId,
    user: userRow,
    lifePath,
    experiences,
    values,
    riasecResult,
    cognitiveAnalysis,
    cognitiveInsights,
  }

  return NextResponse.json(payload)
}
