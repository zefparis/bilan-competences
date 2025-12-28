"use client"

import { useEffect, useMemo, useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

type Summary = {
  riasecResult: {
    scoreR: number
    scoreI: number
    scoreA: number
    scoreS: number
    scoreE: number
    scoreC: number
    topCode: string
  } | null
}

type RiasecScore = {
  subject: string
  score: number
}

export function RiasecResult() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        const res = await fetch("/api/assessment/summary", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          throw new Error(`Erreur ${res.status}`)
        }

        const json = (await res.json()) as Summary
        if (!cancelled) setSummary(json)
      } catch {
        if (!cancelled) setSummary(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const data: RiasecScore[] = useMemo(() => {
    const r = summary?.riasecResult
    if (!r) return []
    return [
      { subject: "Réaliste", score: r.scoreR },
      { subject: "Investigateur", score: r.scoreI },
      { subject: "Artistique", score: r.scoreA },
      { subject: "Social", score: r.scoreS },
      { subject: "Entreprenant", score: r.scoreE },
      { subject: "Conventionnel", score: r.scoreC },
    ]
  }, [summary])

  if (loading) {
    return <div className="text-sm text-muted-foreground">Chargement des résultats...</div>
  }

  if (!summary?.riasecResult) {
    return <div className="text-sm text-muted-foreground">Aucun résultat enregistré pour le moment.</div>
  }

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar name="Profil" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
