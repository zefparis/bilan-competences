"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { lifeEventSchema, LifeEventData } from "@/lib/schemas"
import { addLifeEvent } from "@/app/actions"
import { useActiveAssessment } from "@/lib/active-assessment"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"

export function LifePathForm() {
  const { data: activeAssessment, isLoading: isLoadingAssessment } = useActiveAssessment()
  const form = useForm<LifeEventData>({
    resolver: zodResolver(lifeEventSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      sentiment: 0
    }
  })

  async function onSubmit(data: LifeEventData) {
    try {
      if (!activeAssessment?.lifePathId) {
        toast.error("Impossible de sauvegarder", {
          description: "Parcours actif introuvable"
        })
        return
      }

      const promise = addLifeEvent(activeAssessment.lifePathId, data)
      
      toast.promise(promise, {
        loading: 'Enregistrement en cours...',
        success: () => {
          form.reset()
          return 'Événement ajouté avec succès'
        },
        error: 'Une erreur est survenue lors de l\'enregistrement'
      })
    } catch (error) {
      toast.error('Une erreur inattendue est survenue')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PRO">Professionnel</SelectItem>
                  <SelectItem value="PERSO">Personnel</SelectItem>
                  <SelectItem value="FORMATION">Formation</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sentiment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sentiment ({field.value})</FormLabel>
              <FormControl>
                <Slider
                  min={-10}
                  max={10}
                  step={1}
                  defaultValue={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optionnel)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoadingAssessment}>Ajouter l'événement</Button>
      </form>
    </Form>
  )
}
