"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Target,
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Shield,
  Database
} from "lucide-react"
import Link from "next/link"
import { CyberButton, CyberCard, CyberStat, CyberProgress, CyberBadge, CyberTerminal } from "@/components/ui/cyber-ui"

export default function CyberDashboard() {
  // Données simulées - à remplacer par les vraies données utilisateur
  const userStats = {
    completionRate: 75,
    modulesCompleted: 3,
    totalModules: 5,
    lastActivity: "2024-01-15",
    recommendations: 8
  }

  const recentModules = [
    {
      id: "parcours",
      title: "Parcours de Vie",
      status: "completed",
      progress: 100,
      icon: Calendar,
      color: "neon" as const,
      description: "Timeline interactive créée"
    },
    {
      id: "experiences",
      title: "Expériences STAR",
      status: "completed",
      progress: 100,
      icon: Target,
      color: "pink" as const,
      description: "3 expériences analysées"
    },
    {
      id: "valeurs",
      title: "Tri des Valeurs",
      status: "in_progress",
      progress: 85,
      icon: Brain,
      color: "blue" as const,
      description: "Top 5 valeurs défini"
    },
    {
      id: "riasec",
      title: "Test RIASEC",
      status: "pending",
      progress: 0,
      icon: BarChart3,
      color: "purple" as const,
      description: "Test non commencé"
    },
    {
      id: "synthese",
      title: "Synthèse Finale",
      status: "locked",
      progress: 0,
      icon: FileText,
      color: "orange" as const,
      description: "PDF généré automatiquement"
    }
  ]

  const recommendations = [
    {
      id: 1,
      title: "Améliorer vos compétences techniques",
      description: "Considérez une formation en React avancé pour booster votre profil",
      priority: "high" as const,
      category: "Formation"
    },
    {
      id: 2,
      title: "Développer votre réseau professionnel",
      description: "Participez à au moins 2 événements networking ce trimestre",
      priority: "medium" as const,
      category: "Réseau"
    },
    {
      id: 3,
      title: "Réévaluer vos objectifs à court terme",
      description: "Vos objectifs actuels pourraient être ajustés selon vos nouvelles valeurs",
      priority: "low" as const,
      category: "Objectifs"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-cyber-green" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-cyber-blue animate-pulse" />
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-cyber-yellow" />
      case 'locked':
        return <Shield className="w-5 h-5 text-cyber-steel" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string): 'neon' | 'pink' | 'blue' | 'purple' | 'red' | 'yellow' => {
    switch (status) {
      case 'completed':
        return 'neon'
      case 'in_progress':
        return 'blue'
      case 'pending':
        return 'yellow'
      case 'locked':
        return 'purple'
      default:
        return 'neon'
    }
  }

  return (
    <div className="cyber-dashboard">
      {/* Header */}
      <header className="cyber-nav">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 bg-cyber-neon rounded-xl flex items-center justify-center animate-neon-pulse">
                <Brain className="w-6 h-6 text-cyber-deep-black" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-cyber-neon">Dashboard</h1>
                <p className="text-cyber-light-gray text-sm font-mono">Bienvenue dans votre centre de contrôle</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CyberBadge variant="neon">
                <Zap className="w-4 h-4 mr-1" />
                Niveau IA: Expert
              </CyberBadge>
              <div className="text-right">
                <div className="text-cyber-silver font-mono text-sm">Dernière activité</div>
                <div className="text-cyber-neon text-xs">{userStats.lastActivity}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="cyber-content">
        {/* Stats Overview */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <CyberStat
              title="Progression Totale"
              value={`${userStats.completionRate}%`}
              icon={TrendingUp}
              trend="up"
              description="Objectif: 100%"
            />
            <CyberStat
              title="Modules Terminés"
              value={`${userStats.modulesCompleted}/${userStats.totalModules}`}
              icon={CheckCircle}
              trend="up"
              description="En cours: 1"
            />
            <CyberStat
              title="Recommandations"
              value={userStats.recommendations}
              icon={Target}
              trend="neutral"
              description="Actions prioritaires"
            />
            <CyberStat
              title="Score IA"
              value="94.2%"
              icon={Brain}
              trend="up"
              description="Précision des analyses"
            />
          </div>

          {/* Progress Bar */}
          <CyberCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-cyber-neon">
                Progression Globale du Bilan
              </h3>
              <CyberBadge variant="neon">{userStats.completionRate}%</CyberBadge>
            </div>
            <CyberProgress value={userStats.completionRate} label="Bilan de Compétences" />
          </CyberCard>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules Section */}
          <motion.section
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-display font-bold text-cyber-neon mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3" />
              Modules du Bilan
            </h2>

            <div className="space-y-4">
              {recentModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CyberCard glow={module.status === 'in_progress'}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-cyber-${module.color}/10 border border-cyber-${module.color}/30`}>
                          <module.icon className={`w-6 h-6 text-cyber-${module.color}`} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-cyber-silver">
                            {module.title}
                          </h3>
                          <p className="text-cyber-light-gray text-sm">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {getStatusIcon(module.status)}
                        <div className="text-right">
                          <div className="text-cyber-neon font-mono text-sm">
                            {module.progress}%
                          </div>
                          <CyberProgress value={module.progress} max={100} />
                        </div>
                        <Link href={`/dashboard/${module.id}`}>
                          <CyberButton
                            size="sm"
                            variant={getStatusColor(module.status)}
                            disabled={module.status === 'locked'}
                          >
                            {module.status === 'completed' ? 'Voir' :
                             module.status === 'in_progress' ? 'Continuer' :
                             module.status === 'pending' ? 'Commencer' : 'Verrouillé'}
                          </CyberButton>
                        </Link>
                      </div>
                    </div>
                  </CyberCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Sidebar */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* AI Assistant Terminal */}
            <CyberTerminal title="ASSISTANT IA - ANALYSES EN COURS" className="mb-6">
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse" />
                  <span className="text-cyber-cyan">Analyse RIASEC en cours...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyber-green rounded-full" />
                  <span className="text-cyber-green">Profil carrière généré</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyber-yellow rounded-full animate-pulse" />
                  <span className="text-cyber-yellow">Optimisation recommandations...</span>
                </div>
                <div className="mt-4 p-2 bg-cyber-neon/10 border border-cyber-neon/30 rounded">
                  <span className="text-cyber-neon text-xs">
                    💡 Conseil: Vos compétences techniques sont un atout majeur pour une évolution vers des rôles de lead technique.
                  </span>
                </div>
              </div>
            </CyberTerminal>

            {/* Recommendations */}
            <CyberCard className="mb-6">
              <h3 className="text-lg font-display font-bold text-cyber-pink mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Recommandations IA
              </h3>

              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    className="p-3 border border-cyber-neon/20 rounded-lg hover:border-cyber-neon/40 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-mono text-cyber-silver text-sm font-semibold">
                        {rec.title}
                      </h4>
                      <CyberBadge
                        variant={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'yellow' : 'blue'}
                        size="sm"
                      >
                        {rec.priority}
                      </CyberBadge>
                    </div>
                    <p className="text-cyber-light-gray text-xs mb-2">
                      {rec.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyber-steel text-xs font-mono">
                        {rec.category}
                      </span>
                      <CyberButton size="sm" variant="neon">
                        Voir
                      </CyberButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CyberCard>

            {/* Quick Actions */}
            <CyberCard>
              <h3 className="text-lg font-display font-bold text-cyber-blue mb-4">
                Actions Rapides
              </h3>

              <div className="space-y-3">
                <CyberButton variant="neon" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Générer Rapport PDF
                </CyberButton>

                <CyberButton variant="pink" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Partager avec Mentor
                </CyberButton>

                <CyberButton variant="purple" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Planifier Suivi
                </CyberButton>
              </div>
            </CyberCard>
          </motion.section>
        </div>

        {/* Bottom Section - Activity Feed */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CyberCard>
            <h3 className="text-lg font-display font-bold text-cyber-cyan mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Activité Récente
            </h3>

            <div className="space-y-4">
              {[
                { action: "Test RIASEC complété", time: "2h ago", type: "completion" },
                { action: "Top 5 valeurs défini", time: "1j ago", type: "progress" },
                { action: "3 expériences STAR ajoutées", time: "2j ago", type: "creation" },
                { action: "Timeline parcours créée", time: "3j ago", type: "creation" },
                { action: "Session bilan démarrée", time: "1sem ago", type: "start" }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-3 border border-cyber-neon/10 rounded-lg hover:border-cyber-neon/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'completion' ? 'bg-cyber-green' :
                    activity.type === 'progress' ? 'bg-cyber-blue' :
                    activity.type === 'creation' ? 'bg-cyber-pink' : 'bg-cyber-purple'
                  } animate-pulse`} />
                  <span className="text-cyber-silver flex-1">{activity.action}</span>
                  <span className="text-cyber-steel text-sm font-mono">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </CyberCard>
        </motion.section>
      </div>
    </div>
  )
}
