"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Zap } from "lucide-react"

interface ReactionTrial {
  type: "go" | "no-go"
  delay: number
}

interface ReactionResult {
  trialIndex: number
  type: "go" | "no-go"
  responseTime: number | null
  responded: boolean
  isCorrect: boolean
  isFalseStart: boolean
}

interface ReactionTimeTestProps {
  onComplete: (data: ReactionTimeTestData) => void
}

export interface ReactionTimeTestData {
  trials: ReactionResult[]
  metrics: {
    meanReactionTime: number
    standardDeviation: number
    fastestTime: number
    slowestTime: number
    outlierCount: number
    falseStartCount: number
    missedGoCount: number
    falseAlarmCount: number
    attentionDrift: number
  }
}

const TOTAL_TRIALS = 20
const GO_RATIO = 0.75
const MIN_DELAY = 1000
const MAX_DELAY = 3000
const MAX_RESPONSE_TIME = 1500

function generateTrials(): ReactionTrial[] {
  const trials: ReactionTrial[] = []
  const numGo = Math.floor(TOTAL_TRIALS * GO_RATIO)
  
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    trials.push({
      type: i < numGo ? "go" : "no-go",
      delay: MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY),
    })
  }
  
  // Shuffle
  for (let i = trials.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[trials[i], trials[j]] = [trials[j], trials[i]]
  }
  
  return trials
}

function calculateMetrics(results: ReactionResult[]): ReactionTimeTestData["metrics"] {
  const goTrials = results.filter(r => r.type === "go")
  const noGoTrials = results.filter(r => r.type === "no-go")
  
  const validGoTimes = goTrials
    .filter(r => r.responded && !r.isFalseStart && r.responseTime !== null)
    .map(r => r.responseTime as number)
  
  const meanReactionTime = validGoTimes.length > 0 
    ? validGoTimes.reduce((a, b) => a + b, 0) / validGoTimes.length 
    : 0
  
  const variance = validGoTimes.length > 0
    ? validGoTimes.reduce((sum, t) => sum + Math.pow(t - meanReactionTime, 2), 0) / validGoTimes.length
    : 0
  const standardDeviation = Math.sqrt(variance)
  
  // Outliers: responses > 2 standard deviations from mean
  const outlierThreshold = meanReactionTime + 2 * standardDeviation
  const outlierCount = validGoTimes.filter(t => t > outlierThreshold).length
  
  // Attention drift: compare first half vs second half performance
  const firstHalf = validGoTimes.slice(0, Math.floor(validGoTimes.length / 2))
  const secondHalf = validGoTimes.slice(Math.floor(validGoTimes.length / 2))
  const firstHalfMean = firstHalf.length > 0 ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length : 0
  const secondHalfMean = secondHalf.length > 0 ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : 0
  const attentionDrift = secondHalfMean - firstHalfMean
  
  return {
    meanReactionTime: Math.round(meanReactionTime),
    standardDeviation: Math.round(standardDeviation),
    fastestTime: validGoTimes.length > 0 ? Math.round(Math.min(...validGoTimes)) : 0,
    slowestTime: validGoTimes.length > 0 ? Math.round(Math.max(...validGoTimes)) : 0,
    outlierCount,
    falseStartCount: results.filter(r => r.isFalseStart).length,
    missedGoCount: goTrials.filter(r => !r.responded).length,
    falseAlarmCount: noGoTrials.filter(r => r.responded).length,
    attentionDrift: Math.round(attentionDrift),
  }
}

