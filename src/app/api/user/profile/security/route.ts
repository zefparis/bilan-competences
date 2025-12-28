import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Tous les champs sont obligatoires" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ message: "Le nouveau mot de passe doit faire au moins 6 caractères" }, { status: 400 })
    }

    // Récupérer l'utilisateur pour vérifier l'ancien mot de passe
    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: { passwordHash: true }
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Mot de passe actuel incorrect" }, { status: 400 })
    }

    // Hasher le nouveau mot de passe
    const passwordHash = await bcrypt.hash(newPassword, 10)

    // Mettre à jour
    await (prisma as any).user.update({
      where: { id: userId },
      data: { passwordHash }
    })

    return NextResponse.json({ message: "Mot de passe mis à jour avec succès" })
  } catch (error) {
    console.error("[API/User/Security] POST error:", error)
    return NextResponse.json({ message: "Erreur lors de la mise à jour du mot de passe" }, { status: 500 })
  }
}
