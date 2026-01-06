"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  Clock,
  Lightbulb,
  Award,
  AlertTriangle
} from "lucide-react"

interface TransferableSkill {
  skill: string
  relevance: "high" | "medium" | "low"
  explanation: string
}

interface SkillGap {
  skill: string
  priority: "critical" | "important" | "nice-to-have"
  learningPath: string
}

interface Analysis {
  transferableSkills: TransferableSkill[]
  skillsGap: SkillGap[]
  compatibilityScore: number
  recommendations: string[]
  trainingPriorities: string[]
  estimatedTransitionTime: string
  successFactors: string[]
  challenges: string[]
}

interface CareerProject {
  id: string
  targetRomeCode: string
  targetRomeLabel: string
  targetDomain: string
  currentSkills: string[]
  requiredSkills: string[]
  skillsGap: string[]
}

export default function TransferableSkillsAnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<CareerProject | null>(null)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/career-project/${projectId}`)
      if (res.ok) {
        const data = await res.json()
        setProject(data.project)
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  const runAnalysis = async () => {
    if (!project) return

    setAnalyzing(true)
    try {
      const res = await fetch("/api/transferable-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentJob: {
            title: "Poste actuel",
            skills: project.currentSkills
          },
          targetJob: {
            romeCode: project.targetRomeCode,
            title: project.targetRomeLabel,
            requiredSkills: project.requiredSkills
          },
          includeRiasec: true
        })
      })

      if (res.ok) {
        const data = await res.json()
        setAnalysis(data.analysis)
      }
    } catch (error) {
      console.error("Error analyzing skills:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "high": return "bg-green-100 text-green-800 border-green-300"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low": return "bg-gray-100 text-gray-800 border-gray-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 border-red-300"
      case "important": return "bg-orange-100 text-orange-800 border-orange-300"
      case "nice-to-have": return "bg-blue-100 text-blue-800 border-blue-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">Projet non trouvé</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/career-project")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux projets
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse des Compétences Transférables</h1>
        <p className="text-gray-600">
          Projet : {project.targetRomeLabel}
        </p>
      </div>

      {!analysis ? (
        <Card>
          <CardHeader>
            <CardTitle>Lancer l'analyse IA</CardTitle>
            <CardDescription>
              Notre IA va analyser vos compétences actuelles et identifier celles qui sont transférables
              vers votre métier cible, ainsi que les compétences à développer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Compétences actuelles ({project.currentSkills.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {project.currentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Compétences requises ({project.requiredSkills.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {project.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={runAnalysis}
                disabled={analyzing}
                className="w-full"
                size="lg"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Target className="mr-2 h-4 w-4" />
                    Lancer l'analyse IA
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Score de compatibilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Score de Compatibilité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">
                    {analysis.compatibilityScore}%
                  </span>
                  <Badge variant="outline" className="text-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    {analysis.estimatedTransitionTime}
                  </Badge>
                </div>
                <Progress value={analysis.compatibilityScore} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">
                  Ce score reflète la compatibilité entre vos compétences actuelles et le métier cible.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Compétences transférables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Compétences Transférables ({analysis.transferableSkills.length})
              </CardTitle>
              <CardDescription>
                Ces compétences sont directement applicables à votre nouveau métier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.transferableSkills.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{item.skill}</h4>
                      <Badge className={getRelevanceColor(item.relevance)}>
                        {item.relevance === "high" && "Haute"}
                        {item.relevance === "medium" && "Moyenne"}
                        {item.relevance === "low" && "Faible"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gap de compétences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Compétences à Développer ({analysis.skillsGap.length})
              </CardTitle>
              <CardDescription>
                Ces compétences nécessitent un apprentissage ou une formation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.skillsGap.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{item.skill}</h4>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === "critical" && "Critique"}
                        {item.priority === "important" && "Important"}
                        {item.priority === "nice-to-have" && "Optionnel"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{item.learningPath}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Priorités de formation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Priorités de Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {analysis.trainingPriorities.map((priority, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-sm">{priority}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Recommandations Stratégiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facteurs de succès */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Facteurs de Succès
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.successFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Défis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Défis à Anticiper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={runAnalysis}
              disabled={analyzing}
              variant="outline"
            >
              {analyzing ? "Analyse en cours..." : "Relancer l'analyse"}
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/formations?romeCode=${project.targetRomeCode}&label=${encodeURIComponent(project.targetRomeLabel)}`)}
            >
              Voir les formations recommandées
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
