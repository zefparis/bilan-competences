"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle } from "lucide-react"

interface TrailNode {
  id: string
  label: string
  x: number
  y: number
  order: number
}

interface TrailClick {
  nodeId: string
  timestamp: number
  isCorrect: boolean
}

interface TrailMakingTestProps {
  onComplete: (data: TrailMakingTestData) => void
}

export interface TrailMakingTestData {
  partA: {
    totalTime: number
    clicks: TrailClick[]
    errors: number
    correctionTime: number
  }
  partB: {
    totalTime: number
    clicks: TrailClick[]
    errors: number
    correctionTime: number
  }
  metrics: {
    timeA: number
    timeB: number
    ratioBA: number
    totalErrors: number
    errorsA: number
    errorsB: number
    meanCorrectionTime: number
  }
}

const GRID_SIZE = 400
const NODE_RADIUS = 24

function generatePartANodes(): TrailNode[] {
  const nodes: TrailNode[] = []
  const positions = generateNonOverlappingPositions(8)
  
  for (let i = 1; i <= 8; i++) {
    nodes.push({
      id: `a-${i}`,
      label: String(i),
      x: positions[i - 1].x,
      y: positions[i - 1].y,
      order: i,
    })
  }
  
  return nodes
}

function generatePartBNodes(): TrailNode[] {
  const nodes: TrailNode[] = []
  const positions = generateNonOverlappingPositions(8)
  const letters = ["A", "B", "C", "D"]
  
  // Alternating: 1, A, 2, B, 3, C, 4, D
  for (let i = 0; i < 8; i++) {
    const isNumber = i % 2 === 0
    const label = isNumber ? String(Math.floor(i / 2) + 1) : letters[Math.floor(i / 2)]
    
    nodes.push({
      id: `b-${i}`,
      label,
      x: positions[i].x,
      y: positions[i].y,
      order: i + 1,
    })
  }
  
  return nodes
}

function generateNonOverlappingPositions(count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = []
  const margin = NODE_RADIUS + 10
  const minDistance = NODE_RADIUS * 3
  
  for (let i = 0; i < count; i++) {
    let attempts = 0
    let position: { x: number; y: number }
    
    do {
      position = {
        x: margin + Math.random() * (GRID_SIZE - 2 * margin),
        y: margin + Math.random() * (GRID_SIZE - 2 * margin),
      }
      attempts++
    } while (
      attempts < 100 &&
      positions.some(p => 
        Math.sqrt(Math.pow(p.x - position.x, 2) + Math.pow(p.y - position.y, 2)) < minDistance
      )
    )
    
    positions.push(position)
  }
  
  return positions
}

