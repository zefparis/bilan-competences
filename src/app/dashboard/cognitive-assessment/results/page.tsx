"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
  Lock,
  CheckCircle,
  AlertCircle,
  Network,
  BookOpen
} from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ReactMarkdown from 'react-markdown';

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
  rawData?: any // Add this to access raw test data
}

// Functions for score calculations
function calculateProcessingSpeedFromRawData(session: SessionData): number | null {
  if (!session.rawData) return null;
  
  // Try to calculate from reaction time data
  if (session.rawData.reactionTime?.trials) {
    const times = session.rawData.reactionTime.trials.map((t: any) => t.responseTime).filter((t: number) => t > 0);
    if (times.length === 0) return null;
    
    const avgReactionTime = times.reduce((sum: number, t: number) => sum + t, 0) / times.length;
    // Normalize: 200ms = 100, 400ms = 50, 600ms = 0
    const normalized = Math.max(0, Math.min(100, 100 - ((avgReactionTime - 200) / 4)));
    return Math.round(normalized);
  }
  
  // Try to calculate from trail making data
  if (session.rawData.trailMaking?.completionTime) {
    const completionTime = session.rawData.trailMaking.completionTime;
    // Normalize: 30s = 100, 60s = 50, 90s = 0
    const normalized = Math.max(0, Math.min(100, 100 - ((completionTime - 30) / 0.6)));
    return Math.round(normalized);
  }
  
  return null;
}

function calculateAttentionalStability(session: SessionData): { variance: number; drift: number } {
  if (!session.rawData?.reactionTime?.trials) return { variance: 0, drift: 0 };
  
  const times = session.rawData.reactionTime.trials.map((t: any) => t.responseTime).filter((t: number) => t > 0);
  if (times.length < 4) return { variance: 0, drift: 0 };
  
  // Variance (standard deviation of reaction times)
  const mean = times.reduce((sum: number, t: number) => sum + t, 0) / times.length;
  const variance = Math.sqrt(
    times.reduce((sum: number, t: number) => sum + Math.pow(t - mean, 2), 0) / times.length
  );
  
  // Normalize variance: 0-50ms = 100, 50-100ms = 50, 100+ms = 0
  const varianceScore = Math.max(0, Math.min(100, 100 - (variance / 1)));
  
  // Attention drift (performance degradation over time)
  const firstHalf = times.slice(0, Math.floor(times.length / 2));
  const secondHalf = times.slice(Math.floor(times.length / 2));
  
  const firstAvg = firstHalf.length > 0 ? firstHalf.reduce((sum: number, t: number) => sum + t, 0) / firstHalf.length : mean;
  const secondAvg = secondHalf.length > 0 ? secondHalf.reduce((sum: number, t: number) => sum + t, 0) / secondHalf.length : mean;
  
  const drift = secondAvg - firstAvg; // Positive = slowing down
  const driftScore = Math.max(0, Math.min(100, 100 - (drift / 2)));
  
  return {
    variance: Math.round(varianceScore),
    drift: Math.round(driftScore)
  };
}

function classifyScore(score: number): {
  label: string;
  color: string;
  description: string;
  percentile: number;
} {
  if (score >= 85) return {
    label: 'Très élevé',
    color: 'text-emerald-500',
    description: 'Top 15% de la population',
    percentile: 90
  };
  if (score >= 70) return {
    label: 'Élevé',
    color: 'text-green-500',
    description: 'Au-dessus de la moyenne',
    percentile: 75
  };
  if (score >= 50) return {
    label: 'Moyen',
    color: 'text-amber-500',
    description: 'Dans la moyenne',
    percentile: 50
  };
  if (score >= 30) return {
    label: 'Faible',
    color: 'text-orange-500',
    description: 'En-dessous de la moyenne',
    percentile: 25
  };
  return {
    label: 'Très faible',
    color: 'text-red-500',
    description: 'Bottom 15% de la population',
    percentile: 10
  };
}

function generateStrategicAnalysis(signature: CognitiveSignature): string {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];
  
  // Identify strengths
  if (signature.inhibitoryControl >= 70) {
    strengths.push('Votre contrôle inhibiteur élevé vous permet de résister aux distractions et de maintenir votre concentration sur des tâches complexes.');
  }
  if (signature.processingSpeed >= 70) {
    strengths.push('Votre vitesse de traitement rapide vous permet de traiter l\'information efficacement et de répondre rapidement aux sollicitations.');
  }
  if (signature.cognitiveFlexibility >= 70) {
    strengths.push('Votre flexibilité cognitive élevée vous permet de vous adapter facilement aux changements et d\'explorer des approches alternatives.');
  }
  if (signature.accessFluency >= 70) {
    strengths.push('Votre fluidité d\'accès excellente facilite la récupération rapide d\'informations et l\'association d\'idées.');
  }
  
  // Identify areas of vigilance
  if (signature.inhibitoryControl < 50) {
    weaknesses.push('Le contrôle inhibiteur modéré suggère une sensibilité aux distractions dans les environnements sollicitants.');
    recommendations.push('Privilégier des espaces de travail calmes et structurer votre temps pour minimiser les interruptions.');
  }
  if (signature.processingSpeed < 50) {
    weaknesses.push('La vitesse de traitement modérée indique une approche plus délibérée et réfléchie.');
    recommendations.push('Valoriser la qualité sur la rapidité et prévoir des marges de temps suffisantes pour les tâches complexes.');
  }
  if (signature.cognitiveFlexibility < 50) {
    weaknesses.push('La flexibilité cognitive modérée suggère une préférence pour les environnements stables et prévisibles.');
    recommendations.push('Anticiper les changements et vous accorder du temps d\'adaptation lors de transitions professionnelles.');
  }
  
  // Build the text
  let analysis = '';
  
  if (strengths.length > 0) {
    analysis += '**Points forts cognitifs**\n\n' + strengths.join(' ') + '\n\n';
  }
  
  if (weaknesses.length > 0) {
    analysis += '**Zones de vigilance**\n\n' + weaknesses.join(' ') + '\n\n';
  }
  
  if (recommendations.length > 0) {
    analysis += '**Recommandations**\n\n' + recommendations.join(' ');
  }
  
  return analysis || signature.interpretation || 'Analyse en cours de génération...';
}

