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

    // Supprimer toutes les sessions de test cognitif de l'utilisateur
    const deletedSessions = await prisma.cognitiveTestSession.deleteMany({
      where: { userId: user.id }
    })

    // Supprimer le profil cognitif s'il existe
    await prisma.cognitiveProfile.deleteMany({
      where: { userId: user.id }
    })

    console.log(`🗑️ [Reset Cognitif] ${deletedSessions.count} session(s) supprimée(s) pour l'utilisateur ${user.id}`)

    return NextResponse.json({ 
      success: true,
      deletedCount: deletedSessions.count,
      message: "Test cognitif réinitialisé" 
    })
  } catch (error) {
    console.error("[Reset Cognitif] Error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation" },
      { status: 500 }
    )
  }
}
