import { CompleteReportInput, RIASECProfile, ValuesProfile, ExperienceProfile, LifePathProfile } from '@/types/report';
import { prisma } from '@/lib/prisma';

/**
 * Récupère TOUTES les données utilisateur depuis la DB
 * et les formate pour la génération de rapport
 */
export async function fetchCompleteUserData(userId: string): Promise<CompleteReportInput | null> {
  try {
    console.log('🔍 [DEBUG] Début fetchCompleteUserData pour userId:', userId);

    // 1. Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, hasPaid: true }
    });

    console.log('👤 [DEBUG] User trouvé:', {
      found: !!user,
      hasPaid: user?.hasPaid,
      email: user?.email
    });

    if (!user || !user.hasPaid) {
      const error = !user ? "Utilisateur non trouvé" : "Utilisateur n'a pas payé";
      console.error('❌ [DEBUG]', error);
      throw new Error(error);
    }

    // 2. Récupérer la session cognitive
    const cognitiveSession = await prisma.cognitiveTestSession.findFirst({
      where: { userId, status: 'COMPLETED' },
      include: { signature: true },
      orderBy: { completedAt: 'desc' }
    });

    console.log('🧠 [DEBUG] CognitiveSession:', {
      found: !!cognitiveSession,
      hasSignature: !!cognitiveSession?.signature,
      status: cognitiveSession?.status
    });

    if (!cognitiveSession?.signature) {
      console.error('❌ [DEBUG] Signature cognitive manquante');
      throw new Error("Signature cognitive manquante - complétez l'évaluation cognitive");
    }

    // 3. Récupérer l'assessment
    const assessment = await (prisma as any).assessment.findFirst({
      where: { userId },
      include: {
        riasecResult: true,
        values: { orderBy: { order: 'asc' } },
        experiences: { orderBy: { startDate: 'desc' } },
        lifePath: { include: { events: { orderBy: { year: 'asc' } } } }
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log('📋 [DEBUG] Assessment:', {
      found: !!assessment,
      hasRiasec: !!assessment?.riasecResult,
      valuesCount: assessment?.values?.length || 0,
      experiencesCount: assessment?.experiences?.length || 0,
      hasLifePath: !!assessment?.lifePath
    });

    if (!assessment?.riasecResult) {
      console.error('❌ [DEBUG] Profil RIASEC manquant');
      throw new Error("Profil RIASEC manquant - complétez le test RIASEC");
    }

    // 4. Transformer les données
    const input: CompleteReportInput = {
      user: {
        id: user.id,
        name: user.name || undefined,
        email: user.email!
      },
      cognitive: {
        inhibitoryControl: cognitiveSession.signature.inhibitoryControl,
        processingSpeed: cognitiveSession.signature.processingSpeed,
        cognitiveFlexibility: cognitiveSession.signature.cognitiveFlexibility,
        accessFluency: cognitiveSession.signature.accessFluency,
        attentionDrift: cognitiveSession.signature.attentionDrift,
        reactionVariance: cognitiveSession.signature.reactionVariance,
        conflictErrors: cognitiveSession.signature.conflictErrors,
        sequencingErrors: cognitiveSession.signature.sequencingErrors,
      },
      riasec: normalizeRIASEC(assessment.riasecResult),
      values: assessment.values.length > 0
        ? { values: assessment.values.map((v: any) => ({
            name: v.valueName,
            order: v.order,
            gapScore: v.gapScore || 3
          }))}
        : undefined,
      experiences: assessment.experiences.length > 0
        ? { experiences: assessment.experiences.map((e: any) => ({
            title: e.title,
            company: e.company,
            startDate: e.startDate,
            endDate: e.endDate || undefined,
            situation: e.situation || '',
            task: e.task || '',
            action: e.action || '',
            result: e.result || '',
            skills: e.skills.split(',').map((s: string) => s.trim())
          }))}
        : undefined,
      lifePath: assessment.lifePath
        ? { events: assessment.lifePath.events.map((e: any) => ({
            title: e.title,
            year: e.year,
            type: e.type as "PRO" | "PERSO" | "FORMATION",
            sentiment: e.sentiment,
            description: e.description || undefined
          }))}
        : undefined
    };

    console.log('✅ [DEBUG] Input complet créé:', {
      user: '✓',
      cognitive: '✓',
      riasec: '✓',
      values: input.values ? `✓ (${input.values.values.length})` : '✗',
      experiences: input.experiences ? `✓ (${input.experiences.experiences.length})` : '✗',
      lifePath: input.lifePath ? `✓ (${input.lifePath.events.length} events)` : '✗'
    });

    return input;

  } catch (error) {
    console.error('❌ [DEBUG] Erreur dans fetchCompleteUserData:', error);
    console.error('❌ [DEBUG] Message:', error instanceof Error ? error.message : 'Erreur inconnue');
    return null;
  }
}

/**
 * Normalise les scores RIASEC de la DB (0-100) vers (0-10)
 */
function normalizeRIASEC(riasec: any): RIASECProfile {
  return {
    realistic: riasec.scoreR / 10,
    investigative: riasec.scoreI / 10,
    artistic: riasec.scoreA / 10,
    social: riasec.scoreS / 10,
    enterprising: riasec.scoreE / 10,
    conventional: riasec.scoreC / 10,
  };
}
