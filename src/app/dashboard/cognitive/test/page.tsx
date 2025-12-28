"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { COGNITIVE_TEST_QUESTIONS } from "@/lib/cognitive-test-questions"
import type { TestResponse } from "@/lib/schemas/cognitive"

export default function CognitiveTestPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<TestResponse[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = useMemo(() => COGNITIVE_TEST_QUESTIONS[currentQuestionIndex], [currentQuestionIndex])
  const progress = ((currentQuestionIndex + 1) / COGNITIVE_TEST_QUESTIONS.length) * 100

  const handleSubmit = async (finalResponses: TestResponse[]) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/cognitive/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ responses: finalResponses }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message || `Erreur ${res.status}`)
      }

      router.push("/dashboard/cognitive")
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (!selectedOption) return

    const option = currentQuestion.options.find((opt) => opt.label === selectedOption)
    if (!option) return

    const response: TestResponse = {
      question_id: currentQuestion.id,
      selected_option: selectedOption,
      dimension: option.dimension,
      weight: option.weight,
    }

    const newResponses = [...responses, response]
    setResponses(newResponses)

    if (currentQuestionIndex < COGNITIVE_TEST_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption("")
      return
    }

    handleSubmit(newResponses)
  }

  const handleBack = () => {
    if (currentQuestionIndex === 0) return
    setCurrentQuestionIndex(currentQuestionIndex - 1)
    setSelectedOption("")
    setResponses((prev) => prev.slice(0, -1))
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Test de Profilage Cognitif HCS-U7</CardTitle>
          <Progress value={progress} className="mt-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestionIndex + 1} / {COGNITIVE_TEST_QUESTIONS.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={option.label} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" className="w-1/3" onClick={handleBack} disabled={isSubmitting || currentQuestionIndex === 0}>
              Retour
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedOption || isSubmitting}
              className="w-2/3"
            >
              {currentQuestionIndex === COGNITIVE_TEST_QUESTIONS.length - 1
                ? isSubmitting
                  ? "Analyse en cours..."
                  : "Terminer le test"
                : "Question suivante"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
