import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { analyzeTransferableSkills } from "@/lib/transferable-skills-analyzer"

async function getUserIdFromRequest(req: NextRequest): Promise<string> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Non authentifié")
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  })
  if (!user) {
    throw new Error("Utilisateur non trouvé")
  }
  return user.id
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    const body = await req.json()
    
    const {
      currentJob,
      targetJob,
      includeRiasec
    } = body
    
    if (!currentJob || !targetJob) {
      return NextResponse.json(
        { error: "currentJob et targetJob requis" },
        { status: 400 }
      )
    }
    
    console.log("[Transferable Skills API] Analyzing skills transfer:", {
      from: currentJob.title,
      to: targetJob.title
    })
    
    // Récupérer le profil RIASEC si demandé
    let userProfile = undefined
    if (includeRiasec) {
      const assessment = await prisma.assessment.findFirst({
        where: { userId },
        include: { riasecResult: true },
        orderBy: { createdAt: 'desc' }
      })
      
      if (assessment?.riasecResult) {
        userProfile = {
          riasecScores: {
            R: assessment.riasecResult.scoreR,
            I: assessment.riasecResult.scoreI,
            A: assessment.riasecResult.scoreA,
            S: assessment.riasecResult.scoreS,
            E: assessment.riasecResult.scoreE,
            C: assessment.riasecResult.scoreC
          }
        }
      }
    }
    
    const analysis = await analyzeTransferableSkills({
      currentJob,
      targetJob,
      userProfile
    })
    
    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("[Transferable Skills API] Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
