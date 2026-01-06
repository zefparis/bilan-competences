"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Award, Clock, CheckCircle, TrendingUp, Briefcase, Shield, Info } from "lucide-react";

export default function CertificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [existingSession, setExistingSession] = useState<any>(null);
  const [hasEnrichment, setHasEnrichment] = useState({ riasec: false, cognitive: false });

  useEffect(() => {
    async function checkExistingSession() {
      try {
        const res = await fetch("/api/certification/session");
        if (res.ok) {
          const data = await res.json();
          setExistingSession(data);
          setHasEnrichment({
            riasec: !!data.riasecResult,
            cognitive: !!data.cognitiveProfile
          });
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }
    checkExistingSession();
  }, []);

  async function startCertification() {
    setLoading(true);
    try {
      const response = await fetch("/api/certification/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Erreur lors de la création de la session");
        return;
      }

      const data = await response.json();
      router.push(`/dashboard/certification/test?session=${data.sessionId}`);
    } catch (error) {
      console.error("Error starting certification:", error);
      alert("Erreur lors du démarrage de la certification");
    } finally {
      setLoading(false);
    }
  }

  function continueSession() {
    if (existingSession?.isCompleted) {
      router.push(`/dashboard/certification/results?session=${existingSession.id}`);
    } else {
      router.push(`/dashboard/certification/test?session=${existingSession.id}`);
    }
  }

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="secondary" className="text-sm">
          Module 7
        </Badge>
        <Award className="h-6 w-6 text-primary" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">
        Certification Professionnelle
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Métiers du Numérique
      </p>

      {existingSession && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            {existingSession.isCompleted 
              ? "Vous avez déjà complété cette certification. Vous pouvez consulter vos résultats."
              : `Vous avez une session en cours (${existingSession.answersCount || 0}/35 réponses). Vous pouvez la continuer.`
            }
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Contenu de la certification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><b>45 questions</b> réparties en 4 blocs thématiques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><b>Durée estimée</b> : 20-25 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><b>Tests techniques</b> objectifs et scénarios pratiques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><b>Évaluation</b> de vos compétences en DEV, DATA, CYBER, INFRA</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Ce que vous obtenez
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <span><b>Certificat blockchain</b> infalsifiable et vérifiable</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <span><b>Profil professionnel</b> détaillé avec niveau d'expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <span><b>Matching emploi</b> automatique avec offres France Travail</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <span><b>Validité</b> : 3 ans à partir de la date d'émission</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Les 4 blocs d'évaluation</CardTitle>
          <CardDescription>
            Chaque bloc évalue un aspect différent de votre profil professionnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Bloc 1</Badge>
                <span className="text-sm text-muted-foreground">10 questions</span>
              </div>
              <h4 className="font-semibold mb-1">Compétences Techniques</h4>
              <p className="text-sm text-muted-foreground">
                Évaluation objective de vos compétences en algorithmes, SQL, cryptographie, ML
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Bloc 2</Badge>
                <span className="text-sm text-muted-foreground">15 questions</span>
              </div>
              <h4 className="font-semibold mb-1">Style Cognitif</h4>
              <p className="text-sm text-muted-foreground">
                Identification de vos préférences de travail et style professionnel
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Bloc 3</Badge>
                <span className="text-sm text-muted-foreground">5 questions</span>
              </div>
              <h4 className="font-semibold mb-1">Scénarios Pratiques</h4>
              <p className="text-sm text-muted-foreground">
                Résolution de situations professionnelles concrètes et réalistes
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Bloc 4</Badge>
                <span className="text-sm text-muted-foreground">5 questions</span>
              </div>
              <h4 className="font-semibold mb-1">Questions Ouvertes</h4>
              <p className="text-sm text-muted-foreground">
                Partage de votre expérience et de vos aspirations professionnelles
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {(hasEnrichment.riasec || hasEnrichment.cognitive) && (
        <Alert className="mb-6 border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <b>Enrichissement automatique activé !</b>
            <br />
            {hasEnrichment.riasec && "Vos résultats RIASEC "}
            {hasEnrichment.riasec && hasEnrichment.cognitive && "et "}
            {hasEnrichment.cognitive && "votre profil cognitif "}
            enrichiront automatiquement votre certification pour un résultat plus précis.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardFooter className="flex justify-between items-center pt-6">
          <div className="text-sm text-muted-foreground">
            <Clock className="h-4 w-4 inline mr-1" />
            Environ 20-25 minutes
          </div>
          {existingSession ? (
            <Button onClick={continueSession} size="lg" disabled={loading}>
              {existingSession.isCompleted ? "Voir mes résultats" : "Continuer la certification"}
            </Button>
          ) : (
            <Button onClick={startCertification} size="lg" disabled={loading}>
              {loading ? "Démarrage..." : "Commencer la certification"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
