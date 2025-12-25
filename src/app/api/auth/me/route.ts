import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Non authentifié" },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 401 }
      )
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error)
    return NextResponse.json(
      { message: "Token invalide" },
      { status: 401 }
    )
  }
}
