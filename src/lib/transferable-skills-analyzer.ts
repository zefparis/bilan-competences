import { anthropic, MODEL } from "./anthropic"
import { getROMEByCode } from "./france-travail/rome-codes"

export interface TransferableSkillsInput {
  currentJob: {
    romeCode?: string
    title: string
    description?: string
    skills: string[]
    experience?: string
  }
  targetJob: {
    romeCode: string
    title: string
    requiredSkills: string[]
  }
  userProfile?: {
    riasecScores?: {
      R: number
      I: number
      A: number
      S: number
      E: number
      C: number
    }
  }
}

export interface TransferableSkillsAnalysis {
  transferableSkills: {
    skill: string
    relevance: "high" | "medium" | "low"
    explanation: string
  }[]
  skillsGap: {
    skill: string
    priority: "critical" | "important" | "nice-to-have"
    learningPath: string
  }[]
  compatibilityScore: number
  recommendations: string[]
  trainingPriorities: string[]
  estimatedTransitionTime: string
  successFactors: string[]
  challenges: string[]
}

export async function analyzeTransferableSkills(
  input: TransferableSkillsInput
): Promise<TransferableSkillsAnalysis> {
  const currentRome = input.currentJob.romeCode ? getROMEByCode(input.currentJob.romeCode) : null
  const targetRome = getROMEByCode(input.targetJob.romeCode)

  const prompt = `Tu es un expert en reconversion professionnelle et analyse de compétences transférables.

**CONTEXTE DE LA RECONVERSION**

Métier actuel :
- Intitulé : ${input.currentJob.title}
${currentRome ? `- Code ROME : ${currentRome.code} (${currentRome.domain})` : ""}
${input.currentJob.description ? `- Description : ${input.currentJob.description}` : ""}
- Compétences actuelles : ${input.currentJob.skills.join(", ")}
${input.currentJob.experience ? `- Expérience : ${input.currentJob.experience}` : ""}

Métier cible :
- Intitulé : ${input.targetJob.title}
- Code ROME : ${targetRome?.code || input.targetJob.romeCode} (${targetRome?.domain || "Non spécifié"})
- Compétences requises : ${input.targetJob.requiredSkills.join(", ")}

${input.userProfile?.riasecScores ? `
Profil RIASEC de l'utilisateur :
- Réaliste (R) : ${input.userProfile.riasecScores.R}/100
- Investigateur (I) : ${input.userProfile.riasecScores.I}/100
- Artistique (A) : ${input.userProfile.riasecScores.A}/100
- Social (S) : ${input.userProfile.riasecScores.S}/100
- Entreprenant (E) : ${input.userProfile.riasecScores.E}/100
- Conventionnel (C) : ${input.userProfile.riasecScores.C}/100

Profil RIASEC du métier cible : ${targetRome?.riasecMatch.join("") || "Non spécifié"}
` : ""}

**MISSION**

Analyse en profondeur les compétences transférables et le gap de compétences pour cette reconversion.

Fournis une analyse structurée au format JSON avec les clés suivantes :

{
  "transferableSkills": [
    {
      "skill": "nom de la compétence transférable",
      "relevance": "high|medium|low",
      "explanation": "explication détaillée de comment cette compétence s'applique au nouveau métier"
    }
  ],
  "skillsGap": [
    {
      "skill": "compétence manquante",
      "priority": "critical|important|nice-to-have",
      "learningPath": "suggestion concrète pour acquérir cette compétence"
    }
  ],
  "compatibilityScore": 75,
  "recommendations": [
    "recommandation stratégique 1",
    "recommandation stratégique 2"
  ],
  "trainingPriorities": [
    "priorité de formation 1",
    "priorité de formation 2"
  ],
  "estimatedTransitionTime": "6-12 mois",
  "successFactors": [
    "facteur de succès 1",
    "facteur de succès 2"
  ],
  "challenges": [
    "défi potentiel 1",
    "défi potentiel 2"
  ]
}

**CONSIGNES**

1. Identifie les compétences transférables (soft skills ET hard skills)
2. Sois précis sur le gap de compétences avec des priorités claires
3. Donne des recommandations actionnables et personnalisées
4. Le score de compatibilité doit être réaliste (0-100)
5. Considère le profil RIASEC si disponible pour affiner l'analyse
6. Sois encourageant mais honnête sur les défis
7. Propose des parcours d'apprentissage concrets

Réponds UNIQUEMENT avec le JSON, sans texte avant ou après.`

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error("Invalid response from Claude")
    }

    // Claude peut entourer le JSON de ```json, on nettoie
    const jsonText = content.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const analysis = JSON.parse(jsonText) as TransferableSkillsAnalysis
    
    console.log("[Transferable Skills] Analysis completed:", {
      transferableCount: analysis.transferableSkills?.length || 0,
      gapCount: analysis.skillsGap?.length || 0,
      compatibilityScore: analysis.compatibilityScore
    })

    return analysis
  } catch (error) {
    console.error("[Transferable Skills] Claude error:", error)
    
    // Fallback analysis
    return generateFallbackAnalysis(input)
  }
}

function generateFallbackAnalysis(input: TransferableSkillsInput): TransferableSkillsAnalysis {
  const currentSkills = input.currentJob.skills
  const requiredSkills = input.targetJob.requiredSkills
  
  // Identifier les compétences communes (transférables)
  const transferableSkills = currentSkills
    .filter(skill => 
      requiredSkills.some(req => 
        req.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(req.toLowerCase())
      )
    )
    .map(skill => ({
      skill,
      relevance: "high" as const,
      explanation: `Cette compétence est directement applicable au métier de ${input.targetJob.title}.`
    }))

  // Identifier le gap
  const skillsGap = requiredSkills
    .filter(req => 
      !currentSkills.some(curr => 
        curr.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(curr.toLowerCase())
      )
    )
    .map(skill => ({
      skill,
      priority: "important" as const,
      learningPath: `Formation ou certification en ${skill} recommandée.`
    }))

  const compatibilityScore = Math.round(
    (transferableSkills.length / Math.max(requiredSkills.length, 1)) * 100
  )

  return {
    transferableSkills,
    skillsGap,
    compatibilityScore,
    recommendations: [
      `Valorisez vos ${transferableSkills.length} compétences transférables`,
      `Concentrez-vous sur l'acquisition des ${skillsGap.length} compétences manquantes`,
      "Envisagez une formation professionnelle adaptée"
    ],
    trainingPriorities: skillsGap.slice(0, 3).map(s => s.skill),
    estimatedTransitionTime: skillsGap.length > 5 ? "12-18 mois" : "6-12 mois",
    successFactors: [
      "Motivation et engagement dans la reconversion",
      "Expérience professionnelle valorisable",
      "Capacité d'apprentissage"
    ],
    challenges: [
      "Acquisition de nouvelles compétences techniques",
      "Adaptation à un nouvel environnement professionnel",
      "Validation des acquis par une formation certifiante"
    ]
  }
}
