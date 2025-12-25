"use client"

import Link from "next/link"
import { BookMarked, Brain, FileText, FolderGit2, Handshake, Map } from "lucide-react"

import { ModulePageHeader } from "@/components/module-page-header"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const modules = [
  {
    key: "parcours",
    title: "Parcours",
    description: "Ligne de vie, moments clés et apprentissages",
    icon: Map,
    href: "/app/bilan/parcours",
  },
  {
    key: "experiences",
    title: "Expériences",
    description: "Compétences, tâches, responsabilités",
    icon: BookMarked,
    href: "/app/bilan/experiences",
  },
  {
    key: "valeurs",
    title: "Valeurs",
    description: "Ce qui compte le plus pour vous au travail",
    icon: Handshake,
    href: "/app/bilan/valeurs",
  },
  {
    key: "interets",
    title: "Intérêts",
    description: "Centres d’intérêt, motivations profondes",
    icon: Brain,
    href: "/app/bilan/interets",
  },
  {
    key: "projets",
    title: "Projets",
    description: "Scénarios professionnels réalistes",
    icon: FolderGit2,
    href: "/app/bilan/projets",
  },
  {
    key: "synthese",
    title: "Synthèse",
    description: "Document final, plan d’action",
    icon: FileText,
    href: "/app/bilan/synthese",
  },
]

export default function BilanOverviewPage() {
  return (
    <div className="container py-10 space-y-8">
      <ModulePageHeader
        title="Mon Bilan de compétences"
        description="Retrouvez ici tous les modules nécessaires pour construire votre synthèse finale."
        completion={32}
        actions={
          <Button asChild size="sm">
            <Link href="/app/bilan/synthese">Voir la synthèse</Link>
          </Button>
        }
      />

      <section className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.key} className="flex flex-col">
            <CardHeader className="flex-1">
              <div className="flex items-center gap-3">
                <module.icon className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={module.href}>Accéder au module</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
