"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Zap,
  Target,
  BarChart3,
  FileText,
  Sparkles,
  ChevronRight,
  Code,
  Database,
  Shield,
  Users,
  TrendingUp,
  Cpu
} from "lucide-react"
import Link from "next/link"
import { CyberButton, CyberCard, CyberStat, CyberBadge, CyberTerminal } from "@/components/ui/cyber-ui"

export default function CyberHomePage() {
  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "2,847",
      icon: Users,
      trend: "up" as const,
      description: "+12% ce mois"
    },
    {
      title: "Bilans Générés",
      value: "15,392",
      icon: FileText,
      trend: "up" as const,
      description: "+8% cette semaine"
    },
    {
      title: "Taux de Réussite",
      value: "94.2%",
      icon: TrendingUp,
      trend: "up" as const,
      description: "+2.1% vs dernier mois"
    },
    {
      title: "Modules IA",
      value: "12",
      icon: Cpu,
      trend: "neutral" as const,
      description: "Tous opérationnels"
    }
  ]

  const modules = [
    {
      icon: Brain,
      title: "Analyse Cognitive",
      description: "Évaluation approfondie des compétences et aptitudes",
      color: "neon" as const,
      features: ["Test RIASEC", "Analyse de personnalité", "Recommandations personnalisées"]
    },
    {
      icon: Target,
      title: "Objectifs Carrière",
      description: "Définition et suivi des objectifs professionnels",
      color: "pink" as const,
      features: ["Plan d'action", "Suivi mensuel", "Réajustements dynamiques"]
    },
    {
      icon: BarChart3,
      title: "Métriques Performance",
      description: "Analyse quantitative des progrès réalisés",
      color: "blue" as const,
      features: ["KPIs personnalisés", "Rapports détaillés", "Tendances prédictives"]
    },
    {
      icon: Database,
      title: "Base de Connaissances",
      description: "Accès à une bibliothèque de ressources métier",
      color: "purple" as const,
      features: ["Articles experts", "Études de cas", "Guides pratiques"]
    }
  ]

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Développeuse Senior",
      content: "Next-Bilan m'a permis de clarifier ma trajectoire professionnelle. Les insights sont incroyablement précis.",
      rating: 5
    },
    {
      name: "Marcus T.",
      role: "Chef de Projet",
      content: "L'interface est futuriste et intuitive. Les recommandations ont boosté ma carrière de 200%.",
      rating: 5
    },
    {
      name: "Elena R.",
      role: "Consultante RH",
      content: "Un outil révolutionnaire pour le développement professionnel. L'IA est bluffante de précision.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-cyber-grid relative overflow-hidden">
      {/* Effets de fond cyberpunk */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl animate-hologram" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-pink/5 rounded-full blur-3xl animate-hologram" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyber-blue/5 rounded-full blur-3xl animate-hologram" style={{ animationDelay: '4s' }} />

        {/* Lignes de données animées */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-neon to-transparent animate-data-stream" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-pink to-transparent animate-data-stream" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="cyber-nav sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-cyber-neon rounded-lg flex items-center justify-center animate-neon-pulse">
                <Brain className="w-5 h-5 text-cyber-deep-black" />
              </div>
              <span className="text-xl font-display font-bold text-cyber-neon">Next-Bilan</span>
            </motion.div>

            <motion.div
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#modules" className="cyber-nav-link">Modules</a>
              <a href="#stats" className="cyber-nav-link">Statistiques</a>
              <a href="#testimonials" className="cyber-nav-link">Témoignages</a>
              <Link href="/auth/login">
                <CyberButton size="sm">Connexion</CyberButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CyberBadge variant="neon" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                IA de Nouvelle Génération
              </CyberBadge>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-display font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-cyber-neon">Next-</span>
              <span className="text-cyber-blue">Bilan</span>
              <br />
              <span className="text-4xl md:text-6xl text-cyber-silver font-mono">
                Bilan de Compétences 2030
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-cyber-light-gray mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Révolutionnez votre carrière avec notre plateforme IA de nouvelle génération.
              Analyse cognitive avancée, objectifs personnalisés et métriques prédictives
              pour une trajectoire professionnelle optimale.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/auth/login">
                <CyberButton size="lg" variant="neon">
                  Commencer Maintenant
                  <ChevronRight className="w-5 h-5 ml-2" />
                </CyberButton>
              </Link>
              <CyberButton size="lg" variant="purple">
                <Code className="w-5 h-5 mr-2" />
                Démo Interactive
              </CyberButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              <span className="text-cyber-neon">Métriques</span> en Temps Réel
            </h2>
            <p className="text-cyber-light-gray max-w-2xl mx-auto">
              Suivez l'impact de Next-Bilan sur des milliers de parcours professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CyberStat {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              <span className="text-cyber-pink">Modules</span> IA Avancés
            </h2>
            <p className="text-cyber-light-gray max-w-2xl mx-auto">
              Chaque module utilise des algorithmes de machine learning de dernière génération
              pour des analyses personnalisées et prédictives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CyberCard glow holographic className="h-full">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-cyber-${module.color}/10 border border-cyber-${module.color}/30`}>
                      <module.icon className={`w-8 h-8 text-cyber-${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-cyber-silver mb-2">
                        {module.title}
                      </h3>
                      <p className="text-cyber-light-gray mb-4">
                        {module.description}
                      </p>
                      <div className="space-y-2">
                        {module.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-cyber-neon rounded-full animate-neon-pulse" />
                            <span className="text-sm text-cyber-silver font-mono">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Terminal */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CyberTerminal title="DEMO INTERACTIVE - ANALYSE RIASEC">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-neon">$</span>
                  <span className="text-cyber-cyan">next-bilan analyze --profile</span>
                </div>
                <div className="text-cyber-green">
                  ✓ Analyse cognitive initialisée...
                </div>
                <div className="text-cyber-blue">
                  ✓ Test RIASEC en cours...
                </div>
                <div className="text-cyber-purple">
                  ✓ Profil dominant: Investigateur (I) - 85%
                </div>
                <div className="text-cyber-pink">
                  ✓ Recommandations générées: 12 carrières potentielles
                </div>
                <div className="text-cyber-neon animate-neon-pulse">
                  ✓ Analyse terminée - Prêt pour l'action !
                </div>
              </div>
            </CyberTerminal>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              <span className="text-cyber-blue">Ils nous font</span> confiance
            </h2>
            <p className="text-cyber-light-gray max-w-2xl mx-auto">
              Découvrez comment Next-Bilan transforme les parcours professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CyberCard>
                  <div className="mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-cyber-neon animate-neon-pulse">★</span>
                    ))}
                  </div>
                  <p className="text-cyber-light-gray mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-display font-bold text-cyber-silver">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-cyber-steel font-mono">
                      {testimonial.role}
                    </div>
                  </div>
                </CyberCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              <span className="text-cyber-neon">Prêt à révolutionner</span>
              <br />
              <span className="text-cyber-pink">votre carrière ?</span>
            </h2>
            <p className="text-cyber-light-gray mb-8">
              Rejoignez des milliers de professionnels qui ont transformé leur trajectoire
              avec Next-Bilan. L'avenir professionnel commence maintenant.
            </p>
            <Link href="/auth/login">
              <CyberButton size="lg" variant="neon">
                <Zap className="w-5 h-5 mr-2" />
                Lancer mon bilan
              </CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyber-neon/20 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center space-x-2 mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-cyber-neon rounded-lg flex items-center justify-center animate-neon-pulse">
                <Brain className="w-5 h-5 text-cyber-deep-black" />
              </div>
              <span className="text-xl font-display font-bold text-cyber-neon">Next-Bilan</span>
            </motion.div>

            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-cyber-steel text-sm">
                © 2030 Next-Bilan. Tous droits réservés.
              </p>
              <p className="text-cyber-light-gray text-xs mt-1">
                Powered by IA de nouvelle génération
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
