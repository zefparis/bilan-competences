import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: { hasPaid: true },
    });

    if (!user?.hasPaid) {
      return NextResponse.json({ message: "Accès premium requis" }, { status: 403 });
    }

    const riasecResult = await (prisma as any).riasecResult.findFirst({
      where: { 
        assessment: {
          userId: userId
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const cognitiveProfile = await (prisma as any).cognitiveProfile.findUnique({
      where: { userId: userId }
    });

    const certSession = await (prisma as any).certificationSession.create({
      data: {
        userId,
        riasecResultId: riasecResult?.id,
        cognitiveProfileId: cognitiveProfile?.id,
        currentBloc: 1,
        answers: {}
      }
    });

    return NextResponse.json({ 
      sessionId: certSession.id,
      hasRiasec: !!riasecResult,
      hasCognitive: !!cognitiveProfile
    });
  } catch (error) {
    console.error("[Certification Session] Error:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création de la session" },
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

    const certSession = await (prisma as any).certificationSession.findFirst({
      where: { userId },
      include: { 
        riasecResult: true,
        cognitiveProfile: true,
        certificate: true
      },
      orderBy: { startedAt: 'desc' }
    });

    if (!certSession) {
      return NextResponse.json({ error: "Aucune session trouvée" }, { status: 404 });
    }

    const answersCount = Object.keys(certSession.answers || {}).length;
    const isCompleted = !!certSession.completedAt;

    return NextResponse.json({
      ...certSession,
      answersCount,
      isCompleted,
      hasCertificate: !!certSession.certificate
    });

  } catch (error) {
    console.error('[Certification Session] Error:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
