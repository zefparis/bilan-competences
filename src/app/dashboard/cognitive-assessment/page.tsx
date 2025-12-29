"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Lock, CheckCircle, ArrowRight, Loader2, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { 
  StroopTest, 
  ReactionTimeTest, 
  TrailMakingTest, 
  RanVisualTest,
  type StroopTestData,
  type ReactionTimeTestData,
  type TrailMakingTestData,
  type RanVisualTestData,
} from "@/components/cognitive-tests"

type TestStep = "intro" | "stroop" | "reaction" | "trail" | "ran" | "processing" | "complete"

interface TestResults {
  stroop?: StroopTestData
  reactionTime?: ReactionTimeTestData
  trailMaking?: TrailMakingTestData
  ranVisual?: RanVisualTestData
}

export default function CognitiveAssessmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [hasPaid, setHasPaid] = useState(false)
  const [currentStep, setCurrentStep] = useState<TestStep>("intro")
  const [results, setResults] = useState<TestResults>({})
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      try {
        const res = await fetch("/api/user/profile")
        if (res.ok) {
          const data = await res.json()
          setHasPaid(data.hasPaid === true)
        }
      } catch (error) {
        console.error("Error checking access:", error)
      } finally {
        setLoading(false)
      }
    }
    checkAccess()
  }, [])

  const startAssessment = useCallback(async () => {
    try {
      const res = await fetch("/api/cognitive/session", {
        method: "POST",
      })
      if (res.ok) {
        const data = await res.json()
        setSessionId(data.id)
        setCurrentStep("stroop")
      }
    } catch (error) {
      console.error("Error starting session:", error)
    }
  }, [])

  const handleStroopComplete = useCallback(async (data: StroopTestData) => {
    setResults(prev => ({ ...prev, stroop: data }))
    
    if (sessionId) {
      await fetch("/api/cognitive/session/stroop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, data }),
      })
    }
    
    setCurrentStep("reaction")
  }, [sessionId])

  const handleReactionComplete = useCallback(async (data: ReactionTimeTestData) => {
    setResults(prev => ({ ...prev, reactionTime: data }))
    
    if (sessionId) {
      await fetch("/api/cognitive/session/reaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, data }),
      })
    }
    
    setCurrentStep("trail")
  }, [sessionId])

  const handleTrailComplete = useCallback(async (data: TrailMakingTestData) => {
    setResults(prev => ({ ...prev, trailMaking: data }))
    
    if (sessionId) {
      await fetch("/api/cognitive/session/trail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, data }),
      })
    }
    
    setCurrentStep("ran")
  }, [sessionId])

  const handleRanComplete = useCallback(async (data: RanVisualTestData) => {
    setResults(prev => ({ ...prev, ranVisual: data }))
    setCurrentStep("processing")
    setSaving(true)
    
    try {
      if (sessionId) {
        await fetch("/api/cognitive/session/ran", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, data }),
        })
        
        // Compute signature
        await fetch("/api/cognitive/session/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        })
      }
      
      setCurrentStep("complete")
    } catch (error) {
      console.error("Error completing session:", error)
    } finally {
      setSaving(false)
    }
  }, [sessionId])

  const getProgress = () => {
    switch (currentStep) {
      case "intro": return 0
      case "stroop": return 25
      case "reaction": return 50
      case "trail": return 75
      case "ran": return 90
      case "processing": return 95
      case "complete": return 100
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!hasPaid) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-border">
          <CardContent className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Module réservé aux utilisateurs premium
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                L'évaluation cognitive PERSPECTA est accessible après validation de votre bilan complet.
              </p>
            </div>
            <Link href="/pricing">
              <Button size="lg" className="gap-2">
                Débloquer mon bilan — 49 €
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "intro") {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        {/* Header avec bouton retour */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </Button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              Évaluation Cognitive PERSPECTA
            </h1>
            <p className="text-muted-foreground">
              Cette batterie de tests mesure vos capacités cognitives à travers 4 épreuves comportementales.
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cette batterie de tests mesure vos capacités cognitives à travers 4 épreuves comportementales. 
            Les résultats produiront votre signature cognitive personnalisée.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Batterie de tests</CardTitle>
            <CardDescription>Durée estimée : 15-20 minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { num: 1, title: "Test de Stroop", desc: "Contrôle inhibiteur", duration: "3 min" },
              { num: 2, title: "Temps de Réaction", desc: "Vitesse de traitement", duration: "3 min" },
              { num: 3, title: "Trail Making", desc: "Flexibilité cognitive", duration: "5 min" },
              { num: 4, title: "RAN Visuel", desc: "Accès cognitif rapide", duration: "3 min" },
            ].map(test => (
              <div key={test.num} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {test.num}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{test.title}</p>
                  <p className="text-sm text-muted-foreground">{test.desc}</p>
                </div>
                <span className="text-sm text-muted-foreground">{test.duration}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Méthodologie propriétaire :</strong> Cette analyse repose sur des modèles cognitifs 
                issus de travaux de recherche protégés par brevets déposés (INPI France). 
                Les tests mesurent des comportements observables et non des auto-déclarations.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Button onClick={startAssessment} size="lg" className="gap-2">
            Commencer l'évaluation
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            Installez-vous dans un endroit calme. Évitez les distractions pendant les tests.
          </p>
        </div>
      </div>
    )
  }

  if (currentStep === "processing") {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Analyse en cours...
              </h2>
              <p className="text-muted-foreground">
                Calcul de votre signature cognitive personnalisée
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "complete") {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Évaluation terminée
              </h2>
              <p className="text-muted-foreground">
                Votre signature cognitive a été générée avec succès.
              </p>
            </div>
            <Link href={`/dashboard/cognitive-assessment/results${sessionId ? `?session=${sessionId}` : ""}`}>
              <Button size="lg" className="gap-2">
                Voir ma restitution
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progression</span>
          <span className="text-primary font-medium">{getProgress()}%</span>
        </div>
        <Progress value={getProgress()} className="h-2" />
      </div>

      {/* Current test */}
      {currentStep === "stroop" && (
        <StroopTest onComplete={handleStroopComplete} />
      )}
      {currentStep === "reaction" && (
        <ReactionTimeTest onComplete={handleReactionComplete} />
      )}
      {currentStep === "trail" && (
        <TrailMakingTest onComplete={handleTrailComplete} />
      )}
      {currentStep === "ran" && (
        <RanVisualTest onComplete={handleRanComplete} />
      )}
    </div>
  )
}
