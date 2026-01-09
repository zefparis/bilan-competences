"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"

type Shape = "circle" | "square" | "triangle"
type Color = "red" | "green" | "blue" | "yellow"
type Position = "left" | "right"

interface Stimulus {
  shape: Shape
  color: Color
  position: Position
  isTarget: boolean
}

interface Trial {
  stimulus: Stimulus
  reactionTime: number | null
  correct: boolean | null
  rule: string
  phase: number
}

interface ComplexReactionTestProps {
  onComplete: (data: ComplexReactionTestData) => void
}

export interface ComplexReactionTestData {
  trials: Trial[]
  metrics: {
    score: number
    accuracy: number
    meanRT: number
    switchCost: number
    phase1RT: number
    phase2RT: number
    phase3RT: number
  }
}

const SHAPES: Shape[] = ["circle", "square", "triangle"]
const COLORS: Color[] = ["red", "green", "blue", "yellow"]
const POSITIONS: Position[] = ["left", "right"]

const COLOR_MAP: Record<Color, string> = {
  red: "#DC2626",
  green: "#16A34A",
  blue: "#2563EB",
  yellow: "#EAB308",
}

const TRIALS_PER_PHASE = 8
const FIXATION_DURATION = 500
const STIMULUS_TIMEOUT = 2000
const FEEDBACK_DURATION = 300

function generateStimulus(phase: number): Stimulus {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const position = POSITIONS[Math.floor(Math.random() * POSITIONS.length)]
  
  let isTarget = false
  
  if (phase === 1) {
    isTarget = shape === "circle" && color === "red"
  } else if (phase === 2) {
    isTarget = shape === "square" && color === "green"
  } else if (phase === 3) {
    isTarget = position === "left"
  }
  
  return { shape, color, position, isTarget }
}

function calculateMetrics(trials: Trial[]): ComplexReactionTestData["metrics"] {
  const validTrials = trials.filter(t => t.reactionTime !== null && t.reactionTime >= 200)
  
  const correctTrials = validTrials.filter(t => t.correct === true)
  const accuracy = (correctTrials.length / trials.length) * 100
  
  const meanRT = validTrials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / validTrials.length
  
  const phase1Trials = validTrials.filter(t => t.phase === 1)
  const phase2Trials = validTrials.filter(t => t.phase === 2)
  const phase3Trials = validTrials.filter(t => t.phase === 3)
  
  const phase1RT = phase1Trials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / phase1Trials.length
  const phase2RT = phase2Trials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / phase2Trials.length
  const phase3RT = phase3Trials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / phase3Trials.length
  
  const switchCost = phase2RT - phase1RT
  
  const accuracyScore = accuracy * 0.7
  const speedScore = Math.max(0, (1000 - meanRT) / 1000 * 100) * 0.3
  const score = Math.min(100, Math.max(0, accuracyScore + speedScore))
  
  return {
    score: Math.round(score * 10) / 10,
    accuracy: Math.round(accuracy * 10) / 10,
    meanRT: Math.round(meanRT),
    switchCost: Math.round(switchCost),
    phase1RT: Math.round(phase1RT),
    phase2RT: Math.round(phase2RT),
    phase3RT: Math.round(phase3RT),
  }
}

