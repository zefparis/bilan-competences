import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        image: true,
        title: true,
        bio: true,
        skills: true,
        linkedin: true,
        github: true,
        portfolio: true,
        role: true,
        createdAt: true,
        cognitiveProfile: {
          select: {
            profile_code: true,
            dominant_cognition: true,
          }
        },
        assessments: {
          where: { status: "IN_PROGRESS" },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            riasecResult: {
              select: {
                topCode: true
              }
            }
          }
        }
      },
    })

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("[API/User/Profile] GET error:", error)
    console.error("[API/User/Profile] Stack:", error instanceof Error ? error.stack : "No stack")
    return NextResponse.json({ 
      message: "Erreur lors de la récupération du profil",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    const body = await req.json()
    const { name, firstName, lastName, image, title, bio, skills, linkedin, github, portfolio } = body

    const updatedUser = await (prisma as any).user.update({
      where: { id: userId },
      data: {
        name,
        firstName,
        lastName,
        image,
        title,
        bio,
        skills,
        linkedin,
        github,
        portfolio,
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        image: true,
        title: true,
        bio: true,
        skills: true,
        linkedin: true,
        github: true,
        portfolio: true,
        role: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("[API/User/Profile] PATCH error:", error)
    return NextResponse.json({ message: "Erreur lors de la mise à jour du profil" }, { status: 500 })
  }
}
