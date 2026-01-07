"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { useActiveAssessment } from "@/lib/active-assessment"
import { saveRiasecResults } from "@/app/actions"
import { RIASEC_QUESTIONS } from "@/lib/riasec-questions"
import { Wrench, Brain, Palette, Users, TrendingUp, FileText, ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react"

type Question = {
  id: string
  text: string
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
}

export function RiasecTest() {
  const { data: activeAssessment, isLoading: isLoadingAssessment, error: activeError } = useActiveAssessment()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [page, setPage] = useState(0)

  const pageSize = 8
  const totalQuestions = RIASEC_QUESTIONS.length
  const totalPages = Math.ceil(totalQuestions / pageSize)
  const start = page * pageSize
  const end = start + pageSize
  const pageQuestions = RIASEC_QUESTIONS.slice(start, end) as unknown as Question[]

  const answeredCount = Object.keys(answers).length

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }))
  }

  const handleSubmit = async () => {
    if (activeError) {
      toast.error("Impossible d'enregistrer", {
        description: activeError,
      })
      return
    }

    const answeredQuestions = Object.keys(answers).length
    if (answeredQuestions < RIASEC_QUESTIONS.length) {
      toast.warning("Veuillez répondre à toutes les questions")
      return
    }

    if (!activeAssessment?.assessmentId) {
      toast.error("Impossible d'enregistrer", {
        description: "Bilan actif introuvable"
      })
      return
    }

    const scores = {
      scoreR: 0,
      scoreI: 0,
      scoreA: 0,
      scoreS: 0,
      scoreE: 0,
      scoreC: 0,
    }

    const counts = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    }

    for (const q of RIASEC_QUESTIONS) {
      const score = answers[q.id] ?? 0
      if (q.category === 'R') scores.scoreR += score
      if (q.category === 'I') scores.scoreI += score
      if (q.category === 'A') scores.scoreA += score
      if (q.category === 'S') scores.scoreS += score
      if (q.category === 'E') scores.scoreE += score
      if (q.category === 'C') scores.scoreC += score

      counts[q.category] += 1
    }

    // Normaliser sur 0..10 pour le radar (quels que soient nb de questions)
    const normalized = {
      scoreR: counts.R ? Math.round(((scores.scoreR / (counts.R * 5)) * 10) * 10) / 10 : 0,
      scoreI: counts.I ? Math.round(((scores.scoreI / (counts.I * 5)) * 10) * 10) / 10 : 0,
      scoreA: counts.A ? Math.round(((scores.scoreA / (counts.A * 5)) * 10) * 10) / 10 : 0,
      scoreS: counts.S ? Math.round(((scores.scoreS / (counts.S * 5)) * 10) * 10) / 10 : 0,
      scoreE: counts.E ? Math.round(((scores.scoreE / (counts.E * 5)) * 10) * 10) / 10 : 0,
      scoreC: counts.C ? Math.round(((scores.scoreC / (counts.C * 5)) * 10) * 10) / 10 : 0,
    }

    const sorted = (Object.entries(normalized) as Array<[keyof typeof normalized, number]>).sort(
      (a, b) => b[1] - a[1]
    )

    const topCode = sorted
      .slice(0, 3)
      .map(([k]) => k.replace('score', ''))
      .join('')

    try {
      await saveRiasecResults(activeAssessment.assessmentId, {
        ...normalized,
        topCode,
      })
      toast.success("Test RIASEC enregistré avec succès")
    } catch (e) {
      toast.error("Erreur lors de l'enregistrement", {
        description: "Vos résultats n'ont pas pu être sauvegardés"
      })
    }
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'R': return { icon: Wrench, label: 'Réaliste', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' }
      case 'I': return { icon: Brain, label: 'Investigateur', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' }
      case 'A': return { icon: Palette, label: 'Artistique', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/20' }
      case 'S': return { icon: Users, label: 'Social', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20' }
      case 'E': return { icon: TrendingUp, label: 'Entreprenant', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20' }
      case 'C': return { icon: FileText, label: 'Conventionnel', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/20' }
      default: return { icon: Circle, label: '', color: 'text-gray-500', bg: 'bg-gray-50' }
    }
  }

  const progressPercentage = (answeredCount / totalQuestions) * 100

  return (
    <div className="space-y-6">
      {activeError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive flex items-center gap-2">
          <Circle className="h-4 w-4" />
          {activeError}
        </div>
      )}

      {/* Barre de progression */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">
              {answeredCount}/{totalQuestions} questions répondues
            </span>
          </div>
          <Badge variant="outline" className="text-sm">
            Page {page + 1}/{totalPages}
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-xs text-muted-foreground text-center">
          {progressPercentage === 100 ? "✓ Toutes les questions sont répondues !" : `Encore ${totalQuestions - answeredCount} question(s) à répondre`}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {pageQuestions.map((question, index) => {
          const categoryInfo = getCategoryInfo(question.category)
          const Icon = categoryInfo.icon
          const isAnswered = answers[question.id] !== undefined
          
          return (
            <Card key={question.id} className={`transition-all duration-200 ${
              isAnswered ? 'border-primary/50 bg-accent/30' : 'hover:border-primary/30'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${categoryInfo.bg} flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${categoryInfo.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {categoryInfo.label}
                      </Badge>
                      {isAnswered && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <CardTitle className="text-base font-medium leading-relaxed">
                      {question.text}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                    <span>Pas du tout</span>
                    <span>Tout à fait</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(score => {
                      const isSelected = answers[question.id] === score
                      return (
                        <Button 
                          key={score}
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => handleAnswer(question.id, score)}
                          className={`h-12 text-lg font-semibold transition-all ${
                            isSelected 
                              ? 'scale-110 shadow-lg' 
                              : 'hover:scale-105 hover:border-primary'
                          }`}
                        >
                          {score}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 border-t">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            size="lg"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            size="lg"
          >
            Suivant
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={isLoadingAssessment || answeredCount < totalQuestions}
          size="lg"
          className="min-w-[200px]"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Valider le test
        </Button>
      </div>
    </div>
  )
}