export function ComplexReactionTest({ onComplete }: ComplexReactionTestProps) {
  const [testPhase, setTestPhase] = useState<"instructions" | "running" | "complete">("instructions")
  const [currentPhase, setCurrentPhase] = useState(1)
  const [trialIndex, setTrialIndex] = useState(0)
  const [stimulus, setStimulus] = useState<Stimulus | null>(null)
  const [showFixation, setShowFixation] = useState(false)
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [trials, setTrials] = useState<Trial[]>([])
  const [stimulusStartTime, setStimulusStartTime] = useState(0)
  
  const timeoutRef = useRef<NodeJS.Timeout>()
  const feedbackTimeoutRef = useRef<NodeJS.Timeout>()

  const getRuleText = useCallback((phase: number) => {
    if (phase === 1) return "Cliquez sur 'Cible' uniquement pour les cercles rouges"
    if (phase === 2) return "Cliquez sur 'Cible' uniquement pour les carrés verts"
    return "Cliquez sur 'Cible' si la forme est à gauche"
  }, [])

  const startNextTrial = useCallback(() => {
    setShowFeedback(null)
    setShowFixation(true)
    setStimulus(null)
    
    setTimeout(() => {
      setShowFixation(false)
      const newStimulus = generateStimulus(currentPhase)
      setStimulus(newStimulus)
      setStimulusStartTime(performance.now())
      
      timeoutRef.current = setTimeout(() => {
        const trial: Trial = {
          stimulus: newStimulus,
          reactionTime: null,
          correct: false,
          rule: getRuleText(currentPhase),
          phase: currentPhase,
        }
        setTrials(prev => [...prev, trial])
        
        const totalTrials = (currentPhase - 1) * TRIALS_PER_PHASE + trialIndex + 1
        if (totalTrials >= TRIALS_PER_PHASE * 3) {
          setTestPhase("complete")
        } else if (trialIndex + 1 >= TRIALS_PER_PHASE) {
          setCurrentPhase(prev => prev + 1)
          setTrialIndex(0)
          setTimeout(() => startNextTrial(), 1000)
        } else {
          setTrialIndex(prev => prev + 1)
          startNextTrial()
        }
      }, STIMULUS_TIMEOUT)
    }, FIXATION_DURATION)
  }, [currentPhase, trialIndex, getRuleText])

  const handleResponse = useCallback((isTargetResponse: boolean) => {
    if (!stimulus || showFeedback !== null) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    const reactionTime = performance.now() - stimulusStartTime
    const correct = isTargetResponse === stimulus.isTarget
    
    const trial: Trial = {
      stimulus,
      reactionTime: reactionTime < 200 ? 200 : reactionTime,
      correct,
      rule: getRuleText(currentPhase),
      phase: currentPhase,
    }
    
    setTrials(prev => [...prev, trial])
    setShowFeedback(correct ? "correct" : "incorrect")
    
    feedbackTimeoutRef.current = setTimeout(() => {
      const totalTrials = (currentPhase - 1) * TRIALS_PER_PHASE + trialIndex + 1
      
      if (totalTrials >= TRIALS_PER_PHASE * 3) {
        setTestPhase("complete")
      } else if (trialIndex + 1 >= TRIALS_PER_PHASE) {
        setCurrentPhase(prev => prev + 1)
        setTrialIndex(0)
        setTimeout(() => startNextTrial(), 1000)
      } else {
        setTrialIndex(prev => prev + 1)
        startNextTrial()
      }
    }, FEEDBACK_DURATION)
  }, [stimulus, showFeedback, stimulusStartTime, currentPhase, trialIndex, getRuleText, startNextTrial])

  useEffect(() => {
    if (testPhase === "complete" && trials.length > 0) {
      const metrics = calculateMetrics(trials)
      onComplete({ trials, metrics })
    }
  }, [testPhase, trials, onComplete])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    }
  }, [])

  const startTest = () => {
    setTestPhase("running")
    startNextTrial()
  }

  const renderShape = (shape: Shape, color: Color) => {
    const colorHex = COLOR_MAP[color]
    const size = 100
    
    if (shape === "circle") {
      return (
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: colorHex,
          }}
        />
      )
    }
    
    if (shape === "square") {
      return (
        <div
          className="rounded-lg"
          style={{
            width: size,
            height: size,
            backgroundColor: colorHex,
          }}
        />
      )
    }
    
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${colorHex}`,
        }}
      />
    )
  }

  if (testPhase === "instructions") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test de Temps de Réaction Complexe</CardTitle>
          <CardDescription>Mesure de la vitesse de traitement et de la flexibilité cognitive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ce test évalue votre capacité à réagir rapidement tout en changeant de règles.
            </p>
            
            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">Phase 1 (8 essais)</p>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur "Cible" uniquement pour les <strong>cercles rouges</strong>
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">Phase 2 (8 essais)</p>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur "Cible" uniquement pour les <strong>carrés verts</strong>
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">Phase 3 (8 essais)</p>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur "Cible" si la forme est <strong>à gauche</strong>
                </p>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm">
                <strong>Consigne :</strong> Répondez le plus rapidement possible tout en restant précis.
                Vous avez 2 secondes maximum par essai.
              </p>
            </div>
          </div>

          <Button onClick={startTest} className="w-full" size="lg">
            Commencer le test (4 min)
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (testPhase === "complete") {
    return null
  }

  const totalTrials = TRIALS_PER_PHASE * 3
  const completedTrials = (currentPhase - 1) * TRIALS_PER_PHASE + trialIndex
  const progress = (completedTrials / totalTrials) * 100

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Temps de Réaction Complexe</CardTitle>
            <span className="text-sm text-muted-foreground">
              Phase {currentPhase}/3
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="font-medium text-sm">{getRuleText(currentPhase)}</p>
          </div>

          <div className="min-h-[300px] flex items-center justify-center">
            {showFixation && (
              <div className="text-6xl font-bold text-foreground">+</div>
            )}
            
            {stimulus && !showFixation && (
              <div className="flex items-center justify-center gap-8">
                <div className={`flex items-center justify-center ${stimulus.position === "left" ? "order-1" : "order-2"}`}>
                  {renderShape(stimulus.shape, stimulus.color)}
                </div>
                <div className={stimulus.position === "left" ? "order-2" : "order-1"} style={{ width: 100 }} />
              </div>
            )}
            
            {showFeedback && (
              <div className="flex flex-col items-center gap-4">
                {showFeedback === "correct" ? (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" />
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleResponse(true)}
              disabled={!stimulus || showFeedback !== null}
              size="lg"
              variant="default"
            >
              Cible
            </Button>
            <Button
              onClick={() => handleResponse(false)}
              disabled={!stimulus || showFeedback !== null}
              size="lg"
              variant="outline"
            >
              Pas cible
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
