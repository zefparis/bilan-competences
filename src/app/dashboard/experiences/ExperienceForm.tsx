// FICHIER: src/app/dashboard/experiences/ExperienceForm.tsx

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { experienceSchema, ExperienceData } from "@/lib/schemas"
import { createExperience } from "@/app/actions"
import { useActiveAssessment } from "@/lib/active-assessment"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { toast } from "sonner"

interface ExperienceFormProps {
  onExperienceAdded?: () => void
}

export function ExperienceForm({ onExperienceAdded }: ExperienceFormProps) {
  const router = useRouter()
  const { data: activeAssessment, isLoading: isLoadingAssessment } = useActiveAssessment()
  
  // Génération années et mois
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i)
  const months = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ]
  
  const form = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: '',
      company: '',
      startYear: currentYear,
      startMonth: 1,
      endYear: undefined,
      endMonth: undefined,
      skills: '',
      situation: '',
      task: '',
      action: '',
      result: '',
    }
  })

  const endYear = form.watch('endYear')
  const isCurrent = !endYear // En cours si pas d'année de fin

  async function onSubmit(data: ExperienceData) {
    try {
      if (!activeAssessment?.assessmentId) {
        toast.error("Impossible de sauvegarder", {
          description: "Bilan actif introuvable"
        })
        return
      }

      // Validation : date de fin après date de début
      if (data.endYear && data.startYear) {
        if (data.endYear < data.startYear) {
          toast.error("Dates invalides", {
            description: "La date de fin doit être après la date de début"
          })
          return
        }
        if (data.endYear === data.startYear && data.endMonth && data.startMonth) {
          if (data.endMonth < data.startMonth) {
            toast.error("Dates invalides", {
              description: "Le mois de fin doit être après le mois de début"
            })
            return
          }
        }
      }

      const promise = createExperience(activeAssessment.assessmentId, data)
      
      await toast.promise(promise, {
        loading: 'Enregistrement en cours...',
        success: () => {
          form.reset({
            title: '',
            company: '',
            startYear: currentYear,
            startMonth: 1,
            endYear: undefined,
            endMonth: undefined,
            skills: '',
            situation: '',
            task: '',
            action: '',
            result: '',
          })
          router.refresh()
          onExperienceAdded?.()
          return 'Expérience enregistrée avec succès'
        },
        error: 'Erreur lors de l\'enregistrement de l\'expérience'
      })
    } catch (error) {
      toast.error('Une erreur inattendue est survenue')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Informations générales */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre du poste</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Développeur Full-Stack" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entreprise</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex: Anthropic" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Période */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-green-400">Période</h3>
          
          {/* Date de début */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mois de début</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mois" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de début</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Date de fin (optionnelle) */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="endMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mois de fin (optionnel)</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="En cours" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Laissez vide si l'expérience est en cours
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année de fin (optionnel)</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="En cours" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isCurrent && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Expérience en cours
            </div>
          )}
        </div>

        {/* Compétences */}
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compétences (séparées par des virgules)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Management, Java, Communication" 
                />
              </FormControl>
              <FormDescription>
                Listez les compétences développées durant cette expérience
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Méthode STAR */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-green-400">Méthode STAR</h3>
          
          <FormField
            control={form.control}
            name="situation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situation (Contexte)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Décrivez le contexte..."
                    className="min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tâche (Objectifs)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Décrivez vos missions..."
                    className="min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action (Ce que j'ai fait)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Décrivez vos actions..."
                    className="min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Résultat (Impact)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Décrivez les résultats obtenus..."
                    className="min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoadingAssessment}
          className="w-full"
        >
          Enregistrer l'expérience
        </Button>
      </form>
    </Form>
  )
}