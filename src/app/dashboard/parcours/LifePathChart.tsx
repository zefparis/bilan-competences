// FICHIER: src/app/dashboard/parcours/LifePathChart.tsx

"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts"
import { useEffect, useState } from "react"
import { getLifeEvents } from "@/app/actions"
import { useActiveAssessment } from "@/lib/active-assessment"

type ChartDataPoint = {
  year: number
  satisfaction: number
  name: string
  category: string
  isInterpolated: boolean
}

type LifeEvent = {
  id: string
  year: number
  title: string
  type: string
  sentiment: number
  description: string | null
}

function sentimentToSatisfaction(sentiment: number): number {
  return Math.round(((sentiment + 10) / 2) * 10) / 10
}

function interpolateData(data: ChartDataPoint[]): ChartDataPoint[] {
  if (data.length < 2) return data
  
  const interpolated: ChartDataPoint[] = []
  
  for (let i = 0; i < data.length - 1; i++) {
    const current = data[i]
    const next = data[i + 1]
    
    interpolated.push(current)
    
    const yearGap = next.year - current.year
    if (yearGap > 2) {
      for (let j = 1; j < yearGap; j++) {
        const ratio = j / yearGap
        const interpolatedSat = current.satisfaction + (next.satisfaction - current.satisfaction) * ratio
        
        interpolated.push({
          year: current.year + j,
          satisfaction: Math.round(interpolatedSat * 10) / 10,
          name: '',
          category: 'interpolated',
          isInterpolated: true
        })
      }
    }
  }
  
  interpolated.push(data[data.length - 1])
  return interpolated
}

// ✅ AJOUTER refreshKey comme prop
interface LifePathChartProps {
  refreshKey?: number
}

export function LifePathChart({ refreshKey }: LifePathChartProps) {
  const { data: activeAssessment, isLoading } = useActiveAssessment()
  const [events, setEvents] = useState<LifeEvent[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  // ✅ AJOUTER refreshKey dans les dépendances
  useEffect(() => {
    async function fetchEvents() {
      if (!activeAssessment?.lifePathId) return
      
      try {
        const fetchedEvents = await getLifeEvents(activeAssessment.lifePathId)
        console.log('📊 Événements chargés:', fetchedEvents.length) // Debug
        setEvents(fetchedEvents)
        
        let data: ChartDataPoint[] = fetchedEvents.map((event: LifeEvent) => ({
          year: event.year,
          satisfaction: sentimentToSatisfaction(event.sentiment),
          name: event.title,
          category: event.type.toLowerCase(),
          isInterpolated: false
        }))
        
        if (data.length === 0) {
          setChartData([])
          return
        }
        
        if (data.length < 3) {
          const firstYear = data[0]?.year || new Date().getFullYear() - 10
          const lastYear = new Date().getFullYear()
          
          if (!data.find(d => d.year === firstYear)) {
            data.unshift({
              year: firstYear,
              satisfaction: 5,
              name: 'Début',
              category: 'milestone',
              isInterpolated: false
            })
          }
          
          if (!data.find(d => d.year === lastYear)) {
            data.push({
              year: lastYear,
              satisfaction: 7,
              name: "Aujourd'hui",
              category: 'milestone',
              isInterpolated: false
            })
          }
        }
        
        data.sort((a, b) => a.year - b.year)
        const smoothData = interpolateData(data)
        setChartData(smoothData)
      } catch (error) {
        console.error('Error fetching life events:', error)
      }
    }
    
    fetchEvents()
  }, [activeAssessment?.lifePathId, refreshKey]) // ✅ AJOUTER refreshKey

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-400">
        Chargement...
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400 mb-4">
          Aucun événement enregistré. Commencez par ajouter des moments clés de votre parcours.
        </p>
        <p className="text-sm text-gray-500">
          Utilisez le formulaire ci-dessus pour ajouter votre premier événement.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              tickFormatter={(year) => year.toString()}
            />
            
            <YAxis 
              stroke="#9ca3af"
              domain={[0, 10]}
              label={{ value: 'Satisfaction (0-10)', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#f3f4f6' }}
              itemStyle={{ color: '#22c55e' }}
              formatter={(value: number, name: string, props: any) => {
                const event = props.payload
                return [
                  `${value}/10`,
                  event.name ? event.name : 'Satisfaction'
                ]
              }}
            />
            
            <Area 
              type="monotone" 
              dataKey="satisfaction" 
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#satisfactionGradient)"
              fillOpacity={0.6}
            />
            
            {chartData
              .filter(d => !d.isInterpolated)
              .map((event, idx) => (
                <ReferenceDot
                  key={`${event.year}-${idx}`} // ✅ Clé unique
                  x={event.year}
                  y={event.satisfaction}
                  r={6}
                  fill="#22c55e"
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-sm text-gray-400">
        <p>
          Cette courbe représente votre satisfaction globale au fil des années, 
          basée sur les événements que vous avez déclarés (échelle 0-10).
        </p>
        {events.length < 3 && (
          <p className="text-amber-500 mt-2">
            ⚠️ Ajoutez plus d'événements pour une visualisation plus précise
          </p>
        )}
      </div>
    </div>
  )
}