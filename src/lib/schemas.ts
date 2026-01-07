import { z } from "zod"

// Schema pour les événements de vie
export const lifeEventSchema = z.object({
  year: z.number().min(1900).max(new Date().getFullYear()),
  title: z.string().min(2).max(100),
  type: z.enum(["PRO", "PERSO", "FORMATION"]),
  sentiment: z.number().min(0).max(10),
  description: z.string().max(500).optional()
})

export type LifeEventData = z.infer<typeof lifeEventSchema>

// Schema pour les expériences STAR
export const experienceSchema = z.object({
  title: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  startYear: z.number().min(1950).max(new Date().getFullYear()),
  startMonth: z.number().min(1).max(12),
  endYear: z.number().min(1950).max(new Date().getFullYear()).optional(),
  endMonth: z.number().min(1).max(12).optional(),
  situation: z.string().max(500).optional(),
  task: z.string().max(500).optional(),
  action: z.string().max(500).optional(),
  result: z.string().max(500).optional(),
  skills: z.string().min(2)
})

export type ExperienceData = z.infer<typeof experienceSchema>

// Schema pour les valeurs
export const valueSchema = z.object({
  valueName: z.string().min(2).max(50),
  order: z.number().min(1).max(10),
  gapScore: z.number().min(1).max(5).optional()
})

export type ValueData = z.infer<typeof valueSchema>

// Schema pour le test RIASEC
export const riasecSchema = z.object({
  answers: z.record(z.number().min(0).max(5))
})

export type RiasecData = z.infer<typeof riasecSchema>
