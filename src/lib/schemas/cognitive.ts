import { z } from "zod"

export const cognitiveScoreSchema = z
  .object({
    form_score: z.number().min(0).max(100),
    color_score: z.number().min(0).max(100),
    volume_score: z.number().min(0).max(100),
    sound_score: z.number().min(0).max(100),
  })
  .refine(
    (data) => {
      const sum = data.form_score + data.color_score + data.volume_score + data.sound_score
      return Math.abs(sum - 100) < 0.01
    },
    { message: "La somme des scores doit être égale à 100" }
  )

export const cognitiveProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  form_score: z.number().min(0).max(100),
  color_score: z.number().min(0).max(100),
  volume_score: z.number().min(0).max(100),
  sound_score: z.number().min(0).max(100),
  dominant_cognition: z.enum(["form", "color", "volume", "sound"]),
  profile_code: z.string(),
  communication_style: z.enum(["analytical", "visual", "kinesthetic", "auditory"]).nullable().optional(),
  detail_level: z.enum(["high", "medium", "low"]).nullable().optional(),
  learning_preference: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const testResponseSchema = z.object({
  question_id: z.number().int().positive(),
  selected_option: z.string().min(1),
  dimension: z.enum(["form", "color", "volume", "sound"]),
  weight: z.number().int().min(1).max(5),
})

export type CognitiveProfile = z.infer<typeof cognitiveProfileSchema>
export type CognitiveScore = z.infer<typeof cognitiveScoreSchema>
export type TestResponse = z.infer<typeof testResponseSchema>
