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

interface ReportSection {
  id: string
  title: string
  content: string
}

interface GeneratedReport {
  sections: ReportSection[]
  generatedAt: string
  version: string
}

export default function ReportPage() {
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const [hasCognitiveSession, setHasCognitiveSession] = useState(false)
  const [report, setReport] = useState<GeneratedReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("cadre")

  useEffect(() => {
    async function fetchData() {
      try {
        // Check payment status
        const profileRes = await fetch("/api/user/profile")
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setHasPaid(profileData.hasPaid === true)
        }

        // Check for existing report
        const reportRes = await fetch("/api/report/generate")
        if (reportRes.ok) {
          const reportData = await reportRes.json()
          if (reportData.report) {
            setReport(reportData.report)
            setHasCognitiveSession(true)
          }
        } else if (reportRes.status === 404) {
          // Check if cognitive session exists
          const sessionRes = await fetch("/api/cognitive/session")
          if (sessionRes.ok) {
            setHasCognitiveSession(true)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const generateReport = useCallback(async () => {
    setGenerating(true)
    setError(null)
    
    try {
      const res = await fetch("/api/report/generate", {
        method: "POST",
      })
      
      if (res.ok) {
        const data = await res.json()
        setReport(data)
      } else {
        const errorData = await res.json()
        setError(errorData.message || "Erreur lors de la génération")
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setGenerating(false)
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
              <h1 className="text-2xl font-bold text-foreground mb-2">Évaluation Cognitive Requise</h1>
              <p className="text-muted-foreground">
                Complétez d'abord l'évaluation cognitive pour générer votre rapport personnalisé.
              </p>
            </div>
            <Link href="/dashboard/cognitive-assessment">
              <Button size="lg">Commencer l'évaluation</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!report) {
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
            </div>
            
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
            
            <Button 
              size="lg" 
              onClick={generateReport}
              disabled={generating}
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
                  Générer mon rapport
                </>
              )}
            </Button>
            
            {generating && (
              <p className="text-sm text-muted-foreground">
                Cette opération peut prendre jusqu'à 30 secondes...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Report view
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
              Généré le {new Date(report.generatedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateReport} disabled={generating} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
            Régénérer
          </Button>
          <Button onClick={handlePrint} className="gap-2">
            <Download className="w-4 h-4" />
            Exporter PDF
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Navigation sidebar */}
        <nav className="space-y-1 print:hidden">
          {report.sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="font-medium">{index + 1}.</span> {section.title}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="space-y-8">
          {/* Screen view - single section */}
          <div className="print:hidden">
            {report.sections
              .filter(s => s.id === activeSection)
              .map(section => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                Document généré le {new Date(report.generatedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {report.sections.map((section, index) => (
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
