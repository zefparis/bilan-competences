"use client"

import Link from "next/link"
import { 
  Award, Brain, FileText, TrendingUp, Shield, 
  Briefcase, Zap, CheckCircle2, ArrowRight, 
  Users, Target, Lock, Code, Database, 
  Server, AlertTriangle, Star, Check, X,
  ExternalLink, ChevronRight, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function NewHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PERSPECTA</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Modules
              </a>
              <a href="#certification" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Certification
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tarifs
              </a>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="sm">Commencer</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Link href="/auth/signin">
                <Button size="sm">Commencer</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              <Sparkles className="h-3 w-3 inline mr-1" />
              Le seul bilan avec certification blockchain
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Bilan de compétences +<br />
              <span className="text-primary">Certification professionnelle</span><br />
              + Emploi
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              PERSPECTA valide vos compétences techniques, délivre un certificat blockchain infalsifiable 
              et vous connecte automatiquement aux offres d'emploi France Travail.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/auth/signin">
                <Button size="lg" className="text-lg px-8">
                  Commencer - 49€
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#differentiation">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Pourquoi PERSPECTA ?
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">45</div>
                <div className="text-sm text-muted-foreground">Questions tech</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Offres matchées</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Différenciation */}
      <section id="differentiation" className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi PERSPECTA est différent
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comparaison avec les solutions existantes
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-4 font-semibold">Critère</th>
                  <th className="text-center p-4 font-semibold">Tests classiques</th>
                  <th className="text-center p-4 font-semibold">Marco (Pôle Emploi)</th>
                  <th className="text-center p-4 font-semibold bg-primary/5">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      PERSPECTA
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Validation technique</td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-muted-foreground">Tests objectifs</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Certification</td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-muted-foreground">Blockchain</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Spécialisation tech</td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-muted-foreground">100% numérique</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Connexion emploi</td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-muted-foreground">API France Travail</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Enrichissement</td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4"><X className="h-5 w-5 text-muted-foreground mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-xs text-muted-foreground">RIASEC + Cognitif</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Les 7 Modules */}
      <section id="modules" className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Les 7 modules du bilan complet
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une analyse complète de votre profil professionnel et technique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Module 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Module 1</Badge>
                </div>
                <CardTitle className="text-lg">Parcours de Vie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Timeline interactive de votre parcours professionnel et événements marquants
                </p>
              </CardContent>
            </Card>

            {/* Module 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Module 2</Badge>
                </div>
                <CardTitle className="text-lg">Expériences STAR</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyse structurée de vos expériences (Situation, Tâche, Action, Résultat)
                </p>
              </CardContent>
            </Card>

            {/* Module 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Module 3</Badge>
                </div>
                <CardTitle className="text-lg">Tri des Valeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hiérarchisation de vos valeurs fondamentales et motivations profondes
                </p>
              </CardContent>
            </Card>

            {/* Module 4 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Module 4</Badge>
                </div>
                <CardTitle className="text-lg">Test RIASEC</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Profil professionnel selon les 6 types Holland (Réaliste, Investigateur, etc.)
                </p>
              </CardContent>
            </Card>

            {/* Module 5 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Module 5</Badge>
                </div>
                <CardTitle className="text-lg">Profil Cognitif</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyse HCS-U7 de vos dimensions cognitives (Form, Color, Volume, Sound)
                </p>
              </CardContent>
            </Card>

            {/* Module 6 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Module 6</Badge>
                </div>
                <CardTitle className="text-lg">Évaluation Cognitive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  4 tests comportementaux (Stroop, Temps de réaction, Trail Making, RAN)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Module 7 - Mis en avant */}
          <Card id="certification" className="col-span-full border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">NOUVEAU</Badge>
                <Badge variant="outline">Module 7</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-12 w-12 text-primary" />
                <div>
                  <CardTitle className="text-2xl md:text-3xl">
                    Certification Professionnelle Métiers du Numérique
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Tests techniques + Certificat blockchain + Matching emploi automatique
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><b>45 questions techniques</b> (algorithmes, SQL, cryptographie, ML)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><b>Tests objectifs</b> + style cognitif + scénarios pratiques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><b>10 profils professionnels</b> (Architecte, Data Scientist, DevOps, etc.)</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><b>Certificat blockchain</b> SHA-256 infalsifiable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><b>Matching automatique</b> offres France Travail</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><b>Score compatibilité</b> 0-100% par offre</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça marche
            </h2>
            <p className="text-lg text-muted-foreground">
              Un parcours simple en 4 étapes
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Complétez les 6 premiers modules</h3>
                <p className="text-muted-foreground">
                  Parcours, expériences, valeurs, RIASEC, profil cognitif et évaluation cognitive (environ 60 minutes)
                </p>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-primary h-8"></div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Passez le test de certification</h3>
                <p className="text-muted-foreground">
                  45 questions techniques en 4 blocs (environ 20 minutes)
                </p>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-primary h-8"></div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Recevez votre certificat blockchain</h3>
                <p className="text-muted-foreground">
                  Hash SHA-256 infalsifiable avec URL de vérification publique (valable 3 ans)
                </p>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-primary h-8"></div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Consultez vos offres d'emploi matchées</h3>
                <p className="text-muted-foreground">
                  Offres réelles France Travail triées par score de compatibilité
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg border-2 border-primary">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <h4 className="text-lg font-semibold">Résultat</h4>
              </div>
              <p className="text-muted-foreground">
                PDF complet (20+ pages) + Certificat blockchain + Liste d'offres d'emploi pré-qualifiées
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices concrets */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bénéfices concrets
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pour les candidats */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Pour les candidats</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Certificat infalsifiable</b> grâce à la blockchain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Gain de temps</b> dans la recherche d'emploi (matching automatique)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Crédibilité technique</b> prouvée par des tests objectifs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Offres pré-qualifiées</b> selon votre profil exact</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pour les recruteurs */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Pour les recruteurs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Vérification certificat</b> en 1 clic via URL publique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Scores objectifs</b> (pas de déclaratif)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Profil complet</b> (cognitif + technique + comportemental)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><b>Gain de temps</b> dans le screening des candidats</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cas d'usage (Personas) */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils ont trouvé leur voie avec PERSPECTA
            </h2>
            <p className="text-lg text-muted-foreground">
              Cas d'usage réels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Persona 1 */}
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">👨‍💻</div>
                <CardTitle>Développeur en reconversion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "Je veux valider mes compétences autodidactes"
                </p>
                <Separator className="my-4" />
                <p className="text-sm font-medium">
                  → Module certification + certificat blockchain
                </p>
              </CardContent>
            </Card>

            {/* Persona 2 */}
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">📊</div>
                <CardTitle>Data Analyst → Data Scientist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "Je veux prouver mon niveau technique"
                </p>
                <Separator className="my-4" />
                <p className="text-sm font-medium">
                  → Tests objectifs ML + matching offres senior
                </p>
              </CardContent>
            </Card>

            {/* Persona 3 */}
            <Card>
              <CardHeader>
                <div className="text-4xl mb-2">🔒</div>
                <CardTitle>Passion cyber → carrière</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "Je veux transformer ma passion en métier"
                </p>
                <Separator className="my-4" />
                <p className="text-sm font-medium">
                  → Tests cyber + profils pentester/SOC
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologie blockchain expliquée */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Shield className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Certificat infalsifiable</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Technologie blockchain expliquée simplement
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Votre certificat est hashé (SHA-256) et peut être vérifié publiquement via une URL unique :
              </p>
              
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                perspecta.ia-solution.fr/verify/0x3f2a8b9c...
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Impossible à falsifier</p>
                    <p className="text-sm text-muted-foreground">
                      Le hash cryptographique garantit l'authenticité
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Vérifiable en 1 clic</p>
                    <p className="text-sm text-muted-foreground">
                      N'importe qui peut vérifier l'authenticité
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <b>Validité :</b> 3 ans à partir de la date d'émission
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tarif transparent
            </h2>
            <p className="text-lg text-muted-foreground">
              Un seul prix, tout inclus
            </p>
          </div>

          <Card className="border-2 border-primary max-w-lg mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-5xl font-bold mb-2">49€</CardTitle>
              <CardDescription className="text-lg">Paiement unique</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-4 text-lg">Inclus :</h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>7 modules complets</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Évaluation cognitive (4 tests)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Rapport IA personnalisé</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>PDF premium (20+ pages)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><b>Certification blockchain</b></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><b>Matching emploi 3 mois</b></span>
                </li>
              </ul>
              
              <Link href="/auth/signin" className="block">
                <Button className="w-full" size="lg">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                ✓ Garantie satisfait ou remboursé 14 jours
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">La certification est-elle reconnue ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  C'est une certification privée (non RNCP). Elle prouve vos compétences techniques via blockchain. 
                  Reconnue par les employeurs qui vérifient le hash. Valable 3 ans.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Différence avec Marco (Pôle Emploi) ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Marco identifie vos intérêts. PERSPECTA valide vos compétences techniques + délivre un certificat 
                  blockchain + vous connecte aux emplois réels via API France Travail.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Les offres d'emploi sont-elles réelles ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, via l'API officielle France Travail. Offres actualisées quotidiennement. 
                  Score de compatibilité calculé automatiquement pour chaque offre.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Le certificat expire ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Valable 3 ans à partir de la date d'émission. Renouvelable en repassant le test de certification.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Que se passe-t-il après paiement ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Accès immédiat aux 7 modules. Complétez-les à votre rythme (pas de limite de temps). 
                  Générez votre PDF + certificat + liste d'emplois dès que vous avez terminé.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à valider vos compétences et trouver votre prochain emploi ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les professionnels tech qui utilisent PERSPECTA
          </p>
          <Link href="/auth/signin">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Commencer mon bilan - 49€
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm mt-6 opacity-75">
            ✓ Paiement sécurisé Stripe · ✓ Données RGPD · ✓ Support 7j/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo et description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">PERSPECTA</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plateforme d'évaluation cognitive et de bilan de compétences avec certification blockchain.
              </p>
            </div>

            {/* Liens légaux */}
            <div>
              <h4 className="font-semibold mb-3">Légal</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
                  Mentions légales
                </Link>
                <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">
                  Confidentialité
                </Link>
                <Link href="/cgu" className="hover:text-foreground transition-colors">
                  CGU
                </Link>
                <Link href="/methodologie" className="hover:text-foreground transition-colors">
                  Méthodologie
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>ia-solution</p>
                <p>Alès, France</p>
                <a 
                  href="mailto:contact@ia-solution.fr" 
                  className="text-primary hover:underline"
                >
                  contact@ia-solution.fr
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 PERSPECTA. Tous droits réservés.</p>
            <p>
              Développé par{" "}
              <a href="mailto:contact@ia-solution.fr" className="text-primary hover:underline">
                ia-solution
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
