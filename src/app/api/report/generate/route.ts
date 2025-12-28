import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth-user"
import OpenAI from "openai"
import {
  generateSystemPrompt,
  generateUserPrompt,
  generateFallbackReport,
  type ReportInput,
  type GeneratedReport,
} from "@/lib/report-generator"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    // Check if user has paid
    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        hasPaid: true,
      },
    })

    if (!user?.hasPaid) {
      return NextResponse.json({ message: "Accès non autorisé" }, { status: 403 })
    }

    // Fetch cognitive session
    let cognitiveSession = null
    let assessment = null
    
    try {
      cognitiveSession = await (prisma as any).cognitiveTestSession.findFirst({
        where: { userId, status: "COMPLETED" },
        orderBy: { completedAt: "desc" },
        include: { signature: true },
      })
    } catch (e: any) {
      console.error("[Report] Error fetching cognitive session:", e?.message)
    }

    // Fetch assessment data (RIASEC, values, experiences are linked to Assessment)
    try {
      assessment = await (prisma as any).assessment.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
          riasecResult: true,
          userValues: { orderBy: { order: "asc" }, take: 10 },
          experiences: { orderBy: { createdAt: "desc" }, take: 5 },
          lifePath: {
            include: {
              events: { orderBy: { year: "desc" }, take: 10 },
            },
          },
        },
      })
    } catch (e: any) {
      console.error("[Report] Error fetching assessment:", e?.message)
    }

    const riasecResult = assessment?.riasecResult
    const values = assessment?.userValues
    const experiences = assessment?.experiences
    const lifeEvents = assessment?.lifePath?.events

    if (!cognitiveSession?.signature) {
      return NextResponse.json(
        { message: "Évaluation cognitive non complétée. Veuillez d'abord compléter les 4 tests cognitifs." },
        { status: 400 }
      )
    }

    // Prepare input data
    const reportInput: ReportInput = {
      userName: user.name || "Utilisateur",
      cognitiveSignature: {
        inhibitoryControl: cognitiveSession.signature.inhibitoryControl,
        processingSpeed: cognitiveSession.signature.processingSpeed,
        cognitiveFlexibility: cognitiveSession.signature.cognitiveFlexibility,
        accessFluency: cognitiveSession.signature.accessFluency,
        reactionVariance: cognitiveSession.signature.reactionVariance,
        attentionDrift: cognitiveSession.signature.attentionDrift,
        conflictErrors: cognitiveSession.signature.conflictErrors,
        sequencingErrors: cognitiveSession.signature.sequencingErrors,
      },
      riasec: riasecResult
        ? {
            realistic: riasecResult.scoreR || 0,
            investigative: riasecResult.scoreI || 0,
            artistic: riasecResult.scoreA || 0,
            social: riasecResult.scoreS || 0,
            enterprising: riasecResult.scoreE || 0,
            conventional: riasecResult.scoreC || 0,
            dominantCode: riasecResult.topCode || "N/A",
          }
        : undefined,
      values: values?.map((v: any) => ({
        id: v.id,
        name: v.valueName,
        priority: v.order,
      })),
      experiences: experiences?.map((e: any) => ({
        id: e.id,
        title: e.title,
        situation: e.situation || "",
        task: e.task || "",
        action: e.action || "",
        result: e.result || "",
        competences: e.skills ? e.skills.split(",").map((s: string) => s.trim()) : [],
      })),
      lifeEvents: lifeEvents?.map((e: any) => ({
        id: e.id,
        title: e.title,
        date: String(e.year) || "",
        type: e.type || "",
        description: e.description || "",
      })),
    }

    let report: GeneratedReport

    // Try to generate with OpenAI
    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: generateSystemPrompt() },
            { role: "user", content: generateUserPrompt(reportInput) },
          ],
          temperature: 0.7,
          max_tokens: 8000,
          response_format: { type: "json_object" },
        })

        const content = completion.choices[0]?.message?.content
        if (content) {
          const parsed = JSON.parse(content)
          report = {
            sections: parsed.sections,
            generatedAt: new Date().toISOString(),
            version: "1.0.0-ai",
          }
        } else {
          report = generateFallbackReport(reportInput)
        }
      } catch (aiError) {
        console.error("[Report] OpenAI error, using fallback:", aiError)
        report = generateFallbackReport(reportInput)
      }
    } else {
      report = generateFallbackReport(reportInput)
    }

    // Store the report
    await (prisma as any).cognitiveTestSession.update({
      where: { id: cognitiveSession.id },
      data: {
        generatedReport: report,
      },
    })

    return NextResponse.json(report)
  } catch (error: any) {
    console.error("[Report Generate] Error:", error?.message || error)
    return NextResponse.json(
      { message: error?.message || "Erreur lors de la génération du rapport" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)

    if (!userId) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 })
    }

    // Get latest session with report
    const session = await (prisma as any).cognitiveTestSession.findFirst({
      where: { 
        userId, 
        status: "COMPLETED",
        generatedReport: { not: null },
      },
      orderBy: { completedAt: "desc" },
      select: {
        id: true,
        generatedReport: true,
        completedAt: true,
      },
    })

    if (!session?.generatedReport) {
      return NextResponse.json(
        { message: "Aucun rapport disponible" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      sessionId: session.id,
      report: session.generatedReport,
      completedAt: session.completedAt,
    })
  } catch (error) {
    console.error("[Report Get] Error:", error)
    return NextResponse.json(
      { message: "Erreur lors de la récupération du rapport" },
      { status: 500 }
    )
  }
}
