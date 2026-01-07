"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ModulePageHeader } from "@/components/module-page-header"
import { RiasecTest } from "./RiasecTest"
import { RiasecResult } from "./RiasecResult"
import { RotateCcw, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function RiasecPage() {
  const router = useRouter()
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = async () => {
    setIsResetting(true)
    try {
      const res = await fetch('/api/assessment/reset-riasec', {
        method: 'DELETE'
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Test RIASEC réinitialisé', {
          description: data.message
        })
        router.refresh()
      } else {
        const error = await res.json()
        toast.error('Erreur', {
          description: error.error || 'Impossible de réinitialiser'
        })
      }
    } catch (error) {
      toast.error('Erreur réseau')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <ModulePageHeader
          title="Test RIASEC"
          description="Répondez au questionnaire pour obtenir votre profil (R/I/A/S/E/C) et vos orientations dominantes."
        />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-orange-400 border-orange-400/30 hover:bg-orange-400/10">
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Réinitialiser le test RIASEC ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera <strong>vos résultats RIASEC</strong> et vous devrez 
                refaire le test complet. Cette action est <strong>irréversible</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                disabled={isResetting}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isResetting ? 'Suppression...' : 'Oui, réinitialiser'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Questionnaire</h2>
        <RiasecTest />
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Résultats</h2>
        <RiasecResult />
      </Card>
    </div>
  )
}
