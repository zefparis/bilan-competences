import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db, generateId } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingResult = await db.execute({
      sql: "SELECT id FROM users WHERE email = ?",
      args: [email]
    })

    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { message: "Un compte avec cet email existe déjà" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const id = generateId()
    const now = new Date().toISOString()

    await db.execute({
      sql: `INSERT INTO users (id, email, passwordHash, firstName, lastName, role, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, email, hashedPassword, firstName, lastName, "BENEFICIAIRE", now, now]
    })

    return NextResponse.json({
      message: "Compte créé avec succès",
      user: {
        id,
        email,
        firstName,
        lastName,
        role: "BENEFICIAIRE",
        createdAt: now
      }
    })

  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la création du compte" },
      { status: 500 }
    )
  }
}
