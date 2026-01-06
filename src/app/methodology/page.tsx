import { Metadata } from 'next'
import Link from "next/link"
import { 
  Brain, Shield, CheckCircle2, X, AlertCircle, 
  AlertTriangle, Lightbulb, ArrowRight, Target,
  Zap, Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Méthodologie - PERSPECTA | Approche scientifique du bilan de compétences",
  description: "Découvrez les fondements scientifiques de PERSPECTA : tests cognitifs validés, profil RIASEC, certification technique blockchain. Méthodologie transparente et éthique.",
  keywords: "méthodologie, tests cognitifs, RIASEC, certification blockchain, psychométrie, neurosciences cognitives, bilan compétences"
}

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl">
          <Badge className="mb-4">Cadre méthodologique</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Une approche scientifique de l'orientation professionnelle
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            PERSPECTA combine neurosciences cognitives, psychométrie validée 
            et validation technique objective pour créer le bilan de compétences 
            le plus complet du marché.
          </p>
        </div>
      </section>

      {/* Table des matières - Navigation sticky */}
      <section className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container px-4 md:px-6">
          <nav className="flex gap-6 overflow-x-auto py-4 text-sm">
            <a href="#fondements" className="whitespace-nowrap hover:text-primary transition-colors">
              Fondements scientifiques
            </a>
            <a href="#tests-cognitifs" className="whitespace-nowrap hover:text-primary transition-colors">
              Tests cognitifs
            </a>
            <a href="#riasec" className="whitespace-nowrap hover:text-primary transition-colors">
              Profil RIASEC
            </a>
            <a href="#certification" className="whitespace-nowrap hover:text-primary transition-colors">
              Certification technique
            </a>
            <a href="#ethique" className="whitespace-nowrap hover:text-primary transition-colors">
              Cadre éthique
            </a>
            <a href="#limites" className="whitespace-nowrap hover:text-primary transition-colors">
              Limites et précautions
            </a>
          </nav>
        </div>
      </section>

      {/* Section 1: Fondements scientifiques */}
      <section id="fondements" className="py-16 px-4 md:px-6">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Fondements scientifiques</h2>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                L'empreinte cognitive fonctionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                PERSPECTA modélise une <b>empreinte cognitive fonctionnelle</b> : 
                un ensemble d'indicateurs comportementaux décrivant la manière dont 
                une personne traite l'information, prend des décisions et s'adapte 
                à un contexte de travail.
              </p>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Cette empreinte n'est ni un diagnostic médical, ni une mesure de QI, 
                  ni une évaluation clinique. Elle sert uniquement d'outil d'orientation 
                  et de compréhension de soi.
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-6 rounded-lg mt-6">
                <h4 className="font-semibold mb-4">Pourquoi "cognitive" ?</h4>
                <p className="text-sm text-muted-foreground">
                  Contrairement aux tests de personnalité qui mesurent des traits stables, 
                  nous analysons des <b>processus dynamiques</b> : vitesse de traitement, 
                  flexibilité mentale, contrôle inhibiteur. Ces mécanismes déterminent 
                  votre efficacité dans différents environnements professionnels.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trois piliers complémentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analyse cognitive</h4>
                    <p className="text-sm text-muted-foreground">
                      4 tests comportementaux (Stroop, Temps de réaction, Trail Making, RAN) 
                      mesurant 5 dimensions cognitives fondamentales.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Profil professionnel RIASEC</h4>
                    <p className="text-sm text-muted-foreground">
                      Modèle Holland (6 types) enrichi par vos dimensions cognitives 
                      pour identifier environnements professionnels compatibles.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Validation technique</h4>
                    <p className="text-sm text-muted-foreground">
                      45 questions objectives (algo, SQL, crypto, ML) avec détection 
                      d'incohérences et pondération discriminante.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 2: Tests cognitifs détaillés */}
      <section id="tests-cognitifs" className="py-16 px-4 md:px-6 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Les 4 tests cognitifs</h2>
          
          <div className="space-y-6">
            {/* Test Stroop */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Test de Stroop</CardTitle>
                    <CardDescription>Mesure du contrôle inhibiteur</CardDescription>
                  </div>
                  <Badge variant="outline">Validation scientifique</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    <b>Ce qui est mesuré :</b> Votre capacité à inhiber une réponse 
                    automatique pour suivre une consigne. Clé dans les environnements 
                    exigeant rigueur et attention aux détails.
                  </p>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-xs font-mono mb-2">Exemple de tâche :</p>
                    <p className="text-sm">
                      Mot "ROUGE" écrit en bleu → Nommer la couleur (bleu), 
                      pas le mot. Requiert inhibition de la lecture automatique.
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    <b>Référence :</b> Stroop, J. R. (1935). Studies of interference 
                    in serial verbal reactions. Journal of Experimental Psychology.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Temps de réaction */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Temps de réaction</CardTitle>
                    <CardDescription>Vitesse de traitement de l'information</CardDescription>
                  </div>
                  <Badge variant="outline">Validation scientifique</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <b>Ce qui est mesuré :</b> Rapidité avec laquelle vous encodez 
                  et répondez à des stimuli simples. Prédit performance dans 
                  environnements dynamiques nécessitant réactivité.
                </p>
              </CardContent>
            </Card>

            {/* Trail Making */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Trail Making Test</CardTitle>
                    <CardDescription>Flexibilité cognitive</CardDescription>
                  </div>
                  <Badge variant="outline">Validation scientifique</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <b>Ce qui est mesuré :</b> Capacité à alterner entre différentes 
                  règles mentales. Essentiel pour multitasking et adaptation rapide 
                  à des contextes changeants.
                </p>
              </CardContent>
            </Card>

            {/* RAN Visuel */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>RAN Visuel</CardTitle>
                    <CardDescription>Fluidité d'accès lexical</CardDescription>
                  </div>
                  <Badge variant="outline">Validation scientifique</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <b>Ce qui est mesuré :</b> Rapidité de récupération d'informations 
                  en mémoire. Indicateur de fluidité verbale et traitement séquentiel 
                  rapide.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Les 5 dimensions */}
          <Card className="mt-8 border-primary">
            <CardHeader>
              <CardTitle>Les 5 dimensions de votre signature cognitive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Contrôle inhibiteur</h4>
                  <p className="text-xs text-muted-foreground">
                    Capacité à résister aux distractions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Vitesse de traitement</h4>
                  <p className="text-xs text-muted-foreground">
                    Rapidité d'encodage de l'information
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Flexibilité cognitive</h4>
                  <p className="text-xs text-muted-foreground">
                    Adaptation aux changements de contexte
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Fluidité d'accès</h4>
                  <p className="text-xs text-muted-foreground">
                    Récupération rapide en mémoire
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-sm mb-1">Dérive attentionnelle</h4>
                  <p className="text-xs text-muted-foreground">
                    Stabilité de l'attention sur la durée
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 3: Profil RIASEC */}
      <section id="riasec" className="py-16 px-4 md:px-6">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Le modèle RIASEC (Holland)</h2>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="mb-6">
                Le modèle RIASEC (John Holland, 1959) classe les intérêts 
                professionnels selon 6 dimensions. PERSPECTA enrichit ce modèle 
                en croisant ces préférences avec votre profil cognitif.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="font-semibold text-primary">R - Réaliste</h4>
                  <p className="text-sm text-muted-foreground">
                    Activités pratiques, manipulation d'objets, résolution concrète
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-primary">I - Investigateur</h4>
                  <p className="text-sm text-muted-foreground">
                    Recherche, analyse, résolution de problèmes complexes
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-primary">A - Artistique</h4>
                  <p className="text-sm text-muted-foreground">
                    Création, expression, innovation esthétique
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-primary">S - Social</h4>
                  <p className="text-sm text-muted-foreground">
                    Aide, formation, relation d'accompagnement
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-primary">E - Entreprenant</h4>
                  <p className="text-sm text-muted-foreground">
                    Leadership, influence, gestion de projets
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-primary">C - Conventionnel</h4>
                  <p className="text-sm text-muted-foreground">
                    Organisation, structure, procédures
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Enrichissement cognitif</AlertTitle>
            <AlertDescription>
              Exemple : Profil Investigateur (I) élevé + Flexibilité cognitive forte 
              → Architecte logiciel. Même profil I avec Contrôle inhibiteur dominant 
              → Chercheur en sécurité.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Section 4: Certification technique */}
      <section id="certification" className="py-16 px-4 md:px-6 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Certification technique professionnelle</h2>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Méthodologie de validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">1. Tests objectifs (Bloc 1)</h4>
                <p className="text-sm text-muted-foreground">
                  10 questions techniques avec pondération élevée (×3) : algorithmique, 
                  SQL, cryptographie, machine learning. Mesure compétences réelles, 
                  pas déclarations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Style cognitif (Bloc 2)</h4>
                <p className="text-sm text-muted-foreground">
                  15 questions sur préférences de travail avec <b>paires antagonistes</b> 
                  (Q12/Q18, Q13/Q20, Q15/Q21, Q17/Q24) pour détecter incohérences.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Scénarios pratiques (Bloc 3)</h4>
                <p className="text-sm text-muted-foreground">
                  5 dilemmes réalistes (charge serveur, vulnérabilité critique, 
                  data cleaning) révélant réflexes décisionnels au-delà des 
                  déclarations abstraites.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">4. Contexte personnel (Bloc 4)</h4>
                <p className="text-sm text-muted-foreground">
                  Questions ouvertes pour affiner diagnostic (motivations, contraintes, 
                  trajectoire).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Certificat blockchain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Votre certificat est hashé (SHA-256) et infalsifiable. 
                Vérification publique via URL unique :
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                https://perspecta.ia-solution.fr/verify/0x3f2a8b...
              </code>
              <p className="text-xs text-muted-foreground mt-4">
                Valable 3 ans. Renouvelable en repassant le test.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 5: Cadre éthique */}
      <section id="ethique" className="py-16 px-4 md:px-6">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Cadre éthique et déontologique</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ce que PERSPECTA n'est PAS</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span>Un outil de recrutement ou d'évaluation de candidats</span>
                  </li>
                  <li className="flex gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span>Un diagnostic médical ou clinique</span>
                  </li>
                  <li className="flex gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span>Une mesure d'intelligence (QI)</span>
                  </li>
                  <li className="flex gap-2">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span>Un outil prédictif de succès professionnel</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Ce que PERSPECTA EST</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Un outil d'orientation personnelle et de réflexion</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Une aide à la compréhension de son fonctionnement cognitif</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Un support pour identifier environnements compatibles</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Un certificat de compétences techniques vérifiable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protection des données (RGPD)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>✓ Vos données sont chiffrées et hébergées en Europe (Supabase)</p>
                <p>✓ Aucune revente de données à des tiers</p>
                <p>✓ Droit d'accès, rectification, suppression exercé à tout moment</p>
                <p>✓ Anonymisation des statistiques d'usage</p>
                <p>✓ Certificat blockchain : hash public, données personnelles privées</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6: Limites et précautions */}
      <section id="limites" className="py-16 px-4 md:px-6 bg-muted/50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Limites et précautions d'usage</h2>
          
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              PERSPECTA est un outil d'orientation, pas un diagnostic définitif. 
              Les résultats doivent être discutés avec un professionnel de l'orientation 
              ou un conseiller RH.
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Biais méthodologiques évités</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Désirabilité sociale</h4>
                <p className="text-muted-foreground">
                  Les paires antagonistes (Q12/Q18, etc.) détectent réponses biaisées 
                  par volonté de bien paraître. Écart &gt; 3 points = incohérence signalée.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Effet Barnum</h4>
                <p className="text-muted-foreground">
                  Éviter descriptions vagues ("vous aimez apprendre") applicables à tous. 
                  PERSPECTA fournit profil différencié basé sur mesures objectives.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Pondération discriminante</h4>
                <p className="text-muted-foreground">
                  Compétences techniques avancées (×3) vs traits génériques (×1). 
                  Valorise compétences réellement discriminantes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ce que PERSPECTA ne peut pas faire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Prédire avec certitude votre réussite dans un métier</p>
              <p>• Remplacer une évaluation pratique (portfolio, coding test)</p>
              <p>• Mesurer toutes les compétences (soft skills, leadership, etc.)</p>
              <p>• Garantir un emploi (matching aide mais ne remplace pas candidature)</p>
              <p>• Évoluer en temps réel (snapshot à un instant T)</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Une méthodologie rigoureuse, des résultats actionnables
          </h2>
          <p className="text-lg opacity-90 mb-8">
            PERSPECTA combine rigueur scientifique et pragmatisme professionnel 
            pour vous donner les clés de votre orientation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/signin">
                Commencer mon bilan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" 
              asChild
            >
              <Link href="/pricing">
                Voir les tarifs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
