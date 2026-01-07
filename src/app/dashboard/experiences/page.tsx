// FICHIER: src/app/dashboard/experiences/page.tsx

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { ExperienceForm } from "./ExperienceForm"
import { ExperiencesList } from "./ExperiencesList"

export default function ExperiencePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleExperienceAdded = () => {
    console.log('✅ Expérience ajoutée, refresh trigger')
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Mes Expériences"
        description="Ajoutez vos expériences clés et structurez-les avec la méthode STAR pour identifier vos compétences."
      />
      
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