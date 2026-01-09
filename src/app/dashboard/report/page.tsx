"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Download, 
  Loader2, 
  Lock, 
  Brain, 
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { CompleteReportSections } from "@/lib/report-generator"

interface ReportSection {
  id: keyof CompleteReportSections
  title: string
  content: string
  part: number
}

interface GeneratedReport {
  sections: ReportSection[]
  generatedAt: string
  version: string
  userName?: string
}

export default function ReportPage() {
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const [hasCognitiveSession, setHasCognitiveSession] = useState(false)
  const [report, setReport] = useState<GeneratedReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("cadre")
  const [canRegenerate, setCanRegenerate] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        console.log('🔍 [Report] Vérification des prérequis...');

        // 1. Vérifier le paiement
        const profileRes = await fetch("/api/user/profile");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const paid = profileData.hasPaid === true;
          setHasPaid(paid);

          console.log('💰 [Report] Paiement:', paid ? 'OK' : 'NON PAYÉ');

          if (!paid) {
            setLoading(false);
            return;
          }
        }

        // 2. Vérifier si un rapport existe déjà
        console.log('📄 [Report] Vérification rapport existant...');
        const reportRes = await fetch('/api/report/generate');

        if (reportRes.ok) {
          const reportData = await reportRes.json();
          setReport(reportData);
          setCanRegenerate(true);
          setError(null);
          console.log('✅ [Report] Rapport existant trouvé:', {
            hasSections: !!reportData.sections,
            sectionsCount: reportData.sections?.length,
            generatedAt: reportData.generatedAt
          });

          if (reportData.sections && Array.isArray(reportData.sections)) {
            setReport(reportData);
            setHasCognitiveSession(true);
            setActiveSection(reportData.sections[0]?.id || 'cadre');
            setCanRegenerate(true);
            setLoading(false);
            return;
          } else {
            console.error('❌ [Report] Rapport existant mais format invalide');
            setError('Format de rapport invalide');
            setLoading(false);
            return;
          }
        } else if (reportRes.status === 404) {
          console.log('📄 [Report] Aucun rapport existant (404), vérification session cognitive...');
          // Continue to cognitive session check
        } else {
          console.error('❌ [Report] Erreur API rapport:', reportRes.status, await reportRes.text());
          setError('Erreur lors de la vérification du rapport');
          setLoading(false);
          return;
        }

        // 3. Pas de rapport → Vérifier session cognitive
        console.log('🧠 [Report] Vérification session cognitive...');
        const sessionRes = await fetch('/api/cognitive/session');

        console.log('🧠 [Report] Session API response status:', sessionRes.status);

        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();

          console.log('🔍 [Report] Session cognitive data:', {
            found: !!sessionData,
            id: sessionData.id,
            status: sessionData.status,
            allTestsCompleted: sessionData.allTestsCompleted,
            hasSignature: sessionData.hasSignature,
            isFullyCompleted: sessionData.isFullyCompleted,
            testsCompleted: sessionData.testsCompleted,
            tests: {
              stroop: sessionData.stroopCompleted,
              reaction: sessionData.reactionTimeCompleted,
              trail: sessionData.trailMakingCompleted,
              ran: sessionData.ranVisualCompleted
            }
          });

          // ✅ Vérifier si TOUS les tests sont complétés + signature existe
          if (sessionData.isFullyCompleted ||
              (sessionData.allTestsCompleted && sessionData.hasSignature)) {

            console.log('✅ [Report] Tous les tests sont complétés, génération autorisée');
            setHasCognitiveSession(true);
            setCanRegenerate(true);
          } else {
            console.warn('⚠️ [Report] Tests incomplets:', {
              testsCompleted: sessionData.testsCompleted,
              hasSignature: sessionData.hasSignature,
              allTestsCompleted: sessionData.allTestsCompleted,
              isFullyCompleted: sessionData.isFullyCompleted
            });
            setHasCognitiveSession(false);
          }
        } else {
          const errorText = await sessionRes.text();
          console.error('❌ [Report] Session API failed:', sessionRes.status, errorText);
          setHasCognitiveSession(false);
        }

      } catch (error) {
        console.error('❌ [Report] Erreur chargement:', error);
        setError('Erreur lors de la vérification des données');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const generateReport = useCallback(async () => {
    if (!canRegenerate) {
      setError("Votre rapport a déjà été généré. Consultez-le ci-dessous.")
      return
    }

    setGenerating(true)
    setError(null)

    try {
      const res = await fetch("/api/report/generate", {
        method: "POST",
      })

      if (res.status === 409) {
        // Rapport déjà existant
        const data = await res.json()
        setError(data.message)

        if (data.existingReport) {
          setReport(data.existingReport)
          setActiveSection(data.existingReport.sections[0]?.id || "cadre")
        }

        setCanRegenerate(false)
        return
      }

      if (res.ok) {
        const data = await res.json()
        if (!data.sections || !Array.isArray(data.sections)) {
          throw new Error("Format de rapport invalide : sections manquantes")
        }
        setReport(data)
        setActiveSection(data.sections[0]?.id || "cadre")
        setCanRegenerate(true) // ✅ Permettre la régénération
        console.log('✅ Rapport généré et sauvegardé')
      } else {
        const errorData = await res.json()
        setError(errorData.message || errorData.error || "Erreur lors de la génération")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur de connexion")
    } finally {
      setGenerating(false)
    }
  }, [canRegenerate])

  const handleDownloadPdf = useCallback(async () => {
    setDownloadingPdf(true)
    setError(null)

    try {
      console.log('🚀 Appel API /api/pdf/generate...')

      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la generation du PDF')
      }

      // Telecharger le PDF
      const blob = await response.blob()
      console.log('✅ PDF recu:', blob.size, 'bytes')

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `bilan-perspecta-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      console.log('✅ PDF telecharge')
    } catch (error) {
      console.error('❌ Erreur PDF:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      setError(`Erreur PDF: ${errorMessage}`)
    } finally {
      setDownloadingPdf(false)
    }
  }, [])

  // Fonction de test PDF demo
  const handleTestPdf = useCallback(async () => {
    try {
      console.log('🧪 Test PDF demo...')

      const response = await fetch('/api/pdf/demo')
      if (!response.ok) {
        throw new Error('Erreur API demo')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'test-perspecta-demo.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      console.log('✅ Test PDF reussi')
    } catch (error) {
      console.error('❌ Test PDF echoue:', error)
      setError('Erreur de test PDF')
    }
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!hasPaid) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <Lock className="w-16 h-16 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Accès Premium Requis</h1>
              <p className="text-muted-foreground">
                Le rapport d'orientation professionnelle est réservé aux utilisateurs premium.
              </p>
            </div>
            <Link href="/pricing">
              <Button size="lg">Débloquer mon bilan — 49 €</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasCognitiveSession) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <Brain className="w-16 h-16 text-muted-foreground mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Évaluation Cognitive Requise
              </h1>
              <p className="text-muted-foreground">
                Complétez d'abord l'évaluation cognitive pour générer votre rapport personnalisé.
              </p>

              {/* ✅ Diagnostic détaillé */}
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg text-left">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                  📋 Prérequis pour la génération :
                </p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>✅ Paiement effectué (49€)</li>
                  <li className="flex items-center gap-2">
                    <span>❓ Les 4 tests cognitifs doivent être terminés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>❓ La signature cognitive doit être calculée</span>
                  </li>
                </ul>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
                  💡 Si vous avez terminé tous les tests, actualisez la page (F5)
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/cognitive-assessment">
                <Button size="lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Aller aux tests
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Actualiser
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // At this point: hasPaid = true, hasCognitiveSession = true
  // Now check if we have a report or need to show generation UI
  if (!report) {
    // Show report generation UI
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <FileText className="w-16 h-16 text-primary mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Générer votre Rapport d'Orientation
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Votre rapport personnalisé sera généré à partir de votre signature cognitive,
                profil RIASEC, valeurs et expériences.
              </p>
              <p className="text-sm text-amber-600 mt-2 font-medium">
                ⏱️ Temps estimé : 15-30 secondes
              </p>

              {/* ✅ Message if already generated */}
              {!canRegenerate && (
                <p className="text-sm text-red-500 mt-4 font-medium">
                  ⚠️ Vous avez déjà généré votre rapport. Il est consultable ci-dessous ou depuis votre profil.
                </p>
              )}
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button
              size="lg"
              onClick={generateReport}
              disabled={generating || !canRegenerate}
              className="gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  {canRegenerate ? 'Générer mon rapport (IA)' : 'Rapport déjà généré'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // At this point: hasPaid = true, hasCognitiveSession = true
  // Report exists - show report view
  console.log('📄 [Report] Showing existing report view');
  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rapport d'Orientation Professionnelle</h1>
            <p className="text-sm text-muted-foreground">
              Généré le {report?.generatedAt ? new Date(report.generatedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }) : 'date inconnue'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTestPdf} className="gap-2">
            <FileText className="w-4 h-4" />
            Test PDF (debug)
          </Button>
          <Button 
            variant="outline" 
            onClick={generateReport} 
            disabled={generating || !canRegenerate}
            className="gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Régénération...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Régénérer (14€)
              </>
            )}
          </Button>
          <Button onClick={handleDownloadPdf} disabled={downloadingPdf} className="gap-2">
            {downloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Génération PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Télécharger PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Regeneration info badge */}
      <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-semibold">Régénération du rapport : 14€</span>
              <span className="ml-2">
                • Chaque régénération nécessite un paiement
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Navigation sidebar */}
        <nav className="space-y-2 print:hidden">
          <div className="sticky top-8 space-y-1">
            {report?.sections.map((section: ReportSection, index: number) => {
              const isActive = activeSection === section.id
              const partLabel = `Partie ${section.part}`

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold ${isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}
                    >
                      {partLabel}
                    </span>
                    <span
                      className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className={`font-medium ${isActive ? "" : "text-foreground"}`}>
                    {section.title}
                  </div>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-8">
          {/* Screen view - single section */}
          <div className="print:hidden">
            {report?.sections
              .filter((s: ReportSection) => s.id === activeSection)
              .map((section: ReportSection) => (
                <Card key={section.id} className="shadow-sm">
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Partie {section.part}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {report!.sections.findIndex((s: ReportSection) => s.id === section.id) + 1} / {report!.sections.length}
                      </span>
                    </div>
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="prose prose-slate max-w-none dark:prose-invert">
                      {section.content.split("\n\n").map((paragraph: string, idx: number) => (
                        <p key={idx} className="text-foreground/90 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  if (!report) return
                  const currentIndex = report.sections.findIndex((s: ReportSection) => s.id === activeSection)
                  if (currentIndex > 0) {
                    setActiveSection(report.sections[currentIndex - 1].id)
                  }
                }}
                disabled={!report || report.sections.findIndex((s: ReportSection) => s.id === activeSection) === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Section précédente
              </Button>

              <Button
                onClick={() => {
                  if (!report) return
                  const currentIndex = report.sections.findIndex((s: ReportSection) => s.id === activeSection)
                  if (currentIndex < report.sections.length - 1) {
                    setActiveSection(report.sections[currentIndex + 1].id)
                  }
                }}
                disabled={!report || report.sections.findIndex((s: ReportSection) => s.id === activeSection) === report.sections.length - 1}
                className="gap-2"
              >
                Section suivante
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </div>

          {/* Print view - all sections */}
          <div className="hidden print:block space-y-8">
            {/* Cover page */}
            <div className="text-center py-16 border-b">
              <h1 className="text-4xl font-bold mb-4">PERSPECTA</h1>
              <h2 className="text-2xl text-muted-foreground mb-8">
                Rapport d'Orientation Professionnelle Cognitive
              </h2>
              <p className="text-sm text-muted-foreground">
                Document généré le {new Date(report?.generatedAt || Date.now()).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground">Version {report?.version}</p>
            </div>

            {report?.sections.map((section: ReportSection, index: number) => (
              <div key={section.id} className="page-break-before">
                <h2 className="text-xl font-bold mb-4 text-primary">
                  {index + 1}. {section.title}
                </h2>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="text-center py-8 border-t text-sm text-muted-foreground">
              <p>PERSPECTA — Méthodologie propriétaire basée sur des mesures comportementales</p>
              <p>© {new Date().getFullYear()} ia-solution. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
