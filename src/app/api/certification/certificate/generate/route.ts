import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";
import { 
  generateCertificateHash, 
  getCertificateVerificationUrl 
} from "@/lib/blockchain/certificate-hash";

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

    const issuedAt = new Date();
    const certificateData = {
      userId,
      sessionId,
      scores: {
        dev: certSession.devScore || 0,
        data: certSession.dataScore || 0,
        cyber: certSession.cyberScore || 0,
        infra: certSession.infraScore || 0,
        coherence: certSession.coherenceScore || 0
      },
      primaryRole: certSession.primaryRole || 'Non déterminé',
      level: certSession.level || 'junior',
      issuedAt
    };

    const hash = generateCertificateHash(certificateData);
    const verificationUrl = getCertificateVerificationUrl(hash);

    const validUntil = new Date(issuedAt.getTime() + 3 * 365 * 24 * 60 * 60 * 1000);

    const certificate = await (prisma as any).certificate.create({
      data: {
        userId,
        sessionId,
        issuedAt,
        validUntil,
        blockchainHash: hash,
        verificationUrl
      }
    });

    return NextResponse.json({
      certificateId: certificate.id,
      blockchainHash: hash,
      verificationUrl,
      issuedAt: certificate.issuedAt,
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
