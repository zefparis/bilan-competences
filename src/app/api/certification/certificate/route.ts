import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const certificateId = searchParams.get('id');

    if (!certificateId) {
      return NextResponse.json(
        { message: "Certificate ID manquant" },
        { status: 400 }
      );
    }

    const certificate = await (prisma as any).certificate.findFirst({
      where: { 
        id: certificateId, 
        userId: userId 
      },
      include: {
        session: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificat non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(certificate);

  } catch (error) {
    console.error('[Certificate] Error:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
