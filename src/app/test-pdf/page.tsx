'use client';

import { TestPdfGeneration } from '@/components/pdf/TestPdfGeneration';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function TestPdfPage() {
  // Disable this page in production to avoid PDFViewer build issues
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="h-screen">
      <TestPdfGeneration />
    </div>
  );
}
