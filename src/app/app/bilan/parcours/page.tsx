"use client"

import { Calendar, Clock, Flag } from "lucide-react"

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

const timeline = [
  {
    title: "Licence Informatique",
    period: "2014 - 2017",
    category: "Formation",
    summary: "Bases solides en algorithmique, projet tutoré sur la gestion RH.",
    satisfaction: 8,
  },
  {
    title: "Développeur Front-end",
    period: "2017 - 2020",
    category: "Expérience Pro",
    summary: "Intégration React, animation d'ateliers UX avec l'équipe produit.",
    satisfaction: 7,
  },
  {
    title: "Chef de projet digital",
    period: "2020 - Aujourd'hui",
    category: "Expérience Pro",
    summary: "Pilotage d'une squad de 6 personnes, déploiement d'un CRM maison.",
    satisfaction: 9,
  },
]

export default function ParcoursModulePage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Module Parcours"
        description="Cartographiez vos expériences de vie marquantes pour identifier les moments clés, apprentissages et transformations."
        completion={48}
        actions={
          <Button size="sm" variant="secondary">
            Exporter la frise
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          {timeline.map((event) => (
            <Card key={event.title}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardDescription className="uppercase text-xs tracking-wider">
                    {event.category}
                  </CardDescription>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {event.period}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Satisfaction {event.satisfaction}/10
                </span>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {event.summary}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
                <Button variant="ghost" size="sm">
                  Déplacer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moments charnières</CardTitle>
              <CardDescription>
                Notez ici les découvertes, prises de conscience, ruptures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Qu'avez-vous appris sur vous ?" />
              <Textarea placeholder="Quels besoins nouveaux sont apparus ?" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actions à planifier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Finaliser la ligne de vie (2 créneaux restants)
              </p>
              <p className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-primary" />
                Préparer les questions pour l'entretien CEP
              </p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  )
}
