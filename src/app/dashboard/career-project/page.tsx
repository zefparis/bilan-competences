"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, Briefcase, TrendingUp, Trash2, Edit, Save, X, BookOpen, Sparkles } from "lucide-react"
import { searchROMECodes, type ROMECode } from "@/lib/france-travail/rome-codes"
import { toast } from "sonner"

interface CareerProject {
  id: string
  targetRomeCode: string
  targetRomeLabel: string
  targetDomain: string
  motivation?: string
  timeline?: string
  constraints?: string
  currentSkills: string[]
  requiredSkills: string[]
  skillsGap: string[]
  status: string
  createdAt: string
  updatedAt: string
}

export default function CareerProjectPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<CareerProject[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ROMECode[]>([])
  const [selectedRome, setSelectedRome] = useState<ROMECode | null>(null)
  const [motivation, setMotivation] = useState("")
  const [timeline, setTimeline] = useState("")
  const [constraints, setConstraints] = useState("")
  const [currentSkills, setCurrentSkills] = useState<string[]>([])
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [requiredSkillInput, setRequiredSkillInput] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchROMECodes(searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/career-project")
      if (res.ok) {
        const data = await res.json()
        console.log("📊 Projets récupérés:", data.projects)
        data.projects.forEach((p: CareerProject) => {
          console.log(`Projet ${p.id}:`, {
            currentSkills: p.currentSkills,
            currentSkillsLength: p.currentSkills?.length || 0,
            requiredSkills: p.requiredSkills,
            requiredSkillsLength: p.requiredSkills?.length || 0,
            buttonDisabled: (p.currentSkills?.length || 0) === 0 || (p.requiredSkills?.length || 0) === 0
          })
        })
        setProjects(data.projects)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedRome(null)
    setMotivation("")
    setTimeline("")
    setConstraints("")
    setCurrentSkills([])
    setRequiredSkills([])
    setSearchQuery("")
    setSearchResults([])
    setSkillInput("")
    setRequiredSkillInput("")
    setEditingId(null)
    setIsEditing(false)
  }

  const startEditProject = (project: CareerProject) => {
    setEditingId(project.id)
    setIsEditing(true)
    setSelectedRome({
      code: project.targetRomeCode,
      label: project.targetRomeLabel,
      domain: project.targetDomain,
      riasecMatch: []
    })
    setSearchQuery(project.targetRomeLabel)
    setMotivation(project.motivation || "")
    setTimeline(project.timeline || "")
    setConstraints(project.constraints || "")
    setCurrentSkills(project.currentSkills || [])
    setRequiredSkills(project.requiredSkills || [])
    setShowCreateForm(true)
  }

  const handleCreateProject = async () => {
    if (!selectedRome) return

    try {
      if (isEditing && editingId) {
        // Mode édition
        const res = await fetch(`/api/career-project/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            motivation,
            timeline,
            constraints,
            currentSkills,
            requiredSkills,
            skillsGap: requiredSkills.filter(s => !currentSkills.includes(s))
          })
        })

        if (res.ok) {
          await fetchProjects()
          setShowCreateForm(false)
          resetForm()
        }
      } else {
        // Mode création
        const res = await fetch("/api/career-project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetRomeCode: selectedRome.code,
            targetRomeLabel: selectedRome.label,
            targetDomain: selectedRome.domain,
            motivation,
            timeline,
            constraints,
            currentSkills,
            requiredSkills,
            skillsGap: requiredSkills.filter(s => !currentSkills.includes(s))
          })
        })

        if (res.ok) {
          await fetchProjects()
          setShowCreateForm(false)
          resetForm()
        }
      }
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) return

    try {
      const res = await fetch(`/api/career-project/${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        toast.success("Projet supprimé avec succès")
        await fetchProjects()
      } else {
        const error = await res.json()
        toast.error("Erreur lors de la suppression", {
          description: error.error || "Impossible de supprimer le projet"
        })
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error("Erreur lors de la suppression", {
        description: "Une erreur est survenue"
      })
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/career-project/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error("Error updating project:", error)
    }
  }

  const addCurrentSkill = () => {
    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      setCurrentSkills([...currentSkills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const addRequiredSkill = () => {
    if (requiredSkillInput.trim() && !requiredSkills.includes(requiredSkillInput.trim())) {
      setRequiredSkills([...requiredSkills, requiredSkillInput.trim()])
      setRequiredSkillInput("")
    }
  }

  const removeCurrentSkill = (skill: string) => {
    setCurrentSkills(currentSkills.filter(s => s !== skill))
  }

  const removeRequiredSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill))
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

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projet Professionnel</h1>
        <p className="text-gray-600">
          Définissez et suivez vos projets de reconversion professionnelle
        </p>
      </div>

      {!showCreateForm && (
        <Button
          onClick={() => setShowCreateForm(true)}
          className="mb-6"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau projet professionnel
        </Button>
      )}

      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isEditing ? "Modifier le projet professionnel" : "Créer un projet professionnel"}</CardTitle>
            <CardDescription>
              {isEditing ? "Modifiez les informations de votre projet" : "Sélectionnez un métier cible et définissez votre projet"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recherche métier ROME */}
            <div className="space-y-2">
              <Label htmlFor="rome-search">Métier cible</Label>
              <Input
                id="rome-search"
                placeholder="Rechercher un métier (ex: développeur, infirmier, commercial...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="border rounded-md max-h-60 overflow-y-auto">
                  {searchResults.map((rome) => (
                    <div
                      key={rome.code}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => {
                        setSelectedRome(rome)
                        setSearchQuery(rome.label)
                        setSearchResults([])
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{rome.label}</p>
                          <p className="text-sm text-gray-500">
                            {rome.code} - {rome.domain}
                          </p>
                        </div>
                        <Badge variant="outline">{rome.riasecMatch.join("")}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedRome && (
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="font-medium text-blue-900">{selectedRome.label}</p>
                  <p className="text-sm text-blue-700">
                    {selectedRome.code} - {selectedRome.domain}
                  </p>
                </div>
              )}
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation</Label>
              <Textarea
                id="motivation"
                placeholder="Pourquoi ce métier vous intéresse-t-il ?"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                rows={3}
              />
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label htmlFor="timeline">Horizon temporel</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="court_terme">Court terme (0-6 mois)</SelectItem>
                  <SelectItem value="moyen_terme">Moyen terme (6-18 mois)</SelectItem>
                  <SelectItem value="long_terme">Long terme (18+ mois)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contraintes */}
            <div className="space-y-2">
              <Label htmlFor="constraints">Contraintes</Label>
              <Textarea
                id="constraints"
                placeholder="Contraintes géographiques, financières, temporelles..."
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                rows={2}
              />
            </div>

            {/* Compétences actuelles */}
            <div className="space-y-2">
              <Label>Compétences actuelles</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter une compétence"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCurrentSkill()}
                />
                <Button type="button" onClick={addCurrentSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeCurrentSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Compétences requises */}
            <div className="space-y-2">
              <Label>Compétences requises pour le métier cible</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter une compétence requise"
                  value={requiredSkillInput}
                  onChange={(e) => setRequiredSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addRequiredSkill()}
                />
                <Button type="button" onClick={addRequiredSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeRequiredSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCreateProject}
                disabled={!selectedRome}
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Enregistrer les modifications" : "Créer le projet"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateForm(false)
                  resetForm()
                }}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des projets */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun projet professionnel créé</p>
              <p className="text-sm text-gray-500 mt-2">
                Commencez par créer votre premier projet de reconversion
              </p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      {project.targetRomeLabel}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {project.targetRomeCode} - {project.targetDomain}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={project.status}
                      onValueChange={(status) => handleUpdateStatus(project.id, status)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Brouillon</SelectItem>
                        <SelectItem value="ACTIVE">Actif</SelectItem>
                        <SelectItem value="COMPLETED">Terminé</SelectItem>
                        <SelectItem value="ARCHIVED">Archivé</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditProject(project)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.motivation && (
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Motivation</h4>
                    <p className="text-sm text-gray-700">{project.motivation}</p>
                  </div>
                )}

                {project.timeline && (
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Horizon</h4>
                    <Badge variant="outline">
                      {project.timeline === "court_terme" && "Court terme (0-6 mois)"}
                      {project.timeline === "moyen_terme" && "Moyen terme (6-18 mois)"}
                      {project.timeline === "long_terme" && "Long terme (18+ mois)"}
                    </Badge>
                  </div>
                )}

                {project.currentSkills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Compétences actuelles</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.currentSkills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.skillsGap.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      Compétences à développer
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skillsGap.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-orange-300 text-orange-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-gray-500">
                      Créé le {new Date(project.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => router.push(`/dashboard/career-project/${project.id}/analysis`)}
                      disabled={project.currentSkills.length === 0 || project.requiredSkills.length === 0}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyse IA
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/formations?romeCode=${project.targetRomeCode}&label=${encodeURIComponent(project.targetRomeLabel)}`)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Formations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
