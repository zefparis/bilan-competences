"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, CheckCircle, Copy, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

function CertificateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certificateId = searchParams.get("id");

  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

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
    toast.success("URL copiée dans le presse-papiers");
    setTimeout(() => setCopied(false), 2000);
  }

  async function downloadPDF() {
    if (!certificate) return;
    
    setDownloading(true);
    try {
      const response = await fetch('/api/certification/certificate/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificateId: certificate.id })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificat-${certificate.session.primaryRole.replace(/\//g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Certificat téléchargé avec succès');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Erreur lors du téléchargement du certificat');
    } finally {
      setDownloading(false);
    }
  }

  function shareOnLinkedIn() {
    if (!certificate) return;
    
    const text = `Je suis fier(e) d'avoir obtenu ma certification ${certificate.session.primaryRole} (Niveau ${certificate.session.level}) ! 🎓\n\nVérifiez mon certificat : ${certificate.verificationUrl}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificate.verificationUrl)}`;
    
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold">Certificat Professionnel</h1>
            <p className="text-muted-foreground">Métiers du Numérique</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard/certification')}>
          Retour
        </Button>
      </div>

      <Card ref={certificateRef} className="mb-6 border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 via-amber-50 to-white dark:from-yellow-950 dark:via-amber-950 dark:to-background shadow-xl">
        <CardHeader className="text-center pb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-4 left-4 text-6xl">🏆</div>
            <div className="absolute top-4 right-4 text-6xl">🎓</div>
            <div className="absolute bottom-4 left-4 text-6xl">⭐</div>
            <div className="absolute bottom-4 right-4 text-6xl">✨</div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Award className="h-24 w-24 text-yellow-500 drop-shadow-lg" />
                <div className="absolute inset-0 animate-pulse bg-yellow-400 blur-xl opacity-20 rounded-full"></div>
              </div>
            </div>
            <CardTitle className="text-4xl mb-3 font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Certificat de Compétences
            </CardTitle>
            <CardDescription className="text-xl text-foreground/80">
              Délivré à <span className="font-bold text-primary">{certificate.user.name}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-6 rounded-lg border border-primary/20">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {certificate.session.primaryRole}
            </h2>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-primary text-primary-foreground font-semibold">
              Niveau {certificate.session.level}
            </Badge>
          </div>

          <div className="grid md:grid-cols-4 gap-4 py-6 border-y border-yellow-200 dark:border-yellow-800">
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {certificate.session.devScore}%
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Développement</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                {certificate.session.dataScore}%
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">Data Science</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-1">
                {certificate.session.cyberScore}%
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">Cybersécurité</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {certificate.session.infraScore}%
              </div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Infrastructure</div>
            </div>
          </div>

          <div className="text-center space-y-2 bg-muted/30 py-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              📅 Délivré le <span className="font-bold text-foreground">{issuedDate}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              ⏰ Valide jusqu'au <span className="font-bold text-foreground">{validUntilDate}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-green-200 dark:border-green-800">
        <CardHeader className="bg-green-50 dark:bg-green-950/30">
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
        <Button 
          onClick={downloadPDF} 
          size="lg" 
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg"
          disabled={downloading}
        >
          {downloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Télécharger en PDF
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          onClick={shareOnLinkedIn}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Partager sur LinkedIn
        </Button>
      </div>
    </div>
  );
}

export default function CertificatePage() {
  return (
    <Suspense fallback={<div className="container py-8">Chargement du certificat...</div>}>
      <CertificateContent />
    </Suspense>
  );
}
