import { Card } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { LifePathForm } from "./LifePathForm"
import { LifePathChart } from "./LifePathChart"

export default function LifePathPage() {
  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Mon Parcours"
        description="Construisez la timeline de votre parcours (pro/perso/formation) et identifiez les moments clés."
      />
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un événement</h2>
        <LifePathForm />
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Visualisation de mon parcours</h2>
        <LifePathChart />
      </Card>
    </div>
  )
}
