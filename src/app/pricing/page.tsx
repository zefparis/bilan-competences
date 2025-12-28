"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, ArrowRight, Shield, Lock, FileText } from "lucide-react"

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (res.status === 401) {
        router.push("/auth/signin?callbackUrl=/pricing")
        return
      }

      if (res.status === 409) {
        router.push("/dashboard")
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Erreur checkout:", error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    "Analyse cognitive 4 dimensions (Forme, Couleur, Volume, Son)",
    "Test RIASEC complet",
    "Croisement cognition × intérêts professionnels",
    "Synthèse stratégique personnalisée",
    "Accès au rapport final dans l'espace personnel",
    "Données privées, non revendues, non utilisées pour l'IA",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold text-lg text-primary">
              PERSPECTA
            </Link>
            <Link 
              href="/auth/signin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Se connecter
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Accédez à une analyse complète de votre potentiel professionnel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une évaluation cognitive approfondie, structurée et actionnable, 
            conçue pour révéler vos leviers invisibles de progression.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="pb-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Offre unique
              </span>
            </div>

            {/* Title & Price */}
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Bilan PERSPECTA — Analyse complète
            </h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-primary">49 €</span>
              <span className="text-muted-foreground">TTC</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Paiement unique • Accès illimité à votre rapport
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                "Chargement..."
              ) : (
                <>
                  Débloquer mon bilan complet
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Secondary CTA */}
            <div className="mt-4 text-center">
              <Link 
                href="/exemple-restitution"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Voir un exemple de restitution
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Données confidentielles</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Conforme RGPD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 PERSPECTA. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="/cgu" className="hover:text-foreground transition-colors">
              CGU
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
