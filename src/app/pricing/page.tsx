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

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Erreur API:", errorData)
        alert("Erreur lors de la création de la session de paiement. Veuillez réessayer.")
        return
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Pas d'URL retournée:", data)
        alert("Erreur lors de la redirection vers Stripe. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Erreur checkout:", error)
      alert("Erreur de connexion. Veuillez vérifier votre connexion internet.")
    } finally {
      setLoading(false)
    }
  }

  const freeFeatures = [
    "✅ Parcours de vie interactif",
    "✅ Expériences STAR (Situation, Tâche, Action, Résultat)",
    "✅ Test RIASEC complet (6 dimensions Holland)",
    "✅ Profil cognitif (Form, Color, Volume, Sound)",
    "✅ Tri des valeurs professionnelles",
  ]

  const premiumFeatures = [
    "🎯 Évaluation cognitive PERSPECTA (4 tests comportementaux)",
    "🎓 Certification professionnelle avec blockchain",
    "📊 Analyse IA Claude 3.5 (compétences transférables)",
    "💼 Matching emploi + formations CPF",
    "📄 Rapport PDF premium personnalisé",
    "🔒 Données privées, conformes RGPD",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold text-lg text-primary">
              PERSPECTA-COMPETENCES
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
            Débloquez votre évaluation complète et vos modules premium
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accédez à l'évaluation cognitive PERSPECTA, la certification professionnelle,
            l'analyse IA et votre rapport PDF personnalisé.
          </p>

          {/* Disclaimer réglementaire */}
          <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-400 p-4 rounded-r-lg max-w-2xl mx-auto mt-8">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  <strong>Information importante :</strong> PERSPECTA est un outil d'auto-évaluation professionnelle. 
                  Il ne constitue pas un bilan de compétences au sens des articles L6313-1 et suivants du Code du travail 
                  et n'est pas éligible au financement CPF.
                </p>
              </div>
            </div>
          </div>
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
              Évaluation PERSPECTA-COMPETENCES — Modules Premium
            </h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-primary">49 €</span>
              <span className="text-muted-foreground">TTC</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Paiement unique • Accès illimité à votre rapport
            </p>

            {/* Free Features */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Déjà inclus gratuitement
              </h3>
              <ul className="space-y-2 text-sm">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border my-6"></div>

            {/* Premium Features */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                Avec le pack premium (49€)
              </h3>
              <ul className="space-y-4">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                  Débloquer mon évaluation complète
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
          <p>© 2025 PERSPECTA-COMPETENCES by ia-solution (SIRET 438 055 097). Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgu" className="hover:text-foreground transition-colors">
              CGU
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
