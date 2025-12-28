"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"

interface RanItem {
  id: string
  shape: "circle" | "square" | "triangle" | "star"
  color: string
}

interface RanClick {
  itemId: string
  timestamp: number
  interItemTime: number
}

interface RanVisualTestProps {
  onComplete: (data: RanVisualTestData) => void
}

export interface RanVisualTestData {
  clicks: RanClick[]
  metrics: {
    totalTime: number
    meanInterItemTime: number
    varianceInterItemTime: number
    microBlockages: number
    rhythmicityScore: number
  }
}

const GRID_ROWS = 4
const GRID_COLS = 8
const TOTAL_ITEMS = GRID_ROWS * GRID_COLS

const SHAPES: RanItem["shape"][] = ["circle", "square", "triangle", "star"]
const COLORS = ["#DC2626", "#2563EB", "#16A34A", "#CA8A04"]

function generateGrid(): RanItem[] {
  const items: RanItem[] = []
  
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    items.push({
      id: `item-${i}`,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })
  }
  
  return items
}

function ShapeIcon({ shape, color, size = 32 }: { shape: RanItem["shape"]; color: string; size?: number }) {
  switch (shape) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill={color} />
        </svg>
      )
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32">
          <rect x="2" y="2" width="28" height="28" fill={color} />
        </svg>
      )
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32">
          <polygon points="16,2 30,30 2,30" fill={color} />
        </svg>
      )
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32">
          <polygon 
            points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12" 
            fill={color} 
          />
        </svg>
      )
  }
}

function calculateMetrics(clicks: RanClick[]): RanVisualTestData["metrics"] {
  if (clicks.length === 0) {
    return {
      totalTime: 0,
      meanInterItemTime: 0,
      varianceInterItemTime: 0,
      microBlockages: 0,
      rhythmicityScore: 0,
    }
  }
  
  const totalTime = clicks[clicks.length - 1].timestamp - clicks[0].timestamp
  const interItemTimes = clicks.slice(1).map(c => c.interItemTime)
  
  const meanInterItemTime = interItemTimes.length > 0
    ? interItemTimes.reduce((a, b) => a + b, 0) / interItemTimes.length
    : 0
  
  const variance = interItemTimes.length > 0
    ? interItemTimes.reduce((sum, t) => sum + Math.pow(t - meanInterItemTime, 2), 0) / interItemTimes.length
    : 0
  
  // Micro-blockages: pauses > 2x mean time
  const blockageThreshold = meanInterItemTime * 2
  const microBlockages = interItemTimes.filter(t => t > blockageThreshold).length
  
  // Rhythmicity score: inverse of coefficient of variation (lower variance = higher rhythmicity)
  const cv = meanInterItemTime > 0 ? Math.sqrt(variance) / meanInterItemTime : 1
  const rhythmicityScore = Math.max(0, Math.min(100, (1 - cv) * 100))
  
  return {
    totalTime: Math.round(totalTime),
    meanInterItemTime: Math.round(meanInterItemTime),
    varianceInterItemTime: Math.round(Math.sqrt(variance)),
    microBlockages,
    rhythmicityScore: Math.round(rhythmicityScore),
  }
}

export function RanVisualTest({ onComplete }: RanVisualTestProps) {
  const [phase, setPhase] = useState<"instructions" | "test" | "complete">("instructions")
  const [grid] = useState<RanItem[]>(() => generateGrid())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [clicks, setClicks] = useState<RanClick[]>([])
  const [lastClickTime, setLastClickTime] = useState(0)

  const startTest = useCallback(() => {
    setPhase("test")
    setCurrentIndex(0)
    setClicks([])
    setLastClickTime(performance.now())
  }, [])

  const handleItemClick = useCallback((index: number) => {
    if (phase !== "test") return
    if (index !== currentIndex) return // Must click in order
    
    const now = performance.now()
    const interItemTime = now - lastClickTime
    
    const click: RanClick = {
      itemId: grid[index].id,
      timestamp: now,
      interItemTime,
    }
    
    setClicks(prev => [...prev, click])
    setLastClickTime(now)
    
    if (index + 1 >= TOTAL_ITEMS) {
      setPhase("complete")
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }, [phase, currentIndex, lastClickTime, grid])

  useEffect(() => {
    if (phase === "complete" && clicks.length === TOTAL_ITEMS) {
      const metrics = calculateMetrics(clicks)
      onComplete({ clicks, metrics })
    }
  }, [phase, clicks, onComplete])

  const progress = (currentIndex / TOTAL_ITEMS) * 100

  if (phase === "instructions") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</div>
            RAN Visuel — Accès cognitif rapide
          </CardTitle>
          <CardDescription>
            Évaluation de la fluidité d'accès aux représentations visuelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-foreground">Instructions</h3>
            <p className="text-sm text-muted-foreground">
              Une grille de formes colorées va apparaître. Votre tâche est de cliquer sur chaque forme 
              <strong className="text-foreground"> de gauche à droite, ligne par ligne</strong>, 
              le plus rapidement possible.
            </p>
            <div className="flex items-center justify-center gap-4 py-4">
              {SHAPES.map((shape, i) => (
                <div key={shape} className="text-center">
                  <ShapeIcon shape={shape} color={COLORS[i]} size={40} />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Maintenez un rythme régulier. Le test mesure votre fluidité d'accès visuel.
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
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">RAN Visuel</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentIndex} / {TOTAL_ITEMS}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="py-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Cliquez sur chaque forme de gauche à droite, ligne par ligne
          </p>
        </div>
        
        <div className="grid gap-2 mx-auto" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}>
          {grid.map((item, index) => {
            const isClicked = index < currentIndex
            const isNext = index === currentIndex
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(index)}
                disabled={!isNext}
                className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                  isClicked 
                    ? "bg-muted/50 opacity-30" 
                    : isNext
                      ? "bg-card border-2 border-primary shadow-lg scale-110"
                      : "bg-card border border-border"
                }`}
              >
                <ShapeIcon 
                  shape={item.shape} 
                  color={isClicked ? "#9CA3AF" : item.color} 
                  size={36} 
                />
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
