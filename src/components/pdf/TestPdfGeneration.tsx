'use client';

import { useEffect, useState } from 'react';
import { PdfDocument } from '@/lib/pdf-renderer';

export const TestPdfGeneration = () => {
  const [PDFViewer, setPDFViewer] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import PDFViewer only on client side
    import('@react-pdf/renderer').then(({ PDFViewer: Viewer }) => {
      setPDFViewer(() => Viewer);
    });
  }, []);

  // Mock complete report sections for testing
  const sections = {
    // Partie I - Synthèse Générale (7 sections)
    cadre: "Cadre stratégique du bilan cognitif professionnel PERSPECTA...",
    synthese: "Synthèse générale des profils cognitif et RIASEC...",
    valeurs_professionnelles: "Analyse des valeurs professionnelles et leur alignement...",
    parcours_professionnel: "Analyse du parcours professionnel et des compétences...",
    croisement_riasec: "Croisement approfondi des profils cognitif et RIASEC...",
    scenarios: "Trois scénarios professionnels concrets et réalistes...",
    environnements_compatibles: "Description des environnements professionnels adaptés...",
    
    // Partie II - Analyse Cognitive (4 sections)
    signature_centrale: "Votre signature cognitive centrale révèle...",
    lecture_fonctionnelle: "Lecture fonctionnelle de votre fonctionnement cognitif...",
    tensions_cognitives: "Carte des tensions cognitives identifiées...",
    zones_vigilance: "Zones de vigilance cognitive à surveiller...",
    
    // Partie III - Transformation (1 section)
    projection_ia: "Projection cognitive dans le contexte de transformation du travail...",
    
    // Partie IV - Conclusion (1 section)
    conclusion: "Conclusion stratégique du bilan PERSPECTA..."
  };

  return (
    <div style={{ height: '100vh' }}>
      {PDFViewer ? (
        <PDFViewer width="100%" height="100%">
          <PdfDocument
            sections={sections}
            userName="Test User"
            date={new Date().toLocaleDateString('fr-FR')}
            cognitiveHash="SHA256:TEST1234"
          />
        </PDFViewer>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p>Loading PDF...</p>
        </div>
      )}
    </div>
  );
};
