"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Eye, Layers, Compass, Check, Sun, Moon } from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("perspecta-theme")
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("perspecta-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  // Theme colors
  const theme = {
    bg: darkMode ? "#0F0F0F" : "#FAF8F5",
    bgAlt: darkMode ? "#1A1A1A" : "#F5F2EE",
    bgCard: darkMode ? "#1A1A1A" : "#FFFFFF",
    text: darkMode ? "#E8E6E3" : "#2C2C2C",
    textMuted: darkMode ? "#999999" : "#6B6B6B",
    textFaint: darkMode ? "#666666" : "#999999",
    border: darkMode ? "#2A2A2A" : "#E8E4DE",
    accent: "#8C5A2B",
    accentHover: "#7A4E25",
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
      {/* Header - Minimaliste */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300"
        style={{ backgroundColor: `${theme.bg}F2`, borderColor: theme.border }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-semibold text-xl tracking-tight" style={{ color: theme.text }}>PERSPECTA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#methode" className="text-sm transition-colors hover:opacity-80" style={{ color: theme.textMuted }}>
                Méthode
              </a>
              <a href="#modules" className="text-sm transition-colors hover:opacity-80" style={{ color: theme.textMuted }}>
                Modules
              </a>
              <a href="#restitution" className="text-sm transition-colors hover:opacity-80" style={{ color: theme.textMuted }}>
                Restitution
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full transition-colors"
                style={{ backgroundColor: theme.bgAlt }}
                aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" style={{ color: theme.accent }} />
                ) : (
                  <Moon className="w-4 h-4" style={{ color: theme.accent }} />
                )}
              </button>

              <Link 
                href="/pricing" 
                className="text-sm px-4 py-2 border rounded transition-colors hover:opacity-80"
                style={{ color: theme.text, borderColor: theme.border }}
              >
                Tarifs
              </Link>
              <Link 
                href="/auth/login" 
                className="text-sm px-4 py-2 border rounded transition-colors hover:opacity-80"
                style={{ color: theme.text, borderColor: theme.border }}
              >
                Connexion
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full transition-colors"
                style={{ backgroundColor: theme.bgAlt }}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" style={{ color: theme.accent }} />
                ) : (
                  <Moon className="w-4 h-4" style={{ color: theme.accent }} />
                )}
              </button>
              <button 
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="w-5 h-0.5 mb-1" style={{ backgroundColor: theme.textMuted }}></div>
                <div className="w-5 h-0.5 mb-1" style={{ backgroundColor: theme.textMuted }}></div>
                <div className="w-5 h-0.5" style={{ backgroundColor: theme.textMuted }}></div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t mt-4" style={{ borderColor: theme.border }}>
              <div className="flex flex-col gap-4">
                <a href="#methode" className="text-sm" style={{ color: theme.textMuted }}>Méthode</a>
                <a href="#modules" className="text-sm" style={{ color: theme.textMuted }}>Modules</a>
                <a href="#restitution" className="text-sm" style={{ color: theme.textMuted }}>Restitution</a>
                <Link href="/auth/login" className="text-sm" style={{ color: theme.text }}>Connexion</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('/image/unnamed%20(1).jpg')`,
          }}
        >
          {/* Overlay dynamique pour la lisibilité */}
          <div 
            className="absolute inset-0 transition-colors duration-300"
            style={{ 
              backgroundColor: darkMode ? 'rgba(15, 15, 15, 0.75)' : 'rgba(250, 248, 245, 0.85)',
              backgroundImage: darkMode 
                ? 'linear-gradient(to right, rgba(15, 15, 15, 0.9) 0%, rgba(15, 15, 15, 0.4) 100%)'
                : 'linear-gradient(to right, rgba(250, 248, 245, 0.95) 0%, rgba(250, 248, 245, 0.6) 100%)'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-widest font-medium" style={{ color: theme.accent }}>
              Bilan de compétences cognitif
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight" style={{ color: theme.text }}>
              Révéler les mécanismes
              <br />
              <span style={{ color: theme.textMuted }}>qui façonnent votre potentiel</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed font-light" style={{ color: theme.textMuted }}>
              PERSPECTA analyse en profondeur les schémas cognitifs qui influencent 
              vos décisions, votre manière d'apprendre et votre évolution professionnelle. 
              Une approche rigoureuse pour une compréhension durable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded transition-colors"
                style={{ backgroundColor: theme.accent }}
              >
                Démarrer mon analyse
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#methode"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border rounded transition-colors hover:opacity-80"
                style={{ 
                  borderColor: theme.border, 
                  color: theme.textMuted,
                  backgroundColor: `${theme.bg}80` // semi-transparent background for button
                }}
              >
                Découvrir la méthode
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Ce que nous faisons */}
      <section id="methode" className="py-24 px-6 border-t transition-colors duration-300" style={{ borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Notre approche</p>
            <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: theme.text }}>
              Une méthodologie en trois temps
            </h2>
            <p className="max-w-xl leading-relaxed" style={{ color: theme.textMuted }}>
              Chaque étape de notre processus a été conçue pour garantir 
              la fiabilité et la profondeur de l'analyse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Bloc 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
                <Eye className="w-5 h-5" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-xl font-medium" style={{ color: theme.text }}>Observation structurée</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textMuted }}>
                Nous recueillons des données objectives à travers des exercices cognitifs calibrés.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: theme.textMuted }}>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Tests cognitifs ciblés
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Mesure de signaux comportementaux
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Données reproductibles
                </li>
              </ul>
            </div>

            {/* Bloc 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
                <Layers className="w-5 h-5" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-xl font-medium" style={{ color: theme.text }}>Analyse en profondeur</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textMuted }}>
                Les indicateurs sont croisés pour faire émerger des patterns significatifs.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: theme.textMuted }}>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Croisement multi-dimensionnel
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Schémas cognitifs dominants
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Signaux faibles révélés
                </li>
              </ul>
            </div>

            {/* Bloc 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
                <Compass className="w-5 h-5" style={{ color: theme.accent }} />
              </div>
              <h3 className="text-xl font-medium" style={{ color: theme.text }}>Lecture stratégique</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textMuted }}>
                Une synthèse actionnable qui éclaire vos choix professionnels.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: theme.textMuted }}>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Atouts invisibles révélés
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Zones de friction identifiées
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: theme.accent }}></span>
                  Leviers de progression
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Pourquoi c'est différent */}
      <section className="py-24 px-6 border-t transition-colors duration-300" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Notre différence</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ color: theme.text }}>
              Au-delà des approches classiques
            </h2>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.accent }}>Ce que nous ne faisons pas</div>
                <p className="font-medium" style={{ color: theme.text }}>Lister des compétences</p>
              </div>
              <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.accent }}>Ce que nous ne faisons pas</div>
                <p className="font-medium" style={{ color: theme.text }}>Un test de personnalité</p>
              </div>
              <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: theme.accent }}>Ce que nous ne faisons pas</div>
                <p className="font-medium" style={{ color: theme.text }}>Donner une note</p>
              </div>
            </div>

            <div className="p-8 border-l-4 rounded-r transition-colors duration-300" style={{ borderLeftColor: theme.accent, backgroundColor: theme.bgCard }}>
              <p className="text-lg md:text-xl leading-relaxed font-light italic" style={{ color: theme.text }}>
                "Deux personnes peuvent avoir les mêmes compétences visibles. 
                Leur efficacité réelle dépend pourtant de mécanismes cognitifs très différents."
              </p>
              <p className="mt-4" style={{ color: theme.textMuted }}>
                C'est précisément ce que PERSPECTA analyse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Modules */}
      <section id="modules" className="py-24 px-6 border-t transition-colors duration-300" style={{ borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Parcours d'analyse</p>
            <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: theme.text }}>
              Quatre modules complémentaires
            </h2>
            <p className="max-w-xl leading-relaxed" style={{ color: theme.textMuted }}>
              Chaque module explore une dimension spécifique de votre fonctionnement. 
              L'ensemble forme une cartographie complète de votre potentiel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded hover:shadow-sm transition-all duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium" style={{ color: theme.text }}>Profil RIASEC</h3>
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: theme.accent }}>Module 1</span>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: theme.textMuted }}>
                Identification de vos intérêts professionnels dominants selon le modèle de Holland, 
                référence internationale en orientation.
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: theme.accent }}>
                <Check className="w-3 h-3" />
                <span>Environ 15 minutes</span>
              </div>
            </div>

            <div className="p-6 border rounded hover:shadow-sm transition-all duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium" style={{ color: theme.text }}>Analyse Cognitive</h3>
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: theme.accent }}>Module 2</span>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: theme.textMuted }}>
                Cartographie de vos schémas cognitifs selon quatre axes : 
                structure, intuition, action et relation.
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: theme.accent }}>
                <Check className="w-3 h-3" />
                <span>Environ 10 minutes</span>
              </div>
            </div>

            <div className="p-6 border rounded hover:shadow-sm transition-all duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium" style={{ color: theme.text }}>Parcours & Expériences</h3>
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: theme.accent }}>Module 3</span>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: theme.textMuted }}>
                Structuration de votre trajectoire professionnelle pour identifier 
                les patterns récurrents et les moments clés.
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: theme.accent }}>
                <Check className="w-3 h-3" />
                <span>Environ 20 minutes</span>
              </div>
            </div>

            <div className="p-6 border rounded hover:shadow-sm transition-all duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium" style={{ color: theme.text }}>Synthèse Stratégique</h3>
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: theme.accent }}>Module 4</span>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: theme.textMuted }}>
                Croisement intelligent des données recueillies pour générer 
                une analyse personnalisée et des recommandations concrètes.
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: theme.accent }}>
                <Check className="w-3 h-3" />
                <span>Génération automatique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Exemple de restitution */}
      <section id="restitution" className="py-24 px-6 border-t transition-colors duration-300" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Votre restitution</p>
            <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: theme.text }}>
              Un rapport complet et actionnable
            </h2>
            <p className="leading-relaxed" style={{ color: theme.textMuted }}>
              Pas un simple score, mais une analyse approfondie de votre fonctionnement 
              avec des recommandations concrètes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                <h4 className="font-medium" style={{ color: theme.text }}>Archétype cognitif dominant</h4>
              </div>
              <p className="text-sm pl-6 leading-relaxed" style={{ color: theme.textMuted }}>
                Identification de votre mode de fonctionnement principal, ses forces naturelles 
                et ses implications dans votre vie professionnelle.
              </p>
            </div>

            <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                <h4 className="font-medium" style={{ color: theme.text }}>Forces et zones de vigilance</h4>
              </div>
              <p className="text-sm pl-6 leading-relaxed" style={{ color: theme.textMuted }}>
                Vos atouts naturels mis en lumière, ainsi que les situations 
                qui peuvent générer de la friction ou de l'inconfort.
              </p>
            </div>

            <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                <h4 className="font-medium" style={{ color: theme.text }}>Environnement professionnel idéal</h4>
              </div>
              <p className="text-sm pl-6 leading-relaxed" style={{ color: theme.textMuted }}>
                Les types d'organisations, de rôles et de contextes dans lesquels 
                vous êtes naturellement performant et épanoui.
              </p>
            </div>

            <div className="p-6 border rounded transition-colors duration-300" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                <h4 className="font-medium" style={{ color: theme.text }}>Leviers de développement</h4>
              </div>
              <p className="text-sm pl-6 leading-relaxed" style={{ color: theme.textMuted }}>
                Des axes concrets et personnalisés pour faire évoluer 
                votre trajectoire professionnelle de manière durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 border-t transition-colors duration-300" style={{ borderColor: theme.border }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: theme.text }}>
            Prêt à explorer votre potentiel ?
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: theme.textMuted }}>
            L'analyse complète prend environ 45 minutes. 
            Vos résultats sont disponibles immédiatement après chaque module.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-medium rounded transition-colors"
              style={{ backgroundColor: theme.accent }}
            >
              Démarrer mon analyse
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs mt-6" style={{ color: theme.textFaint }}>
            Aucun engagement. Vos données restent confidentielles.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t transition-colors duration-300" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo et description */}
            <div>
              <span className="font-semibold text-lg" style={{ color: theme.text }}>PERSPECTA</span>
              <p className="mt-2 text-sm" style={{ color: theme.textMuted }}>
                Plateforme d'évaluation cognitive et de bilan de compétences.
              </p>
            </div>

            {/* Liens légaux */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: theme.text }}>Informations légales</h4>
              <div className="flex flex-col gap-2 text-sm" style={{ color: theme.textMuted }}>
                <Link href="/mentions-legales" className="hover:opacity-80 transition-opacity">Mentions légales</Link>
                <Link href="/politique-confidentialite" className="hover:opacity-80 transition-opacity">Politique de confidentialité</Link>
                <Link href="/cgu" className="hover:opacity-80 transition-opacity">Conditions générales d'utilisation</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: theme.text }}>Contact</h4>
              <div className="flex flex-col gap-2 text-sm" style={{ color: theme.textMuted }}>
                <p>ia-solution</p>
                <p>Alès, France</p>
                <a href="mailto:contact@ia-solution.fr" className="hover:opacity-80 transition-opacity" style={{ color: theme.accent }}>
                  contact@ia-solution.fr
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: theme.border }}>
            <p className="text-xs" style={{ color: theme.textFaint }}>
              © 2025 PERSPECTA. Tous droits réservés.
            </p>
            <p className="text-xs" style={{ color: theme.textFaint }}>
              Développé par <a href="mailto:contact@ia-solution.fr" className="hover:underline" style={{ color: theme.accent }}>ia-solution</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
