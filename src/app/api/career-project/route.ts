import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"

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

// GET - Récupérer tous les projets de l'utilisateur
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    const projects = await prisma.careerProject.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    })
    
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('[Career Project] GET error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}

// POST - Créer un nouveau projet professionnel
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    const body = await req.json()
    
    const {
      targetRomeCode,
      targetRomeLabel,
      targetDomain,
      motivation,
      timeline,
      constraints,
      currentSkills,
      requiredSkills,
      skillsGap
    } = body
    
    if (!targetRomeCode || !targetRomeLabel || !targetDomain) {
      return NextResponse.json(
        { error: "Code ROME, libellé et domaine requis" },
        { status: 400 }
      )
    }
    
    const project = await prisma.careerProject.create({
      data: {
        userId,
        targetRomeCode,
        targetRomeLabel,
        targetDomain,
        motivation,
        timeline,
        constraints,
        currentSkills: currentSkills || [],
        requiredSkills: requiredSkills || [],
        skillsGap: skillsGap || [],
        status: 'DRAFT'
      }
    })
    
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('[Career Project] POST error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
