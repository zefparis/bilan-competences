"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

// Actions pour le module Parcours (LifePath)
export async function createLifePath(assessmentId: string) {
  const lifePath = await (prisma as any).lifePath.create({
    data: { assessmentId },
    select: { id: true, assessmentId: true }
  })

  revalidatePath("/dashboard/parcours")
  return lifePath
}

export async function addLifeEvent(lifePathId: string, data: {
  year: number
  title: string
  type: string
  sentiment: number
  description?: string
}) {
  const event = await (prisma as any).lifeEvent.create({
    data: {
      lifePathId,
      year: data.year,
      title: data.title,
      type: data.type,
      sentiment: data.sentiment,
      description: data.description ?? null,
    }
  })

  revalidatePath("/dashboard/parcours")
  return event
}

// Actions pour le module Expériences (STAR)
export async function createExperience(assessmentId: string, data: {
  title: string
  company: string
  startDate: Date
  endDate?: Date
  situation?: string
  task?: string
  action?: string
  result?: string
  skills: string
}) {
  const experience = await (prisma as any).experience.create({
    data: {
      assessmentId,
      title: data.title,
      company: data.company,
      startDate: data.startDate,
      endDate: data.endDate ?? null,
      situation: data.situation ?? null,
      task: data.task ?? null,
      action: data.action ?? null,
      result: data.result ?? null,
      skills: data.skills,
    }
  })

  revalidatePath("/dashboard/experiences")
  return experience
}

// Action pour sauvegarder les résultats RIASEC
export async function saveRiasecResults(assessmentId: string, scores: {
  scoreR: number
  scoreI: number
  scoreA: number
  scoreS: number
  scoreE: number
  scoreC: number
  topCode: string
}) {
  const results = await (prisma as any).riasecResult.upsert({
    where: { assessmentId },
    create: {
      assessmentId,
      ...scores
    },
    update: {
      ...scores
    }
  })

  revalidatePath("/dashboard/riasec")
  revalidatePath("/dashboard/synthese")
  return results
}

// Action pour sauvegarder les valeurs
export async function saveUserValues(assessmentId: string, values: {
  valueName: string
  order: number
  gapScore?: number
}[]) {
  await (prisma as any).userValue.deleteMany({
    where: { assessmentId }
  })

  const results = await (prisma as any).userValue.createMany({
    data: values.map(v => ({
      assessmentId,
      valueName: v.valueName,
      order: v.order,
      gapScore: v.gapScore ?? null
    }))
  })

  revalidatePath("/dashboard/valeurs")
  revalidatePath("/dashboard/synthese")
  return results
}
