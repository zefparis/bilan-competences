"use client"

import { CheckCircle2, HeartHandshake, Target } from "lucide-react"

import { ModulePageHeader } from "@/components/module-page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const coreValues = [
  {
    label: "Innovation responsable",
    description: "Créer un impact par la technologie en respectant l'humain",
    negotiable: "Non négociable",
  },
  { label: "Transmission", description: "Partager le savoir, mentorer les équipes", negotiable: "Souple" },
  {
    label: "Clarté stratégique",
    description: "Avancer avec une vision lisible, des priorités assumées",
    negotiable: "Non négociable",
  },
]

export default function ValeursModulePage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Module Valeurs"
        description="Identifiez les repères essentiels qui doivent guider vos décisions professionnelles."
        completion={62}
        actions={
          <Button variant="secondary" size="sm">
            Générer un nuage de valeurs
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {coreValues.map((value) => (
            <Card key={value.label} className="border border-primary/15">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  {value.label}
                </CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
              <CardFooter className="text-xs uppercase tracking-wide text-muted-foreground">
                {value.negotiable}
              </CardFooter>
            </Card>
          ))}
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Clarifier vos priorités</CardTitle>
              <CardDescription>Quand vos valeurs sont respectées ? Quelles alertes ?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea placeholder="Je me sens aligné quand..." />
              <Textarea placeholder="Les signaux que cela se dégrade..." />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5</CardTitle>
              <CardDescription>Glisser-déposer dans la version finale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Exigence", "Co-opération", "Liberté créative", "Utilité sociale", "Intégrité"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-md border border-border/70 px-4 py-2 text-sm"
                  >
                    <span>
                      #{index + 1} {item}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                )
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intention</CardTitle>
              <CardDescription>Focus du moment</CardDescription>
            </CardHeader>
            <CardContent className="text-sm flex items-center gap-3 text-muted-foreground">
              <Target className="h-5 w-5 text-primary" />
              Garder 1 journée / semaine dédiée à la transmission, même en phase intense.
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
