"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle } from "lucide-react"

interface StroopTrial {
  word: string
  displayColor: string
  isCongruent: boolean
  correctAnswer: string
}

interface StroopResult {
  trialIndex: number
  isCongruent: boolean
  responseTime: number
  isCorrect: boolean
  selectedColor: string
  correctColor: string
}

interface StroopTestProps {
  onComplete: (data: StroopTestData) => void
}

export interface StroopTestData {
  trials: StroopResult[]
  metrics: {
    meanCongruentTime: number
    meanIncongruentTime: number
    interferenceEffect: number
    errorRateCongruent: number
    errorRateIncongruent: number
    reactionVariance: number
    totalErrors: number
  }
}

const COLORS = [
  { name: "ROUGE", hex: "#DC2626" },
  { name: "BLEU", hex: "#2563EB" },
  { name: "VERT", hex: "#16A34A" },
  { name: "JAUNE", hex: "#CA8A04" },
]

const TOTAL_TRIALS = 24
const CONGRUENT_RATIO = 0.5

function generateTrials(): StroopTrial[] {
  const trials: StroopTrial[] = []
  const numCongruent = Math.floor(TOTAL_TRIALS * CONGRUENT_RATIO)
  
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const isCongruent = i < numCongruent
    const wordColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    
    let displayColor: typeof COLORS[0]
    if (isCongruent) {
      displayColor = wordColor
    } else {
      const otherColors = COLORS.filter(c => c.name !== wordColor.name)
      displayColor = otherColors[Math.floor(Math.random() * otherColors.length)]
    }
    
    trials.push({
      word: wordColor.name,
      displayColor: displayColor.hex,
      isCongruent,
      correctAnswer: displayColor.name,
    })
  }
  
  // Shuffle trials
  for (let i = trials.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[trials[i], trials[j]] = [trials[j], trials[i]]
  }
  
  return trials
}

function calculateMetrics(results: StroopResult[]): StroopTestData["metrics"] {
  const congruentTrials = results.filter(r => r.isCongruent)
  const incongruentTrials = results.filter(r => !r.isCongruent)
  
  const meanCongruentTime = congruentTrials.reduce((sum, r) => sum + r.responseTime, 0) / congruentTrials.length
  const meanIncongruentTime = incongruentTrials.reduce((sum, r) => sum + r.responseTime, 0) / incongruentTrials.length
  
  const congruentErrors = congruentTrials.filter(r => !r.isCorrect).length
  const incongruentErrors = incongruentTrials.filter(r => !r.isCorrect).length
  
  // Calculate variance
  const allTimes = results.map(r => r.responseTime)
  const meanTime = allTimes.reduce((a, b) => a + b, 0) / allTimes.length
  const variance = allTimes.reduce((sum, t) => sum + Math.pow(t - meanTime, 2), 0) / allTimes.length
  
  return {
    meanCongruentTime: Math.round(meanCongruentTime),
    meanIncongruentTime: Math.round(meanIncongruentTime),
    interferenceEffect: Math.round(meanIncongruentTime - meanCongruentTime),
    errorRateCongruent: congruentErrors / congruentTrials.length,
    errorRateIncongruent: incongruentErrors / incongruentTrials.length,
    reactionVariance: Math.round(Math.sqrt(variance)),
    totalErrors: congruentErrors + incongruentErrors,
  }
}

export function StroopTest({ onComplete }: StroopTestProps) {
  const [phase, setPhase] = useState<"instructions" | "ready" | "trial" | "feedback" | "complete">("instructions")
  const [trials, setTrials] = useState<StroopTrial[]>([])
  const [currentTrialIndex, setCurrentTrialIndex] = useState(0)
  const [results, setResults] = useState<StroopResult[]>([])
  const [trialStartTime, setTrialStartTime] = useState(0)
  const [lastResult, setLastResult] = useState<{ correct: boolean; time: number } | null>(null)
  const feedbackTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setTrials(generateTrials())
  }, [])

  const startTest = useCallback(() => {
    setPhase("ready")
    setTimeout(() => {
      setPhase("trial")
      setTrialStartTime(performance.now())
    }, 1500)
  }, [])

  const handleColorSelect = useCallback((colorName: string) => {
    if (phase !== "trial") return
    
    const responseTime = performance.now() - trialStartTime
    const currentTrial = trials[currentTrialIndex]
    const isCorrect = colorName === currentTrial.correctAnswer
    
    const result: StroopResult = {
      trialIndex: currentTrialIndex,
      isCongruent: currentTrial.isCongruent,
      responseTime,
      isCorrect,
      selectedColor: colorName,
      correctColor: currentTrial.correctAnswer,
    }
    
    setResults(prev => [...prev, result])
    setLastResult({ correct: isCorrect, time: responseTime })
    setPhase("feedback")
    
    feedbackTimeoutRef.current = setTimeout(() => {
      if (currentTrialIndex + 1 >= trials.length) {
        setPhase("complete")
      } else {
        setCurrentTrialIndex(prev => prev + 1)
        setPhase("ready")
        setTimeout(() => {
          setPhase("trial")
          setTrialStartTime(performance.now())
        }, 800)
      }
    }, 500)
  }, [phase, trialStartTime, trials, currentTrialIndex])

  useEffect(() => {
    if (phase === "complete" && results.length === trials.length) {
      const metrics = calculateMetrics(results)
      onComplete({ trials: results, metrics })
    }
  }, [phase, results, trials.length, onComplete])

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  const currentTrial = trials[currentTrialIndex]
  const progress = (currentTrialIndex / TOTAL_TRIALS) * 100

  if (phase === "instructions") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
            Test de Stroop — Contrôle inhibiteur
          </CardTitle>
          <CardDescription>
            Évaluation de votre capacité à inhiber une réponse automatique
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-foreground">Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Des mots de couleurs vont apparaître à l'écran. Votre tâche est d'identifier 
              <strong className="text-foreground"> la couleur dans laquelle le mot est affiché</strong>, 
              et non le mot lui-même.
            </p>
            <div className="flex items-center gap-4 py-2">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#2563EB" }}>ROUGE</p>
                <p className="text-xs text-muted-foreground mt-1">Réponse correcte : BLEU</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#16A34A" }}>VERT</p>
                <p className="text-xs text-muted-foreground mt-1">Réponse correcte : VERT</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Répondez le plus rapidement possible tout en restant précis. 
              Le test comprend {TOTAL_TRIALS} essais.
            </p>
          </div>
          
          <Button onClick={startTest} className="w-full" size="lg">
            Commencer le test
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (phase === "complete") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Test terminé</h2>
          <p className="text-muted-foreground">Analyse des résultats en cours...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Test de Stroop</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentTrialIndex + 1} / {TOTAL_TRIALS}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="py-8">
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          {phase === "ready" && (
            <div className="text-4xl font-bold text-muted-foreground animate-pulse">+</div>
          )}
          
          {phase === "trial" && currentTrial && (
            <div className="text-center space-y-8">
              <p 
                className="text-5xl font-bold select-none"
                style={{ color: currentTrial.displayColor }}
              >
                {currentTrial.word}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {COLORS.map(color => (
                  <Button
                    key={color.name}
                    variant="outline"
                    size="lg"
                    onClick={() => handleColorSelect(color.name)}
                    className="h-14 text-lg font-medium border-2 hover:scale-105 transition-transform"
                    style={{ 
                      borderColor: color.hex,
                      color: color.hex,
                    }}
                  >
                    {color.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {phase === "feedback" && lastResult && (
            <div className="text-center">
              {lastResult.correct ? (
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
