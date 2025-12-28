"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ModuleStatus = "locked" | "pending" | "in_progress" | "completed"

type DashboardSummary = {
  assessmentId: string
  completionRate: number
  modulesCompleted: number
  totalModules: number
  lastActivity: string | null
  recommendations: number
  modules: {
    parcours: { status: ModuleStatus; progress: number; countEvents: number }
    experiences: { status: ModuleStatus; progress: number; countExperiences: number }
    valeurs: { status: ModuleStatus; progress: number; countValues: number }
    riasec: { status: ModuleStatus; progress: number; topCode: string | null }
    cognitive: { status: ModuleStatus; progress: number; dominant: string | null }
    synthese: { status: ModuleStatus; progress: number }
  }
}

function statusLabel(status: ModuleStatus) {
  if (status === "completed") return "Terminé ✓"
  if (status === "in_progress") return "En cours"
  if (status === "pending") return "À commencer"
  return "Verrouillé"
}

function statusColorClass(status: ModuleStatus) {
  if (status === "completed") return "text-green-500"
  if (status === "in_progress") return "text-blue-500"
  if (status === "pending") return "text-yellow-500"
  return "text-gray-500"
}

function primaryActionVariant(status: ModuleStatus) {
  if (status === "completed") return "outline" as const
  if (status === "in_progress") return "default" as const
  if (status === "pending") return "secondary" as const
  return "ghost" as const
}

function primaryActionLabel(status: ModuleStatus) {
  if (status === "completed") return "Voir"
  if (status === "in_progress") return "Continuer"
  if (status === "pending") return "Commencer"
  return "Verrouillé"
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Shield, HelpCircle, RefreshCcw, Settings } from "lucide-react"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const res = await fetch("/api/dashboard/summary", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          throw new Error(`Erreur ${res.status}`)
        }

        const json = (await res.json()) as DashboardSummary
        if (!cancelled) setSummary(json)
      } catch {
        if (!cancelled) setSummary(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Dashboard - Bilan de Compétences
            </h1>
            <p className="text-muted-foreground">
              Bienvenue dans votre espace de bilan de compétences
            </p>
            {summary?.lastActivity && (
              <p className="text-xs text-muted-foreground mt-2">Dernière activité: {summary.lastActivity}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-medium">
              PostgreSQL Live
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loading ? "..." : `${summary?.completionRate ?? 0}%`}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Modules Terminés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : `${summary?.modulesCompleted ?? 0}/${summary?.totalModules ?? 5}`}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? "..." : (summary?.recommendations ?? 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Score IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">94.2%</div>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <h2 className="text-2xl font-bold mb-4">Modules du Bilan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Parcours de Vie</CardTitle>
              <CardDescription>Timeline interactive de votre parcours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`${statusColorClass(summary?.modules.parcours.status ?? "pending")} font-medium`}>
                  {statusLabel(summary?.modules.parcours.status ?? "pending")}
                  {!loading && summary?.modules.parcours.countEvents !== undefined && (
                    <span className="ml-2 text-xs text-muted-foreground">({summary.modules.parcours.countEvents}/3)</span>
                  )}
                </span>
                <Link href="/dashboard/parcours">
                  <Button variant={primaryActionVariant(summary?.modules.parcours.status ?? "pending")} size="sm">
                    {primaryActionLabel(summary?.modules.parcours.status ?? "pending")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Expériences STAR</CardTitle>
              <CardDescription>Analysez vos expériences professionnelles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`${statusColorClass(summary?.modules.experiences.status ?? "pending")} font-medium`}>
                  {statusLabel(summary?.modules.experiences.status ?? "pending")}
                  {!loading && summary?.modules.experiences.countExperiences !== undefined && (
                    <span className="ml-2 text-xs text-muted-foreground">({summary.modules.experiences.countExperiences}/3)</span>
                  )}
                </span>
                <Link href="/dashboard/experiences">
                  <Button variant={primaryActionVariant(summary?.modules.experiences.status ?? "pending")} size="sm">
                    {primaryActionLabel(summary?.modules.experiences.status ?? "pending")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Tri des Valeurs</CardTitle>
              <CardDescription>Définissez vos valeurs fondamentales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`${statusColorClass(summary?.modules.valeurs.status ?? "pending")} font-medium`}>
                  {statusLabel(summary?.modules.valeurs.status ?? "pending")}
                  {!loading && summary?.modules.valeurs.countValues !== undefined && (
                    <span className="ml-2 text-xs text-muted-foreground">({summary.modules.valeurs.countValues}/5)</span>
                  )}
                </span>
                <Link href="/dashboard/valeurs">
                  <Button variant={primaryActionVariant(summary?.modules.valeurs.status ?? "pending")} size="sm">
                    {primaryActionLabel(summary?.modules.valeurs.status ?? "pending")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Test RIASEC</CardTitle>
              <CardDescription>Découvrez votre profil professionnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`${statusColorClass(summary?.modules.riasec.status ?? "pending")} font-medium`}>
                  {statusLabel(summary?.modules.riasec.status ?? "pending")}
                  {!loading && summary?.modules.riasec.topCode && (
                    <span className="ml-2 text-xs text-muted-foreground">({summary.modules.riasec.topCode})</span>
                  )}
                </span>
                <Link href="/dashboard/riasec">
                  <Button variant={primaryActionVariant(summary?.modules.riasec.status ?? "pending")} size="sm">
                    {primaryActionLabel(summary?.modules.riasec.status ?? "pending")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Profil Cognitif</CardTitle>
              <CardDescription>Analyse HCS-U7 (Form/Color/Volume/Sound)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`${statusColorClass(summary?.modules.cognitive.status ?? "pending")} font-medium`}>
                  {statusLabel(summary?.modules.cognitive.status ?? "pending")}
                  {!loading && summary?.modules.cognitive.dominant && (
                    <span className="ml-2 text-xs text-muted-foreground">({summary.modules.cognitive.dominant})</span>
                  )}
                </span>
                <Link href="/dashboard/cognitive">
                  <Button variant={primaryActionVariant(summary?.modules.cognitive.status ?? "pending")} size="sm">
                    {primaryActionLabel(summary?.modules.cognitive.status ?? "pending")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Évaluation Cognitive PERSPECTA</CardTitle>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded">Premium</span>
              </div>
              <CardDescription>4 tests comportementaux • Signature cognitive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-primary font-medium">Nouveau</span>
                <Link href="/dashboard/cognitive-assessment">
                  <Button variant="default" size="sm">
                    Commencer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rapport d'Orientation</CardTitle>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded">Premium</span>
              </div>
              <CardDescription>Dossier complet • 10 sections • Export PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-primary font-medium">Nouveau</span>
                <Link href="/dashboard/report">
                  <Button variant="default" size="sm">
                    Générer
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Synthèse Finale</CardTitle>
              <CardDescription>Générez votre rapport PDF complet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className={`${statusColorClass(summary?.modules.synthese.status ?? "locked")} font-medium`}>
                  {statusLabel(summary?.modules.synthese.status ?? "locked")}
                </span>
                <Link href="/dashboard/synthese">
                  <Button
                    variant={primaryActionVariant(summary?.modules.synthese.status ?? "locked")}
                    size="sm"
                    disabled={(summary?.modules.synthese.status ?? "locked") === "locked"}
                  >
                    {primaryActionLabel(summary?.modules.synthese.status ?? "locked")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
