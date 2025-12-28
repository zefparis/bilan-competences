"use client"

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { SortableItem } from "./SortableItem"
import { useActiveAssessment } from "@/lib/active-assessment"
import { saveUserValues } from "@/app/actions"

export function ValuesBoard() {
  const { data: activeAssessment, isLoading: isLoadingAssessment, error: activeError } = useActiveAssessment()
  // Valeurs initiales
  const allValues = [
    "Autonomie", "Créativité", "Sécurité", "Reconnaissance", "Développement personnel",
    "Solidarité", "Liberté", "Responsabilité", "Équilibre vie pro/perso", "Innovation"
  ]

  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [gapScores, setGapScores] = useState<Record<string, number>>({})

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setSelectedValues((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  function handleAddValue(value: string) {
    if (selectedValues.length >= 5) {
      toast.warning("Vous ne pouvez sélectionner que 5 valeurs maximum")
      return
    }
    setSelectedValues([...selectedValues, value])
    setGapScores({...gapScores, [value]: 3}) // Valeur par défaut
  }

  function handleRemoveValue(value: string) {
    setSelectedValues(selectedValues.filter(v => v !== value))
    const newGapScores = {...gapScores}
    delete newGapScores[value]
    setGapScores(newGapScores)
  }

  function handleScoreChange(value: string, score: number) {
    setGapScores({...gapScores, [value]: score})
  }

  async function handleSave() {
    try {
      if (activeError) {
        toast.error("Impossible de sauvegarder", {
          description: activeError,
        })
        return
      }

      if (!activeAssessment?.assessmentId) {
        toast.error("Impossible de sauvegarder", {
          description: "Bilan actif introuvable"
        })
        return
      }

      if (selectedValues.length !== 5) {
        toast.warning("Veuillez sélectionner exactement 5 valeurs")
        return
      }

      const payload = selectedValues.map((valueName, index) => ({
        valueName,
        order: index + 1,
        gapScore: gapScores[valueName] ?? 3,
      }))

      await saveUserValues(activeAssessment.assessmentId, payload)
      toast.success("Valeurs enregistrées avec succès")
    } catch (error) {
      toast.error("Une erreur est survenue", {
        description: "Vos valeurs n'ont pas pu être sauvegardées"
      })
    }
  }

  return (
    <div className="space-y-6">
      {activeError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {activeError}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Banque de valeurs</h3>
          <div className="space-y-2">
            {allValues.filter(v => !selectedValues.includes(v)).map(value => (
              <div key={value} className="flex items-center justify-between p-2 border rounded">
                <span>{value}</span>
                <Button size="sm" onClick={() => handleAddValue(value)}>Ajouter</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Mon Top 5</h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext 
              items={selectedValues} 
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {selectedValues.map((value, index) => (
                  <SortableItem 
                    key={value} 
                    id={value}
                    value={value}
                    order={index + 1}
                    score={gapScores[value] || 3}
                    onScoreChange={handleScoreChange}
                    onRemove={handleRemoveValue}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <Button onClick={handleSave} disabled={isLoadingAssessment}>Enregistrer</Button>
    </div>
  )
}
