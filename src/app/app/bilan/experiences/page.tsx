"use client"

import { BadgeCheck, ClipboardList, Star } from "lucide-react"

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

const experiences = [
  {
    title: "Chef de projet digital",
    organisation: "Collectif Nova",
    period: "2020 - Aujourd'hui",
    context: "Pilotage d'une squad produit de 6 personnes sur un CRM propriétaire.",
    skills: ["Pilotage produit", "Coaching agile", "UX Research"],
    score: 85,
  },
  {
    title: "Consultant innovation",
    organisation: "Agence Aleph",
    period: "2018 - 2020",
    context: "Accompagnement de PME industrielles sur la digitalisation.",
    skills: ["Facilitation", "Design Sprint", "Storytelling"],
    score: 72,
  },
]

export default function ExperiencesModulePage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Module Expériences"
        description="Décrivez vos missions, responsabilités et apprenez à valoriser vos compétences transférables."
        completion={54}
        actions={
          <Button variant="secondary" size="sm">
            Importer un CV
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.title}>
              <CardHeader>
                <CardDescription>{exp.organisation}</CardDescription>
                <CardTitle className="flex items-center justify-between gap-4">
                  <span>{exp.title}</span>
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </CardTitle>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {exp.context}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Niveau de maîtrise</span>
                    <span className="font-medium">{exp.score}%</span>
                  </div>
                  <Progress value={exp.score} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ajuster la fiche
                </Button>
                <Button variant="ghost" size="sm">
                  Dupliquer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une expérience</CardTitle>
              <CardDescription>
                Une fiche claire avec missions, preuves et compétences associées.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Intitulé du poste" />
              <Input placeholder="Organisation" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Début" type="month" />
                <Input placeholder="Fin" type="month" />
              </div>
              <Textarea placeholder="Missions clés, livrables, résultats..." />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Enregistrer</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Focus compétences</CardTitle>
              <CardDescription>
                Sélectionnez 3 compétences à renforcer ces 3 prochains mois.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Leadership", "Analyse de données", "Communication client"].map(
                (skill) => (
                  <label
                    key={skill}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm hover:border-primary"
                  >
                    <input type="checkbox" className="accent-primary" />
                    {skill}
                  </label>
                )
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Prioriser
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle>Feedback CEP</CardTitle>
              <CardDescription>Dernier commentaire reçu</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                « Ta présentation d&apos;expérience est très claire, on ressent ta progression. Ajoute une
                preuve chiffrée sur la réduction des délais pour renforcer l&apos;impact. »
              </p>
              <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider">
                <ClipboardList className="h-4 w-4" />
                CEP - 12 déc. 2025
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full">
                Voir l&apos;historique
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </section>
    </div>
  )
}
