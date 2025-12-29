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

    // Récupérer la session cognitive avec signature (même si non complétée)
    const cognitiveSession = await (prisma as any).cognitiveTestSession.findFirst({
      where: {
        userId,
        // Ne pas filtrer sur status='COMPLETED' ici, vérifier après
      },
      include: { signature: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log(' [API cognitive/session] Session trouvée:', {
      found: !!cognitiveSession,
      status: cognitiveSession?.status,
      hasSignature: !!cognitiveSession?.signature,
      tests: {
        stroop: cognitiveSession?.stroopCompleted,
        reaction: cognitiveSession?.reactionTimeCompleted,
        trail: cognitiveSession?.trailMakingCompleted,
        ran: cognitiveSession?.ranVisualCompleted
      }
    });

    if (!cognitiveSession) {
      return NextResponse.json({ error: "Aucune session trouvée" }, { status: 404 });
    }

    // Calculer le statut de complétion
    const testsCompleted = [
      cognitiveSession.stroopCompleted,
      cognitiveSession.reactionTimeCompleted,
      cognitiveSession.trailMakingCompleted,
      cognitiveSession.ranVisualCompleted
    ].filter(Boolean).length;

    const allTestsCompleted = testsCompleted === 4;
    const hasSignature = !!cognitiveSession.signature;

    // Retourner les données enrichies
    return NextResponse.json({
      ...cognitiveSession,
      testsCompleted,
      allTestsCompleted,
      hasSignature,
      isFullyCompleted: allTestsCompleted && hasSignature
    });

  } catch (error) {
    console.error('[API cognitive/session] Erreur:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