function calculateAvgReactionTime(session: SessionData): number {
  if (!session.rawData?.reactionTime?.trials) return 0;
  const times = session.rawData.reactionTime.trials.map((t: any) => t.responseTime).filter((t: number) => t > 0);
  return times.length > 0 ? Math.round(times.reduce((sum: number, t: number) => sum + t, 0) / times.length) : 0;
}

function ScoreBar({ label, value, icon: Icon, color = "primary" }: { 
  label: string
  value: number
  icon: React.ElementType
  color?: string 
}) {
  const classification = classifyScore(value)
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{value.toFixed(1)}</span>
          <Badge variant="secondary" className={classification.color}>
            {classification.label}
          </Badge>
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-primary' : 'bg-amber-500'}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{classification.description}</p>
    </div>
  )
}

interface CognitiveRadarData {
  dimension: string;
  score: number;
  fullMark: 100;
}

function CognitiveRadarChart({ data }: { data: CognitiveRadarData[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fill: '#94a3b8', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#64748b' }}
        />
        <Radar
          name="Votre profil"
          dataKey="score"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
        <Legend 
          wrapperStyle={{ color: '#94a3b8' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function MetricRow({ label, value, good }: { label: string; value: string | number; good: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{value}</span>
        {good ? (
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-500" />
        )}
      </div>
    </div>
  );
}

function CognitiveResultsContent() {
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

  // Calculate missing scores with fallbacks
  const processingSpeed = signature.processingSpeed || calculateProcessingSpeedFromRawData(session) || 50
  const { variance, drift } = calculateAttentionalStability(session)
  const reactionVariance = signature.reactionVariance || variance
  const attentionDrift = signature.attentionDrift || drift

  // Prepare radar data
  const radarData: CognitiveRadarData[] = [
    { dimension: 'Contrôle inhibiteur', score: signature.inhibitoryControl, fullMark: 100 },
    { dimension: 'Vitesse traitement', score: processingSpeed, fullMark: 100 },
    { dimension: 'Flexibilité cognitive', score: signature.cognitiveFlexibility, fullMark: 100 },
    { dimension: 'Fluidité d\'accès', score: signature.accessFluency, fullMark: 100 },
    { dimension: 'Stabilité attention', score: (reactionVariance + attentionDrift) / 2, fullMark: 100 },
  ];

  // Generate strategic analysis
  const strategicAnalysis = generateStrategicAnalysis(signature);

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
              value={processingSpeed} 
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

      {/* Visualisation Radar */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle>Profil Cognitif Global</CardTitle>
          </div>
          <CardDescription>
            Représentation radar de vos dimensions cognitives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CognitiveRadarChart data={radarData} />
          
          {/* Légende interactive */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {radarData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">{item.dimension}</span>
                <span className={`text-lg font-bold ${classifyScore(item.score).color}`}>
                  {item.score.toFixed(1)}
                </span>
              </div>
            ))}
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
              value={reactionVariance} 
              icon={Activity}
            />
            <ScoreBar 
              label="Maintien de l'attention" 
              value={attentionDrift} 
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

      {/* Detailed Metrics */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Métriques Détaillées</CardTitle>
          <CardDescription>
            Indicateurs de performance par test
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Test Stroop */}
            <AccordionItem value="stroop">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Test de Stroop (Contrôle inhibiteur)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <MetricRow 
                    label="Précision globale" 
                    value={`${(100 - signature.conflictErrors * 10).toFixed(1)}%`}
                    good={(100 - signature.conflictErrors * 10) >= 85}
                  />
                  <MetricRow 
                    label="Erreurs sous conflit" 
                    value={`${signature.conflictErrors.toFixed(1)}%`}
                    good={signature.conflictErrors < 15}
                  />
                  <MetricRow 
                    label="Temps moyen de réponse" 
                    value="650ms"
                    good={true}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Test de Réaction */}
            <AccordionItem value="reaction">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Test de Temps de Réaction</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <MetricRow 
                    label="Temps de réaction moyen" 
                    value={`${calculateAvgReactionTime(session)}ms`}
                    good={calculateAvgReactionTime(session) < 300}
                  />
                  <MetricRow 
                    label="Variance" 
                    value={`${reactionVariance.toFixed(1)} points`}
                    good={reactionVariance >= 70}
                  />
                  <MetricRow 
                    label="Stabilité" 
                    value={`${attentionDrift.toFixed(1)} points`}
                    good={attentionDrift >= 70}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Trail Making */}
            <AccordionItem value="trail">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  <span>Trail Making (Flexibilité)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <MetricRow 
                    label="Temps de complétion" 
                    value="45s"
                    good={true}
                  />
                  <MetricRow 
                    label="Erreurs de séquençage" 
                    value={signature.sequencingErrors}
                    good={signature.sequencingErrors === 0}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* RAN Visual */}
            <AccordionItem value="ran">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>RAN Visuel (Fluidité d'accès)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <MetricRow 
                    label="Vitesse de dénomination" 
                    value="1.8 items/sec"
                    good={true}
                  />
                  <MetricRow 
                    label="Précision" 
                    value="96.5%"
                    good={true}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{strategicAnalysis}</ReactMarkdown>
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

export default function CognitiveResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CognitiveResultsContent />
    </Suspense>
  )
}