export function ReactionTimeTest({ onComplete }: ReactionTimeTestProps) {
  const [phase, setPhase] = useState<"instructions" | "waiting" | "stimulus" | "feedback" | "complete">("instructions")
  const [trials, setTrials] = useState<ReactionTrial[]>([])
  const [currentTrialIndex, setCurrentTrialIndex] = useState(0)
  const [results, setResults] = useState<ReactionResult[]>([])
  const [stimulusStartTime, setStimulusStartTime] = useState(0)
  const [lastResult, setLastResult] = useState<{ correct: boolean; time: number | null } | null>(null)
  const [falseStart, setFalseStart] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const currentTrialIndexRef = useRef(0)
  const waitingTimeoutRef = useRef<NodeJS.Timeout>()
  const responseTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    currentTrialIndexRef.current = currentTrialIndex
  }, [currentTrialIndex])

  useEffect(() => {
    setTrials(generateTrials())
  }, [])

  const startTrial = useCallback(() => {
    console.log(`🔄 Starting trial ${currentTrialIndexRef.current + 1}/${trials.length}`)
    
    if (currentTrialIndexRef.current >= trials.length) {
      console.log('✅ All trials completed, setting phase to complete')
      setPhase("complete")
      return
    }
    
    setFalseStart(false)
    setPhase("waiting")
    
    const currentTrial = trials[currentTrialIndexRef.current]
    
    waitingTimeoutRef.current = setTimeout(() => {
      setPhase("stimulus")
      setStimulusStartTime(performance.now())
      
      // Auto-timeout for response
      responseTimeoutRef.current = setTimeout(() => {
        if (currentTrial.type === "go") {
          // Missed go trial
          const result: ReactionResult = {
            trialIndex: currentTrialIndexRef.current,
            type: "go",
            responseTime: null,
            responded: false,
            isCorrect: false,
            isFalseStart: false,
          }
          setResults(prev => [...prev, result])
          setLastResult({ correct: false, time: null })
        } else {
          // Correct no-go (didn't respond)
          const result: ReactionResult = {
            trialIndex: currentTrialIndexRef.current,
            type: "no-go",
            responseTime: null,
            responded: false,
            isCorrect: true,
            isFalseStart: false,
          }
          setResults(prev => [...prev, result])
          setLastResult({ correct: true, time: null })
        }
        
        setPhase("feedback")
        setTimeout(() => {
          const nextTrialIndex = currentTrialIndexRef.current + 1
          setCurrentTrialIndex(nextTrialIndex)
          
          if (nextTrialIndex >= trials.length) {
            console.log('✅ Test completed via timeout (missed response)')
            setPhase("complete")
          } else {
            startTrial()
          }
        }, 800)
      }, MAX_RESPONSE_TIME)
    }, currentTrial.delay)
  }, [trials])

  const handleResponse = useCallback(() => {
    console.log(`🎯 Response attempt at trial ${currentTrialIndex + 1}, phase: ${phase}, transitioning: ${isTransitioning}`)
    
    if (phase === "complete" || isTransitioning) {
      console.warn('⚠️ Response ignored (test complete or transitioning)');
      return;
    }

    if (phase === "waiting") {
      console.log('🚩 False start detected')
      // False start
      setIsTransitioning(true)
      setFalseStart(true)
      if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current)
      
      const result: ReactionResult = {
        trialIndex: currentTrialIndexRef.current,
        type: trials[currentTrialIndexRef.current].type,
        responseTime: null,
        responded: true,
        isCorrect: false,
        isFalseStart: true,
      }
      setResults(prev => [...prev, result])
      setLastResult({ correct: false, time: null })
      setPhase("feedback")
      
      setTimeout(() => {
        setCurrentTrialIndex(prev => prev + 1)
        setIsTransitioning(false)
        startTrial()
      }, 1000)
      return
    }
    
    if (phase !== "stimulus") return
    
    console.log(`✅ Valid response at trial ${currentTrialIndexRef.current + 1}`)
    setIsTransitioning(true)
    if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current)
    
    const responseTime = performance.now() - stimulusStartTime
    const currentTrial = trials[currentTrialIndexRef.current]
    const isCorrect = currentTrial.type === "go"
    
    const result: ReactionResult = {
      trialIndex: currentTrialIndexRef.current,
      type: currentTrial.type,
      responseTime,
      responded: true,
      isCorrect,
      isFalseStart: false,
    }
    
    setResults(prev => [...prev, result])
    setLastResult({ correct: isCorrect, time: responseTime })
    setPhase("feedback")
    
    setTimeout(() => {
      const nextTrialIndex = currentTrialIndexRef.current + 1
      setCurrentTrialIndex(nextTrialIndex)
      
      if (nextTrialIndex >= trials.length) {
        console.log('✅ Test completed via handleResponse')
        setPhase("complete")
      } else {
        startTrial()
      }
      setIsTransitioning(false)
    }, 500)
  }, [phase, stimulusStartTime, trials, currentTrialIndex, startTrial])

  useEffect(() => {
    if (phase === "complete" && results.length === trials.length) {
      const metrics = calculateMetrics(results)
      onComplete({ trials: results, metrics })
    }
  }, [phase, results, trials.length, onComplete])

  // Safety net: force completion if we somehow exceed trial count
  useEffect(() => {
    if (currentTrialIndex >= TOTAL_TRIALS && phase !== "complete") {
      console.warn('🚨 Safety net: forcing test completion', { currentTrialIndex, TOTAL_TRIALS })
      setPhase("complete")
    }
  }, [currentTrialIndex, phase])

  useEffect(() => {
    return () => {
      if (waitingTimeoutRef.current) clearTimeout(waitingTimeoutRef.current)
      if (responseTimeoutRef.current) clearTimeout(responseTimeoutRef.current)
    }
  }, [])

  const currentTrial = trials[currentTrialIndex]
  const progress = (currentTrialIndex / TOTAL_TRIALS) * 100

  if (phase === "instructions") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</div>
            Test de Temps de Réaction — Vitesse de traitement
          </CardTitle>
          <CardDescription>
            Évaluation de votre vitesse décisionnelle et stabilité attentionnelle
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-foreground">Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Un cercle va apparaître à l'écran après un délai variable. 
              Votre tâche est de cliquer le plus rapidement possible quand vous voyez 
              <strong className="text-green-500"> le cercle VERT</strong>.
            </p>
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">CLIQUEZ</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-500 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">NE CLIQUEZ PAS</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Attention :</strong> Ne cliquez pas avant l'apparition du cercle (faux départ) 
              et ne cliquez pas sur les cercles rouges. Le test comprend {TOTAL_TRIALS} essais.
            </p>
          </div>
          
          <Button onClick={() => startTrial()} className="w-full" size="lg">
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
          <CardTitle className="text-lg">Test de Temps de Réaction</CardTitle>
          <span className="text-sm text-muted-foreground">
            {Math.min(currentTrialIndex + 1, TOTAL_TRIALS)} / {TOTAL_TRIALS}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="py-8">
        <div 
          className="min-h-[300px] flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={handleResponse}
        >
          {phase === "waiting" && (
            <div className="text-center">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Attendez le signal...</p>
              {falseStart && (
                <p className="text-red-500 text-sm mt-2">Faux départ ! Attendez le cercle.</p>
              )}
            </div>
          )}
          
          {phase === "stimulus" && currentTrial && (
            <div className="text-center">
              <div 
                className={`w-24 h-24 rounded-full mx-auto mb-4 transition-transform hover:scale-110 ${
                  currentTrial.type === "go" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <p className="text-foreground font-medium">
                {currentTrial.type === "go" ? "CLIQUEZ !" : "NE CLIQUEZ PAS"}
              </p>
            </div>
          )}
          
          {phase === "feedback" && lastResult && (
            <div className="text-center">
              {lastResult.correct ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  {lastResult.time && (
                    <p className="text-sm text-muted-foreground">{Math.round(lastResult.time)} ms</p>
                  )}
                </>
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
