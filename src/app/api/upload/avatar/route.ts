import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Type de fichier non autorisé. Utilisez JPG, PNG, GIF ou WebP." }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Fichier trop volumineux. Maximum 5 Mo." }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename using email hash
    const emailHash = Buffer.from(session.user.email).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)
    const ext = file.name.split(".").pop() || "jpg"
    const filename = `${emailHash}-${Date.now()}.${ext}`
    const filepath = path.join(uploadsDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Return the public URL
    const imageUrl = `/uploads/avatars/${filename}`

    return NextResponse.json({ 
      success: true, 
      url: imageUrl 
    })

  } catch (error) {
    console.error("[API/Upload/Avatar] Error:", error)
    return NextResponse.json({ 
      error: "Erreur lors de l'upload" 
    }, { status: 500 })
  }
}
