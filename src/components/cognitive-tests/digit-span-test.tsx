"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle } from "lucide-react"

interface Trial {
  sequence: number[]
  userInput: string
  correct: boolean
  level: number
}

interface DigitSpanTestProps {
  onComplete: (data: DigitSpanTestData) => void
}

export interface DigitSpanTestData {
  trials: Trial[]
  metrics: {
    maxSpan: number
    totalCorrect: number
    score: number
  }
}

const MIN_SPAN = 3
const MAX_SPAN = 9
const TRIALS_PER_LEVEL = 2
const DIGIT_DISPLAY_DURATION = 1000

function generateSequence(length: number): number[] {
  const sequence: number[] = []
  for (let i = 0; i < length; i++) {
    sequence.push(Math.floor(Math.random() * 9) + 1)
  }
  return sequence
}

function calculateMetrics(trials: Trial[]): DigitSpanTestData["metrics"] {
  const totalCorrect = trials.filter(t => t.correct).length
  const maxSpan = Math.max(...trials.filter(t => t.correct).map(t => t.level), MIN_SPAN)
  const score = ((maxSpan - MIN_SPAN) / (MAX_SPAN - MIN_SPAN)) * 100
  
  return {
    maxSpan,
    totalCorrect,
    score: Math.round(score * 10) / 10,
  }
}

export function DigitSpanTest({ onComplete }: DigitSpanTestProps) {
  const [testPhase, setTestPhase] = useState<"instructions" | "showing" | "input" | "feedback" | "complete">("instructions")
  const [level, setLevel] = useState(MIN_SPAN)
  const [sequence, setSequence] = useState<number[]>([])
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [trials, setTrials] = useState<Trial[]>([])
  const [consecutiveFails, setConsecutiveFails] = useState(0)
  const [trialInLevel, setTrialInLevel] = useState(0)
  const [lastResult, setLastResult] = useState<boolean | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const digitTimeoutRef = useRef<NodeJS.Timeout>()
  const feedbackTimeoutRef = useRef<NodeJS.Timeout>()

  const startNewTrial = useCallback(() => {
    const newSequence = generateSequence(level)
    setSequence(newSequence)
    setCurrentDigitIndex(0)
    setUserInput("")
    setLastResult(null)
    setTestPhase("showing")
  }, [level])

  useEffect(() => {
    if (testPhase === "showing" && currentDigitIndex < sequence.length) {
      digitTimeoutRef.current = setTimeout(() => {
        if (currentDigitIndex + 1 < sequence.length) {
          setCurrentDigitIndex(prev => prev + 1)
        } else {
          setTestPhase("input")
          setTimeout(() => {
            inputRef.current?.focus()
          }, 100)
        }
      }, DIGIT_DISPLAY_DURATION)
    }
    
    return () => {
      if (digitTimeoutRef.current) {
        clearTimeout(digitTimeoutRef.current)
      }
    }
  }, [testPhase, currentDigitIndex, sequence.length])

  const handleSubmit = useCallback(() => {
    if (userInput.length !== level) return
    
    const correct = userInput === sequence.join("")
    
    const trial: Trial = {
      sequence,
      userInput,
      correct,
      level,
    }
    
    setTrials(prev => [...prev, trial])
    setLastResult(correct)
    setTestPhase("feedback")
    
    feedbackTimeoutRef.current = setTimeout(() => {
      if (correct) {
        setConsecutiveFails(0)
        
        if (trialInLevel + 1 >= TRIALS_PER_LEVEL) {
          if (level >= MAX_SPAN) {
            setTestPhase("complete")
          } else {
            setLevel(prev => prev + 1)
            setTrialInLevel(0)
            startNewTrial()
          }
        } else {
          setTrialInLevel(prev => prev + 1)
          startNewTrial()
        }
      } else {
        const newConsecutiveFails = consecutiveFails + 1
        setConsecutiveFails(newConsecutiveFails)
        
        if (newConsecutiveFails >= TRIALS_PER_LEVEL) {
          setTestPhase("complete")
        } else if (trialInLevel + 1 >= TRIALS_PER_LEVEL) {
          if (level >= MAX_SPAN) {
            setTestPhase("complete")
          } else {
            setLevel(prev => prev + 1)
            setTrialInLevel(0)
            setConsecutiveFails(0)
            startNewTrial()
          }
        } else {
          setTrialInLevel(prev => prev + 1)
          startNewTrial()
        }
      }
    }, 1500)
  }, [userInput, level, sequence, trialInLevel, consecutiveFails, startNewTrial])

  useEffect(() => {
    if (testPhase === "complete" && trials.length > 0) {
      const metrics = calculateMetrics(trials)
      onComplete({ trials, metrics })
    }
  }, [testPhase, trials, onComplete])

  useEffect(() => {
    return () => {
      if (digitTimeoutRef.current) clearTimeout(digitTimeoutRef.current)
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= level) {
      setUserInput(value)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.length === level) {
      handleSubmit()
    }
  }

  const startTest = () => {
    setTestPhase("showing")
    startNewTrial()
  }

  if (testPhase === "instructions") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test d'Empan de Chiffres</CardTitle>
          <CardDescription>Mesure de la mémoire de travail à court terme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ce test évalue votre capacité à mémoriser et rappeler des séquences de chiffres.
            </p>
            
            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">Déroulement</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Des chiffres s'affichent un par un (1 seconde chacun)</li>
                  <li>Après l'affichage, saisissez la séquence dans l'ordre</li>
                  <li>Le test commence avec 3 chiffres</li>
                  <li>Si vous réussissez 2 essais, la séquence s'allonge</li>
                  <li>Le test s'arrête après 2 échecs consécutifs</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm">
                  <strong>Exemple :</strong> Si vous voyez "7", puis "3", puis "9", 
                  vous devrez saisir "739"
                </p>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Conseil :</strong> Concentrez-vous et essayez de visualiser 
                ou de répéter mentalement les chiffres pendant leur affichage.
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

  const totalPossibleTrials = (MAX_SPAN - MIN_SPAN + 1) * TRIALS_PER_LEVEL
  const progress = (trials.length / totalPossibleTrials) * 100

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>Empan de Chiffres</CardTitle>
            <span className="text-sm text-muted-foreground">
              Niveau {level} - Essai {trialInLevel + 1}/{TRIALS_PER_LEVEL}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {testPhase === "showing" && (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-9xl font-bold text-foreground animate-pulse">
                {sequence[currentDigitIndex]}
              </div>
            </div>
          )}

          {testPhase === "input" && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Saisissez les {level} chiffres dans l'ordre
                </p>
                
                <div className="flex justify-center gap-2 mb-4">
                  {Array.from({ length: level }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold ${
                        i < userInput.length
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-muted bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      {userInput[i] || ""}
                    </div>
                  ))}
                </div>

                <Input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  maxLength={level}
                  className="text-center text-2xl font-bold h-16 max-w-md mx-auto"
                  placeholder="Tapez les chiffres..."
                  autoFocus
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={userInput.length !== level}
                className="w-full"
                size="lg"
              >
                Valider
              </Button>
            </div>
          )}

          {testPhase === "feedback" && (
            <div className="min-h-[200px] flex flex-col items-center justify-center gap-4">
              {lastResult ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <p className="text-lg font-medium text-green-600">Correct !</p>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-red-500" />
                  <p className="text-lg font-medium text-red-600">Incorrect</p>
                  <p className="text-sm text-muted-foreground">
                    La séquence était : {sequence.join(" ")}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
