"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Pré-remplir l'email depuis les paramètres URL
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }

    // Vérifier si l'utilisateur vient de la page de paiement
    const paymentSuccess = sessionStorage.getItem("payment_success")
    if (paymentSuccess === "true") {
      setShowPaymentSuccess(true)
      sessionStorage.removeItem("payment_success")
      
      toast({
        title: "Paiement confirmé !",
        description: "Votre bilan est maintenant débloqué. Connectez-vous pour y accéder.",
      })
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Bilan de Compétences",
      })

      // Le middleware protège /dashboard via NextAuth: on force une navigation propre.
      router.replace("/dashboard")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showPaymentSuccess && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-green-500">Paiement confirmé !</p>
                <p className="text-muted-foreground mt-1">
                  Votre bilan est maintenant débloqué. Connectez-vous pour accéder à tous les modules.
                </p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Pas encore de compte ?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Créer un compte
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
