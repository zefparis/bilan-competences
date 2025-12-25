"use client"

import { CalendarRange, ClipboardCheck, Compass, Share2 } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

const projects = [
  {
    title: "Lead Design Operations · Coopérative Tech Impact",
    horizon: "6-12 mois",
    desirability: 82,
    feasibility: 68,
    actions: ["Cartographier l'écosystème des coopératives", "Rencontrer 3 personnes clés"],
  },
  {
    title: "Consultant indépendant innovation publique",
    horizon: "3-6 mois",
    desirability: 74,
    feasibility: 55,
    actions: ["Faciliter des ateliers innovation", "Écrire/structurer des frameworks", "Coacher des juniors", "Vérifier le statut juridique"],
  },
]

export default function ProjetsModulePage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Module Projets"
        description="Formalisez vos scénarios professionnels, évaluez-les selon vos critères et préparez vos expérimentations."
        completion={38}
        actions={
          <Button size="sm" variant="secondary">
            Exporter la roadmap
          </Button>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[3fr,2fr]">
        <div className="space-y-6">
          {projects.map((project) => (
            <Card key={project.title}>
              <CardHeader>
                <CardDescription>{project.horizon}</CardDescription>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Désirabilité</span>
                      <span className="font-semibold">{project.desirability}%</span>
                    </div>
                    <Progress value={project.desirability} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Faisabilité</span>
                      <span className="font-semibold">{project.feasibility}%</span>
                    </div>
                    <Progress value={project.feasibility} />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Facteurs clés</p>
                  {project.actions.map((action) => (
                    <div
                      key={action}
                      className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-sm"
                    >
                      <span>{action}</span>
                      <ClipboardCheck className="h-4 w-4 text-primary" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ajuster
                </Button>
                <Button variant="ghost" size="sm">
                  Simuler
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter un projet</CardTitle>
              <CardDescription>Décrivez votre scénario target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Intitulé" />
              <Input placeholder="Horizon temporel" />
              <Textarea placeholder="Motivations, environnement de travail idéal..." />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Désirabilité (%)</label>
                  <Input type="number" min={0} max={100} defaultValue={70} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Faisabilité (%)</label>
                  <Input type="number" min={0} max={100} defaultValue={50} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enregistrer</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan d'expérimentation</CardTitle>
              <CardDescription>3 micro-actions par projet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4 text-primary" />
                Bloquer 2 demi-journées pour prototyper l'offre
              </p>
              <p className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                Pitcher le scénario à 2 personnes de confiance
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ajouter un test
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boussole</CardTitle>
              <CardDescription>Ce qui doit rester vrai</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
              <Compass className="h-5 w-5 text-primary" />
              Garder un rôle hybride création + facilitation pour rester aligné.
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
