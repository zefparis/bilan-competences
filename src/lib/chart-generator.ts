/**
 * Génère un graphique radar RIASEC en SVG
 */

export interface RIASECProfile {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
}

export interface CognitiveSignatureData {
  inhibitoryControl: number;
  processingSpeed: number;
  cognitiveFlexibility: number;
  accessFluency: number;
  attentionDrift: number;
}

/**
 * Génère un graphique radar RIASEC en SVG (data URL pour PDF)
 */
export async function generateRIASECRadar(riasec: RIASECProfile): Promise<string> {
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 60;

  // Données RIASEC
  const labels = ['Réaliste', 'Investigatif', 'Artistique', 'Social', 'Entreprenant', 'Conventionnel'];
  const values = [
    riasec.realistic,
    riasec.investigative,
    riasec.artistic,
    riasec.social,
    riasec.enterprising,
    riasec.conventional
  ];

  // Points du radar
  const points = values.map((value, i) => {
    const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
    const normalizedValue = value / 100; // Normaliser entre 0 et 1
    const x = centerX + Math.cos(angle) * radius * normalizedValue;
    const y = centerY + Math.sin(angle) * radius * normalizedValue;
    return `${x},${y}`;
  }).join(' ');

  // Grille de fond
  const gridLines = [];
  for (let level = 0.2; level <= 1; level += 0.2) {
    const levelPoints = values.map((_, i) => {
      const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius * level;
      const y = centerY + Math.sin(angle) * radius * level;
      return `${x},${y}`;
    }).join(' ');
    gridLines.push(`<polygon points="${levelPoints}" fill="none" stroke="#e5e7eb" stroke-width="1" opacity="0.3"/>`);
  }

  // Lignes radiales
  const radialLines = labels.map((_, i) => {
    const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#e5e7eb" stroke-width="1" opacity="0.3"/>`;
  }).join('');

  // Étiquettes
  const labelElements = labels.map((label, i) => {
    const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
    const x = centerX + Math.cos(angle) * (radius + 30);
    const y = centerY + Math.sin(angle) * (radius + 30);
    const textAnchor = x > centerX ? 'start' : x < centerX ? 'end' : 'middle';
    const dominantBaseline = y > centerY ? 'hanging' : y < centerY ? 'baseline' : 'middle';

    return `<text x="${x}" y="${y}" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}" font-size="12" fill="#374151" font-weight="500">${label}</text>`;
  }).join('');

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.1" />
      </linearGradient>
    </defs>
    ${gridLines.join('')}
    ${radialLines}
    <polygon points="${points}" fill="url(#radarGradient)" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="${points}" fill="none" stroke="#3b82f6" stroke-width="2"/>
    ${points.split(' ').map(point => {
      const [x, y] = point.split(',');
      return `<circle cx="${x}" cy="${y}" r="4" fill="#3b82f6"/>`;
    }).join('')}
    ${labelElements}
    <text x="${centerX}" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937">
      Profil RIASEC - Préférences Professionnelles
    </text>
  </svg>`;

  // Convertir en data URL
  const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return svgDataUrl;
}

/**
 * Génère un graphique en barres des dimensions cognitives en SVG
 */
export async function generateCognitiveBarChart(cognitive: CognitiveSignatureData): Promise<string> {
  const width = 500;
  const height = 300;
  const margin = { top: 40, right: 30, left: 80, bottom: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Données
  const data = [
    { label: 'Contrôle inhibiteur', value: cognitive.inhibitoryControl, color: '#16a34a' },
    { label: 'Vitesse traitement', value: cognitive.processingSpeed, color: '#ea580c' },
    { label: 'Flexibilité cognitive', value: cognitive.cognitiveFlexibility, color: '#2563eb' },
    { label: 'Fluidité d\'accès', value: cognitive.accessFluency, color: '#9333ea' }
  ];

  const barWidth = chartWidth / data.length;
  const maxValue = 100;

  // Barres
  const bars = data.map((item, i) => {
    const x = margin.left + i * barWidth + barWidth * 0.1;
    const barHeight = (item.value / maxValue) * chartHeight;
    const y = margin.top + chartHeight - barHeight;

    return `
      <rect x="${x}" y="${y}" width="${barWidth * 0.8}" height="${barHeight}"
            fill="${item.color}" rx="4"/>
      <text x="${x + barWidth * 0.4}" y="${y - 5}" text-anchor="middle" font-size="11" fill="#374151" font-weight="500">
        ${item.value}%
      </text>
    `;
  }).join('');

  // Étiquettes des axes
  const yLabels = [0, 25, 50, 75, 100].map(value => {
    const y = margin.top + chartHeight - (value / maxValue) * chartHeight;
    return `<text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="10" fill="#6b7280">${value}%</text>`;
  }).join('');

  // Étiquettes des barres
  const xLabels = data.map((item, i) => {
    const x = margin.left + i * barWidth + barWidth * 0.5;
    const y = margin.top + chartHeight + 25;
    const words = item.label.split(' ');
    return words.map((word, j) =>
      `<text x="${x}" y="${y + j * 12}" text-anchor="middle" font-size="10" fill="#374151" font-weight="500">${word}</text>`
    ).join('');
  }).join('');

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartHeight}" stroke="#6b7280" stroke-width="1"/>
    <line x1="${margin.left}" y1="${margin.top + chartHeight}" x2="${width - margin.right}" y2="${margin.top + chartHeight}" stroke="#6b7280" stroke-width="1"/>
    ${[0, 25, 50, 75, 100].map(value => {
      const y = margin.top + chartHeight - (value / maxValue) * chartHeight;
      return `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1" opacity="0.5"/>`;
    }).join('')}
    ${yLabels}
    ${bars}
    ${xLabels}
    <text x="${width / 2}" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937">
      Dimensions Cognitives - Fonctions Exécutives
    </text>
  </svg>`;

  // Convertir en data URL
  const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return svgDataUrl;
}
