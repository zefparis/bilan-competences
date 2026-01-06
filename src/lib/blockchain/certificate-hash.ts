import crypto from 'crypto';

interface CertificateData {
  userId: string;
  sessionId: string;
  scores: {
    dev: number;
    data: number;
    cyber: number;
    infra: number;
    coherence: number;
  };
  primaryRole: string;
  level: string;
  issuedAt: Date;
}

/**
 * Génère un hash SHA-256 unique pour un certificat
 * Le hash est déterministe : même données → même hash
 * Hash impossible à inverser (one-way function)
 */
export function generateCertificateHash(data: CertificateData): string {
  const normalizedData = {
    userId: data.userId,
    sessionId: data.sessionId,
    scores: data.scores,
    primaryRole: data.primaryRole,
    level: data.level,
    issuedAt: data.issuedAt.toISOString()
  };

  const dataString = JSON.stringify(normalizedData, Object.keys(normalizedData).sort());
  
  const hash = crypto
    .createHash('sha256')
    .update(dataString)
    .digest('hex');
  
  return `0x${hash}`;
}

/**
 * Vérifie qu'un hash correspond aux données
 */
export function verifyCertificateHash(
  data: CertificateData, 
  expectedHash: string
): boolean {
  const computedHash = generateCertificateHash(data);
  return computedHash === expectedHash;
}

/**
 * Génère l'URL de vérification publique
 */
export function getCertificateVerificationUrl(hash: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://perspecta.ia-solution.fr';
  return `${baseUrl}/verify/${hash.replace('0x', '')}`;
}
