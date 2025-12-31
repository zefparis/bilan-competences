/**
 * PERSPECTA PDF - Générateur Principal
 * Point d'entrée pour la génération de PDF premium
 */

import React from 'react';
import { Document, pdf } from '@react-pdf/renderer';
import { ProfileData, PDFGenerationOptions } from './data/types';
import { validateProfileData, sanitizeProfileData } from './utils/validator';
import { generateAllTexts } from './utils/textGenerator';
import { enrichProfileData } from './utils/dataProcessor';

// Templates
import { CoverPage } from './templates/CoverPage';
import { TableOfContents } from './templates/TableOfContents';
import { Part1Profile } from './templates/Part1Profile';
import { Part2Analysis } from './templates/Part2Analysis';
import { Part3Projections } from './templates/Part3Projections';
import { Part4Actions } from './templates/Part4Actions';

/**
 * Document PDF complet PERSPECTA
 */
interface PerspectaDocumentProps {
  data: ProfileData;
}

const PerspectaDocument: React.FC<PerspectaDocumentProps> = ({ data }) => {
  return (
    <Document
      title={`Bilan PERSPECTA - ${data.meta.userName}`}
      author="PERSPECTA"
      subject="Bilan Cognitif Professionnel"
      keywords="cognition, RIASEC, orientation professionnelle, bilan de compétences"
      creator="PERSPECTA PDF Generator"
      producer="@react-pdf/renderer"
    >
      <CoverPage meta={data.meta} />
      <TableOfContents profileId={data.meta.id} />
      <Part1Profile data={data} />
      <Part2Analysis data={data} />
      <Part3Projections data={data} />
      <Part4Actions data={data} />
    </Document>
  );
};

/**
 * Prépare les données pour la génération PDF
 */
export function prepareProfileData(rawData: Partial<ProfileData>): ProfileData {
  // Sanitize et valider
  let data = sanitizeProfileData(rawData);
  
  // Enrichir avec les données calculées
  data = enrichProfileData(data);
  
  // Générer les textes personnalisés si non fournis
  if (!data.generatedTexts || Object.keys(data.generatedTexts).length === 0) {
    data.generatedTexts = generateAllTexts(data);
  }
  
  return data;
}

/**
 * Génère le PDF et retourne un Blob
 */
export async function generatePDFBlob(
  rawData: Partial<ProfileData>,
  options: PDFGenerationOptions = {}
): Promise<Blob> {
  // Préparer les données
  const data = prepareProfileData(rawData);
  
  // Valider
  const validation = validateProfileData(data);
  if (!validation.isValid) {
    throw new Error(`Données invalides: ${validation.errors.join(', ')}`);
  }
  
  // Log warnings
  if (validation.warnings.length > 0 && options.debug) {
    console.warn('[PERSPECTA PDF] Warnings:', validation.warnings);
  }
  
  // Générer le PDF
  const doc = <PerspectaDocument data={data} />;
  const blob = await pdf(doc).toBlob();
  
  return blob;
}

/**
 * Génère le PDF et retourne un Buffer (pour Node.js)
 */
export async function generatePDFBuffer(
  rawData: Partial<ProfileData>,
  options: PDFGenerationOptions = {}
): Promise<Buffer> {
  const blob = await generatePDFBlob(rawData, options);
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Génère le PDF et retourne une URL data (pour preview)
 */
export async function generatePDFDataURL(
  rawData: Partial<ProfileData>,
  options: PDFGenerationOptions = {}
): Promise<string> {
  const blob = await generatePDFBlob(rawData, options);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Export du composant Document pour usage direct
 */
export { PerspectaDocument };

/**
 * Export des types
 */
export type { ProfileData, PDFGenerationOptions } from './data/types';
