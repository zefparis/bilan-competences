import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID manquant" },
        { status: 400 }
      )
    }

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { message: "Session introuvable" },
        { status: 404 }
      )
    }

    // Vérifier si le paiement est complété
    if (session.payment_status !== "paid") {
      return NextResponse.json({
        paid: false,
        status: session.payment_status
      })
    }

    // Récupérer l'userId depuis les metadata
    const userId = session.metadata?.userId

    if (!userId) {
      return NextResponse.json(
        { message: "Utilisateur introuvable dans la session" },
        { status: 404 }
      )
    }

    // Vérifier le statut de l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        hasPaid: true,
        paidAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      paid: true,
      verified: user.hasPaid,
      userId: user.id,
      email: user.email,
      paidAt: user.paidAt
    })
  } catch (error) {
    console.error("[Stripe Verify Session] Error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la vérification de la session" },
      { status: 500 }
    )
  }
}
