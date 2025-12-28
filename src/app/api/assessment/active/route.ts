import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié (token absent)" }, { status: 401 })
    }

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

    let lifePath = await prisma.lifePath.findUnique({
      where: { assessmentId },
      select: { id: true },
    })

    if (!lifePath) {
      lifePath = await prisma.lifePath.create({
        data: { assessmentId },
        select: { id: true },
      })
    }

    return NextResponse.json({ assessmentId, lifePathId: lifePath.id })
  } catch (e) {
    console.error("/api/assessment/active error", e)
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Erreur interne" },
      { status: 500 }
    )
  }
}
