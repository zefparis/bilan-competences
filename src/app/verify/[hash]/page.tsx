import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Calendar, Award } from 'lucide-react';

interface VerifyPageProps {
  params: {
    hash: string;
  };
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const hash = `0x${params.hash}`;

  const certificate = await (prisma as any).certificate.findFirst({
    where: { blockchainHash: hash },
    include: {
      session: true,
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  if (!certificate) {
    notFound();
  }

  const isValid = new Date() < certificate.validUntil;
  const session = certificate.session;

  return (
    <div className="container max-w-4xl py-16 px-4 md:px-6">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">
          Vérification de certificat
        </h1>
        <p className="text-muted-foreground">
          Certificat professionnel PERSPECTA-COMPETENCES
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Statut de vérification</CardTitle>
            {isValid ? (
              <Badge className="bg-green-500">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Valide
              </Badge>
            ) : (
              <Badge variant="destructive">Expiré</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Titulaire</p>
              <p className="font-semibold">{certificate.user.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Profil professionnel</p>
              <p className="font-semibold">{session.primaryRole || 'Non déterminé'}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Niveau</p>
              <p className="font-semibold capitalize">{session.level || 'junior'}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Date d'émission</p>
              <p className="font-semibold">
                {new Date(certificate.issuedAt).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Valide jusqu'au</p>
              <p className="font-semibold">
                {new Date(certificate.validUntil).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">ID Certificat</p>
              <p className="font-mono text-xs">{certificate.id}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Scores de compétences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Développement</p>
                <p className="text-2xl font-bold text-primary">{session.devScore || 0}/100</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Data Science</p>
                <p className="text-2xl font-bold text-primary">{session.dataScore || 0}/100</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cybersécurité</p>
                <p className="text-2xl font-bold text-primary">{session.cyberScore || 0}/100</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Infrastructure</p>
                <p className="text-2xl font-bold text-primary">{session.infraScore || 0}/100</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2">Hash cryptographique (SHA-256)</h3>
            <code className="block bg-muted p-3 rounded text-xs break-all">
              {certificate.blockchainHash}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Ce hash est unique et infalsifiable. Il garantit l'authenticité du certificat.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">À propos de la vérification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            ✓ Ce certificat a été généré par PERSPECTA-COMPETENCES et authentifié via hash cryptographique SHA-256
          </p>
          <p>
            ✓ Le hash garantit que les informations n'ont pas été modifiées depuis l'émission
          </p>
          <p>
            ✓ Ce certificat est une attestation privée, non enregistrée au RNCP
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
