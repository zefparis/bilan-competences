"use client"

import Link from "next/link"
import { 
  Award, Brain, FileText, TrendingUp, Shield, 
  Briefcase, CheckCircle2, ArrowRight, 
  Users, Target, Heart, GraduationCap,
  Sparkles, Euro, Clock, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePageV3() {
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
              <a href="#pour-qui" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pour qui ?
              </a>
              <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Modules
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
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
      <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('/image/unnamed%20(1).jpg')`,
          }}
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              <Sparkles className="h-3 w-3 inline mr-1" />
              v3.1 - Module Accessibilité Handicap
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Votre reconversion professionnelle,
              <br />
              <span className="text-primary">étape par étape</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              Bilan de compétences universel avec analyse IA, matching emploi et formations. 
              <strong className="text-white"> 287 métiers français couverts.</strong>
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">287</div>
                <div className="text-sm text-gray-300">Métiers français</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-gray-300">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">49€</div>
                <div className="text-sm text-gray-300">Valeur 2000€</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8">
                  Démarrer mon bilan gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#pour-qui">
                <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white/10">
                  Comment ça marche ?
                </Button>
              </a>
            </div>

            <p className="text-sm text-gray-300">
              Modules 1-6 gratuits • Paiement uniquement pour certification + PDF
            </p>
          </div>
        </div>
      </section>

      {/* Section "Pour qui ?" */}
      <section id="pour-qui" className="py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PERSPECTA-COMPETENCES s'adapte à votre situation
            </h2>
            <p className="text-lg text-muted-foreground">
              Que vous soyez en reconversion, en évolution ou en recherche d'emploi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Reconversion */}
            <Card className="border-blue-500 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reconversion</h3>
                <p className="text-muted-foreground mb-4">
                  Plombier → Technicien maintenance • Commercial → Coach • 
                  Infirmier → Psychologue...
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Analyse compétences transférables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Formations CPF adaptées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Score de faisabilité IA</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Évolution */}
            <Card className="border-purple-500 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Évolution</h3>
                <p className="text-muted-foreground mb-4">
                  Dev Junior → Senior • Assistant → Manager • 
                  Technicien → Expert...
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Certification blockchain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Gap de compétences identifié</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Plan d'action personnalisé</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Handicap */}
            <Card className="border-pink-500 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  Handicap
                  <Badge variant="secondary" className="text-xs">Nouveau</Badge>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Module inclusif pour les 2,8M travailleurs handicapés en France
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Offres entreprises engagées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Aides AGEFIPH (10 000€)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Formations accessibles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils ont réussi leur reconversion
            </h2>
            <p className="text-lg text-muted-foreground">
              Témoignages réels d'utilisateurs PERSPECTA-COMPETENCES
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Jean M.</span>
                    <Badge variant="secondary">78/100</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Plombier → Technicien maintenance
                  </div>
                </div>
                <p className="text-sm italic">
                  "À 45 ans, je pensais être coincé. PERSPECTA-COMPETENCES m'a montré que mes compétences en lecture de plans étaient transférables. 6 mois après, nouveau job !"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Marie L.</span>
                    <Badge variant="secondary">85/100</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dev Junior → Data Analyst
                  </div>
                </div>
                <p className="text-sm italic">
                  "L'analyse IA m'a révélé que je maîtrisais déjà 60% des compétences requises. Un bootcamp de 3 mois a suffi."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Sophie T.</span>
                    <Badge variant="secondary">92/100</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    RH (RQTH) → Conseiller insertion
                  </div>
                </div>
                <p className="text-sm italic">
                  "Le module handicap m'a aidée à trouver des entreprises vraiment engagées. Les aides AGEFIPH ont financé ma formation."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Les 11 Modules */}
      <section id="modules" className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              11 modules pour une reconversion réussie
            </h2>
            <p className="text-lg text-muted-foreground">
              De l'analyse de vos compétences au matching emploi/formation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { number: 1, title: "Parcours de vie", icon: Users, free: true },
              { number: 2, title: "Expériences STAR", icon: Briefcase, free: true },
              { number: 3, title: "Valeurs", icon: Heart, free: true },
              { number: 4, title: "Test RIASEC", icon: Target, free: true },
              { number: 5, title: "Profil cognitif", icon: Brain, free: true },
              { number: 6, title: "Tests comportementaux", icon: Award, free: true },
              { number: 7, title: "Certification blockchain", icon: Shield, premium: true },
              { number: 8, title: "Projet professionnel", icon: Target, premium: true },
              { number: "8.5", title: "Accessibilité handicap", icon: Heart, premium: true, new: true },
              { number: 9, title: "Formations CPF", icon: GraduationCap, premium: true },
              { number: 10, title: "Rapport final PDF", icon: FileText, premium: true },
            ].map((module) => (
              <Card key={module.number} className={module.new ? "border-pink-500" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <module.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Module {module.number}
                        </span>
                        {module.free && (
                          <Badge variant="secondary" className="text-xs">Gratuit</Badge>
                        )}
                        {module.premium && (
                          <Badge variant="default" className="text-xs">Premium</Badge>
                        )}
                        {module.new && (
                          <Badge className="text-xs bg-pink-500">Nouveau</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold">{module.title}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/methodology">
                Découvrir la méthodologie complète
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Simple */}
      <section id="pricing" className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Un seul tarif, tout inclus
            </h2>
            <p className="text-lg text-muted-foreground">
              Valeur marché ~2000€ • Prix PERSPECTA-COMPETENCES : 49€
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-4 font-semibold">Prestation</th>
                  <th className="text-right p-4 font-semibold">Valeur marché</th>
                  <th className="text-center p-4 font-semibold">PERSPECTA-COMPETENCES</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Bilan de compétences classique</td>
                  <td className="text-right p-4">1500-3000€</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Test RIASEC professionnel</td>
                  <td className="text-right p-4">150€</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Évaluation cognitive (4 tests)</td>
                  <td className="text-right p-4">200€</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Analyse IA GPT-4o personnalisée</td>
                  <td className="text-right p-4">100€</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Recherche formations + emplois</td>
                  <td className="text-right p-4">10h × 50€</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Certificat blockchain</td>
                  <td className="text-right p-4">N/A</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">PDF premium 50 pages</td>
                  <td className="text-right p-4">80€</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Module accessibilité handicap</td>
                  <td className="text-right p-4">N/A</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="font-bold text-lg">
                  <td className="p-4">TOTAL VALEUR</td>
                  <td className="text-right p-4">~2000€</td>
                  <td className="text-center p-4 text-primary">49€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-primary">
            <CardContent className="pt-8 text-center">
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">49€</div>
                <div className="text-sm text-muted-foreground">Paiement unique • Sans abonnement</div>
              </div>

              <Button size="lg" className="w-full max-w-sm mb-4" asChild>
                <Link href="/auth/register">
                  Commencer gratuitement
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground">
                Garantie satisfait ou remboursé 7 jours
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Métriques & Confiance */}
      <section className="py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Métriques & Confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-sm text-muted-foreground">Taux de satisfaction</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">67%</div>
                <p className="text-sm text-muted-foreground">Trouvent une formation</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">42%</div>
                <p className="text-sm text-muted-foreground">Entretien sous 3 mois</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">89%</div>
                <p className="text-sm text-muted-foreground">Terminent la formation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à changer de vie professionnelle ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez les centaines de personnes qui ont réussi leur reconversion avec PERSPECTA-COMPETENCES
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/register">
                Démarrer mon bilan gratuit
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="font-semibold text-lg">PERSPECTA-COMPETENCES</span>
              <p className="mt-2 text-sm text-muted-foreground">
                Plateforme universelle de reconversion professionnelle et bilan de compétences.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3">Informations légales</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
                <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">Politique de confidentialité</Link>
                <Link href="/cgu" className="hover:text-foreground transition-colors">CGU</Link>
                <Link href="/ai-disclosure" className="hover:text-foreground transition-colors">Utilisation de l'IA</Link>
                <Link href="/methodology" className="hover:text-foreground transition-colors">Méthodologie</Link>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>ia-solution</p>
                <p>Alès, France</p>
                <a href="mailto:contact@ia-solution.fr" className="hover:text-foreground transition-colors">
                  contact@ia-solution.fr
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 PERSPECTA-COMPETENCES by ia-solution. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
