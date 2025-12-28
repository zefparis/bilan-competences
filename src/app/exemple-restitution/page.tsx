"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Target, Lightbulb, AlertTriangle, TrendingUp, User, Briefcase, CheckCircle } from "lucide-react"

export default function ExempleRestitutionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold text-lg text-primary">
              PERSPECTA
            </Link>
            <Link 
              href="/pricing"
              className="text-sm text-primary hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              Voir les tarifs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-6 border-b border-border/40">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux tarifs
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Exemple de restitution
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Synthèse Stratégique Personnalisée
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Découvrez un aperçu du rapport que vous recevrez après avoir complété votre bilan PERSPECTA. 
            Les données ci-dessous sont fictives et servent uniquement d'illustration.
          </p>
        </div>
      </section>

      {/* Profil fictif */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Identité du profil */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Marie D.</h2>
                <p className="text-muted-foreground">Profil exemple • Cadre en reconversion</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-primary">FCVS</p>
                <p className="text-xs text-muted-foreground mt-1">Code cognitif</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-primary">SIA</p>
                <p className="text-xs text-muted-foreground mt-1">Code RIASEC</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-primary">87%</p>
                <p className="text-xs text-muted-foreground mt-1">Cohérence</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-primary">A+</p>
                <p className="text-xs text-muted-foreground mt-1">Potentiel</p>
              </div>
            </div>
          </div>

          {/* Profil cognitif */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Profil Cognitif</h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">Forme (Structure)</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">Couleur (Créativité)</span>
                  <span className="text-primary">72%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">Volume (Analyse)</span>
                  <span className="text-primary">68%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "68%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">Son (Communication)</span>
                  <span className="text-primary">91%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "91%" }} />
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>Interprétation :</strong> Votre profil révèle une dominante communicationnelle (Son) 
                associée à une forte capacité de structuration (Forme). Cette combinaison est caractéristique 
                des profils capables de traduire des concepts complexes en messages clairs et impactants.
              </p>
            </div>
          </div>

          {/* Profil RIASEC */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Profil RIASEC</h2>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {[
                { code: "R", label: "Réaliste", score: 35 },
                { code: "I", label: "Investigateur", score: 78 },
                { code: "A", label: "Artistique", score: 65 },
                { code: "S", label: "Social", score: 88 },
                { code: "E", label: "Entreprenant", score: 52 },
                { code: "C", label: "Conventionnel", score: 41 },
              ].map((item) => (
                <div key={item.code} className="text-center">
                  <div 
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-lg font-bold mb-2 ${
                      item.score >= 70 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.code}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.score}%</p>
                </div>
              ))}
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>Code dominant : SIA</strong> — Vous êtes naturellement orientée vers l'accompagnement 
                des autres (Social), la recherche de compréhension (Investigateur) et l'expression créative (Artistique). 
                Les métiers de conseil, formation ou coaching correspondent particulièrement à ce profil.
              </p>
            </div>
          </div>

          {/* Synthèse stratégique */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Synthèse Stratégique</h2>
            </div>
            
            <div className="prose prose-sm max-w-none text-foreground">
              <p className="text-muted-foreground leading-relaxed">
                L'analyse croisée de votre profil cognitif et de vos intérêts professionnels révèle un 
                positionnement singulier : vous combinez une capacité naturelle à structurer l'information 
                avec un besoin profond de connexion humaine et d'impact social.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Cette configuration est particulièrement adaptée aux rôles de <strong className="text-foreground">facilitateur, 
                formateur ou consultant</strong>, où votre aptitude à clarifier les enjeux complexes peut 
                servir directement l'accompagnement d'individus ou d'équipes en transformation.
              </p>
            </div>
          </div>

          {/* Environnement idéal */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Environnement Idéal</h2>
            </div>
            
            <ul className="space-y-3">
              {[
                "Structure flexible permettant autonomie et initiative",
                "Interactions régulières avec des interlocuteurs variés",
                "Projets à dimension humaine et impact mesurable",
                "Équilibre entre réflexion stratégique et mise en œuvre concrète",
                "Culture d'entreprise valorisant l'écoute et la collaboration",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Points de vigilance */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold text-foreground">Points de Vigilance</h2>
            </div>
            
            <ul className="space-y-3">
              {[
                "Tendance à surinvestir émotionnellement dans les projets collectifs",
                "Risque de frustration dans des environnements trop rigides ou hiérarchiques",
                "Besoin de reconnaissance qui peut créer une dépendance au feedback externe",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Leviers de croissance */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Leviers de Croissance</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Développer l'assertivité",
                  description: "Affirmer vos positions sans craindre le conflit pour gagner en leadership.",
                },
                {
                  title: "Structurer votre expertise",
                  description: "Formaliser vos méthodes pour les rendre transmissibles et valorisables.",
                },
                {
                  title: "Élargir votre réseau",
                  description: "Cultiver des connexions stratégiques au-delà de votre cercle habituel.",
                },
                {
                  title: "Accepter l'imperfection",
                  description: "Avancer sans attendre la solution parfaite pour accélérer vos projets.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Obtenez votre propre analyse
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Ce rapport exemple vous donne un aperçu de la profondeur d'analyse que vous recevrez. 
              Votre synthèse sera entièrement personnalisée selon vos résultats.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Débloquer mon bilan complet — 49 €
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border mt-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 PERSPECTA. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="/cgu" className="hover:text-foreground transition-colors">
              CGU
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
