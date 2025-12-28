import { Card } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { RiasecTest } from "./RiasecTest"
import { RiasecResult } from "./RiasecResult"

export default function RiasecPage() {
  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Test RIASEC"
        description="Répondez au questionnaire pour obtenir votre profil (R/I/A/S/E/C) et vos orientations dominantes."
      />
      
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
