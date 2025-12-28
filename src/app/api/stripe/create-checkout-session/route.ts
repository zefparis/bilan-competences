import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICE_AMOUNT = 4900 // 49€ en centimes

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    
    if (!userId) {
      return NextResponse.json(
        { message: "Non authentifié" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        email: true, 
        hasPaid: true, 
        stripeCustomerId: true 
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur introuvable" },
        { status: 404 }
      )
    }

    // Vérifier si déjà payé
    if (user.hasPaid) {
      return NextResponse.json(
        { message: "Bilan déjà débloqué" },
        { status: 409 }
      )
    }

    // Créer ou récupérer le customer Stripe
    let stripeCustomerId = user.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: {
          userId: user.id,
        },
      })
      stripeCustomerId = customer.id

      // Sauvegarder le stripeCustomerId
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      })
    }

    // Créer la session Checkout
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer: stripeCustomerId,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Bilan PERSPECTA — Analyse complète",
              description: "Évaluation cognitive approfondie + Test RIASEC + Synthèse stratégique",
            },
            unit_amount: PRICE_AMOUNT,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("[Stripe Checkout] Error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    )
  }
}
