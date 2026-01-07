"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical, X, LucideIcon } from "lucide-react"

type SortableItemProps = {
  id: string
  value: string
  order: number
  score: number
  icon: LucideIcon
  iconColor: string
  onScoreChange: (value: string, score: number) => void
  onRemove: (value: string) => void
}

export function SortableItem({ id, value, order, score, icon: Icon, iconColor, onScoreChange, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getMedalColor = (order: number) => {
    switch (order) {
      case 1: return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
      case 2: return "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
      case 3: return "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
      default: return "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900 dark:to-blue-800 dark:text-blue-100"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600 dark:text-green-400"
    if (score >= 3) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "Bien présente"
    if (score >= 3) return "Moyennement présente"
    return "Peu présente"
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`group relative flex items-center gap-4 p-4 border-2 rounded-xl bg-gradient-to-r from-background to-accent/20 transition-all duration-200 ${
        isDragging ? "shadow-2xl scale-105 border-primary z-50" : "hover:shadow-lg hover:border-primary/50"
      }`}
    >
      {/* Drag Handle & Order */}
      <div 
        className="flex items-center gap-3 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${getMedalColor(order)} shadow-md`}>
          {order}
        </div>
      </div>

      {/* Icon & Value */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border shadow-sm">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{value}</h4>
          <p className={`text-xs font-medium ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </p>
        </div>
      </div>

      {/* Score Slider */}
      <div className="flex items-center gap-3">
        <div className="w-32 hidden sm:block">
          <Slider
            min={1}
            max={5}
            step={1}
            value={[score]}
            onValueChange={([value]) => onScoreChange(id, value)}
            className="cursor-pointer"
          />
        </div>
        <Badge variant="secondary" className="min-w-[45px] justify-center font-semibold">
          {score}/5
        </Badge>
      </div>

      {/* Remove Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive transition-colors"
        onClick={() => onRemove(id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
