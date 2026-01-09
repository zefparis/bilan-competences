"use client"

import Link from "next/link"
import { 
  Award, Brain, FileText, TrendingUp, Shield, 
  Briefcase, CheckCircle2, ArrowRight, 
  Users, Target, Heart, GraduationCap,
  Sparkles, Euro, Clock, Star, MapPin, Lock, Unlock,
  ChevronRight, AlertCircle, CheckCircle, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PERSPECTA-COMPETENCES</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Accueil
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Commencer gratuitement</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Link href="/auth/register">
                <Button size="sm">Commencer</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              <Info className="h-3 w-3 inline mr-1" />
              Guide complet
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Comment ça marche ?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez le fonctionnement de PERSPECTA-COMPETENCES, les modules gratuits et payants, 
              et pourquoi votre localisation est essentielle pour des résultats pertinents.
            </p>
          </div>
        </div>
      </section>

      {/* Important Alert - Geographic Location */}
      <section className="pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <Alert className="border-primary/50 bg-primary/5">
            <MapPin className="h-5 w-5 text-primary" />
            <AlertTitle className="text-lg font-semibold">📍 Localisation géographique requise</AlertTitle>
            <AlertDescription className="text-base mt-2">
              <p className="mb-2">
                Pour vous proposer des <strong>formations et offres d'emploi pertinentes</strong>, 
                PERSPECTA-COMPETENCES utilise votre localisation géographique.
              </p>
              <p className="mb-2">
                <strong>Pourquoi c'est important ?</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Formations dans un rayon de <strong>50km</strong> autour de chez vous</li>
                <li>Offres d'emploi accessibles géographiquement</li>
                <li>Évite les résultats faussés d'autres régions</li>
                <li>Recommandations réalistes et applicables</li>
              </ul>
              <p className="mt-3 text-sm">
                💡 <strong>Action requise :</strong> Renseignez votre ville, code postal et département 
                dans votre profil après inscription.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Le parcours en 4 étapes</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-4 right-4">
                <Badge className="text-lg px-3 py-1">Étape 1</Badge>
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Inscription gratuite</CardTitle>
                <CardDescription className="text-base">
                  Créez votre compte en 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email + mot de passe</p>
                    <p className="text-sm text-muted-foreground">Aucune carte bancaire requise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Renseignez votre profil</p>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-primary">Important :</strong> Ville, code postal, département
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Accès immédiat</p>
                    <p className="text-sm text-muted-foreground">6 modules gratuits disponibles</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-4 right-4">
                <Badge className="text-lg px-3 py-1">Étape 2</Badge>
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Unlock className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Modules gratuits (6)</CardTitle>
                <CardDescription className="text-base">
                  Explorez votre profil sans engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p><strong>Parcours de vie</strong> - Timeline interactive</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p><strong>Expériences STAR</strong> - Analyse compétences</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p><strong>Valeurs</strong> - Hiérarchisation priorités</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p><strong>Test RIASEC</strong> - Profil professionnel</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p><strong>Profil cognitif</strong> - Questionnaire</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p><strong>Tests cognitifs</strong> - 4 évaluations</p>
                </div>
                <Alert className="mt-4 bg-green-500/5 border-green-500/20">
                  <Info className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-sm">
                    Ces modules sont <strong>100% gratuits</strong> et accessibles à vie
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative overflow-hidden border-2 border-primary/50">
              <div className="absolute top-4 right-4">
                <Badge className="text-lg px-3 py-1 bg-primary">Étape 3</Badge>
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Déblocage Premium - 49€</CardTitle>
                <CardDescription className="text-base">
                  Accès aux modules avancés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p><strong>Certification professionnelle</strong> - Blockchain</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p><strong>Projet professionnel</strong> - 287 métiers ROME</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p><strong>Analyse IA Claude 3.5</strong> - Compétences transférables</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p><strong>Formations localisées</strong> - API France Travail</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p><strong>Offres d'emploi</strong> - Matching géographique</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p><strong>Rapport PDF premium</strong> - Synthèse complète</p>
                </div>
                <Alert className="mt-4 bg-primary/5 border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-sm">
                    <strong>Vente finale</strong> • Support technique 48-72h
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-4 right-4">
                <Badge className="text-lg px-3 py-1">Étape 4</Badge>
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">Passage à l'action</CardTitle>
                <CardDescription className="text-base">
                  Concrétisez votre reconversion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Téléchargez votre rapport PDF</p>
                    <p className="text-sm text-muted-foreground">Document professionnel complet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Postulez aux offres d'emploi</p>
                    <p className="text-sm text-muted-foreground">Matching géographique 50km</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Inscrivez-vous aux formations</p>
                    <p className="text-sm text-muted-foreground">Financement CPF disponible</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Partagez votre certificat</p>
                    <p className="text-sm text-muted-foreground">LinkedIn, CV, entretiens</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free vs Paid Comparison */}
      <section className="py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Gratuit vs Premium</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <Card className="border-2 border-green-500/50">
              <CardHeader className="bg-green-500/5">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Gratuit</CardTitle>
                  <Badge variant="outline" className="text-lg px-3 py-1 border-green-500 text-green-500">
                    0€
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Exploration complète de votre profil
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">6 modules d'évaluation</p>
                    <p className="text-sm text-muted-foreground">Parcours, Expériences, Valeurs, RIASEC, Cognitif</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Tests comportementaux</p>
                    <p className="text-sm text-muted-foreground">4 évaluations cognitives scientifiques</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Dashboard de progression</p>
                    <p className="text-sm text-muted-foreground">Suivi en temps réel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Accès à vie</p>
                    <p className="text-sm text-muted-foreground">Pas de limite de temps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-muted-foreground">Certification bloquée</p>
                    <p className="text-sm text-muted-foreground">Nécessite Premium</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-muted-foreground">Analyse IA bloquée</p>
                    <p className="text-sm text-muted-foreground">Nécessite Premium</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-muted-foreground">Rapport PDF bloqué</p>
                    <p className="text-sm text-muted-foreground">Nécessite Premium</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg px-4 py-2 bg-primary">
                  Recommandé
                </Badge>
              </div>
              <CardHeader className="bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <div className="text-right">
                    <Badge variant="outline" className="text-lg px-3 py-1 border-primary text-primary">
                      49€
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Paiement unique</p>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Solution complète de reconversion
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Tout le contenu gratuit inclus</p>
                    <p className="text-sm text-muted-foreground">6 modules + tests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Certification professionnelle</p>
                    <p className="text-sm text-muted-foreground">45 questions + certificat blockchain</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Analyse IA Claude 3.5</p>
                    <p className="text-sm text-muted-foreground">Compétences transférables + gap</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Catalogue formations</p>
                    <p className="text-sm text-muted-foreground">API France Travail + financement CPF</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Offres d'emploi localisées</p>
                    <p className="text-sm text-muted-foreground">Rayon 50km + matching automatique</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Rapport PDF premium</p>
                    <p className="text-sm text-muted-foreground">Synthèse complète personnalisée</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Support technique</p>
                    <p className="text-sm text-muted-foreground">Email 48-72h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Geographic Location Importance */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Pourquoi votre localisation est essentielle</h2>
            <p className="text-lg text-muted-foreground">
              PERSPECTA-COMPETENCES utilise votre code postal pour filtrer intelligemment 
              les formations et offres d'emploi dans un rayon de 50km.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Formations localisées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Centres de formation accessibles (50km)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Évite les formations dans d'autres régions</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Recommandations réalistes et applicables</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Informations CPF et financement locaux</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Offres d'emploi pertinentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Emplois accessibles géographiquement</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Temps de trajet raisonnable</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Matching avec entreprises locales</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Salaires adaptés au marché local</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="border-primary/50 bg-primary/5">
            <AlertCircle className="h-5 w-5 text-primary" />
            <AlertTitle className="text-lg font-semibold">Comment renseigner votre localisation ?</AlertTitle>
            <AlertDescription className="text-base mt-2 space-y-2">
              <p><strong>Étape 1 :</strong> Après inscription, allez dans "Mon Profil"</p>
              <p><strong>Étape 2 :</strong> Cliquez sur l'onglet "Professionnel"</p>
              <p><strong>Étape 3 :</strong> Remplissez :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Ville</strong> : Ex: Montpellier</li>
                <li><strong>Code postal</strong> : Ex: 34000</li>
                <li><strong>Département</strong> : Ex: Hérault</li>
              </ul>
              <p><strong>Étape 4 :</strong> Cliquez sur "Enregistrer"</p>
              <p className="mt-3 text-sm">
                ✅ Vos recherches de formations et offres d'emploi seront automatiquement filtrées !
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à démarrer votre reconversion ?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Commencez gratuitement avec les 6 premiers modules, puis débloquez 
            l'accès complet pour seulement 49€.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            ✅ Aucune carte bancaire requise pour commencer
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">PERSPECTA-COMPETENCES</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">
                Confidentialité
              </Link>
              <Link href="/cgu" className="hover:text-foreground transition-colors">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
