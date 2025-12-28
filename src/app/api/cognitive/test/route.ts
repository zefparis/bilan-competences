import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"
import { testResponseSchema } from "@/lib/schemas/cognitive"
import { computeCognitiveProfile, generateInsights, analyzeCognitiveProfile } from "@/lib/cognitive-engine"
import { ZodError } from "zod"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  console.log("-----------------------------------------")
  console.log("[API/Cognitive/Test] POST request START")
  
  try {
    const userId = await getUserIdFromRequest(req)
    console.log("[API/Cognitive/Test] User ID:", userId)
    
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const dbUser = await (prisma as any).user.findUnique({ where: { id: userId } })
    if (!dbUser) {
      console.error("[API/Cognitive/Test] User not found in DB:", userId)
      return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 })
    }

    const body = await req.json()
    const rawResponses = Array.isArray(body?.responses) ? body.responses : []
    
    if (rawResponses.length === 0) {
      return NextResponse.json({ message: "Réponses manquantes" }, { status: 400 })
    }

    // Validation
    console.log("[API/Cognitive/Test] Validating responses...")
    const validatedResponses = rawResponses.map((r: any) => testResponseSchema.parse(r))
    console.log("[API/Cognitive/Test] Validated", validatedResponses.length, "responses")
    
    console.log("[API/Cognitive/Test] Computing profile...")
    const profile = computeCognitiveProfile(userId, validatedResponses)
    console.log("[API/Cognitive/Test] Profile computed:", profile.dominant_cognition)
    
    console.log("[API/Cognitive/Test] Generating insights...")
    const insights = generateInsights(profile)
    console.log("[API/Cognitive/Test] Generated", insights.length, "insights")

    const completedAt = profile.completed_at ? new Date(profile.completed_at) : null

    // Analyse qualitative (pour le retour API)
    console.log("[API/Cognitive/Test] Analyzing profile...")
    const analysis = analyzeCognitiveProfile(profile)
    console.log("[API/Cognitive/Test] Analysis complete:", analysis.archetype.name)

    // Sauvegarde unitaire (plus robuste pour le debug qu'une transaction complexe)
    console.log("[API/Cognitive/Test] Saving profile...")
    await (prisma as any).cognitiveProfile.upsert({
      where: { userId },
      create: {
        id: profile.id,
        userId,
        form_score: profile.form_score,
        color_score: profile.color_score,
        volume_score: profile.volume_score,
        sound_score: profile.sound_score,
        dominant_cognition: profile.dominant_cognition,
        profile_code: profile.profile_code,
        communication_style: profile.communication_style ?? null,
        detail_level: profile.detail_level ?? null,
        learning_preference: (profile as any).learning_preference ?? null,
        completed_at: completedAt,
      },
      update: {
        form_score: profile.form_score,
        color_score: profile.color_score,
        volume_score: profile.volume_score,
        sound_score: profile.sound_score,
        dominant_cognition: profile.dominant_cognition,
        profile_code: profile.profile_code,
        communication_style: profile.communication_style ?? null,
        detail_level: profile.detail_level ?? null,
        learning_preference: (profile as any).learning_preference ?? null,
        completed_at: completedAt,
      },
    })

    console.log("[API/Cognitive/Test] Saving responses...")
    for (const response of validatedResponses) {
      await (prisma as any).cognitiveTestResponse.upsert({
        where: { userId_questionId: { userId, questionId: response.question_id } },
        create: {
          userId,
          questionId: response.question_id,
          selectedOption: response.selected_option,
          dimension: response.dimension,
          weight: response.weight,
        },
        update: {
          selectedOption: response.selected_option,
          dimension: response.dimension,
          weight: response.weight,
        },
      })
    }

    console.log("[API/Cognitive/Test] Saving insights...")
    await (prisma as any).cognitiveInsight.deleteMany({ where: { userId } })
    await (prisma as any).cognitiveInsight.createMany({
      data: insights.map((insight: any) => ({
        userId,
        insight_type: insight.type,
        title: insight.title,
        description: insight.description,
        priority: insight.priority,
      })),
    })

    console.log("[API/Cognitive/Test] SUCCESS")
    
    // On ne retourne PAS les scores bruts, mais l'analyse qualitative
    return NextResponse.json({ 
      success: true, 
      analysis, 
      insights, 
      persisted: true 
    })

  } catch (e) {
    console.error("[API/Cognitive/Test] CRITICAL ERROR:", e)
    console.error("[API/Cognitive/Test] Stack:", e instanceof Error ? e.stack : "No stack")
    return NextResponse.json(
      { 
        message: "Erreur lors du traitement du test",
        error: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined
      },
      { status: 500 }
    )
  }
}
