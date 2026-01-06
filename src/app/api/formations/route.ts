import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { fetchFormations } from "@/lib/france-travail/client"

export const dynamic = 'force-dynamic'

async function getUserIdFromRequest(req: NextRequest): Promise<string> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error("Non authentifié")
  }
  return session.user.email
}

export async function GET(req: NextRequest) {
  try {
    await getUserIdFromRequest(req)
    
    const { searchParams } = new URL(req.url)
    const romeCodes = searchParams.get("romeCodes")?.split(",") || []
    const keywords = searchParams.get("keywords") || undefined
    const location = searchParams.get("location") || undefined
    const distance = searchParams.get("distance") ? parseInt(searchParams.get("distance")!) : undefined
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20
    
    console.log('[Formations API] Fetching formations with params:', {
      romeCodes,
      keywords,
      location,
      distance,
      limit
    })
    
    const formations = await fetchFormations({
      romeCodes: romeCodes.length > 0 ? romeCodes : undefined,
      keywords,
      location,
      distance,
      limit
    })
    
    return NextResponse.json({
      formations,
      count: formations.length
    })
  } catch (error) {
    console.error('[Formations API] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    )
  }
}
