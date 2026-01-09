import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"

export const dynamic = "force-dynamic"

interface StroopMetrics {
  meanCongruentTime: number
  meanIncongruentTime: number
  interferenceEffect: number
  errorRateCongruent: number
  errorRateIncongruent: number
  reactionVariance: number
  totalErrors: number
}

interface ReactionMetrics {
  meanReactionTime: number
  standardDeviation: number
  fastestTime: number
  slowestTime: number
  outlierCount: number
  falseStartCount: number
  missedGoCount: number
  falseAlarmCount: number
  attentionDrift: number
}

interface TrailMetrics {
  timeA: number
  timeB: number
  ratioBA: number
  totalErrors: number
  errorsA: number
  errorsB: number
  meanCorrectionTime: number
}

interface RanMetrics {
  totalTime: number
  meanInterItemTime: number
  varianceInterItemTime: number
  microBlockages: number
  rhythmicityScore: number
}

interface ComplexReactionMetrics {
  score: number
  accuracy: number
  meanRT: number
  switchCost: number
  phase1RT: number
  phase2RT: number
  phase3RT: number
}

interface DigitSpanMetrics {
  maxSpan: number
  totalCorrect: number
  score: number
}

function normalizeScore(value: number, min: number, max: number, invert: boolean = false): number {
  const normalized = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  return invert ? 100 - normalized : normalized
}

function computeSignature(
  stroop: { metrics: StroopMetrics },
  trail: { metrics: TrailMetrics },
  ran: { metrics: RanMetrics },
  complexReaction: { metrics: ComplexReactionMetrics },
  digitSpan: { metrics: DigitSpanMetrics }
) {
  // Inhibitory Control: based on Stroop interference effect and error rates
  // Lower interference = better control
  const interferenceScore = normalizeScore(stroop.metrics.interferenceEffect, 0, 300, true)
  const stroopErrorScore = normalizeScore(stroop.metrics.errorRateIncongruent * 100, 0, 50, true)
  const inhibitoryControl = (interferenceScore * 0.6 + stroopErrorScore * 0.4)

  // Processing Speed: based on complex reaction time
  // Lower time = faster processing
  const processingSpeed = normalizeScore(complexReaction.metrics.meanRT, 300, 800, true)

  // Cognitive Flexibility: based on Trail Making B/A ratio
  // Lower ratio = better flexibility
  const flexibilityRatio = normalizeScore(trail.metrics.ratioBA, 1, 4, true)
  const trailErrorScore = normalizeScore(trail.metrics.totalErrors, 0, 10, true)
  const cognitiveFlexibility = (flexibilityRatio * 0.7 + trailErrorScore * 0.3)

  // Access Fluency: based on RAN rhythmicity and speed
  const ranSpeedScore = normalizeScore(ran.metrics.meanInterItemTime, 100, 500, true)
  const accessFluency = (ranSpeedScore * 0.5 + ran.metrics.rhythmicityScore * 0.5)

  // Working Memory: based on digit span max span
  const workingMemory = normalizeScore(digitSpan.metrics.maxSpan, 3, 9, false)

  // Stability metrics
  // Use accuracy as proxy for consistency (higher accuracy = more stable)
  const reactionVariance = normalizeScore(complexReaction.metrics.accuracy * 100, 50, 100, false)
  const attentionDrift = normalizeScore(complexReaction.metrics.accuracy * 100, 50, 100, false)
  const switchCost = normalizeScore(complexReaction.metrics.switchCost, -100, 300, true)

  // Error profile
  const conflictErrors = stroop.metrics.errorRateIncongruent * 100
  const sequencingErrors = trail.metrics.totalErrors

  return {
    inhibitoryControl: Math.round(inhibitoryControl * 10) / 10,
    processingSpeed: Math.round(processingSpeed * 10) / 10,
    cognitiveFlexibility: Math.round(cognitiveFlexibility * 10) / 10,
    accessFluency: Math.round(accessFluency * 10) / 10,
    workingMemory: Math.round(workingMemory * 10) / 10,
    reactionVariance: Math.round(reactionVariance * 10) / 10,
    attentionDrift: Math.round(attentionDrift * 10) / 10,
    switchCost: Math.round(switchCost * 10) / 10,
    conflictErrors: Math.round(conflictErrors * 10) / 10,
    sequencingErrors,
    rawMetrics: {
      stroop: stroop.metrics,
      trail: trail.metrics,
      ran: ran.metrics,
      complexReaction: complexReaction.metrics,
      digitSpan: digitSpan.metrics,
    },
  }
}

