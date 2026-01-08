import { NextRequest, NextResponse } from "next/server"
import { getUserIdFromRequest } from "@/lib/auth-user"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  console.log("[API/Upload/Avatar] ========== START ==========")
  try {
    // Step 1: Get user ID
    console.log("[API/Upload/Avatar] Step 1: Getting user ID...")
    const userId = await getUserIdFromRequest(req)
    console.log("[API/Upload/Avatar] User ID result:", userId)
    
    if (!userId) {
      console.error("[API/Upload/Avatar] ❌ No user ID found - authentication failed")
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }
    console.log("[API/Upload/Avatar] ✅ User authenticated:", userId)

    // Step 2: Get user from database
    console.log("[API/Upload/Avatar] Step 2: Fetching user from database...")
    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: { email: true, id: true }
    })
    console.log("[API/Upload/Avatar] User found:", user ? `${user.email} (${user.id})` : "null")

    if (!user) {
      console.error("[API/Upload/Avatar] ❌ User not found in database for ID:", userId)
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }
    console.log("[API/Upload/Avatar] ✅ User found in database")

    // Step 3: Parse form data
    console.log("[API/Upload/Avatar] Step 3: Parsing form data...")
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    console.log("[API/Upload/Avatar] File received:", file ? `${file.name} (${file.size} bytes, ${file.type})` : "null")

    if (!file) {
      console.error("[API/Upload/Avatar] ❌ No file in form data")
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 })
    }
    console.log("[API/Upload/Avatar] ✅ File received")

    // Step 4: Validate file type
    console.log("[API/Upload/Avatar] Step 4: Validating file type...")
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      console.error("[API/Upload/Avatar] ❌ Invalid file type:", file.type)
      return NextResponse.json({ error: "Type de fichier non autorisé. Utilisez JPG, PNG, GIF ou WebP." }, { status: 400 })
    }
    console.log("[API/Upload/Avatar] ✅ File type valid:", file.type)

    // Step 5: Validate file size (max 5MB)
    console.log("[API/Upload/Avatar] Step 5: Validating file size...")
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      console.error("[API/Upload/Avatar] ❌ File too large:", file.size, "bytes (max:", maxSize, ")")
      return NextResponse.json({ error: "Fichier trop volumineux. Maximum 5 Mo." }, { status: 400 })
    }
    console.log("[API/Upload/Avatar] ✅ File size valid:", file.size, "bytes")

    // Step 6: Convert to base64 data URL
    console.log("[API/Upload/Avatar] Step 6: Converting to base64...")
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`
    console.log("[API/Upload/Avatar] ✅ Converted to base64 (length:", dataUrl.length, ")")

    console.log("[API/Upload/Avatar] ========== SUCCESS ==========")

    return NextResponse.json({ 
      success: true, 
      url: dataUrl 
    })

  } catch (error) {
    console.error("[API/Upload/Avatar] ========== ERROR ==========")
    console.error("[API/Upload/Avatar] Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("[API/Upload/Avatar] Error message:", error instanceof Error ? error.message : String(error))
    console.error("[API/Upload/Avatar] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    console.error("[API/Upload/Avatar] ========== END ERROR ==========")
    
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Erreur lors de l'upload",
      details: error instanceof Error ? error.stack : String(error)
    }, { status: 500 })
  }
}
