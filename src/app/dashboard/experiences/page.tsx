// FICHIER: src/app/dashboard/experiences/page.tsx

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ModulePageHeader } from "@/components/module-page-header"
import { ExperienceForm } from "./ExperienceForm"
import { ExperiencesList } from "./ExperiencesList"
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

export default function ExperiencePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  const handleExperienceAdded = () => {
    console.log('✅ Expérience ajoutée, refresh trigger')
    setRefreshTrigger(prev => prev + 1)
  }

  const handleReset = async () => {
    setIsResetting(true)
    try {
      const res = await fetch('/api/experiences/reset', {
        method: 'DELETE'
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Expériences réinitialisées', {
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
          title="Mes Expériences"
          description="Ajoutez vos expériences clés et structurez-les avec la méthode STAR pour identifier vos compétences."
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
                Réinitialiser les expériences ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera <strong>toutes vos expériences</strong> professionnelles. 
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
        <h2 className="text-xl font-semibold mb-4 text-green-400">
          Ajouter une expérience (Méthode STAR)
        </h2>
        <ExperienceForm onExperienceAdded={handleExperienceAdded} />
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-400">
          Mes expériences enregistrées
        </h2>
        <ExperiencesList refreshKey={refreshTrigger} />
      </Card>
    </div>
  )
}