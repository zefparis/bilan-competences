"use client"

import { useEffect, useState } from "react"

type ActiveAssessment = {
  assessmentId: string
  lifePathId: string
}

export function useActiveAssessment() {
  const [data, setData] = useState<ActiveAssessment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load(attempt = 0) {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch("/api/assessment/active", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })

        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.message || `Erreur ${res.status}`)
        }

        const json = (await res.json()) as ActiveAssessment
        if (!cancelled) {
          setData(json)
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erreur inconnue"

        if (!cancelled && attempt < 1) {
          // retry léger (ex: session pas encore prête)
          setTimeout(() => {
            if (!cancelled) load(attempt + 1)
          }, 300)
          return
        }

        if (!cancelled) setError(msg)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { data, isLoading, error }
}