function generateInterpretation(signature: ReturnType<typeof computeSignature>): string {
  const sections: string[] = []

  // Processing Speed interpretation
  if (signature.processingSpeed >= 70) {
    sections.push(
      "Votre vitesse de traitement est élevée, indiquant une capacité à réagir rapidement aux stimuli. " +
      "Cette caractéristique favorise l'efficacité dans les environnements dynamiques nécessitant des décisions rapides."
    )
  } else if (signature.processingSpeed >= 40) {
    sections.push(
      "Votre vitesse de traitement se situe dans la moyenne, reflétant un équilibre entre rapidité et précision. " +
      "Cette configuration est adaptée aux contextes nécessitant une analyse modérée avant l'action."
    )
  } else {
    sections.push(
      "Votre profil indique une approche plus délibérée du traitement de l'information. " +
      "Cette caractéristique peut favoriser la précision au détriment de la rapidité dans certains contextes."
    )
  }

  // Inhibitory Control interpretation
  if (signature.inhibitoryControl >= 70) {
    sections.push(
      "Votre contrôle inhibiteur est particulièrement développé, démontrant une forte capacité à résister aux interférences cognitives. " +
      "Vous maintenez efficacement votre focus malgré les distractions ou informations contradictoires."
    )
  } else if (signature.inhibitoryControl >= 40) {
    sections.push(
      "Votre capacité d'inhibition est dans la norme, vous permettant de gérer les conflits cognitifs de manière satisfaisante. " +
      "Des situations de forte pression ou de multitâche peuvent toutefois solliciter davantage cette ressource."
    )
  } else {
    sections.push(
      "Votre profil suggère une sensibilité aux interférences cognitives. " +
      "Les environnements à forte charge informationnelle peuvent nécessiter des stratégies d'organisation renforcées."
    )
  }

  // Cognitive Flexibility interpretation
  if (signature.cognitiveFlexibility >= 70) {
    sections.push(
      "Votre flexibilité cognitive est supérieure à la moyenne, ce qui favorise l'adaptation rapide à des environnements non linéaires. " +
      "Vous naviguez aisément entre différentes règles ou contextes mentaux."
    )
  } else if (signature.cognitiveFlexibility >= 40) {
    sections.push(
      "Votre flexibilité cognitive est équilibrée, permettant une alternance efficace entre différentes tâches. " +
      "Les transitions fréquentes peuvent toutefois générer un coût cognitif modéré."
    )
  } else {
    sections.push(
      "Votre profil indique une préférence pour les environnements structurés et prévisibles. " +
      "Les changements de contexte fréquents peuvent représenter un défi nécessitant une préparation anticipée."
    )
  }

  // Stability interpretation
  if (signature.reactionVariance >= 70 && signature.attentionDrift >= 70) {
    sections.push(
      "Votre stabilité attentionnelle est remarquable, avec une performance constante tout au long de l'évaluation. " +
      "Cette régularité est un atout pour les tâches prolongées nécessitant une vigilance soutenue."
    )
  } else if (signature.reactionVariance < 40 || signature.attentionDrift < 40) {
    sections.push(
      "Une variabilité marquée dans vos temps de réponse suggère des fluctuations attentionnelles. " +
      "Cette caractéristique peut indiquer une forte capacité d'exploration cognitive, avec un risque de dispersion sous contrainte prolongée."
    )
  }

  // Access Fluency interpretation
  if (signature.accessFluency >= 70) {
    sections.push(
      "Votre fluidité d'accès aux représentations visuelles est excellente, indiquant une automatisation efficace des processus de reconnaissance. " +
      "Cette capacité facilite le traitement rapide d'informations visuelles complexes."
    )
  } else if (signature.accessFluency < 40) {
    sections.push(
      "L'accès à vos représentations visuelles montre quelques micro-blocages, pouvant refléter un style de traitement plus analytique. " +
      "Cette approche peut être avantageuse pour des tâches nécessitant une attention aux détails."
    )
  }

  // Working Memory interpretation
  if (signature.workingMemory >= 70) {
    sections.push(
      "Votre mémoire de travail est particulièrement développée, vous permettant de maintenir et manipuler efficacement plusieurs informations simultanément. " +
      "Cette capacité est un atout majeur pour les tâches complexes nécessitant une gestion mentale de multiples éléments."
    )
  } else if (signature.workingMemory >= 40) {
    sections.push(
      "Votre mémoire de travail se situe dans la moyenne, vous permettant de gérer efficacement les tâches courantes. " +
      "Les situations très complexes peuvent nécessiter des stratégies de segmentation ou de prise de notes."
    )
  } else {
    sections.push(
      "Votre profil suggère une capacité de mémoire de travail limitée. " +
      "L'utilisation d'outils externes (notes, listes) et la décomposition des tâches complexes peuvent optimiser votre efficacité."
    )
  }

  return sections.join("\n\n")
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const { sessionId } = await req.json()

    if (!sessionId) {
      return NextResponse.json({ message: "Session ID manquant" }, { status: 400 })
    }

    // Get session with all test data
    const session = await (prisma as any).cognitiveTestSession.findFirst({
      where: { id: sessionId, userId },
    })

    if (!session) {
      return NextResponse.json({ message: "Session non trouvée" }, { status: 404 })
    }

    // Verify all tests are completed
    if (!session.stroopCompleted || !session.complexReactionCompleted || 
        !session.trailMakingCompleted || !session.ranVisualCompleted ||
        !session.digitSpanCompleted) {
      return NextResponse.json({ message: "Tests incomplets" }, { status: 400 })
    }

    // Compute signature
    const signature = computeSignature(
      session.stroopData,
      session.trailMakingData,
      session.ranVisualData,
      session.complexReactionData,
      session.digitSpanData
    )

    // Generate interpretation
    const interpretation = generateInterpretation(signature)

    // Create signature record
    await (prisma as any).cognitiveSignature.create({
      data: {
        sessionId,
        inhibitoryControl: signature.inhibitoryControl,
        processingSpeed: signature.processingSpeed,
        cognitiveFlexibility: signature.cognitiveFlexibility,
        accessFluency: signature.accessFluency,
        workingMemory: signature.workingMemory,
        reactionVariance: signature.reactionVariance,
        attentionDrift: signature.attentionDrift,
        switchCost: signature.switchCost,
        conflictErrors: signature.conflictErrors,
        sequencingErrors: signature.sequencingErrors,
        rawMetrics: signature.rawMetrics,
        interpretation,
      },
    })

    // Update session status
    await (prisma as any).cognitiveTestSession.update({
      where: { id: sessionId },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, signature })
  } catch (error) {
    console.error("[Cognitive Complete] Error:", error)
    return NextResponse.json(
      { message: "Erreur lors du calcul de la signature" },
      { status: 500 }
    )
  }
}
