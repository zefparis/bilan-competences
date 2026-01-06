import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"

async function getUserIdFromRequest(req: NextRequest): Promise<string> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user.id
}

// GET - Récupérer les informations d'accessibilité
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    const accessibility = await prisma.accessibility.findUnique({
      where: { userId }
    })

    return NextResponse.json({ accessibility })
  } catch (error) {
    console.error("[Accessibility] GET error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 }
    )
  }
}

// POST - Créer/Mettre à jour les informations d'accessibilité
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    const data = await req.json()

    // Validation
    if (data.hasRQTH && !data.rqthNumber) {
      return NextResponse.json(
        { error: "Le numéro RQTH est requis lorsque la RQTH est déclarée" },
        { status: 400 }
      )
    }

    // Convertir la date si présente
    if (data.rqthExpiryDate) {
      data.rqthExpiryDate = new Date(data.rqthExpiryDate)
    }

    const accessibility = await prisma.accessibility.upsert({
      where: { userId },
      create: {
        userId,
        ...data
      },
      update: data
    })

    return NextResponse.json({ accessibility })
  } catch (error) {
    console.error("[Accessibility] POST error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 }
    )
  }
}
