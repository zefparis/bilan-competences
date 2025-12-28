import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const { sessionId, data } = await req.json()

    if (!sessionId || !data) {
      return NextResponse.json({ message: "Données manquantes" }, { status: 400 })
    }

    // Verify session belongs to user
    const session = await (prisma as any).cognitiveTestSession.findFirst({
      where: { id: sessionId, userId },
    })

    if (!session) {
      return NextResponse.json({ message: "Session non trouvée" }, { status: 404 })
    }

    // Update session with stroop data
    await (prisma as any).cognitiveTestSession.update({
      where: { id: sessionId },
      data: {
        stroopData: data,
        stroopCompleted: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Cognitive Stroop] Error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la sauvegarde" },
      { status: 500 }
    )
  }
}
