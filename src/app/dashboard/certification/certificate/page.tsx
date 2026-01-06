"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, CheckCircle, Copy, ExternalLink } from "lucide-react";

interface CertificateData {
  id: string;
  blockchainHash: string;
  verificationUrl: string;
  issuedAt: string;
  validUntil: string;
  session: {
    primaryRole: string;
    level: string;
    devScore: number;
    dataScore: number;
    cyberScore: number;
    infraScore: number;
    coherenceScore: number;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function CertificatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certificateId = searchParams.get("id");

  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!certificateId) {
      router.push("/dashboard/certification");
      return;
    }

    async function loadCertificate() {
      try {
        const response = await fetch(`/api/certification/certificate?id=${certificateId}`);
        
        if (!response.ok) {
          throw new Error("Certificat non trouvé");
        }

        const data = await response.json();
        setCertificate(data);
      } catch (error) {
        console.error("Error loading certificate:", error);
        alert("Erreur lors du chargement du certificat");
        router.push("/dashboard/certification");
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, [certificateId, router]);

  function copyVerificationUrl() {
    if (!certificate) return;
    navigator.clipboard.writeText(certificate.verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadPDF() {
    alert("Fonctionnalité de téléchargement PDF à venir");
  }

  if (loading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center">Chargement du certificat...</div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  const issuedDate = new Date(certificate.issuedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const validUntilDate = new Date(certificate.validUntil).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center gap-3 mb-6">
        <Award className="h-8 w-8 text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold">Certificat Professionnel</h1>
          <p className="text-muted-foreground">Métiers du Numérique</p>
        </div>
      </div>

      <Card className="mb-6 border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Award className="h-20 w-20 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl mb-2">Certificat de Compétences</CardTitle>
          <CardDescription className="text-lg">
            Délivré à <b>{certificate.user.name}</b>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {certificate.session.primaryRole}
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              Niveau {certificate.session.level}
            </Badge>
          </div>

          <div className="grid md:grid-cols-4 gap-4 py-6 border-y">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {certificate.session.devScore}%
              </div>
              <div className="text-sm text-muted-foreground">Développement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {certificate.session.dataScore}%
              </div>
              <div className="text-sm text-muted-foreground">Data Science</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {certificate.session.cyberScore}%
              </div>
              <div className="text-sm text-muted-foreground">Cybersécurité</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {certificate.session.infraScore}%
              </div>
              <div className="text-sm text-muted-foreground">Infrastructure</div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Délivré le <b>{issuedDate}</b>
            </p>
            <p className="text-sm text-muted-foreground">
              Valide jusqu'au <b>{validUntilDate}</b>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Authentification Blockchain
          </CardTitle>
          <CardDescription>
            Ce certificat est enregistré sur la blockchain et peut être vérifié publiquement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Hash Blockchain</label>
            <div className="flex gap-2">
              <code className="flex-1 p-3 bg-muted rounded text-sm font-mono break-all">
                {certificate.blockchainHash}
              </code>
              <Button variant="outline" size="icon" onClick={copyVerificationUrl}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">URL de vérification</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={certificate.verificationUrl}
                readOnly
                className="flex-1 p-3 bg-muted rounded text-sm"
              />
              <Button variant="outline" size="icon" onClick={copyVerificationUrl}>
                {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(certificate.verificationUrl, "_blank")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Vérifier le certificat publiquement
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Button onClick={downloadPDF} size="lg" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Télécharger en PDF
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Partager sur LinkedIn
        </Button>
      </div>
    </div>
  );
}
