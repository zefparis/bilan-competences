// FICHIER: src/app/dashboard/parcours/page.tsx

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ModulePageHeader } from "@/components/module-page-header"
import { LifePathForm } from "./LifePathForm"
import { LifePathChart } from "./LifePathChart"
import { RotateCcw, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
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

export default function LifePathPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  const handleEventAdded = () => {
    console.log('Événement ajouté, refresh trigger') // Debug
    setRefreshTrigger(prev => prev + 1)
  }

  const handleReset = async () => {
    setIsResetting(true)
    try {
      const res = await fetch('/api/life-events/reset', {
        method: 'DELETE'
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Parcours réinitialisé', {
          description: data.message
        })
        setRefreshTrigger(prev => prev + 1)
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
          title="Mon Parcours"
          description="Construisez la timeline de votre parcours (pro/perso/formation) et identifiez les moments clés."
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
                Réinitialiser le parcours ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera <strong>tous vos événements</strong> de parcours. 
                Vous pourrez recommencer à zéro. Cette action est <strong>irréversible</strong>.
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
        <h2 className="text-xl font-semibold mb-4">Ajouter un événement</h2>
        <LifePathForm onEventAdded={handleEventAdded} />
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Visualisation de mon parcours</h2>
        <LifePathChart refreshKey={refreshTrigger} />
      </Card>
    </div>
  )
}