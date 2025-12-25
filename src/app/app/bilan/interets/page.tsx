"use client"

import { Sparkles, ThumbsUp, TrendingUp } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"

const interestAreas = [
  {
    label: "Innovation & design",
    score: 92,
    insight: "Tu vibres quand tu peux prototyper, tester, explorer de nouveaux usages.",
  },
  {
    label: "Transmission & pédagogie",
    score: 78,
    insight: "Tu prends plaisir à rendre les idées accessibles, à faire progresser un collectif.",
  },
  {
    label: "Impact sociétal",
    score: 66,
    insight: "Tu veux sentir que ton travail répond à une utilité concrète, tangible.",
  },
]

export default function InteretsModulePage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Module Intérêts / Motivations"
        description="Captez ce qui vous anime profondément pour guider vos choix de projets."
        completion={40}
        actions={
          <Button variant="secondary" size="sm">
            Relancer le questionnaire
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {interestAreas.map((area) => (
            <Card key={area.label}>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {area.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-semibold">{area.score}/100</span>
                  </div>
                  <Progress value={area.score} />
                </div>
                <p className="text-sm text-muted-foreground">{area.insight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 3 activités à amplifier</CardTitle>
              <CardDescription>À intégrer dans les prochaines expérimentations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {["Faciliter des ateliers innovation", "Écrire/structurer des frameworks", "Coacher des juniors"].map(
                (item) => (
                  <p key={item} className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    {item}
                  </p>
                )
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hypothèses à tester</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Déployer un format de mentoring interne 2h / semaine.</p>
              <p>Explorer les métiers de design operations orientés impact.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ajouter une expérimentation
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Courbe d’énergie</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Motivation stable, pic quand projet combine innovation + pédagogie.
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
