import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container max-w-2xl py-32 px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Certificat introuvable</h1>
      <p className="text-muted-foreground mb-8">
        Aucun certificat ne correspond à ce hash. Vérifiez l'URL ou contactez 
        le titulaire du certificat.
      </p>
      <Button asChild>
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}
