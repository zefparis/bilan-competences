// FICHIER: src/app/dashboard/parcours/LifePathChart.tsx

"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { getLifeEvents } from "@/app/actions"
import { useActiveAssessment } from "@/lib/active-assessment"
import { LifeEventsList } from "./LifeEventsList"

type ChartDataPoint = {
  year: number
  pro: number | null
  perso: number | null
  formation: number | null
}

type LifeEvent = {
  id: string
  year: number
  title: string
  type: string
  sentiment: number
  description: string | null
}

// Conversion removed - sentiment is now directly 0-10

// ✅ AJOUTER refreshKey comme prop
interface LifePathChartProps {
  refreshKey?: number
}

export function LifePathChart({ refreshKey }: LifePathChartProps) {
  const { data: activeAssessment, isLoading } = useActiveAssessment()
  const [events, setEvents] = useState<LifeEvent[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    async function fetchEvents() {
      if (!activeAssessment?.lifePathId) return
      
      try {
        const fetchedEvents = await getLifeEvents(activeAssessment.lifePathId)
        console.log('📊 Événements chargés:', fetchedEvents.length)
        setEvents(fetchedEvents)
        
        if (fetchedEvents.length === 0) {
          setChartData([])
          return
        }

        const yearMap = new Map<number, ChartDataPoint>()
        
        fetchedEvents.forEach((event: LifeEvent) => {
          const year = event.year
          const satisfaction = event.sentiment
          
          if (!yearMap.has(year)) {
            yearMap.set(year, {
              year,
              pro: null,
              perso: null,
              formation: null
            })
          }
          
          const dataPoint = yearMap.get(year)!
          
          switch (event.type) {
            case 'PRO':
              dataPoint.pro = dataPoint.pro === null 
                ? satisfaction 
                : (dataPoint.pro + satisfaction) / 2
              break
            case 'PERSO':
              dataPoint.perso = dataPoint.perso === null 
                ? satisfaction 
                : (dataPoint.perso + satisfaction) / 2
              break
            case 'FORMATION':
              dataPoint.formation = dataPoint.formation === null 
                ? satisfaction 
                : (dataPoint.formation + satisfaction) / 2
              break
          }
        })

        const data = Array.from(yearMap.values()).sort((a, b) => a.year - b.year)
        const interpolated = interpolateAllCurves(data)
        
        setChartData(interpolated)
      } catch (error) {
        console.error('Error fetching life events:', error)
      }
    }
    
    fetchEvents()
  }, [activeAssessment?.lifePathId, refreshKey])

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

  const stats = {
    pro: events.filter(e => e.type === 'PRO').length,
    perso: events.filter(e => e.type === 'PERSO').length,
    formation: events.filter(e => e.type === 'FORMATION').length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">Professionnel</span>
          </div>
          <p className="text-2xl font-bold text-blue-500 mt-2">{stats.pro}</p>
        </div>
        
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">Personnel</span>
          </div>
          <p className="text-2xl font-bold text-green-500 mt-2">{stats.perso}</p>
        </div>
        
        <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-gray-400">Formation</span>
          </div>
          <p className="text-2xl font-bold text-amber-500 mt-2">{stats.formation}</p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              tickFormatter={(year) => year.toString()}
            />
            
            <YAxis 
              stroke="#9ca3af"
              domain={[0, 10]}
              label={{ 
                value: 'Satisfaction (0-10)', 
                angle: -90, 
                position: 'insideLeft', 
                style: { fill: '#9ca3af' } 
              }}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#f3f4f6' }}
              formatter={(value: any) => {
                if (value === null || value === undefined) return ['N/A', '']
                return [`${value}/10`, '']
              }}
            />
            
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            
            <Line 
              type="monotone" 
              dataKey="pro" 
              name="Professionnel"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
              connectNulls={false}
            />
            
            <Line 
              type="monotone" 
              dataKey="perso" 
              name="Personnel"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ fill: '#22c55e', r: 5 }}
              activeDot={{ r: 7 }}
              connectNulls={false}
            />
            
            <Line 
              type="monotone" 
              dataKey="formation" 
              name="Formation"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 5 }}
              activeDot={{ r: 7 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="text-sm text-gray-400 space-y-2">
        <p>
          Ces courbes représentent votre satisfaction dans chaque domaine au fil des années (échelle 0-10).
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><span className="text-blue-500">●</span> <strong>Professionnel</strong> : carrière, emploi, projets pro</li>
          <li><span className="text-green-500">●</span> <strong>Personnel</strong> : vie privée, famille, loisirs</li>
          <li><span className="text-amber-500">●</span> <strong>Formation</strong> : études, certifications, apprentissages</li>
        </ul>
        {events.length < 5 && (
          <p className="text-amber-500 mt-2">
            ⚠️ Ajoutez plus d'événements pour une visualisation plus riche
          </p>
        )}
      </div>

      {/* Liste chronologique des événements */}
      <LifeEventsList events={events} />
    </div>
  )
}

function interpolateAllCurves(data: ChartDataPoint[]): ChartDataPoint[] {
  if (data.length < 2) return data
  
  const result: ChartDataPoint[] = []
  const minYear = data[0].year
  const maxYear = data[data.length - 1].year
  
  for (let year = minYear; year <= maxYear; year++) {
    const existing = data.find(d => d.year === year)
    
    if (existing) {
      result.push({ ...existing })
    } else {
      result.push({
        year,
        pro: interpolateValue(data, year, 'pro'),
        perso: interpolateValue(data, year, 'perso'),
        formation: interpolateValue(data, year, 'formation')
      })
    }
  }
  
  return result
}

function interpolateValue(
  data: ChartDataPoint[], 
  targetYear: number, 
  key: 'pro' | 'perso' | 'formation'
): number | null {
  let before: ChartDataPoint | null = null
  let after: ChartDataPoint | null = null
  
  for (const point of data) {
    if (point.year < targetYear && point[key] !== null) {
      before = point
    }
    if (point.year > targetYear && point[key] !== null && !after) {
      after = point
      break
    }
  }
  
  if (!before && !after) return null
  if (!before) return after![key]
  if (!after) return before[key]
  
  const beforeVal = before[key]!
  const afterVal = after[key]!
  const ratio = (targetYear - before.year) / (after.year - before.year)
  
  return Math.round((beforeVal + (afterVal - beforeVal) * ratio) * 10) / 10
}