import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";
import { calculateScores } from "@/lib/certification/scoring";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID manquant" },
        { status: 400 }
      );
    }

    const certSession = await (prisma as any).certificationSession.findFirst({
      where: { 
        id: sessionId, 
        userId: userId 
      },
      include: {
        riasecResult: true,
        cognitiveProfile: true
      }
    });

    if (!certSession) {
      return NextResponse.json(
        { message: "Session non trouvée" },
        { status: 404 }
      );
    }

    const answers = certSession.answers as Record<string, any> || {};
    const answersCount = Object.keys(answers).length;

    if (answersCount < 30) {
      return NextResponse.json(
        { message: "Nombre de réponses insuffisant pour calculer les résultats" },
        { status: 400 }
      );
    }

    const result = calculateScores(
      answers,
      certSession.riasecResult,
      certSession.cognitiveProfile
    );

    await (prisma as any).certificationSession.update({
      where: { id: sessionId },
      data: {
        completedAt: new Date(),
        devScore: result.scores.dev,
        dataScore: result.scores.data,
        cyberScore: result.scores.cyber,
        infraScore: result.scores.infra,
        coherenceScore: result.scores.coherence,
        primaryRole: result.primaryRole,
        secondaryRoles: result.secondaryRoles,
        level: result.level
      }
    });

    return NextResponse.json({
      ...result,
      sessionId
    });
  } catch (error) {
    console.error("[Certification Results] Error:", error);
    return NextResponse.json(
      { message: "Erreur lors du calcul des résultats" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID manquant" },
        { status: 400 }
      );
    }

    const certSession = await (prisma as any).certificationSession.findFirst({
      where: { 
        id: sessionId, 
        userId: userId,
        completedAt: { not: null }
      }
    });

    if (!certSession) {
      return NextResponse.json(
        { message: "Résultats non disponibles" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      scores: {
        dev: certSession.devScore,
        data: certSession.dataScore,
        cyber: certSession.cyberScore,
        infra: certSession.infraScore,
        coherence: certSession.coherenceScore
      },
      primaryRole: certSession.primaryRole,
      secondaryRoles: certSession.secondaryRoles,
      level: certSession.level,
      sessionId: certSession.id
    });

  } catch (error) {
    console.error('[Certification Results] Error:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
