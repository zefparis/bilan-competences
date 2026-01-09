"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, AlertCircle, Briefcase, Download } from "lucide-react";

interface ResultsData {
  scores: {
    dev: number;
    data: number;
    cyber: number;
    infra: number;
    coherence: number;
  };
  primaryRole: string;
  secondaryRoles: string[];
  level: string;
  strengths: string[];
  developmentAreas: string[];
  sessionId: string;
}

function CertificationResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push("/dashboard/certification");
      return;
    }

    async function loadResults() {
      try {
        const response = await fetch(`/api/certification/results?sessionId=${sessionId}`);
        
        if (!response.ok) {
          throw new Error("Résultats non disponibles");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error loading results:", error);
        alert("Erreur lors du chargement des résultats");
        router.push("/dashboard/certification");
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [sessionId, router]);

  async function generateCertificate() {
    if (!sessionId) return;

    try {
      const response = await fetch("/api/certification/certificate/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du certificat");
      }

      const data = await response.json();
      router.push(`/dashboard/certification/certificate?id=${data.certificateId}`);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Erreur lors de la génération du certificat");
    }
  }

  function viewJobs() {
    router.push(`/dashboard/certification/jobs?session=${sessionId}`);
  }

  if (loading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center">Chargement des résultats...</div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const levelLabels: Record<string, string> = {
    junior: "Junior",
    confirmed: "Confirmé",
    senior: "Senior",
    expert: "Expert"
  };

  const levelColors: Record<string, string> = {
    junior: "bg-blue-500",
    confirmed: "bg-green-500",
    senior: "bg-purple-500",
    expert: "bg-yellow-500"
  };

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center gap-3 mb-6">
        <Award className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Résultats de certification</h1>
          <p className="text-muted-foreground">Votre profil professionnel détaillé</p>
        </div>
      </div>

      <Card className="mb-6 border-2 border-primary">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            {results.primaryRole}
          </CardTitle>
          <div className="flex items-center justify-center gap-2">
            <Badge className={`${levelColors[results.level]} text-white text-lg px-4 py-1`}>
              Niveau {levelLabels[results.level]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Profils secondaires
              </h3>
              <ul className="space-y-2">
                {(results.secondaryRoles || []).map((role, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Coefficient de cohérence
              </h3>
              <div className="space-y-2">
                <Progress value={results.scores.coherence} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {results.scores.coherence}% - {results.scores.coherence >= 85 ? "Excellent" : results.scores.coherence >= 70 ? "Bon" : "À améliorer"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Scores par domaine</CardTitle>
            <CardDescription>Vos compétences techniques évaluées</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Développement</span>
                <span className="text-sm text-muted-foreground">{results.scores.dev}%</span>
              </div>
              <Progress value={results.scores.dev} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Data Science</span>
                <span className="text-sm text-muted-foreground">{results.scores.data}%</span>
              </div>
              <Progress value={results.scores.data} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Cybersécurité</span>
                <span className="text-sm text-muted-foreground">{results.scores.cyber}%</span>
              </div>
              <Progress value={results.scores.cyber} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Infrastructure</span>
                <span className="text-sm text-muted-foreground">{results.scores.infra}%</span>
              </div>
              <Progress value={results.scores.infra} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Points forts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(results.strengths || []).map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {(results.developmentAreas || []).length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Axes de développement
            </CardTitle>
            <CardDescription>
              Domaines à renforcer pour progresser dans votre carrière
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(results.developmentAreas || []).map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">→</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certificat professionnel</CardTitle>
            <CardDescription>
              Générez votre certificat blockchain infalsifiable
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={generateCertificate} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Générer mon certificat
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Offres d'emploi</CardTitle>
            <CardDescription>
              Découvrez les offres matchées avec votre profil
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={viewJobs} variant="outline" className="w-full" size="lg">
              <Briefcase className="mr-2 h-4 w-4" />
              Voir les offres
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function CertificationResultsPage() {
  return (
    <Suspense fallback={<div className="container py-8">Chargement des résultats...</div>}>
      <CertificationResultsContent />
    </Suspense>
  );
}
