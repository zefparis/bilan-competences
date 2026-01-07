// FICHIER: src/app/dashboard/experiences/ExperiencesList.tsx

"use client"

import { useEffect, useState } from "react"
import { getExperiences } from "@/app/actions"
import { useActiveAssessment } from "@/lib/active-assessment"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Briefcase, Calendar, Award } from "lucide-react"
import { toast } from "sonner"

type Experience = {
  id: string
  title: string
  company: string
  startDate: Date
  endDate: Date | null
  skills: string
  situation: string
  task: string
  action: string
  result: string
}

interface ExperiencesListProps {
  refreshKey?: number
}

export function ExperiencesList({ refreshKey }: ExperiencesListProps) {
  const { data: activeAssessment, isLoading } = useActiveAssessment()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperiences() {
      if (!activeAssessment?.assessmentId) return
      
      try {
        setLoading(true)
        const data = await getExperiences(activeAssessment.assessmentId)
        console.log('📋 Expériences chargées:', data.length)
        setExperiences(data)
      } catch (error) {
        console.error('Erreur chargement expériences:', error)
        toast.error('Erreur lors du chargement des expériences')
      } finally {
        setLoading(false)
      }
    }
    
    fetchExperiences()
  }, [activeAssessment?.assessmentId, refreshKey])

  const formatDate = (date: Date | null) => {
    if (!date) return 'En cours'
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  }

  const calculateDuration = (start: Date, end: Date | null) => {
    const startDate = new Date(start)
    const endDate = end ? new Date(end) : new Date()
    
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 
                  + (endDate.getMonth() - startDate.getMonth())
    
    if (months < 12) return `${months} mois`
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (remainingMonths === 0) return `${years} an${years > 1 ? 's' : ''}`
    return `${years} an${years > 1 ? 's' : ''} et ${remainingMonths} mois`
  }

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400">
        Chargement...
      </div>
    )
  }

  if (experiences.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <Briefcase className="w-12 h-12 mx-auto text-gray-500 mb-4" />
        <p className="text-gray-400 mb-2">
          Aucune expérience enregistrée
        </p>
        <p className="text-sm text-gray-500">
          Utilisez le formulaire ci-dessus pour ajouter votre première expérience
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <Card key={exp.id} className="p-6 bg-gray-800 border-gray-700 hover:border-green-500/50 transition-colors">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">
                  {exp.title}
                </h3>
              </div>
              <p className="text-gray-300 font-medium">{exp.company}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-red-400"
              onClick={() => {
                // TODO: Implémenter la suppression
                toast.info('Suppression à implémenter')
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Dates et durée */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
              </span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-green-400">
              {calculateDuration(exp.startDate, exp.endDate)}
            </span>
            {!exp.endDate && (
              <>
                <span className="text-gray-600">•</span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En cours
                </span>
              </>
            )}
          </div>

          {/* Compétences */}
          {exp.skills && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-300">Compétences</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.skills.split(',').map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs border border-amber-500/20"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Méthode STAR */}
          <div className="space-y-3 pt-4 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-green-400">Méthode STAR</h4>
            
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase">Situation</span>
              <p className="text-sm text-gray-300 mt-1">{exp.situation}</p>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase">Tâche</span>
              <p className="text-sm text-gray-300 mt-1">{exp.task}</p>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase">Action</span>
              <p className="text-sm text-gray-300 mt-1">{exp.action}</p>
            </div>
            
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase">Résultat</span>
              <p className="text-sm text-gray-300 mt-1">{exp.result}</p>
            </div>
          </div>
        </Card>
      ))}

      {/* Statistiques */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Total d'expériences</span>
          <span className="text-green-400 font-semibold">{experiences.length}</span>
        </div>
      </div>
    </div>
  )
}