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
      include: { lifePath: true }
    })

    if (!activeAssessment?.lifePath) {
      return NextResponse.json({ error: "Aucun parcours actif trouvé" }, { status: 404 })
    }

    // Supprimer tous les événements du parcours
    const result = await prisma.lifeEvent.deleteMany({
      where: { lifePathId: activeAssessment.lifePath.id }
    })

    console.log(`🗑️ [Reset Parcours] ${result.count} événements supprimés pour l'utilisateur ${user.id}`)

    return NextResponse.json({ 
      success: true, 
      deletedCount: result.count,
      message: `${result.count} événement(s) supprimé(s)` 
    })
  } catch (error) {
    console.error("[Reset Parcours] Error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation" },
      { status: 500 }
    )
  }
}
