"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"

type SortableItemProps = {
  id: string
  value: string
  order: number
  score: number
  onScoreChange: (value: string, score: number) => void
  onRemove: (value: string) => void
}

export function SortableItem({ id, value, order, score, onScoreChange, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="flex items-center gap-4 p-2 border rounded bg-background"
    >
      <div 
        className="flex items-center gap-2 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{order}.</span>
        <span>{value}</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="w-32">
          <Slider
            min={1}
            max={5}
            step={1}
            value={[score]}
            onValueChange={([value]) => onScoreChange(id, value)}
          />
        </div>
        <span className="text-sm text-muted-foreground w-6">{score}/5</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onRemove(id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
