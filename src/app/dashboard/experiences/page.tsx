import { Card } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { ExperienceForm } from "./ExperienceForm"

export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Mes Expériences"
        description="Ajoutez vos expériences clés et structurez-les avec la méthode STAR pour identifier vos compétences."
      />
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter une expérience (Méthode STAR)</h2>
        <ExperienceForm />
      </Card>
    </div>
  )
}
