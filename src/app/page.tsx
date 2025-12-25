import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Bilan de Compétences
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Découvrez vos talents, identifiez vos aspirations et construisez votre projet professionnel
            avec notre application complète de bilan de compétences.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth/login">
              <Button size="lg">Se connecter</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg">Créer un compte</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Parcours Personnel</CardTitle>
              <CardDescription>
                Tracez votre histoire et identifiez les moments clés de votre évolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Timeline interactive, visualisation de l'évolution de satisfaction et fil conducteur personnel.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expériences</CardTitle>
              <CardDescription>
                Analysez vos expériences professionnelles et extra-professionnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compétences, responsabilités, tâches et ce que vous avez aimé ou pas dans chaque expérience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valeurs</CardTitle>
              <CardDescription>
                Définissez ce qui compte vraiment pour vous
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sélectionnez et hiérarchisez vos valeurs fondamentales pour guider vos choix.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Centres d'Intérêt</CardTitle>
              <CardDescription>
                Explorez ce qui vous passionne vraiment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Évaluez vos intérêts et découvrez vos top 5 avec justifications et preuves.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Entourage</CardTitle>
              <CardDescription>
                Obtenez un regard extérieur sur vos qualités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Invitez votre entourage à donner leur avis et comparez les perceptions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projets</CardTitle>
              <CardDescription>
                Concevez vos projets professionnels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Projets idéaux et réels, facteurs de succès, plans d'action et évaluation de faisabilité.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
