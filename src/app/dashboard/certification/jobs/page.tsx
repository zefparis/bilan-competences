"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, TrendingUp, RefreshCw, ExternalLink, Building } from "lucide-react";

interface JobOffer {
  id: string;
  intitule: string;
  description: string;
  entreprise?: { nom?: string };
  lieuTravail?: { libelle?: string };
  typeContrat?: string;
  salaire?: { libelle?: string };
  dateCreation: string;
  matchScore: number;
}

function JobsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      router.push("/dashboard/certification");
      return;
    }

    async function loadCertificate() {
      try {
        const response = await fetch(`/api/certification/session`);
        if (response.ok) {
          const data = await response.json();
          if (data.certificate?.id) {
            setCertificateId(data.certificate.id);
            loadJobs(data.certificate.id, false);
          } else {
            const certResponse = await fetch("/api/certification/certificate/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId })
            });
            if (certResponse.ok) {
              const certData = await certResponse.json();
              setCertificateId(certData.certificateId);
              loadJobs(certData.certificateId, false);
            }
          }
        }
      } catch (error) {
        console.error("Error loading certificate:", error);
        setLoading(false);
      }
    }

    loadCertificate();
  }, [sessionId, router]);

  async function loadJobs(certId: string, refresh: boolean) {
    if (refresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch(
        `/api/certification/jobs?certificateId=${certId}&refresh=${refresh}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des offres");
      }

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      alert("Erreur lors du chargement des offres d'emploi");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function refreshJobs() {
    if (certificateId) {
      loadJobs(certificateId, true);
    }
  }

  function getMatchColor(score: number): string {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-blue-600 bg-blue-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
  }

  if (loading) {
    return (
      <div className="container max-w-6xl py-8">
        <div className="text-center">Chargement des offres d'emploi...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Offres d'emploi</h1>
            <p className="text-muted-foreground">
              {jobs.length} offres matchées avec votre profil
            </p>
          </div>
        </div>
        <Button onClick={refreshJobs} disabled={refreshing} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune offre disponible</h3>
            <p className="text-muted-foreground mb-4">
              Aucune offre d'emploi ne correspond actuellement à votre profil.
            </p>
            <Button onClick={refreshJobs} variant="outline">
              Réessayer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{job.intitule}</CardTitle>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {job.entreprise?.nom && (
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {job.entreprise.nom}
                        </span>
                      )}
                      {job.lieuTravail?.libelle && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.lieuTravail.libelle}
                        </span>
                      )}
                      {job.typeContrat && (
                        <Badge variant="secondary">{job.typeContrat}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getMatchColor(job.matchScore)} font-bold px-3 py-1`}>
                      {job.matchScore}% match
                    </Badge>
                    {job.matchScore >= 80 && (
                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        Excellent match
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {job.salaire?.libelle && (
                      <span className="font-medium text-foreground">
                        {job.salaire.libelle}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(job.dateCreation).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir l'offre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Conseils pour postuler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Personnalisez votre CV en mettant en avant les compétences correspondant au poste</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Mentionnez votre certification professionnelle dans votre candidature</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Utilisez l'URL de vérification de votre certificat dans votre profil LinkedIn</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="container py-8">Chargement des offres...</div>}>
      <JobsContent />
    </Suspense>
  );
}
