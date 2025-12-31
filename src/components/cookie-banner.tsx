"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const COOKIE_CONSENT_KEY = "perspecta-cookie-consent"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      essential: true,
      accepted: true,
      date: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  const declineCookies = () => {
    // Les cookies essentiels ne peuvent pas être refusés (authentification)
    // On enregistre quand même le choix
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      essential: true,
      accepted: false,
      date: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-foreground mb-1">🍪 Gestion des cookies</h3>
            <p className="text-sm text-muted-foreground">
              PERSPECTA utilise uniquement des <strong>cookies essentiels</strong> nécessaires au fonctionnement 
              du site (authentification, sécurité). Aucun cookie de tracking ou publicitaire n'est utilisé.{" "}
              <Link href="/politique-cookies" className="text-primary hover:underline">
                En savoir plus
              </Link>
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="text-sm"
            >
              Refuser les optionnels
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="text-sm"
            >
              Accepter
            </Button>
            <button
              onClick={acceptCookies}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
