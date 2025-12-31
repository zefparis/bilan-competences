/**
 * PERSPECTA PDF - API Route
 * Endpoint pour générer le PDF du bilan cognitif
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/auth-config';
import { prisma } from '@/lib/prisma';
import { generatePDFBuffer, prepareProfileData, ProfileData } from '@/lib/pdf';
import { RiasecCode } from '@/lib/pdf/styles/tokens';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * POST /api/pdf/generate
 * Génère le PDF du bilan cognitif pour l'utilisateur connecté
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Récupérer les données de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        hasPaid: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les données cognitives
    const cognitiveSession = await prisma.cognitiveTestSession.findFirst({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      include: {
        signature: true,
      },
    });

    // Récupérer l'assessment actif pour RIASEC et valeurs
    const assessment = await prisma.assessment.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        riasecResult: true,
        values: {
          orderBy: { order: 'asc' },
          take: 5,
        },
        experiences: {
          orderBy: { startDate: 'asc' },
        },
      },
    });

    // Parser le topCode RIASEC en array de codes dominants
    const parseDominantCodes = (topCode: string | null | undefined): RiasecCode[] => {
      if (!topCode) return ['R', 'I', 'E'];
      const codes = topCode.split('').filter(c => ['R', 'I', 'A', 'S', 'E', 'C'].includes(c));
      return (codes.length >= 3 ? codes.slice(0, 3) : ['R', 'I', 'E']) as RiasecCode[];
    };

    // Construire les données du profil
    const profileData: Partial<ProfileData> = {
      meta: {
        id: `PERSPECTA-${userId.slice(0, 8).toUpperCase()}`,
        date: new Date().toISOString().split('T')[0],
        userName: user.name || 'Utilisateur',
        userEmail: user.email || undefined,
      },
      cognitive: cognitiveSession?.signature ? {
        flexibility: cognitiveSession.signature.cognitiveFlexibility ?? 50,
        inhibitoryControl: cognitiveSession.signature.inhibitoryControl ?? 50,
        processingSpeed: cognitiveSession.signature.processingSpeed ?? 50,
        attentionDrift: cognitiveSession.signature.attentionDrift ?? undefined,
        fluency: cognitiveSession.signature.accessFluency ?? undefined,
      } : {
        flexibility: 50,
        inhibitoryControl: 50,
        processingSpeed: 50,
      },
      riasec: assessment?.riasecResult ? {
        R: assessment.riasecResult.scoreR ?? 50,
        I: assessment.riasecResult.scoreI ?? 50,
        A: assessment.riasecResult.scoreA ?? 50,
        S: assessment.riasecResult.scoreS ?? 50,
        E: assessment.riasecResult.scoreE ?? 50,
        C: assessment.riasecResult.scoreC ?? 50,
        dominant: parseDominantCodes(assessment.riasecResult.topCode),
      } : {
        R: 50, I: 50, A: 50, S: 50, E: 50, C: 50,
        dominant: ['R', 'I', 'E'] as RiasecCode[],
      },
      values: assessment?.values && assessment.values.length > 0 
        ? assessment.values.map(v => ({
            name: v.valueName,
            satisfaction: v.gapScore ?? 3,
            importance: Math.max(1, 6 - v.order), // order 1 = importance 5
          })) 
        : [
            { name: 'Créativité', satisfaction: 3, importance: 4 },
            { name: 'Autonomie', satisfaction: 3, importance: 4 },
            { name: 'Sécurité', satisfaction: 3, importance: 3 },
            { name: 'Reconnaissance', satisfaction: 3, importance: 3 },
            { name: 'Équilibre', satisfaction: 3, importance: 4 },
          ],
      career: assessment?.experiences 
        ? assessment.experiences.map(exp => ({
            year: exp.startDate.getFullYear(),
            role: exp.title || 'Poste',
            company: exp.company || 'Entreprise',
            description: exp.situation || undefined,
          }))
        : [],
    };

    // Générer le PDF
    console.log('[PDF Generate] Starting PDF generation for user:', userId);
    const startTime = Date.now();
    
    const pdfBuffer = await generatePDFBuffer(profileData, { debug: true });
    
    const duration = Date.now() - startTime;
    console.log(`[PDF Generate] PDF generated in ${duration}ms, size: ${pdfBuffer.length} bytes`);

    // Retourner le PDF
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="PERSPECTA-Bilan-${user.name || 'Cognitif'}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[PDF Generate] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/pdf/generate
 * Vérifie si l'utilisateur peut générer un PDF
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.id) {
      return NextResponse.json(
        { canGenerate: false, reason: 'Non authentifié' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Vérifier les données disponibles
    const [cognitiveSession, assessment] = await Promise.all([
      prisma.cognitiveTestSession.findFirst({
        where: { userId, completedAt: { not: null } },
      }),
      prisma.assessment.findFirst({
        where: { userId },
        include: {
          riasecResult: true,
          values: { take: 1 },
        },
      }),
    ]);

    const hasData = {
      cognitive: !!cognitiveSession,
      riasec: !!assessment?.riasecResult,
      values: (assessment?.values?.length ?? 0) > 0,
    };

    const canGenerate = hasData.cognitive || hasData.riasec;

    return NextResponse.json({
      canGenerate,
      hasData,
      message: canGenerate 
        ? 'Prêt pour la génération du PDF'
        : 'Complétez au moins un test cognitif ou RIASEC pour générer votre bilan',
    });
  } catch (error) {
    console.error('[PDF Generate] Check error:', error);
    return NextResponse.json(
      { canGenerate: false, error: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}
