import { NextRequest, NextResponse } from "next/server"
import { getUserIdFromRequest } from "@/lib/auth-user"
import { prisma } from "@/lib/prisma"
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  console.log('[API/PDF] ========== START PDF GENERATION ==========')
  try {
    console.log('[API/PDF] Step 1: Getting user ID...')
    const userId = await getUserIdFromRequest(req)
    console.log('[API/PDF] User ID:', userId)
    
    if (!userId) {
      console.error('[API/PDF] ❌ No user ID - unauthorized')
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    console.log('[API/PDF] Step 2: Parsing request body...')
    const { certificateId } = await req.json()
    console.log('[API/PDF] Certificate ID:', certificateId)

    console.log('[API/PDF] Step 3: Fetching certificate from database...')
    const certificate = await (prisma as any).certificate.findUnique({
      where: { id: certificateId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            firstName: true,
            lastName: true
          }
        },
        session: {
          select: {
            primaryRole: true,
            level: true,
            devScore: true,
            dataScore: true,
            cyberScore: true,
            infraScore: true,
            coherenceScore: true
          }
        }
      }
    })

    console.log('[API/PDF] Certificate found:', certificate ? 'YES' : 'NO')
    if (certificate) {
      console.log('[API/PDF] Certificate user ID:', certificate.userId)
      console.log('[API/PDF] Request user ID:', userId)
      console.log('[API/PDF] Session data:', certificate.session)
    }

    if (!certificate || certificate.userId !== userId) {
      console.error('[API/PDF] ❌ Certificate not found or unauthorized')
      return NextResponse.json({ error: "Certificat non trouvé" }, { status: 404 })
    }
    
    console.log('[API/PDF] ✅ Certificate validated')

    // Create PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595.28, 841.89]) // A4 size
    const { width, height } = page.getSize()

    // Load fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

    // Colors
    const primaryColor = rgb(0.95, 0.77, 0.06) // Yellow/Gold
    const darkColor = rgb(0.2, 0.2, 0.2)
    const lightGray = rgb(0.5, 0.5, 0.5)
    const blueColor = rgb(0.2, 0.4, 0.8)
    const greenColor = rgb(0.2, 0.7, 0.4)
    const redColor = rgb(0.8, 0.2, 0.2)
    const purpleColor = rgb(0.6, 0.2, 0.8)

    // Draw border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: primaryColor,
      borderWidth: 3,
    })

    page.drawRectangle({
      x: 35,
      y: 35,
      width: width - 70,
      height: height - 70,
      borderColor: primaryColor,
      borderWidth: 1,
    })

    // Title
    const title = "CERTIFICAT DE COMPÉTENCES"
    const titleSize = 32
    const titleWidth = boldFont.widthOfTextAtSize(title, titleSize)
    page.drawText(title, {
      x: (width - titleWidth) / 2,
      y: height - 120,
      size: titleSize,
      font: boldFont,
      color: primaryColor,
    })

    // Subtitle
    const subtitle = "Métiers du Numérique"
    const subtitleSize = 16
    const subtitleWidth = italicFont.widthOfTextAtSize(subtitle, subtitleSize)
    page.drawText(subtitle, {
      x: (width - subtitleWidth) / 2,
      y: height - 150,
      size: subtitleSize,
      font: italicFont,
      color: lightGray,
    })

    // Decorative line
    page.drawLine({
      start: { x: 100, y: height - 170 },
      end: { x: width - 100, y: height - 170 },
      thickness: 2,
      color: primaryColor,
    })

    // Recipient
    const deliveredTo = "Délivré à"
    const deliveredToSize = 14
    const deliveredToWidth = regularFont.widthOfTextAtSize(deliveredTo, deliveredToSize)
    page.drawText(deliveredTo, {
      x: (width - deliveredToWidth) / 2,
      y: height - 220,
      size: deliveredToSize,
      font: regularFont,
      color: lightGray,
    })

    const userName = certificate.user.firstName && certificate.user.lastName 
      ? `${certificate.user.firstName} ${certificate.user.lastName}`
      : certificate.user.name || "Utilisateur"
    const userNameSize = 24
    const userNameWidth = boldFont.widthOfTextAtSize(userName, userNameSize)
    page.drawText(userName, {
      x: (width - userNameWidth) / 2,
      y: height - 250,
      size: userNameSize,
      font: boldFont,
      color: darkColor,
    })

    // Role and Level
    const role = certificate.session.primaryRole
    const roleSize = 20
    const roleWidth = boldFont.widthOfTextAtSize(role, roleSize)
    page.drawText(role, {
      x: (width - roleWidth) / 2,
      y: height - 310,
      size: roleSize,
      font: boldFont,
      color: blueColor,
    })

    const level = `Niveau ${certificate.session.level}`
    const levelSize = 16
    const levelWidth = boldFont.widthOfTextAtSize(level, levelSize)
    
    // Draw level badge background
    const badgePadding = 20
    const badgeWidth = levelWidth + badgePadding * 2
    const badgeHeight = 30
    page.drawRectangle({
      x: (width - badgeWidth) / 2,
      y: height - 360,
      width: badgeWidth,
      height: badgeHeight,
      color: primaryColor,
      borderColor: primaryColor,
      borderWidth: 1,
    })

    page.drawText(level, {
      x: (width - levelWidth) / 2,
      y: height - 352,
      size: levelSize,
      font: boldFont,
      color: rgb(1, 1, 1),
    })

    // Scores section
    const scoresY = height - 450
    const scoreSpacing = (width - 100) / 4
    const scores = [
      { label: "Développement", value: `${certificate.session.devScore}%`, color: blueColor },
      { label: "Data Science", value: `${certificate.session.dataScore}%`, color: greenColor },
      { label: "Cybersécurité", value: `${certificate.session.cyberScore}%`, color: redColor },
      { label: "Infrastructure", value: `${certificate.session.infraScore}%`, color: purpleColor },
    ]

    scores.forEach((score, index) => {
      const x = 70 + index * scoreSpacing
      
      // Score value
      const valueSize = 28
      const valueWidth = boldFont.widthOfTextAtSize(score.value, valueSize)
      page.drawText(score.value, {
        x: x - valueWidth / 2,
        y: scoresY,
        size: valueSize,
        font: boldFont,
        color: score.color,
      })

      // Score label
      const labelSize = 10
      const labelWidth = regularFont.widthOfTextAtSize(score.label, labelSize)
      page.drawText(score.label, {
        x: x - labelWidth / 2,
        y: scoresY - 25,
        size: labelSize,
        font: regularFont,
        color: lightGray,
      })
    })

    // Dates
    const issuedDate = new Date(certificate.issuedAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    const validUntilDate = new Date(certificate.validUntil).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })

    const datesY = 220
    const issuedText = `Délivré le ${issuedDate}`
    const issuedSize = 11
    const issuedWidth = regularFont.widthOfTextAtSize(issuedText, issuedSize)
    page.drawText(issuedText, {
      x: (width - issuedWidth) / 2,
      y: datesY,
      size: issuedSize,
      font: regularFont,
      color: darkColor,
    })

    const validText = `Valide jusqu'au ${validUntilDate}`
    const validSize = 11
    const validWidth = regularFont.widthOfTextAtSize(validText, validSize)
    page.drawText(validText, {
      x: (width - validWidth) / 2,
      y: datesY - 20,
      size: validSize,
      font: regularFont,
      color: darkColor,
    })

    // Blockchain section
    page.drawRectangle({
      x: 50,
      y: 100,
      width: width - 100,
      height: 80,
      borderColor: greenColor,
      borderWidth: 1,
      color: rgb(0.95, 0.98, 0.95),
    })

    const blockchainTitle = "Authentification Blockchain"
    page.drawText(blockchainTitle, {
      x: 70,
      y: 155,
      size: 12,
      font: boldFont,
      color: greenColor,
    })
    
    // Draw checkmark circle
    page.drawCircle({
      x: 60,
      y: 158,
      size: 6,
      borderColor: greenColor,
      borderWidth: 2,
    })

    const hashLabel = "Hash:"
    page.drawText(hashLabel, {
      x: 70,
      y: 135,
      size: 9,
      font: boldFont,
      color: darkColor,
    })

    const hashText = certificate.blockchainHash.substring(0, 60) + "..."
    page.drawText(hashText, {
      x: 70,
      y: 122,
      size: 8,
      font: regularFont,
      color: lightGray,
    })

    const verifyText = `Vérification: ${certificate.verificationUrl.substring(0, 70)}...`
    page.drawText(verifyText, {
      x: 70,
      y: 108,
      size: 7,
      font: italicFont,
      color: lightGray,
    })

    // Footer
    const footer = "PERSPECTA - Plateforme d'Évaluation Professionnelle"
    const footerSize = 9
    const footerWidth = regularFont.widthOfTextAtSize(footer, footerSize)
    page.drawText(footer, {
      x: (width - footerWidth) / 2,
      y: 50,
      size: footerSize,
      font: regularFont,
      color: lightGray,
    })

    // Generate PDF
    console.log('[API/PDF] Step 4: Generating PDF document...')
    const pdfBytes = await pdfDoc.save()
    console.log('[API/PDF] PDF bytes generated, size:', pdfBytes.length)
    
    const buffer = Buffer.from(pdfBytes)
    console.log('[API/PDF] Buffer created, size:', buffer.length)
    console.log('[API/PDF] ========== PDF GENERATION SUCCESS ==========')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificat-${certificate.session.primaryRole.replace(/\//g, '-')}.pdf"`,
      },
    })

  } catch (error) {
    console.error('[API/PDF] ========== ERROR ==========')
    console.error('[API/PDF] Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('[API/PDF] Error message:', error instanceof Error ? error.message : String(error))
    console.error('[API/PDF] Error stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('[API/PDF] ========== END ERROR ==========')
    
    return NextResponse.json({ 
      error: "Erreur lors de la génération du PDF",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
