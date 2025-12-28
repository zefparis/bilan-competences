import { Card } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { ValuesBoard } from "./ValuesBoard"

export default function ValuesPage() {
  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Mes Valeurs"
        description="Sélectionnez et classez vos valeurs principales pour clarifier vos moteurs de motivation."
      />
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sélectionnez vos 5 valeurs principales</h2>
        <ValuesBoard />
      </Card>
    </div>
  )
}
