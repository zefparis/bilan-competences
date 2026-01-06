import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";
import { getQuestionById } from "@/lib/certification/questions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, questionId, value } = body;

    if (!sessionId || !questionId || value === undefined) {
      return NextResponse.json(
        { message: "Paramètres manquants" },
        { status: 400 }
      );
    }

    const question = getQuestionById(questionId);
    if (!question) {
      return NextResponse.json(
        { message: "Question invalide" },
        { status: 400 }
      );
    }

    const certSession = await (prisma as any).certificationSession.findFirst({
      where: { 
        id: sessionId, 
        userId: userId 
      }
    });

    if (!certSession) {
      return NextResponse.json(
        { message: "Session non trouvée" },
        { status: 404 }
      );
    }

    if (certSession.completedAt) {
      return NextResponse.json(
        { message: "Session déjà complétée" },
        { status: 400 }
      );
    }

    const answers = certSession.answers as Record<string, any> || {};
    answers[questionId] = {
      value,
      timestamp: new Date().toISOString()
    };

    await (prisma as any).certificationSession.update({
      where: { id: sessionId },
      data: { 
        answers,
        currentBloc: question.bloc
      }
    });

    return NextResponse.json({ 
      success: true,
      answersCount: Object.keys(answers).length
    });
  } catch (error) {
    console.error("[Certification Answer] Error:", error);
    return NextResponse.json(
      { message: "Erreur lors de la sauvegarde de la réponse" },
      { status: 500 }
    );
  }
}
