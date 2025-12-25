import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email est obligatoire" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { message: "Si un compte avec cet email existe, un email de réinitialisation sera envoyé" },
        { status: 200 }
      )
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      }
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
