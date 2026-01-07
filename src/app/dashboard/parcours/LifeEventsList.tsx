"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, User, GraduationCap } from "lucide-react"

type LifeEvent = {
  id: string
  year: number
  title: string
  type: string
  sentiment: number
  description: string | null
}

interface LifeEventsListProps {
  events: LifeEvent[]
}

export function LifeEventsList({ events }: LifeEventsListProps) {
  if (events.length === 0) {
    return null
  }

  // Trier par année décroissante (plus récent en premier)
  const sortedEvents = [...events].sort((a, b) => b.year - a.year)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PRO':
        return <Briefcase className="w-4 h-4 text-blue-500" />
      case 'PERSO':
        return <User className="w-4 h-4 text-green-500" />
      case 'FORMATION':
        return <GraduationCap className="w-4 h-4 text-amber-500" />
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PRO':
        return 'Professionnel'
      case 'PERSO':
        return 'Personnel'
      case 'FORMATION':
        return 'Formation'
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PRO':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'PERSO':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'FORMATION':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getSatisfactionColor = (sentiment: number) => {
    if (sentiment >= 8) return 'text-green-500'
    if (sentiment >= 5) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getSatisfactionEmoji = (sentiment: number) => {
    if (sentiment >= 9) return '😄'
    if (sentiment >= 7) return '😊'
    if (sentiment >= 5) return '😐'
    if (sentiment >= 3) return '😕'
    return '😞'
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" />
        Chronologie de vos événements ({events.length})
      </h3>
      
      <div className="space-y-2">
        {sortedEvents.map((event) => (
          <Card 
            key={event.id} 
            className="p-4 bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {getTypeIcon(event.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-400">
                      {event.year}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeColor(event.type)}`}
                    >
                      {getTypeLabel(event.type)}
                    </Badge>
                  </div>
                  
                  <h4 className="text-base font-semibold text-white mb-1">
                    {event.title}
                  </h4>
                  
                  {event.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <span className={`text-2xl ${getSatisfactionColor(event.sentiment)}`}>
                    {getSatisfactionEmoji(event.sentiment)}
                  </span>
                </div>
                <span className={`text-sm font-semibold ${getSatisfactionColor(event.sentiment)}`}>
                  {event.sentiment}/10
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
