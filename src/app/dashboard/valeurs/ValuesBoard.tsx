"use client"

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SortableItem } from "./SortableItem"
import { useActiveAssessment } from "@/lib/active-assessment"
import { saveUserValues } from "@/app/actions"
import { Sparkles, Heart, Shield, Lightbulb, Users, Rocket, Scale, Target, Zap, TreePine } from "lucide-react"

export function ValuesBoard() {
  const { data: activeAssessment, isLoading: isLoadingAssessment, error: activeError } = useActiveAssessment()
  // Valeurs initiales avec icônes et descriptions
  const allValues = [
    { name: "Autonomie", icon: Rocket, color: "text-blue-500", description: "Liberté d'action et d'initiative" },
    { name: "Créativité", icon: Lightbulb, color: "text-yellow-500", description: "Innovation et expression personnelle" },
    { name: "Sécurité", icon: Shield, color: "text-green-500", description: "Stabilité et protection" },
    { name: "Reconnaissance", icon: Sparkles, color: "text-purple-500", description: "Valorisation de vos contributions" },
    { name: "Développement personnel", icon: Target, color: "text-orange-500", description: "Croissance et apprentissage continu" },
    { name: "Solidarité", icon: Users, color: "text-pink-500", description: "Entraide et cohésion d'équipe" },
    { name: "Liberté", icon: Zap, color: "text-indigo-500", description: "Indépendance et flexibilité" },
    { name: "Responsabilité", icon: Scale, color: "text-red-500", description: "Engagement et fiabilité" },
    { name: "Équilibre vie pro/perso", icon: TreePine, color: "text-teal-500", description: "Harmonie entre travail et vie privée" },
    { name: "Innovation", icon: Heart, color: "text-rose-500", description: "Nouveauté et transformation" }
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

  function handleAddValue(valueName: string) {
    if (selectedValues.length >= 5) {
      toast.warning("Vous ne pouvez sélectionner que 5 valeurs maximum")
      return
    }
    setSelectedValues([...selectedValues, valueName])
    setGapScores({...gapScores, [valueName]: 3}) // Valeur par défaut
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

  const getValueIcon = (valueName: string) => {
    const value = allValues.find(v => v.name === valueName)
    return value ? { Icon: value.icon, color: value.color } : { Icon: Heart, color: "text-gray-500" }
  }

  return (
    <div className="space-y-8">
      {activeError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive flex items-center gap-2">
          <Shield className="h-4 w-4" />
          {activeError}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">Comment ça marche ?</h3>
            <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <span className="font-semibold min-w-[20px]">1.</span>
                <span>Sélectionnez 5 valeurs qui résonnent le plus avec vous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold min-w-[20px]">2.</span>
                <span>Classez-les par ordre d'importance (glissez-déposez)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold min-w-[20px]">3.</span>
                <span>Évaluez à quel point chaque valeur est présente dans votre vie actuelle (1-5)</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Banque de valeurs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-500" />
              Banque de valeurs
            </h3>
            <Badge variant="outline" className="text-xs">
              {allValues.filter(v => !selectedValues.includes(v.name)).length} disponibles
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {allValues.filter(v => !selectedValues.includes(v.name)).map(value => {
              const Icon = value.icon
              return (
                <button
                  key={value.name}
                  onClick={() => handleAddValue(value.name)}
                  className="group relative flex items-center gap-4 p-4 border-2 border-border rounded-xl hover:border-primary hover:bg-accent/50 transition-all duration-200 text-left hover:shadow-md"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {value.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {value.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="default" className="text-xs">Ajouter</Badge>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mon Top 5 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              Mon Top 5
            </h3>
            <Badge variant="secondary" className="text-xs">
              {selectedValues.length}/5 sélectionnées
            </Badge>
          </div>
          
          {selectedValues.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">
                Sélectionnez vos valeurs dans la banque
              </p>
            </div>
          ) : (
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
                <div className="space-y-3">
                  {selectedValues.map((valueName, index) => {
                    const { Icon, color } = getValueIcon(valueName)
                    return (
                      <SortableItem 
                        key={valueName} 
                        id={valueName}
                        value={valueName}
                        order={index + 1}
                        score={gapScores[valueName] || 3}
                        icon={Icon}
                        iconColor={color}
                        onScoreChange={handleScoreChange}
                        onRemove={handleRemoveValue}
                      />
                    )
                  })}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {/* Bouton d'enregistrement */}
      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          {selectedValues.length === 5 
            ? "✓ Toutes les valeurs sont sélectionnées" 
            : `Sélectionnez encore ${5 - selectedValues.length} valeur(s)`}
        </p>
        <Button 
          onClick={handleSave} 
          disabled={isLoadingAssessment || selectedValues.length !== 5}
          size="lg"
          className="min-w-[200px]"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Enregistrer mes valeurs
        </Button>
      </div>
    </div>
  )
}
