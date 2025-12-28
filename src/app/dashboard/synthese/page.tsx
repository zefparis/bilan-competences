"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModulePageHeader } from "@/components/module-page-header"
import { PDFGenerator } from "./PDFGenerator"
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Brain, Sparkles, Target } from "lucide-react"
import { getCareerRecommendation, getIdealEnvironment } from "@/lib/career-logic"

type CognitiveAnalysis = {
  archetype: {
    name: string
    description: string
    workEnvironment: string
  }
  dynamics: {
    dominant: string
    secondary: string | null
    detailLevel: string
  }
  traits: string[]
  strengths: string[]
  blindSpots: string[]
  evolutionLever: string
  strategicSynthesis: string
}

type Summary = {
  assessmentId: string
  lifePath: any
  experiences: any[]
  values: any[]
  riasecResult: {
    scoreR: number
    scoreI: number
    scoreA: number
    scoreS: number
    scoreE: number
    scoreC: number
    topCode: string
  } | null
  cognitiveProfile: {
    dominant_cognition: string
    profile_code: string
  } | null
  cognitiveAnalysis: CognitiveAnalysis | null
  cognitiveInsights: any[]
}

export default function SynthesePage() {
  const [data, setData] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch("/api/assessment/summary")
        if (!res.ok) throw new Error("Erreur lors de la récupération des données")
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const riasecData = data?.riasecResult ? [
    { subject: 'Réaliste', A: data.riasecResult.scoreR, fullMark: 100 },
    { subject: 'Investigateur', A: data.riasecResult.scoreI, fullMark: 100 },
    { subject: 'Artistique', A: data.riasecResult.scoreA, fullMark: 100 },
    { subject: 'Social', A: data.riasecResult.scoreS, fullMark: 100 },
    { subject: 'Entreprenant', A: data.riasecResult.scoreE, fullMark: 100 },
    { subject: 'Conventionnel', A: data.riasecResult.scoreC, fullMark: 100 },
  ] : []

  // const cognitiveData = ... (Removed to strictly avoid raw scores)
  // Replaced by qualitative analysis in render

  return (
    <div className="space-y-6">
      <ModulePageHeader
        title="Synthèse Professionnelle"
        description="Vue d'ensemble de votre profil, combinant vos intérêts (RIASEC) et votre fonctionnement cognitif (HCS-U7)."
      />
      
      {loading ? (
        <Card className="p-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </Card>
      ) : error ? (
        <Card className="p-6 border-destructive bg-destructive/10">
          <p className="text-destructive">{error}</p>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RIASEC Chart */}
            <Card className="bg-card/50 backdrop-blur border-primary/10">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl">
                  Profil RIASEC
                  {data?.riasecResult && <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{data.riasecResult.topCode}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {riasecData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riasecData}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <Radar
                        name="RIASEC"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                    Complétez le module RIASEC pour voir le diagramme
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cognitive Analysis Card (Qualitative) */}
            <Card className="bg-card/50 backdrop-blur border-primary/10">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-xl">
                  Profil Cognitif HCS-U7
                  {data?.cognitiveProfile && <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">{data.cognitiveProfile.profile_code}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex flex-col justify-center">
                {data?.cognitiveAnalysis ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-emerald-500/10 mb-2">
                        <Brain className="h-8 w-8 text-emerald-500" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{data.cognitiveAnalysis.archetype.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{data.cognitiveAnalysis.archetype.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {data.cognitiveAnalysis.traits.slice(0, 4).map((trait, i) => (
                        <div key={i} className="bg-background/50 px-3 py-2 rounded text-xs text-center border border-border/50">
                          {trait}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                    Complétez le test cognitif pour voir votre analyse
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Conclusion Professionnelle Section */}
          {data?.cognitiveAnalysis && (
            <Card className="border-primary/20 bg-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Conclusion Stratégique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground/90 italic">
                  {data.cognitiveAnalysis.strategicSynthesis}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/40 border border-primary/10">
                    <h4 className="font-semibold text-primary mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="h-4 w-4" /> Vos points forts
                    </h4>
                    <ul className="space-y-2">
                      {data.cognitiveAnalysis.strengths.slice(0, 3).map((strength, i) => (
                        <li key={i} className="text-sm flex gap-2">
                          <span className="text-primary">•</span> {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-background/40 border border-primary/10">
                    <h4 className="font-semibold text-primary mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                      <Target className="h-4 w-4" /> Environnement idéal
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {data.cognitiveAnalysis.archetype.workEnvironment}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PDF Generation Card */}
          <Card className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-white">Rapport de Synthèse Complet</h2>
              <p className="text-slate-400 text-sm">Téléchargez votre dossier au format PDF incluant tous vos résultats détaillés.</p>
            </div>
            <PDFGenerator />
          </Card>
        </div>
      )}
    </div>
  )
}
