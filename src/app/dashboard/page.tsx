"use client"

import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
import { LogOut, User, Shield, HelpCircle, RefreshCcw, Settings, CheckCircle, Circle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [cognitiveSession, setCognitiveSession] = useState<any>(null)
  const [cognitiveAssessmentCompleted, setCognitiveAssessmentCompleted] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [reportGeneratedAt, setReportGeneratedAt] = useState<string | null>(null)

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

  useEffect(() => {
    async function checkCognitiveAssessment() {
      try {
        const res = await fetch('/api/cognitive/session')

        if (res.ok) {
          const data = await res.json()

          // ✅ Vérifier que les 4 tests sont complétés + signature existe
          const completed = data.allTestsCompleted && data.hasSignature

          console.log('🧠 Évaluation Cognitive:', {
            testsCompleted: data.testsCompleted,
            allCompleted: data.allTestsCompleted,
            hasSignature: data.hasSignature,
            status: completed ? '✅' : '❌'
          })

          setCognitiveAssessmentCompleted(completed)
        }
      } catch (error) {
        console.error('❌ Erreur vérification évaluation cognitive:', error)
      }
    }

    checkCognitiveAssessment()
  }, [])

  useEffect(() => {
    async function checkReport() {
      try {
        const res = await fetch('/api/report/generate')

        if (res.ok) {
          const data = await res.json()
          setReportGenerated(true)
          setReportGeneratedAt(data.generatedAt)

          console.log('📄 Rapport:', {
            generated: true,
            date: data.generatedAt
          })
        } else {
          setReportGenerated(false)
        }
      } catch (error) {
        console.error('❌ Erreur vérification rapport:', error)
      }
    }

    checkReport()
  }, [])

  // ✅ Calculer le statut de l'évaluation cognitive
  const cognitiveCompleted = cognitiveSession?.allTestsCompleted && cognitiveSession?.hasSignature

  const testsCompleted = [
    cognitiveSession?.stroopCompleted,
    cognitiveSession?.reactionTimeCompleted,
    cognitiveSession?.trailMakingCompleted,
    cognitiveSession?.ranVisualCompleted
  ].filter(Boolean).length

  const totalTests = 4

  // ✅ TOUS les modules du bilan
  const modules = [
    { name: 'Parcours de Vie', completed: summary?.modules.parcours.status === 'completed' },
    { name: 'Expériences STAR', completed: summary?.modules.experiences.status === 'completed' },
    { name: 'Tri des Valeurs', completed: summary?.modules.valeurs.status === 'completed' },
    { name: 'Test RIASEC', completed: summary?.modules.riasec.status === 'completed' },
    { name: 'Profil Cognitif', completed: summary?.modules.cognitive.status === 'completed' },
    { name: 'Évaluation Cognitive', completed: cognitiveAssessmentCompleted },
    { name: 'Certification Professionnelle', completed: false }
  ]

  const modulesTermines = modules.filter(m => m.completed).length
  const totalModules = modules.length // 7

  console.log('📊 Modules terminés:', modulesTermines, '/', totalModules)
  console.log('Détail:', modules.map(m => `${m.name}: ${m.completed ? '✅' : '❌'}`))

  // Progression globale (pondérée selon la difficulté)
  const progressionWeighted = useMemo(() => {
    const weights = {
      'Parcours de Vie': 10,
      'Expériences STAR': 20,
      'Tri des Valeurs': 10,
      'Test RIASEC': 20,
      'Profil Cognitif': 15,
      'Évaluation Cognitive': 25,
      'Certification Professionnelle': 0
    }

    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0)

    let completedWeight = 0
    modules.forEach(module => {
      if (module.completed) {
        completedWeight += weights[module.name as keyof typeof weights]
      }
    })

    return Math.round((completedWeight / totalWeight) * 100)
  }, [modules])

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
              <div className="text-4xl font-bold text-amber-500">
                {loading ? "..." : `${progressionWeighted}%`}
              </div>
              <Progress value={progressionWeighted} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Basé sur la difficulté des modules
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Modules Terminés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : `${modulesTermines}/${totalModules}`}
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rapport Généré
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {reportGenerated ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                    <span className="text-2xl font-bold text-emerald-500">Oui</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-6 h-6 text-slate-400" />
                    <span className="text-2xl font-bold text-slate-400">Non</span>
                  </>
                )}
              </div>
              {reportGenerated && reportGeneratedAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  Généré le {new Date(reportGeneratedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
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

          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-primary">Évaluation Cognitive PERSPECTA</CardTitle>
                    {/* Badge Premium (optionnel, à garder si paywall) */}
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                      Premium
                    </Badge>
                  </div>
                  <CardDescription>
                    4 tests comportementaux • Signature cognitive
                  </CardDescription>
                </div>

                {/* Validation verte si terminé */}
                {cognitiveCompleted && (
                  <div className="flex items-center gap-1 text-emerald-500 font-medium text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Terminé</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progression des tests */}
              {!cognitiveCompleted && testsCompleted > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-medium">{testsCompleted}/{totalTests} tests</span>
                  </div>
                  <Progress value={(testsCompleted / totalTests) * 100} className="h-2" />
                </div>
              )}

              {/* Bouton unifié */}
              <Link href="/dashboard/cognitive-assessment">
                <Button
                  variant={cognitiveCompleted ? "outline" : "default"}
                  className="w-full"
                >
                  {cognitiveCompleted ? "Voir" : testsCompleted > 0 ? "Continuer" : "Commencer"}
                </Button>
              </Link>

              {/* Indicateur de statut détaillé (optionnel) */}
              {cognitiveCompleted && (
                <div className="text-xs text-muted-foreground text-center">
                  {testsCompleted}/{totalTests} tests complétés
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-yellow-500/30 bg-gradient-to-br from-background to-yellow-500/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-yellow-600">Certification Professionnelle</CardTitle>
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      Nouveau
                    </Badge>
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                      Premium
                    </Badge>
                  </div>
                  <CardDescription>
                    Tests techniques • Certificat blockchain • Matching emploi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/certification">
                <Button variant="default" className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Commencer
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-blue-500/30 bg-gradient-to-br from-background to-blue-500/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-blue-600">Projet Professionnel</CardTitle>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                      Universel
                    </Badge>
                  </div>
                  <CardDescription>
                    Définir votre projet • Analyse IA • Formations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/career-project">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
                  Accéder
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-purple-500/30 bg-gradient-to-br from-background to-purple-500/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-purple-600">Formations</CardTitle>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                      Universel
                    </Badge>
                  </div>
                  <CardDescription>
                    Recherche formations • CPF • Organismes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/formations">
                <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700">
                  Explorer
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-pink-500/30 bg-gradient-to-br from-background to-pink-500/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-pink-600">Accessibilité & Handicap</CardTitle>
                    <Badge variant="secondary" className="bg-pink-500/10 text-pink-600 border-pink-500/20">
                      Nouveau
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-500/10 text-slate-600 border-slate-500/20">
                      Optionnel
                    </Badge>
                  </div>
                  <CardDescription>
                    Module inclusif • RQTH • Aides AGEFIPH
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/accessibility">
                <Button variant="default" className="w-full bg-pink-600 hover:bg-pink-700">
                  Accéder
                </Button>
              </Link>
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
                <Link href="/dashboard/report">
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

        {/* Détail de progression par module */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Détail de la Progression</CardTitle>
            <CardDescription>
              État d'avancement de chaque module du bilan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {modules.map((module, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {module.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                    <span className={`font-medium ${module.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {module.name}
                    </span>
                  </div>
                  <span className={`text-sm ${module.completed ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {module.completed ? 'Terminé' : 'À faire'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
