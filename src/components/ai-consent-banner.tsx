'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export function AIConsentBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenBanner = localStorage.getItem('ai-consent-seen')
    if (!hasSeenBanner) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ai-consent-seen', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl z-50 border-t-4 border-blue-400">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🤖</span>
              <p className="font-bold text-lg">Cette plateforme utilise l'Intelligence Artificielle</p>
            </div>
            <p className="text-sm text-blue-100 mb-2">
              PERSPECTA-COMPETENCES utilise l'IA (GPT-4o) pour analyser vos compétences et recommander 
              des opportunités professionnelles. Vous gardez le contrôle final de toutes vos décisions.
            </p>
            <Link 
              href="/ai-disclosure" 
              className="text-sm font-semibold underline hover:text-blue-200 inline-flex items-center gap-1"
            >
              En savoir plus sur notre usage de l'IA →
            </Link>
          </div>
          <button
            onClick={handleAccept}
            className="flex-shrink-0 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            J'ai compris
          </button>
          <button
            onClick={handleAccept}
            className="flex-shrink-0 text-white hover:text-blue-200 p-1"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
