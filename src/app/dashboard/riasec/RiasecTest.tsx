"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useActiveAssessment } from "@/lib/active-assessment"
import { saveRiasecResults } from "@/app/actions"
import { RIASEC_QUESTIONS } from "@/lib/riasec-questions"

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

  return (
    <div className="space-y-4">
      {activeError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {activeError}
        </div>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Progression: <span className="font-medium text-foreground">{answeredCount}/{totalQuestions}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{page + 1}</span> / {totalPages}
        </div>
      </div>

      {pageQuestions.map(question => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle>{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4, 5].map(score => (
                <Button 
                  key={score}
                  variant={answers[question.id] === score ? "default" : "outline"}
                  onClick={() => handleAnswer(question.id, score)}
                >
                  {score}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Précédent
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            Suivant
          </Button>
        </div>

        <Button onClick={handleSubmit} disabled={isLoadingAssessment}>
          Valider le test
        </Button>
      </div>
    </div>
  )
}
