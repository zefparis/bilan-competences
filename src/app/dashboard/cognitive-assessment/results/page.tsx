"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  Zap, 
  Shuffle, 
  Eye, 
  Activity, 
  Target, 
  AlertTriangle,
  ArrowLeft,
  Shield,
  Loader2,
  Lock
} from "lucide-react"

interface CognitiveSignature {
  inhibitoryControl: number
  processingSpeed: number
  cognitiveFlexibility: number
  accessFluency: number
  reactionVariance: number
  attentionDrift: number
  conflictErrors: number
  sequencingErrors: number
  interpretation: string
  rawMetrics: {
    stroop: any
    reaction: any
    trail: any
    ran: any
  }
}

interface SessionData {
  id: string
  completedAt: string
  signature: CognitiveSignature
}

function ScoreBar({ label, value, icon: Icon, color = "primary" }: { 
  label: string
  value: number
  icon: React.ElementType
  color?: string 
}) {
  const getColorClass = () => {
    if (value >= 70) return "bg-green-500"
    if (value >= 40) return "bg-primary"
    return "bg-amber-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-sm font-bold text-foreground">{value.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColorClass()}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function CognitiveResultsPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")
  
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<SessionData | null>(null)
  const [hasPaid, setHasPaid] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        // Check payment status
        const profileRes = await fetch("/api/user/profile")
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setHasPaid(profileData.hasPaid === true)
        }

        // Fetch session data
        const url = sessionId 
          ? `/api/cognitive/session/${sessionId}`
          : "/api/cognitive/session"
        
        const res = await fetch(url)
        if (res.ok) {
          const data = await res.json()
          setSession(data)
        }
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [sessionId])

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
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <Lock className="w-16 h-16 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Accès restreint</h1>
              <p className="text-muted-foreground">
                Les résultats de l'évaluation cognitive sont réservés aux utilisateurs premium.
              </p>
            </div>
            <Link href="/pricing">
              <Button>Débloquer mon bilan — 49 €</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!session || !session.signature) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <Brain className="w-16 h-16 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Aucune évaluation trouvée</h1>
              <p className="text-muted-foreground">
                Vous n'avez pas encore complété l'évaluation cognitive.
              </p>
            </div>
            <Link href="/dashboard/cognitive-assessment">
              <Button>Commencer l'évaluation</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { signature } = session

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au tableau de bord
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Signature Cognitive</h1>
            <p className="text-muted-foreground">
              Évaluation complétée le {new Date(session.completedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Dimensions cognitives principales</CardTitle>
          <CardDescription>
            Scores normalisés sur une échelle de 0 à 100
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <ScoreBar 
              label="Contrôle inhibiteur" 
              value={signature.inhibitoryControl} 
              icon={Target}
            />
            <ScoreBar 
              label="Vitesse de traitement" 
              value={signature.processingSpeed} 
              icon={Zap}
            />
            <ScoreBar 
              label="Flexibilité cognitive" 
              value={signature.cognitiveFlexibility} 
              icon={Shuffle}
            />
            <ScoreBar 
              label="Fluidité d'accès" 
              value={signature.accessFluency} 
              icon={Eye}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stability Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Stabilité attentionnelle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <ScoreBar 
              label="Régularité des réponses" 
              value={signature.reactionVariance} 
              icon={Activity}
            />
            <ScoreBar 
              label="Maintien de l'attention" 
              value={signature.attentionDrift} 
              icon={Target}
            />
          </div>
        </CardContent>
      </Card>

      {/* Error Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Profil d'erreurs
          </CardTitle>
          <CardDescription>
            Indicateurs de vulnérabilité cognitive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Erreurs sous conflit</span>
                <span className="text-lg font-bold text-foreground">{signature.conflictErrors.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taux d'erreur lors de stimuli contradictoires
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Erreurs de séquençage</span>
                <span className="text-lg font-bold text-foreground">{signature.sequencingErrors}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Nombre d'erreurs lors de l'alternance de règles
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse stratégique</CardTitle>
          <CardDescription>
            Interprétation personnalisée de votre profil cognitif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            {signature.interpretation.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Methodology Notice */}
      <Card className="bg-muted/30 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Méthodologie propriétaire</p>
              <p>
                Cette analyse repose sur des modèles cognitifs issus de travaux de recherche 
                protégés par brevets déposés (INPI France). Les tests mesurent des comportements 
                observables et non des auto-déclarations. Ces résultats ne constituent pas un 
                diagnostic médical ou psychologique.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/dashboard/cognitive-assessment">
          <Button variant="outline">Refaire l'évaluation</Button>
        </Link>
        <Link href="/dashboard">
          <Button>Retour au tableau de bord</Button>
        </Link>
      </div>
    </div>
  )
}
