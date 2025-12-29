import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/auth-config';
import { assembleCompleteReport } from '@/lib/report-generator';
import { fetchCompleteUserData } from '@/lib/report-data-mapper';

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // TODO: Récupérer rapport existant depuis DB
    return NextResponse.json({ error: "Aucun rapport trouvé" }, { status: 404 });
    
  } catch (error) {
    console.error("❌ Erreur GET /api/report/generate:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authConfig);
    
    if (!session?.user?.id) {
      console.error('❌ [API] Non authentifié');
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    console.log('🚀 [API] Génération rapport pour:', session.user.id);

    // 1. Récupérer les données
    const userData = await fetchCompleteUserData(session.user.id);
    
    if (!userData) {
      console.error('❌ [API] userData est null');
      
      // Retourner un message d'erreur plus explicite
      return NextResponse.json(
        { 
          error: "Données utilisateur incomplètes",
          details: "Impossible de récupérer les données. Vérifiez que vous avez complété :\n- L'évaluation cognitive (4 tests)\n- Le test RIASEC\nConsultez la console serveur pour plus de détails."
        },
        { status: 400 }
      );
    }

    console.log('✅ [API] Données récupérées, début génération...');

    // 2. Générer le rapport
    const completeSections = await assembleCompleteReport(userData);
    
    console.log('✅ [API] Sections générées:', Object.keys(completeSections).length);
    
    // 3. Transformer pour l'UI
    const transformedReport = {
      sections: completeSections,
      userName: userData.user.name,
      generatedAt: new Date().toISOString()
    };

    console.log('✅ [API] Rapport transformé, envoi au client');

    // Transformer en format attendu par le frontend
    const sectionsArray = [
      // Partie I - Synthèse Générale (7 sections)
      { id: "cadre", title: "Cadre stratégique", content: transformedReport.sections.cadre, part: 1 },
      { id: "synthese", title: "Synthèse générale", content: transformedReport.sections.synthese, part: 1 },
      { id: "valeurs_professionnelles", title: "Valeurs professionnelles", content: transformedReport.sections.valeurs_professionnelles, part: 1 },
      { id: "parcours_professionnel", title: "Parcours professionnel", content: transformedReport.sections.parcours_professionnel, part: 1 },
      { id: "croisement_riasec", title: "Croisement Cognition × RIASEC", content: transformedReport.sections.croisement_riasec, part: 1 },
      { id: "scenarios", title: "Scénarios professionnels", content: transformedReport.sections.scenarios, part: 1 },
      { id: "environnements_compatibles", title: "Environnements compatibles", content: transformedReport.sections.environnements_compatibles, part: 1 },

      // Partie II - Analyse Cognitive (4 sections)
      { id: "signature_centrale", title: "Signature cognitive centrale", content: transformedReport.sections.signature_centrale, part: 2 },
      { id: "lecture_fonctionnelle", title: "Lecture fonctionnelle", content: transformedReport.sections.lecture_fonctionnelle, part: 2 },
      { id: "tensions_cognitives", title: "Carte des tensions cognitives", content: transformedReport.sections.tensions_cognitives, part: 2 },
      { id: "zones_vigilance", title: "Zones de vigilance cognitive", content: transformedReport.sections.zones_vigilance, part: 2 },

      // Partie III - Transformation (1 section)
      { id: "projection_ia", title: "Projection IA & transformation du travail", content: transformedReport.sections.projection_ia, part: 3 },

      // Partie IV - Conclusion (1 section)
      { id: "conclusion", title: "Conclusion stratégique", content: transformedReport.sections.conclusion, part: 4 },
    ];

    return NextResponse.json({
      sections: sectionsArray,
      userName: transformedReport.userName,
      generatedAt: transformedReport.generatedAt,
      version: "1.0.0"
    });
    
  } catch (error) {
    console.error('❌ [API] Erreur génération rapport:', error);
    
    return NextResponse.json(
      { 
        error: "Erreur génération rapport",
        message: error instanceof Error ? error.message : "Erreur inconnue",
        details: "Consultez la console serveur pour les logs détaillés"
      },
      { status: 500 }
    );
  }
}
