import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { fetchFormations } from "@/lib/france-travail/client"

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

// GET - Récupérer les formations pour un projet professionnel
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    // Vérifier que le projet appartient à l'utilisateur
    const project = await prisma.careerProject.findFirst({
      where: {
        id: params.id,
        userId
      }
    })
    
    if (!project) {
      return NextResponse.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      )
    }
    
    console.log('[Career Project Formations] Fetching formations for ROME:', project.targetRomeCode)
    
    // Récupérer les formations correspondant au code ROME du projet
    const formations = await fetchFormations({
      romeCodes: [project.targetRomeCode],
      keywords: project.targetRomeLabel,
      limit: 20
    })
    
    // Mettre à jour le projet avec les formations trouvées
    await prisma.careerProject.update({
      where: { id: params.id },
      data: {
        formations: formations
      }
    })
    
    return NextResponse.json({
      formations,
      count: formations.length,
      project: {
        targetRomeCode: project.targetRomeCode,
        targetRomeLabel: project.targetRomeLabel
      }
    })
  } catch (error) {
    console.error('[Career Project Formations] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
