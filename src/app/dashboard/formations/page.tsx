"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, MapPin, Clock, Award, Euro, ExternalLink, Calendar } from "lucide-react"

interface Formation {
  id: string
  intitule: string
  description: string
  organisme: { nom: string; ville: string }
  duree: string
  niveauSortie: string
  certification: string
  modalites: string
  dateDebut: string
  url: string
  coutTotal: string
  financement: string[]
}

export default function FormationsPage() {
  const searchParams = useSearchParams()
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [targetMetier, setTargetMetier] = useState<string | null>(null)

  useEffect(() => {
    const romeCode = searchParams.get("romeCode")
    const label = searchParams.get("label")
    
    if (romeCode && label) {
      setTargetMetier(label)
      setSearchKeywords(label)
      fetchFormations(label, romeCode)
    } else {
      fetchFormations()
    }
  }, [searchParams])

  const fetchFormations = async (keywords?: string, romeCode?: string) => {
    setLoading(true)
    setHasSearched(true)
    try {
      const params = new URLSearchParams()
      if (keywords) {
        params.append("keywords", keywords)
      }
      if (romeCode) {
        params.append("romeCodes", romeCode)
      }
      params.append("limit", "20")

      const res = await fetch(`/api/formations?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setFormations(data.formations)
      }
    } catch (error) {
      console.error("Error fetching formations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchFormations(searchKeywords)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Formations Professionnelles</h1>
        <p className="text-gray-600">
          {targetMetier 
            ? `Formations recommandées pour : ${targetMetier}`
            : "Découvrez les formations adaptées à votre projet de reconversion"
          }
        </p>
      </div>

      {/* Barre de recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Rechercher une formation (ex: développeur, comptable, infirmier...)"
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Recherche en cours...</p>
          </div>
        </div>
      ) : formations.length === 0 && hasSearched ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucune formation trouvée</p>
            <p className="text-sm text-gray-500 mt-2">
              Essayez avec d'autres mots-clés
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {formations.length} formation{formations.length > 1 ? "s" : ""} trouvée{formations.length > 1 ? "s" : ""}
            </p>
          </div>

          {formations.map((formation) => (
            <Card key={formation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      {formation.intitule}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {formation.organisme.nom} - {formation.organisme.ville}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formation.duree}
                      </span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formation.url, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir la formation
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{formation.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Certification</p>
                        <p className="text-sm font-medium">{formation.certification}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Niveau de sortie</p>
                        <p className="text-sm font-medium">{formation.niveauSortie}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-500">Date de début</p>
                        <p className="text-sm font-medium">
                          {new Date(formation.dateDebut).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Coût total</p>
                        <p className="text-sm font-medium">{formation.coutTotal}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Modalités</p>
                      <Badge variant="outline">{formation.modalites}</Badge>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Financement possible</p>
                      <div className="flex flex-wrap gap-1">
                        {formation.financement.map((fin) => (
                          <Badge key={fin} variant="secondary" className="text-xs">
                            {fin}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {formation.organisme.nom}
                      </Badge>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => window.open(formation.url, "_blank")}
                    >
                      En savoir plus
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info CPF */}
      {formations.length > 0 && (
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Financement par le CPF
                </h3>
                <p className="text-sm text-blue-800">
                  La plupart de ces formations sont éligibles au Compte Personnel de Formation (CPF).
                  Connectez-vous sur{" "}
                  <a
                    href="https://www.moncompteformation.gouv.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    moncompteformation.gouv.fr
                  </a>{" "}
                  pour vérifier vos droits et financer votre formation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
