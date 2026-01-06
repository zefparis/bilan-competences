import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth-user";
import { mapToROMECodes, calculateJobMatch } from "@/lib/certification/scoring";
import { fetchJobOffers } from "@/lib/france-travail/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const certificateId = searchParams.get('certificateId');
    const refresh = searchParams.get('refresh') === 'true';

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
        jobMatches: {
          orderBy: { matchScore: 'desc' }
        }
      }
    });

    if (!certificate) {
      return NextResponse.json(
        { message: "Certificat non trouvé" },
        { status: 404 }
      );
    }

    const cacheAge = certificate.jobMatches.length > 0 
      ? Date.now() - new Date(certificate.jobMatches[0].fetchedAt).getTime()
      : Infinity;
    const cacheValid = cacheAge < 30 * 60 * 1000;

    if (!refresh && cacheValid && certificate.jobMatches.length > 0) {
      return NextResponse.json({
        jobs: certificate.jobMatches.map((jm: any) => ({
          ...jm.jobData,
          matchScore: jm.matchScore,
          cachedAt: jm.fetchedAt
        })),
        cached: true
      });
    }

    const romeCodes = mapToROMECodes(certificate.session.primaryRole || '');

    let offers = [];
    try {
      offers = await fetchJobOffers({
        romeCodes,
        location: '30100',
        distance: 50,
        limit: 20
      });
    } catch (error) {
      console.error("[Jobs API] France Travail API error:", error);
      
      if (certificate.jobMatches.length > 0) {
        return NextResponse.json({
          jobs: certificate.jobMatches.map((jm: any) => ({
            ...jm.jobData,
            matchScore: jm.matchScore,
            cachedAt: jm.fetchedAt
          })),
          cached: true,
          warning: "Impossible de récupérer de nouvelles offres, affichage du cache"
        });
      }
      
      return NextResponse.json(
        { message: "Erreur lors de la récupération des offres d'emploi" },
        { status: 503 }
      );
    }

    const enrichedOffers = offers.map((offer: any) => ({
      ...offer,
      matchScore: calculateJobMatch(offer, certificate.session)
    }));

    enrichedOffers.sort((a: any, b: any) => b.matchScore - a.matchScore);

    await Promise.all(
      enrichedOffers.map((offer: any) =>
        (prisma as any).jobMatch.upsert({
          where: {
            certificateId_externalJobId: {
              certificateId: certificate.id,
              externalJobId: offer.id
            }
          },
          create: {
            certificateId: certificate.id,
            externalJobId: offer.id,
            matchScore: offer.matchScore,
            jobData: offer
          },
          update: {
            matchScore: offer.matchScore,
            jobData: offer,
            fetchedAt: new Date()
          }
        })
      )
    );

    return NextResponse.json({
      jobs: enrichedOffers,
      cached: false,
      count: enrichedOffers.length
    });

  } catch (error) {
    console.error('[Certification Jobs] Error:', error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
