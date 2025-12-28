import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type ModuleStatus = "locked" | "pending" | "in_progress" | "completed"

type DashboardSummary = {
  assessmentId: string
  completionRate: number
  modulesCompleted: number
  totalModules: number
  lastActivity: string | null
  recommendations: number
  modules: {
    parcours: { status: ModuleStatus; progress: number; countEvents: number }
    experiences: { status: ModuleStatus; progress: number; countExperiences: number }
    valeurs: { status: ModuleStatus; progress: number; countValues: number }
    riasec: { status: ModuleStatus; progress: number; topCode: string | null }
    cognitive: { status: ModuleStatus; progress: number; dominant: string | null }
    synthese: { status: ModuleStatus; progress: number }
  }
}

function toISO(d: Date) {
  return d.toISOString().slice(0, 10)
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    // Active assessment (create if missing)
    let assessment = await (prisma as any).assessment.findFirst({
      where: { userId, status: "IN_PROGRESS" },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    })

    if (!assessment) {
      assessment = await (prisma as any).assessment.create({
        data: { userId, status: "IN_PROGRESS" },
        select: { id: true },
      })
    }

    const assessmentId = assessment.id

    let lifePath = await (prisma as any).lifePath.findUnique({
      where: { assessmentId },
      select: { id: true },
    })

    if (!lifePath) {
      lifePath = await (prisma as any).lifePath.create({
        data: { assessmentId },
        select: { id: true },
      })
    }

    const lifePathId = lifePath.id

    const countEvents = await (prisma as any).lifeEvent.count({ where: { lifePathId } })
    const countExperiences = await (prisma as any).experience.count({ where: { assessmentId } })
    const countValues = await (prisma as any).userValue.count({ where: { assessmentId } })

    const riasec = await (prisma as any).riasecResult.findUnique({
      where: { assessmentId },
      select: { topCode: true, updatedAt: true },
    })

    const cognitive = await (prisma as any).cognitiveProfile.findUnique({
      where: { userId },
      select: { dominant_cognition: true, updatedAt: true },
    })

    const topCode = riasec?.topCode ?? null
    const cognitiveDominant = cognitive?.dominant_cognition ?? null

  // Heuristics (tunable)
  const parcoursDone = countEvents >= 3
  const experiencesDone = countExperiences >= 3
  const valeursDone = countValues >= 5
  const riasecDone = !!topCode
  const cognitiveDone = !!cognitiveDominant

  const parcoursProgress = Math.min(100, Math.round((countEvents / 3) * 100))
  const experiencesProgress = Math.min(100, Math.round((countExperiences / 3) * 100))
  const valeursProgress = Math.min(100, Math.round((countValues / 5) * 100))
  const riasecProgress = riasecDone ? 100 : 0
  const cognitiveProgress = cognitiveDone ? 100 : 0

  const modulesBaseDone = [parcoursDone, experiencesDone, valeursDone, riasecDone]
  const modulesCompleted = [...modulesBaseDone, cognitiveDone].filter(Boolean).length
  const totalModules = 6

  const completionRate = Math.round((modulesCompleted / 5) * 100)

  const syntheseUnlocked = modulesBaseDone.filter(Boolean).length === 4

  const modules: DashboardSummary["modules"] = {
    parcours: {
      status: parcoursDone ? "completed" : countEvents > 0 ? "in_progress" : "pending",
      progress: parcoursProgress,
      countEvents,
    },
    experiences: {
      status: experiencesDone ? "completed" : countExperiences > 0 ? "in_progress" : "pending",
      progress: experiencesProgress,
      countExperiences,
    },
    valeurs: {
      status: valeursDone ? "completed" : countValues > 0 ? "in_progress" : "pending",
      progress: valeursProgress,
      countValues,
    },
    riasec: {
      status: riasecDone ? "completed" : "pending",
      progress: riasecProgress,
      topCode,
    },
    cognitive: {
      status: cognitiveDone ? "completed" : "pending",
      progress: cognitiveProgress,
      dominant: cognitiveDominant,
    },
    synthese: {
      status: syntheseUnlocked ? "pending" : "locked",
      progress: syntheseUnlocked ? 0 : 0,
    },
  }

    // last activity heuristic: max of updatedAt across modules (best-effort)
    const lastLifeEvent = await (prisma as any).lifeEvent.findFirst({
      where: { lifePathId },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    })

    const lastExperience = await (prisma as any).experience.findFirst({
      where: { assessmentId },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    })

    const lastValue = await (prisma as any).userValue.findFirst({
      where: { assessmentId },
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    })

    const candidates: Date[] = [
      lastLifeEvent?.updatedAt,
      lastExperience?.updatedAt,
      lastValue?.updatedAt,
      riasec?.updatedAt,
      cognitive?.updatedAt,
    ].filter(Boolean) as Date[]

    const lastActivity = candidates.sort((a, b) => b.getTime() - a.getTime())[0]
      ? toISO(candidates.sort((a, b) => b.getTime() - a.getTime())[0])
      : null

    const payload: DashboardSummary = {
      assessmentId,
      completionRate,
      modulesCompleted,
      totalModules,
      lastActivity,
      recommendations: 0,
      modules,
    }

    return NextResponse.json(payload)
  } catch (e) {
    console.error("/api/dashboard/summary error", e)
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Erreur interne" },
      { status: 500 }
    )
  }
}
