import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

export const dynamic = "force-dynamic"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
      console.error("[Stripe Webhook] Missing signature")
      return NextResponse.json(
        { message: "Missing signature" },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("[Stripe Webhook] Signature verification failed:", err)
      return NextResponse.json(
        { message: "Webhook signature verification failed" },
        { status: 400 }
      )
    }

    console.log("[Stripe Webhook] Event received:", event.type)

    // Traiter l'événement checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      const customerId = session.customer as string
      const userId = session.metadata?.userId

      console.log("[Stripe Webhook] Payment completed for:", { customerId, userId })

      if (userId) {
        // Débloquer l'accès via userId (plus fiable)
        await prisma.user.update({
          where: { id: userId },
          data: {
            hasPaid: true,
            paidAt: new Date(),
          },
        })
        console.log("[Stripe Webhook] User unlocked via userId:", userId)
      } else if (customerId) {
        // Fallback: débloquer via stripeCustomerId
        await prisma.user.update({
          where: { stripeCustomerId: customerId },
          data: {
            hasPaid: true,
            paidAt: new Date(),
          },
        })
        console.log("[Stripe Webhook] User unlocked via customerId:", customerId)
      } else {
        console.error("[Stripe Webhook] No userId or customerId found in session")
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Stripe Webhook] Error:", error)
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
