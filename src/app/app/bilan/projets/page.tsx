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
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Désirabilité</span>
                    <span className="font-medium">{project.desirability}%</span>
                  </div>
                  <Progress value={project.desirability} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Faisabilité</span>
                    <span className="font-medium">{project.feasibility}%</span>
                  </div>
                  <Progress value={project.feasibility} />
                </div>
              </CardContent>
              <CardContent className="space-y-3">
                <h4 className="text-sm font-medium">Actions clés</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {project.actions.map((action) => (
                    <li key={action} className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-primary" />
                      {action}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
                <Button variant="ghost" size="sm">
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Planifier
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Card>
            <CardHeader>
              <CardTitle>Nouveau scénario</CardTitle>
              <CardDescription>
                Formalisez une nouvelle piste professionnelle à explorer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Intitulé du projet" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Horizon (ex: 3-6 mois)" />
                <Input placeholder="Organisation (optionnel)" />
              </div>
              <Textarea placeholder="Description, motivations, critères..." />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Désirabilité</label>
                  <Input type="number" min="0" max="100" placeholder="0-100" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Faisabilité</label>
                  <Input type="number" min="0" max="100" placeholder="0-100" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Compass className="h-4 w-4 mr-2" />
                Enregistrer ce scénario
              </Button>
            </CardFooter>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matrice d'évaluation</CardTitle>
              <CardDescription>
                Comparez vos projets selon vos critères personnels
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Priorité 1: Alignement valeurs</p>
              <p>Priorité 2: Équilibre vie pro/perso</p>
              <p>Priorité 3: Potentiel d'impact</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                Rencontrer 3 personnes du secteur d'ici janvier
              </p>
              <p className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                Tester 1 journée dans une coopérative
              </p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
