import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token et mot de passe sont obligatoires" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      )
    }

    const db = getDb()
    const now = new Date().toISOString()
    const result = await db.execute({
      sql: "SELECT id FROM users WHERE resetToken = ? AND resetTokenExpiry > ?",
      args: [token, now]
    })

    const row = result.rows[0]
    if (!row) {
      return NextResponse.json(
        { message: "Token invalide ou expiré" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.execute({
      sql: "UPDATE users SET passwordHash = ?, resetToken = NULL, resetTokenExpiry = NULL, updatedAt = ? WHERE id = ?",
      args: [hashedPassword, now, row.id as string]
    })

    return NextResponse.json({
      message: "Mot de passe réinitialisé avec succès"
    })

  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la réinitialisation du mot de passe" },
      { status: 500 }
    )
  }
}
