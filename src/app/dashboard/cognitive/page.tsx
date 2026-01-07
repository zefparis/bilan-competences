"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { Brain, Lightbulb, Target, Sparkles, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type CognitiveDimension = "form" | "color" | "volume" | "sound"

type CognitiveAnalysis = {
  archetype: {
    name: string
    description: string
    workEnvironment: string
  }
  dynamics: {
    dominant: CognitiveDimension
    secondary: CognitiveDimension | null
    detailLevel: "Vue d'ensemble" | "Équilibré" | "Détail expert"
  }
  traits: string[]
  strengths: string[]
  blindSpots: string[]
  evolutionLever: string
  strategicSynthesis: string
}

type CognitiveInsight = {
  id: string
  userId: string
  insight_type: "strength" | "challenge" | "career" | "learning"
  title: string
  description: string
  priority: number
}

type RadarDataPoint = {
  dimension: string
  label: string
  level: number
}

export default function CognitivePage() {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<{ analysis: CognitiveAnalysis | null; insights: CognitiveInsight[]; radarData?: RadarDataPoint[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)
        console.log("[Cognitive Page] Fetching profile...")
        const res = await fetch("/api/cognitive/profile")
        console.log("[Cognitive Page] Response status:", res.status)
        
        const json = await res.json()
        console.log("[Cognitive Page] Response data:", json)
        
        if (!res.ok) {
          throw new Error(json?.message || `Erreur ${res.status}`)
        }
        
        setData(json)
      } catch (err) {
        console.error("[Cognitive Page] Fetch error:", err)
        setError(err instanceof Error ? err.message : "Erreur de chargement")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const analysis = data?.analysis ?? null
  const insights = data?.insights ?? []

  if (!mounted) {
    return (
      <div className="space-y-6 p-8">
        <div className="h-20 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
      </div>
    )
  }

  const handleReset = async () => {
    setIsResetting(true)
    try {
      const res = await fetch('/api/assessment/reset-cognitive', {
        method: 'DELETE'
      })

      if (res.ok) {
        const data = await res.json()
        toast.success('Test cognitif réinitialisé', {
          description: data.message
        })
        window.location.reload()
      } else {
        const error = await res.json()
        toast.error('Erreur', {
          description: error.error || 'Impossible de réinitialiser'
        })
      }
    } catch (error) {
      toast.error('Erreur réseau')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <ModulePageHeader
          title="Profil Cognitif HCS-U7"
          description="Analyse de votre fonctionnement mental et recommandations stratégiques."
          actions={
            <Link href="/dashboard/cognitive/test">
              <Button size="sm" variant="outline">Repasser le test</Button>
            </Link>
          }
        />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-orange-400 border-orange-400/30 hover:bg-orange-400/10">
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Réinitialiser le test cognitif ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera <strong>votre profil cognitif HCS-U7</strong> et toutes vos sessions de test. 
                Vous devrez refaire le test complet. Cette action est <strong>irréversible</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                disabled={isResetting}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isResetting ? 'Suppression...' : 'Oui, réinitialiser'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {loading && (
        <Card className="p-12 border-none bg-transparent shadow-none">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground animate-pulse font-medium">Calcul de votre profil en cours...</p>
          </div>
        </Card>
      )}

      {error && (
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <div className="space-y-4 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive mx-auto" />
            <p className="text-destructive font-medium">Impossible de charger votre profil.</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => window.location.reload()}>Réessayer</Button>
              <Link href="/dashboard/cognitive/test">
                <Button>Passer le test</Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {!loading && !error && !analysis && (
        <Card className="border-dashed border-2 bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
            <div className="bg-background p-4 rounded-full shadow-sm">
              <Brain className="h-12 w-12 text-primary" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-bold">Votre profil n'est pas encore défini</h3>
              <p className="text-muted-foreground">
                Le test HCS-U7 permet d'identifier vos mécanismes de pensée naturels.
                Cela prend environ 10 minutes.
              </p>
            </div>
            <Link href="/dashboard/cognitive/test">
              <Button size="lg" className="shadow-lg shadow-primary/20">
                Démarrer l'analyse <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!loading && !error && analysis && (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Two Column Layout: Radar + Archetype */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Profil Cognitif HCS-U7
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data?.radarData && (
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={data.radarData}>
                      <PolarGrid stroke="hsl(var(--primary)/0.2)" />
                      <PolarAngleAxis 
                        dataKey="label" 
                        tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 5]} 
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name="Niveau"
                        dataKey="level"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.4}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Archetype Card */}
            <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain className="h-24 w-24" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur border-primary/30 text-primary">
                    Archétype Dominant
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                  {analysis.archetype.name}
                </CardTitle>
                <CardDescription className="text-base mt-2 text-foreground/80">
                  {analysis.archetype.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.traits.map((trait) => (
                    <Badge key={trait} className="px-3 py-1 text-sm bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Synthesis & Environment */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="h-full border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Synthèse Stratégique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {analysis.strategicSynthesis}
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-l-4 border-l-emerald-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-500" />
                  Environnement Idéal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  {analysis.archetype.workEnvironment}
                </p>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Levier d'évolution
                  </h4>
                  <p className="text-sm italic text-muted-foreground">
                    "{analysis.evolutionLever}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Grid */}
          <h3 className="text-xl font-bold mt-4">Points Clés de l'Analyse</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <Card 
                key={insight.id} 
                className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${
                  insight.insight_type === 'strength' ? 'border-l-primary' :
                  insight.insight_type === 'challenge' ? 'border-l-amber-500' :
                  insight.insight_type === 'career' ? 'border-l-emerald-500' :
                  'border-l-blue-500'
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-semibold">{insight.title}</CardTitle>
                    {insight.insight_type === 'strength' && <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">Force</Badge>}
                    {insight.insight_type === 'challenge' && <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-0">Vigilance</Badge>}
                    {insight.insight_type === 'career' && <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">Carrière</Badge>}
                    {insight.insight_type === 'learning' && <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">Conseil</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
