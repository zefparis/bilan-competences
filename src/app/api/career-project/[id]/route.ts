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

// GET - Récupérer un projet spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(req)
    
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
    
    return NextResponse.json({ project })
  } catch (error) {
    console.error('[Career Project] GET error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour un projet
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(req)
    const body = await req.json()
    
    // Vérifier que le projet appartient à l'utilisateur
    const existingProject = await prisma.careerProject.findFirst({
      where: {
        id: params.id,
        userId
      }
    })
    
    if (!existingProject) {
      return NextResponse.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      )
    }
    
    const project = await prisma.careerProject.update({
      where: { id: params.id },
      data: {
        ...body,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json({ project })
  } catch (error) {
    console.error('[Career Project] PATCH error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un projet
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    // Vérifier que le projet appartient à l'utilisateur
    const existingProject = await prisma.careerProject.findFirst({
      where: {
        id: params.id,
        userId
      }
    })
    
    if (!existingProject) {
      return NextResponse.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      )
    }
    
    await prisma.careerProject.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Career Project] DELETE error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
