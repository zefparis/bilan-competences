"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react"

export default function PaymentSuccessPage() {
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Vérifier que le paiement a bien été traité
    const checkPaymentStatus = async () => {
      try {
        const sessionId = searchParams.get("session_id")
        
        if (!sessionId) {
          console.error("Session ID manquant")
          setLoading(false)
          return
        }

        // Vérifier le paiement via l'API publique
        const res = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
        
        if (res.ok) {
          const data = await res.json()
          setVerified(data.verified === true)
          setUserEmail(data.email)
          
          // Si le paiement est vérifié, rediriger vers la connexion avec l'email
          if (data.verified && data.email) {
            // Stocker temporairement l'info de paiement réussi
            sessionStorage.setItem("payment_success", "true")
            sessionStorage.setItem("payment_email", data.email)
            
            // Rediriger vers la connexion avec callback vers le dashboard
            setTimeout(() => {
              router.push(`/auth/login?callbackUrl=/dashboard&email=${encodeURIComponent(data.email)}`)
            }, 3000)
          }
        } else {
          console.error("Erreur lors de la vérification du paiement")
        }
      } catch (error) {
        console.error("Erreur vérification:", error)
      } finally {
        setLoading(false)
      }
    }

    // Attendre un peu pour laisser le webhook traiter
    const timer = setTimeout(checkPaymentStatus, 2000)
    return () => clearTimeout(timer)
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {loading ? (
          <div className="space-y-4">
            <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
            <h1 className="text-2xl font-bold text-foreground">
              Validation en cours...
            </h1>
            <p className="text-muted-foreground">
              Nous vérifions votre paiement, merci de patienter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Paiement confirmé
              </h1>
              <p className="text-muted-foreground">
                Votre bilan PERSPECTA-COMPETENCES est maintenant débloqué.
                Vous avez accès à l'ensemble des modules et à votre synthèse stratégique.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-left">
              <h2 className="font-semibold text-foreground mb-3">
                Ce qui vous attend :
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Analyse cognitive complète</li>
                <li>• Test RIASEC professionnel</li>
                <li>• Croisement cognition × intérêts</li>
                <li>• Synthèse stratégique personnalisée</li>
                <li>• Rapport final téléchargeable</li>
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Accéder à mon espace
              <ArrowRight className="w-5 h-5" />
            </Link>

            {!verified && (
              <p className="text-xs text-muted-foreground">
                Si votre accès n'est pas encore activé, rafraîchissez la page dans quelques instants.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