export function TrailMakingTest({ onComplete }: TrailMakingTestProps) {
  const [phase, setPhase] = useState<"instructions" | "partA" | "transitionB" | "partB" | "complete">("instructions")
  const [nodesA] = useState<TrailNode[]>(() => generatePartANodes())
  const [nodesB] = useState<TrailNode[]>(() => generatePartBNodes())
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0)
  const [connectedNodes, setConnectedNodes] = useState<string[]>([])
  const [clicksA, setClicksA] = useState<TrailClick[]>([])
  const [clicksB, setClicksB] = useState<TrailClick[]>([])
  const [startTimeA, setStartTimeA] = useState(0)
  const [startTimeB, setStartTimeB] = useState(0)
  const [endTimeA, setEndTimeA] = useState(0)
  const [endTimeB, setEndTimeB] = useState(0)
  const [lastError, setLastError] = useState(false)
  const [lastErrorTime, setLastErrorTime] = useState(0)
  const [correctionTimesA, setCorrectionTimesA] = useState<number[]>([])
  const [correctionTimesB, setCorrectionTimesB] = useState<number[]>([])

  const startPartA = useCallback(() => {
    setPhase("partA")
    setCurrentNodeIndex(0)
    setConnectedNodes([])
    setClicksA([])
    setStartTimeA(performance.now())
  }, [])

  const startPartB = useCallback(() => {
    setPhase("partB")
    setCurrentNodeIndex(0)
    setConnectedNodes([])
    setClicksB([])
    setStartTimeB(performance.now())
  }, [])

  const handleNodeClick = useCallback((node: TrailNode) => {
    const now = performance.now()
    const currentNodes = phase === "partA" ? nodesA : nodesB
    const expectedNode = currentNodes.find(n => n.order === currentNodeIndex + 1)
    
    if (!expectedNode) return
    
    const isCorrect = node.id === expectedNode.id
    
    const click: TrailClick = {
      nodeId: node.id,
      timestamp: now,
      isCorrect,
    }
    
    if (phase === "partA") {
      setClicksA(prev => [...prev, click])
    } else {
      setClicksB(prev => [...prev, click])
    }
    
    if (isCorrect) {
      // Track correction time if there was a previous error
      if (lastError) {
        const correctionTime = now - lastErrorTime
        if (phase === "partA") {
          setCorrectionTimesA(prev => [...prev, correctionTime])
        } else {
          setCorrectionTimesB(prev => [...prev, correctionTime])
        }
        setLastError(false)
      }
      
      setConnectedNodes(prev => [...prev, node.id])
      setCurrentNodeIndex(prev => prev + 1)
      
      // Check if part is complete
      if (currentNodeIndex + 1 >= currentNodes.length) {
        if (phase === "partA") {
          setEndTimeA(now)
          setPhase("transitionB")
        } else {
          setEndTimeB(now)
          setPhase("complete")
        }
      }
    } else {
      setLastError(true)
      setLastErrorTime(now)
    }
  }, [phase, nodesA, nodesB, currentNodeIndex, lastError, lastErrorTime])

  useEffect(() => {
    if (phase === "complete") {
      const errorsA = clicksA.filter(c => !c.isCorrect).length
      const errorsB = clicksB.filter(c => !c.isCorrect).length
      const timeA = endTimeA - startTimeA
      const timeB = endTimeB - startTimeB
      
      const allCorrectionTimes = [...correctionTimesA, ...correctionTimesB]
      const meanCorrectionTime = allCorrectionTimes.length > 0
        ? allCorrectionTimes.reduce((a, b) => a + b, 0) / allCorrectionTimes.length
        : 0
      
      onComplete({
        partA: {
          totalTime: timeA,
          clicks: clicksA,
          errors: errorsA,
          correctionTime: correctionTimesA.reduce((a, b) => a + b, 0),
        },
        partB: {
          totalTime: timeB,
          clicks: clicksB,
          errors: errorsB,
          correctionTime: correctionTimesB.reduce((a, b) => a + b, 0),
        },
        metrics: {
          timeA: Math.round(timeA),
          timeB: Math.round(timeB),
          ratioBA: timeA > 0 ? Math.round((timeB / timeA) * 100) / 100 : 0,
          totalErrors: errorsA + errorsB,
          errorsA,
          errorsB,
          meanCorrectionTime: Math.round(meanCorrectionTime),
        },
      })
    }
  }, [phase, clicksA, clicksB, startTimeA, startTimeB, endTimeA, endTimeB, correctionTimesA, correctionTimesB, onComplete])

  const currentNodes = phase === "partA" ? nodesA : nodesB
  const progress = phase === "partA" 
    ? (currentNodeIndex / nodesA.length) * 50 
    : 50 + (currentNodeIndex / nodesB.length) * 50

  if (phase === "instructions") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</div>
            Trail Making Test — Flexibilité cognitive
          </CardTitle>
          <CardDescription>
            Évaluation de votre capacité à alterner entre règles mentales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-foreground">Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Ce test comporte deux parties :
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Partie A :</strong> Connectez les cercles dans l'ordre numérique 
                (1 → 2 → 3 → 4 → 5 → 6 → 7 → 8)
              </p>
              <p>
                <strong className="text-foreground">Partie B :</strong> Alternez entre chiffres et lettres 
                (1 → A → 2 → B → 3 → C → 4 → D)
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Cliquez sur les cercles le plus rapidement possible tout en évitant les erreurs.
            </p>
          </div>
          
          <Button onClick={startPartA} className="w-full" size="lg">
            Commencer la Partie A
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (phase === "transitionB") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-12 text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Partie A terminée</h2>
            <p className="text-muted-foreground">
              Temps : {Math.round((endTimeA - startTimeA) / 1000 * 10) / 10}s
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Partie B :</strong> Cette fois, alternez entre chiffres et lettres 
              (1 → A → 2 → B → 3 → C → 4 → D)
            </p>
          </div>
          <Button onClick={startPartB} size="lg">
            Commencer la Partie B
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
          <CardTitle className="text-lg">
            Trail Making — Partie {phase === "partA" ? "A" : "B"}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentNodeIndex} / {currentNodes.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="py-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            {phase === "partA" 
              ? "Connectez : 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8"
              : "Alternez : 1 → A → 2 → B → 3 → C → 4 → D"
            }
          </p>
        </div>
        
        <div 
          className="relative mx-auto bg-muted/30 rounded-lg"
          style={{ width: GRID_SIZE, height: GRID_SIZE }}
        >
          {/* Connection lines */}
          <svg 
            className="absolute inset-0 pointer-events-none"
            width={GRID_SIZE} 
            height={GRID_SIZE}
          >
            {connectedNodes.slice(0, -1).map((nodeId, index) => {
              const fromNode = currentNodes.find(n => n.id === nodeId)
              const toNodeId = connectedNodes[index + 1]
              const toNode = currentNodes.find(n => n.id === toNodeId)
              
              if (!fromNode || !toNode) return null
              
              return (
                <line
                  key={`line-${index}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              )
            })}
          </svg>
          
          {/* Nodes */}
          {currentNodes.map(node => {
            const isConnected = connectedNodes.includes(node.id)
            const isNext = node.order === currentNodeIndex + 1
            
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`absolute flex items-center justify-center rounded-full font-bold text-sm transition-all ${
                  isConnected 
                    ? "bg-primary text-primary-foreground" 
                    : isNext
                      ? "bg-card border-2 border-primary text-foreground hover:scale-110"
                      : "bg-card border-2 border-border text-foreground hover:border-primary/50"
                }`}
                style={{
                  width: NODE_RADIUS * 2,
                  height: NODE_RADIUS * 2,
                  left: node.x - NODE_RADIUS,
                  top: node.y - NODE_RADIUS,
                }}
              >
                {node.label}
              </button>
            )
          })}
        </div>
        
        {lastError && (
          <div className="flex items-center justify-center gap-2 mt-4 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Erreur ! Trouvez le bon cercle.</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
