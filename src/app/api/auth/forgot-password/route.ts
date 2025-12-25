import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email est obligatoire" },
        { status: 400 }
      )
    }

    const result = await db.execute({
      sql: "SELECT id FROM users WHERE email = ?",
      args: [email]
    })

    const row = result.rows[0]
    if (!row) {
      return NextResponse.json(
        { message: "Si un compte avec cet email existe, un email de réinitialisation sera envoyé" },
        { status: 200 }
      )
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString() // 1 hour

    await db.execute({
      sql: "UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE id = ?",
      args: [resetToken, resetTokenExpiry, row.id as string]
    })

    console.log(`Token de réinitialisation pour ${email}: ${resetToken}`)
    console.log(`Lien de réinitialisation: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`)

    return NextResponse.json({
      message: "Si un compte avec cet email existe, un email de réinitialisation sera envoyé"
    })

  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la demande de réinitialisation" },
      { status: 500 }
    )
  }
}
