'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Cognitive Page] Error boundary caught:', error)
  }, [error])

  return (
    <div className="container mx-auto p-8">
      <Card className="p-8 border-destructive/50 bg-destructive/5">
        <div className="space-y-6 text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-destructive">
              Erreur de chargement
            </h2>
            <p className="text-muted-foreground">
              Une erreur s'est produite lors du chargement de votre profil cognitif.
            </p>
            {error.message && (
              <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                {error.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={reset}>
              Réessayer
            </Button>
            <Link href="/dashboard">
              <Button variant="secondary">
                Retour au tableau de bord
              </Button>
            </Link>
            <Link href="/dashboard/cognitive/test">
              <Button>
                Passer le test
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
