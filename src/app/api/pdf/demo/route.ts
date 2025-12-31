/**
 * PERSPECTA PDF - Demo API Route
 * Endpoint pour générer un PDF de démonstration (sans authentification)
 */

import { NextRequest, NextResponse } from 'next/server';
import { generatePDFBuffer } from '@/lib/pdf';
import { sampleProfileData } from '@/lib/pdf/data/sampleProfile';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * GET /api/pdf/demo
 * Génère un PDF de démonstration avec des données exemple
 */
export async function GET(req: NextRequest) {
  try {
    console.log('[PDF Demo] Starting demo PDF generation');
    const startTime = Date.now();

    const pdfBuffer = await generatePDFBuffer(sampleProfileData, { debug: true });

    const duration = Date.now() - startTime;
    console.log(`[PDF Demo] PDF generated in ${duration}ms, size: ${pdfBuffer.length} bytes`);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="PERSPECTA-Demo-Bilan.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[PDF Demo] Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF de démo', details: String(error) },
      { status: 500 }
    );
  }
}
