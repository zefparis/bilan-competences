"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CERTIFICATION_QUESTIONS, BLOC_DESCRIPTIONS } from "@/lib/certification/questions";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

function CertificationTestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);
  const [openAnswer, setOpenAnswer] = useState("");

  useEffect(() => {
    if (!sessionId) {
      router.push("/dashboard/certification");
    }
  }, [sessionId, router]);

  const question = CERTIFICATION_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / CERTIFICATION_QUESTIONS.length) * 100;
  const isLastQuestion = currentQuestionIndex === CERTIFICATION_QUESTIONS.length - 1;
  const currentAnswer = answers.get(question?.id);

  async function submitAnswer(value: string) {
    if (!sessionId || !question) return;

    setLoading(true);
    try {
      const response = await fetch("/api/certification/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          questionId: question.id,
          value
        })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      const newAnswers = new Map(answers);
      newAnswers.set(question.id, value);
      setAnswers(newAnswers);

      if (isLastQuestion) {
        await finishTest();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setOpenAnswer("");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Erreur lors de la sauvegarde de la réponse");
    } finally {
      setLoading(false);
    }
  }

  async function finishTest() {
    if (!sessionId) return;

    try {
      const response = await fetch("/api/certification/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error("Erreur lors du calcul des résultats");
      }

      router.push(`/dashboard/certification/results?session=${sessionId}`);
    } catch (error) {
      console.error("Error finishing test:", error);
      alert("Erreur lors de la finalisation du test");
    }
  }

  function goToPrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = CERTIFICATION_QUESTIONS[currentQuestionIndex - 1];
      if (prevQuestion.type === "open") {
        setOpenAnswer(answers.get(prevQuestion.id) || "");
      }
    }
  }

  function handleOpenAnswerSubmit() {
    if (openAnswer.trim().length < 10) {
      alert("Veuillez fournir une réponse d'au moins 10 caractères");
      return;
    }
    submitAnswer(openAnswer);
  }

  if (!question) {
    return <div className="container py-8">Chargement...</div>;
  }

  const blocInfo = BLOC_DESCRIPTIONS[question.bloc];

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            Question {currentQuestionIndex + 1} / {CERTIFICATION_QUESTIONS.length}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% complété
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge>Bloc {question.bloc}</Badge>
            <span className="text-sm text-muted-foreground">{blocInfo.title}</span>
          </div>
          <CardTitle className="text-2xl">{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === "open" ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Votre réponse (minimum 10 caractères)..."
                value={openAnswer}
                onChange={(e) => setOpenAnswer(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {openAnswer.length} caractères
                </span>
                <Button
                  onClick={handleOpenAnswerSubmit}
                  disabled={loading || openAnswer.trim().length < 10}
                >
                  {isLastQuestion ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Terminer le test
                    </>
                  ) : (
                    <>
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {question.options?.map((option) => (
                <Button
                  key={option.value}
                  variant={currentAnswer === option.value ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-4 px-6"
                  onClick={() => submitAnswer(option.value)}
                  disabled={loading}
                >
                  <span className="flex-1">{option.label}</span>
                  {currentAnswer === option.value && (
                    <CheckCircle className="ml-2 h-5 w-5" />
                  )}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={goToPrevious}
          disabled={currentQuestionIndex === 0 || loading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>

        {question.type !== "open" && (
          <div className="text-sm text-muted-foreground flex items-center">
            Sélectionnez une réponse pour continuer
          </div>
        )}
      </div>
    </div>
  );
}

export default function CertificationTestPage() {
  return (
    <Suspense fallback={<div className="container py-8">Chargement...</div>}>
      <CertificationTestContent />
    </Suspense>
  );
}
