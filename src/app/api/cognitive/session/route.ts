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

    // Check if user has paid
    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: { hasPaid: true },
    })

    if (!user?.hasPaid) {
      return NextResponse.json({ message: "Accès non autorisé" }, { status: 403 })
    }

    // Create new session
    const session = await (prisma as any).cognitiveTestSession.create({
      data: {
        userId,
        status: "IN_PROGRESS",
      },
    })

    return NextResponse.json({ id: session.id })
  } catch (error) {
    console.error("[Cognitive Session] Error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la création de la session" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    // Get latest completed session
    const session = await (prisma as any).cognitiveTestSession.findFirst({
      where: { 
        userId,
        status: "COMPLETED",
      },
      orderBy: { completedAt: "desc" },
      include: {
        signature: true,
      },
    })

    if (!session) {
      return NextResponse.json({ message: "Aucune session trouvée" }, { status: 404 })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error("[Cognitive Session] GET Error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la récupération de la session" },
      { status: 500 }
    )
  }
}
