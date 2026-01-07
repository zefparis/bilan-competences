import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Calcule un score IA basé sur :
 * - Complétude des données (40%)
 * - Qualité des réponses (30%)
 * - Cohérence entre modules (20%)
 * - Engagement dans le processus (10%)
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ score: 0, details: {} }, { status: 200 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ score: 0, details: {} }, { status: 200 })
    }

    // Récupérer toutes les données de l'utilisateur
    const [
      assessment,
      lifeEvents,
      experiences,
      riasecResult,
      cognitiveProfile,
      cognitiveSession,
      certificationSession
    ] = await Promise.all([
      prisma.assessment.findFirst({
        where: { userId: user.id }
      }),
      prisma.lifeEvent.count({
        where: { lifePath: { assessment: { userId: user.id } } }
      }),
      prisma.experience.count({
        where: { assessment: { userId: user.id } }
      }),
      prisma.riasecResult.findFirst({
        where: { assessment: { userId: user.id } }
      }),
      prisma.cognitiveProfile.findUnique({
        where: { userId: user.id }
      }),
      prisma.cognitiveTestSession.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.certificationSession.findFirst({
        where: { userId: user.id },
        orderBy: { startedAt: 'desc' }
      })
    ])

    // 1. Score de complétude (40 points)
    let completenessScore = 0
    const completenessDetails: any = {}

    // Parcours (8 points) - minimum 5 événements pour être significatif
    if (lifeEvents >= 5) {
      completenessDetails.parcours = Math.min(8, (lifeEvents / 10) * 8)
      completenessScore += completenessDetails.parcours
    }

    // Expériences (8 points) - minimum 3 expériences
    if (experiences >= 3) {
      completenessDetails.experiences = Math.min(8, (experiences / 5) * 8)
      completenessScore += completenessDetails.experiences
    }

    // Valeurs (6 points) - considéré complet si module valeurs terminé
    // Note: Les valeurs ne sont pas stockées individuellement dans la DB
    completenessDetails.values = 6
    completenessScore += 6

    // RIASEC (8 points)
    if (riasecResult) {
      completenessDetails.riasec = 8
      completenessScore += 8
    }

    // Profil Cognitif (6 points)
    if (cognitiveProfile) {
      completenessDetails.cognitive = 6
      completenessScore += 6
    }

    // Évaluation Cognitive (4 points)
    const allTestsCompleted = cognitiveSession?.stroopCompleted && 
                              cognitiveSession?.reactionTimeCompleted && 
                              cognitiveSession?.trailMakingCompleted && 
                              cognitiveSession?.ranVisualCompleted
    const hasSignature = !!cognitiveSession?.completedAt
    
    if (allTestsCompleted && hasSignature) {
      completenessDetails.cognitiveAssessment = 4
      completenessScore += 4
    }

    // 2. Score de qualité (30 points)
    let qualityScore = 0
    const qualityDetails: any = {}

    // Qualité des expériences (15 points) - basé sur la richesse des données
    if (experiences > 0) {
      const experiencesList = await prisma.experience.findMany({
        where: { assessment: { userId: user.id } },
        select: { 
          situation: true, 
          task: true, 
          action: true, 
          result: true 
        }
      })

      // Calculer la longueur moyenne des champs STAR
      const avgLength = experiencesList.reduce((sum, exp) => {
        return sum + 
          (exp.situation?.length || 0) + 
          (exp.task?.length || 0) + 
          (exp.action?.length || 0) + 
          (exp.result?.length || 0)
      }, 0) / (experiencesList.length * 4)

      // 50 chars minimum par champ = bon, 100+ = excellent
      qualityDetails.experiencesQuality = Math.min(15, (avgLength / 100) * 15)
      qualityScore += qualityDetails.experiencesQuality
    }

    // Diversité des événements de vie (10 points)
    if (lifeEvents > 0) {
      const eventTypes = await prisma.lifeEvent.groupBy({
        by: ['type'],
        where: { lifePath: { assessment: { userId: user.id } } }
      })
      
      // Plus de types différents = meilleure diversité (max 3 types)
      qualityDetails.eventDiversity = Math.min(10, (eventTypes.length / 3) * 10)
      qualityScore += qualityDetails.eventDiversity
    }

    // Cohérence RIASEC (5 points) - écart entre scores
    if (riasecResult) {
      const scores = [
        riasecResult.scoreR,
        riasecResult.scoreI,
        riasecResult.scoreA,
        riasecResult.scoreS,
        riasecResult.scoreE,
        riasecResult.scoreC
      ]
      const max = Math.max(...scores)
      const min = Math.min(...scores)
      const range = max - min
      
      // Un profil différencié (range > 10) est plus informatif
      qualityDetails.riasecCoherence = Math.min(5, (range / 20) * 5)
      qualityScore += qualityDetails.riasecCoherence
    }

    // 3. Score de cohérence (20 points)
    let coherenceScore = 0
    const coherenceDetails: any = {}

    // Cohérence entre RIASEC et expériences (10 points)
    if (riasecResult && experiences > 0) {
      // Si l'utilisateur a complété les deux modules, on considère qu'il y a cohérence
      coherenceDetails.riasecExperiences = 10
      coherenceScore += 10
    }

    // Cohérence entre profil cognitif et évaluation (10 points)
    if (cognitiveProfile && allTestsCompleted) {
      coherenceDetails.cognitiveCoherence = 10
      coherenceScore += 10
    }

    // 4. Score d'engagement (10 points)
    let engagementScore = 0
    const engagementDetails: any = {}

    // Certification complétée (5 points)
    // Vérifier si la session est complétée (certificat généré séparément)
    if (certificationSession?.completedAt) {
      engagementDetails.certification = 5
      engagementScore += 5
    }

    // Temps passé sur la plateforme (5 points) - basé sur la date de création
    if (assessment) {
      const daysSinceStart = Math.floor(
        (Date.now() - assessment.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      )
      // 1 point par jour jusqu'à 5 jours
      engagementDetails.timeSpent = Math.min(5, daysSinceStart)
      engagementScore += engagementDetails.timeSpent
    }

    // Calcul du score final
    const totalScore = Math.round(
      completenessScore + qualityScore + coherenceScore + engagementScore
    )

    return NextResponse.json({
      score: totalScore,
      maxScore: 100,
      percentage: totalScore,
      breakdown: {
        completeness: {
          score: Math.round(completenessScore),
          max: 40,
          details: completenessDetails
        },
        quality: {
          score: Math.round(qualityScore),
          max: 30,
          details: qualityDetails
        },
        coherence: {
          score: Math.round(coherenceScore),
          max: 20,
          details: coherenceDetails
        },
        engagement: {
          score: Math.round(engagementScore),
          max: 10,
          details: engagementDetails
        }
      },
      dataPoints: {
        lifeEvents,
        experiences,
        hasRiasec: !!riasecResult,
        hasCognitiveProfile: !!cognitiveProfile,
        hasCognitiveAssessment: !!(allTestsCompleted && hasSignature),
        hasCertification: !!(certificationSession?.completedAt)
      }
    })

  } catch (e) {
    console.error("[AI Score] Error:", e)
    return NextResponse.json(
      { 
        score: 0,
        error: e instanceof Error ? e.message : "Erreur de calcul"
      },
      { status: 500 }
    )
  }
}
