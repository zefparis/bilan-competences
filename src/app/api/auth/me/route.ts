import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getDb } from "@/lib/db"

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

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const db = getDb()
    const result = await db.execute({
      sql: "SELECT id, email, firstName, lastName, role, createdAt FROM users WHERE id = ?",
      args: [decoded.userId]
    })

    const row = result.rows[0]
    if (!row) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 401 }
      )
    }

    const user = {
      id: row.id as string,
      email: row.email as string,
      firstName: row.firstName as string,
      lastName: row.lastName as string,
      role: row.role as string,
      createdAt: row.createdAt as string,
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
