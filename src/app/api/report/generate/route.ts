import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/auth-config';
import { prisma } from '@/lib/prisma';
import { assembleCompleteReport } from '@/lib/report-generator';
import { fetchCompleteUserData } from '@/lib/report-data-mapper';

export async function GET() {
  try {
    console.log('📥 [API GET] Starting report retrieval...');

    const session = await getServerSession(authConfig);
    console.log('📥 [API GET] Session retrieved:', !!session?.user?.id);

    if (!session?.user?.id) {
      console.log('❌ [API GET] No authenticated user');
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    console.log('📥 [API GET] Récupération rapport pour:', session.user.id);

    // Check if prisma client has report model
    console.log('📥 [API GET] Checking prisma client...');
    console.log('📥 [API GET] Prisma client methods:', Object.keys((prisma as any) || {}));

    // Chercher un rapport existant
    console.log('📥 [API GET] Querying database...');
    const report = await (prisma as any).report.findUnique({
      where: { userId: session.user.id }
    });

    console.log('📥 [API GET] Database query result:', !!report);

    if (!report) {
      console.log('❌ [API GET] Aucun rapport trouvé');
      return NextResponse.json({ error: "Aucun rapport trouvé" }, { status: 404 });
    }

    console.log('✅ [API GET] Rapport trouvé, généré le:', report.generatedAt);

    // Retourner le rapport stocké
    return NextResponse.json({
      sections: report.sections,
      generatedAt: report.generatedAt.toISOString(),
      version: report.version,
      alreadyGenerated: true // ← Flag important
    });

  } catch (error) {
    console.error('❌ [API GET] Erreur détaillée:', error);
    console.error('❌ [API GET] Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('❌ [API GET] Error name:', error instanceof Error ? error.name : 'Unknown error type');

    return NextResponse.json({
      error: "Erreur serveur",
      details: error instanceof Error ? error.message : "Erreur inconnue",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    console.log('🚀 [API POST] Demande génération pour:', session.user.id);

    // ✅ VÉRIFIER si un rapport existe déjà et gérer la régénération
    const existingReport = await (prisma as any).report.findUnique({
      where: { userId: session.user.id }
    });

    if (existingReport) {
      // LOGS DE DEBUG DÉTAILLÉS
      console.log('🔍 [DEBUG] existingReport.generationCount (brut):', existingReport.generationCount);
      console.log('🔍 [DEBUG] existingReport.hasExtraGenerationPaid:', existingReport.hasExtraGenerationPaid);
      
      // Si generationCount n'existe pas (ancien rapport avant migration), le traiter comme génération #0
      const currentCount = existingReport.generationCount ?? 0;
      console.log(`📊 [API POST] Rapport existant - Génération actuelle: ${currentCount}`);
      
      // Si c'est un ancien rapport sans generationCount, on le considère comme génération #0
      // Donc la régénération sera la #1 (gratuite)
      const nextCount = currentCount + 1;
      console.log(`📊 [API POST] Prochaine génération sera: #${nextCount}`);
      
      // Vérifier si l'utilisateur peut régénérer
      // Bloquer seulement si on a déjà fait 2 générations ET pas payé pour extra
      console.log(`🔍 [DEBUG] Test: currentCount (${currentCount}) >= 2 ? ${currentCount >= 2}`);
      console.log(`🔍 [DEBUG] Test: !hasExtraGenerationPaid ? ${!existingReport.hasExtraGenerationPaid}`);
      
      if (currentCount >= 2 && !existingReport.hasExtraGenerationPaid) {
        console.warn('⚠️ [API POST] Limite de 2 générations gratuites atteinte');
        return NextResponse.json(
          {
            error: "Limite atteinte",
            message: "Vous avez déjà généré votre rapport 2 fois. Pour une 3ème génération, un paiement supplémentaire de 9€ est requis.",
            generationCount: currentCount,
            requiresPayment: true,
            generatedAt: existingReport.generatedAt.toISOString()
          },
          { status: 402 } // 402 Payment Required
        );
      }

      // Autoriser la régénération
      console.log(`✅ [API POST] Régénération autorisée - Prochaine génération: #${nextCount}/2`);
      
      // Supprimer l'ancien rapport pour le remplacer
      await (prisma as any).report.delete({
        where: { userId: session.user.id }
      });
    }

    // 1. Récupérer les données
    const userData = await fetchCompleteUserData(session.user.id);

    if (!userData) {
      return NextResponse.json(
        { error: "Données utilisateur incomplètes" },
        { status: 400 }
      );
    }

    console.log('📝 [API POST] Génération en cours (OpenAI)...');

    // 2. Générer le rapport (appel OpenAI)
    const completeSections = await assembleCompleteReport(userData);

    console.log('✅ [API POST] Sections générées:', Object.keys(completeSections).length);

    // 3. Transformer pour l'UI
    const sectionsArray = [
      // Partie I - Synthèse Générale (7 sections)
      { id: "cadre", title: "Cadre stratégique", content: completeSections.cadre, part: 1 },
      { id: "synthese", title: "Synthèse générale", content: completeSections.synthese, part: 1 },
      { id: "valeurs_professionnelles", title: "Valeurs professionnelles", content: completeSections.valeurs_professionnelles, part: 1 },
      { id: "parcours_professionnel", title: "Parcours professionnel", content: completeSections.parcours_professionnel, part: 1 },
      { id: "croisement_riasec", title: "Croisement Cognition × RIASEC", content: completeSections.croisement_riasec, part: 1 },
      { id: "scenarios", title: "Scénarios professionnels", content: completeSections.scenarios, part: 1 },
      { id: "environnements_compatibles", title: "Environnements compatibles", content: completeSections.environnements_compatibles, part: 1 },

      // Partie II - Analyse Cognitive (4 sections)
      { id: "signature_centrale", title: "Signature cognitive centrale", content: completeSections.signature_centrale, part: 2 },
      { id: "lecture_fonctionnelle", title: "Lecture fonctionnelle", content: completeSections.lecture_fonctionnelle, part: 2 },
      { id: "tensions_cognitives", title: "Carte des tensions cognitives", content: completeSections.tensions_cognitives, part: 2 },
      { id: "zones_vigilance", title: "Zones de vigilance cognitive", content: completeSections.zones_vigilance, part: 2 },

      // Partie III - Transformation (1 section)
      { id: "projection_ia", title: "Projection IA & transformation du travail", content: completeSections.projection_ia, part: 3 },

      // Partie IV - Conclusion (1 section)
      { id: "conclusion", title: "Conclusion stratégique", content: completeSections.conclusion, part: 4 },
    ];

    // 4. ✅ SAUVEGARDER en base de données avec compteur de génération
    const newGenerationCount = existingReport ? (existingReport.generationCount || 1) + 1 : 1;
    const savedReport = await (prisma as any).report.create({
      data: {
        userId: session.user.id,
        sections: sectionsArray as any,
        completeSections: completeSections as any,
        version: "2.0",
        tokensCost: 0,
        generationCount: newGenerationCount,
        hasExtraGenerationPaid: existingReport?.hasExtraGenerationPaid || false
      }
    });

    console.log(`📊 [API POST] Rapport sauvegardé - Génération #${newGenerationCount}/${newGenerationCount >= 2 ? '2 (limite gratuite)' : '2'}`);

    return NextResponse.json({
      sections: sectionsArray,
      userName: userData.user.name,
      generatedAt: new Date().toISOString(),
      version: "2.0",
      reportId: savedReport.id,
      generationCount: newGenerationCount,
      remainingFreeGenerations: Math.max(0, 2 - newGenerationCount),
      alreadyGenerated: false
    });

  } catch (error) {
    console.error('❌ [API POST] Erreur génération:', error);

    return NextResponse.json(
      {
        error: "Erreur génération rapport",
        message: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}

// ===============================
// Helper : Estimer le coût en tokens
// ===============================
function estimateTokensCost(sections: any): number {
  const totalChars = Object.values(sections)
    .filter(v => typeof v === 'string')
    .reduce((sum, text: any) => sum + text.length, 0);

  // Estimation : ~4 chars = 1 token
  return Math.ceil(totalChars / 4);
}
