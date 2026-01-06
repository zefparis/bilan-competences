import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";
import crypto from "crypto";

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
        userId: userId,
        completedAt: { not: null }
      },
      include: {
        certificate: true
      }
    });

    if (!certSession) {
      return NextResponse.json(
        { message: "Session non trouvée ou non complétée" },
        { status: 404 }
      );
    }

    if (certSession.certificate) {
      return NextResponse.json({
        certificateId: certSession.certificate.id,
        blockchainHash: certSession.certificate.blockchainHash,
        verificationUrl: certSession.certificate.verificationUrl,
        alreadyExists: true
      });
    }

    const certificateData = {
      userId,
      sessionId,
      primaryRole: certSession.primaryRole,
      scores: {
        dev: certSession.devScore,
        data: certSession.dataScore,
        cyber: certSession.cyberScore,
        infra: certSession.infraScore,
        coherence: certSession.coherenceScore
      },
      level: certSession.level,
      issuedAt: new Date().toISOString()
    };

    const blockchainHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(certificateData))
      .digest('hex');

    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 3);

    const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://perspecta.ia-solution.fr'}/verify/${blockchainHash}`;

    const certificate = await (prisma as any).certificate.create({
      data: {
        userId,
        sessionId,
        issuedAt: new Date(),
        validUntil,
        blockchainHash,
        verificationUrl
      }
    });

    return NextResponse.json({
      certificateId: certificate.id,
      blockchainHash: certificate.blockchainHash,
      verificationUrl: certificate.verificationUrl,
      validUntil: certificate.validUntil
    });
  } catch (error) {
    console.error("[Certificate Generate] Error:", error);
    return NextResponse.json(
      { message: "Erreur lors de la génération du certificat" },
      { status: 500 }
    );
  }
}
