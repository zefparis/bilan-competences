import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"
import { analyzeCognitiveProfile, CognitiveAnalysis } from "@/lib/cognitive-engine"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  console.log("[API/Cognitive/Profile] GET request START")
  try {
    const userId = await getUserIdFromRequest(req)
    console.log("[API/Cognitive/Profile] User ID from request:", userId)
    
    if (!userId) {
      console.warn("[API/Cognitive/Profile] Unauthorized access attempt")
      return NextResponse.json({ 
        message: "Non authentifié", 
        analysis: null, 
        insights: [] 
      }, { status: 200 }) // Return 200 instead of 401 to avoid error page
    }

    console.log("[API/Cognitive/Profile] Fetching profile for user:", userId)
    const profile = await prisma.cognitiveProfile.findUnique({
      where: { userId },
    })
    console.log("[API/Cognitive/Profile] Profile found:", !!profile)

    if (!profile) {
      console.log("[API/Cognitive/Profile] No profile found, returning empty state")
      return NextResponse.json({ analysis: null, insights: [], radarData: [] })
    }

    // Transformation en analyse qualitative
    const analysis = analyzeCognitiveProfile({
      id: profile.id,
      userId: profile.userId,
      form_score: profile.form_score,
      color_score: profile.color_score,
      volume_score: profile.volume_score,
      sound_score: profile.sound_score,
      dominant_cognition: profile.dominant_cognition as "form" | "color" | "volume" | "sound",
      profile_code: profile.profile_code,
      communication_style: profile.communication_style as "analytical" | "visual" | "kinesthetic" | "auditory" | null,
      detail_level: profile.detail_level as "high" | "medium" | "low" | null,
      learning_preference: profile.learning_preference,
      completed_at: profile.completed_at?.toISOString() || null,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    })

    // Niveaux qualitatifs pour le diagramme radar (pas de scores bruts)
    const getQualitativeLevel = (score: number): number => {
      if (score >= 40) return 5
      if (score >= 30) return 4
      if (score >= 20) return 3
      if (score >= 10) return 2
      return 1
    }

    const radarData = [
      { dimension: "Form", label: "Structure", level: getQualitativeLevel(profile.form_score) },
      { dimension: "Color", label: "Intuition", level: getQualitativeLevel(profile.color_score) },
      { dimension: "Volume", label: "Action", level: getQualitativeLevel(profile.volume_score) },
      { dimension: "Sound", label: "Relation", level: getQualitativeLevel(profile.sound_score) },
    ]

    console.log("[API/Cognitive/Profile] Fetching insights for user:", userId)
    const insights = await prisma.cognitiveInsight.findMany({
      where: { userId },
      orderBy: { priority: "desc" },
    })
    console.log("[API/Cognitive/Profile] Insights found:", insights.length)

    return NextResponse.json({ analysis, insights, radarData })
  } catch (e) {
    console.error("[API/Cognitive/Profile] CRITICAL ERROR:", e)
    return NextResponse.json(
      { 
        message: e instanceof Error ? e.message : "Erreur lors de la récupération",
        stack: e instanceof Error ? e.stack : undefined
      },
      { status: 500 }
    )
  }
}
