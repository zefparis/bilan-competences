import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Récupérer le bilan actif
    const activeAssessment = await prisma.assessment.findFirst({
      where: { 
        userId: user.id,
        status: 'IN_PROGRESS'
      },
      select: { id: true }
    })

    if (!activeAssessment) {
      return NextResponse.json({ error: "Aucun bilan actif trouvé" }, { status: 404 })
    }

    // Supprimer toutes les expériences du bilan
    const result = await prisma.experience.deleteMany({
      where: { assessmentId: activeAssessment.id }
    })

    console.log(`🗑️ [Reset Expériences] ${result.count} expériences supprimées pour l'utilisateur ${user.id}`)

    return NextResponse.json({ 
      success: true, 
      deletedCount: result.count,
      message: `${result.count} expérience(s) supprimée(s)` 
    })
  } catch (error) {
    console.error("[Reset Expériences] Error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation" },
      { status: 500 }
    )
  }
}
