import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"

export const dynamic = "force-dynamic"

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const { sessionId } = params

    const session = await (prisma as any).cognitiveTestSession.findFirst({
      where: { 
        id: sessionId,
        userId,
      },
      include: {
        signature: true,
      },
    })

    if (!session) {
      return NextResponse.json({ message: "Session non trouvée" }, { status: 404 })
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
