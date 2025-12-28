"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Brain,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Zap,
  Shield,
  Fingerprint
} from "lucide-react"
import Link from "next/link"
import { CyberButton, CyberCard, CyberInput, CyberBadge, CyberTerminal } from "@/components/ui/cyber-ui"

export default function CyberAuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.error) {
          throw new Error("Identifiants incorrects")
        } else {
          router.push("/dashboard")
        }
      } else {
        // Simulation d'inscription - à remplacer par vraie API
        console.log("Inscription:", formData)
        setIsLogin(true)
        // Après inscription réussie, basculer sur connexion
      }
    } catch (error) {
      console.error("Erreur d'authentification:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const matrixBackground = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute text-cyber-neon opacity-10 text-xs font-mono animate-matrix-fall"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}
    >
      {Math.random() > 0.5 ? '1' : '0'}
    </div>
  ))

  return (
    <div className="min-h-screen bg-cyber-grid relative overflow-hidden flex items-center justify-center p-6">
      {/* Fond animé cyberpunk */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl animate-hologram" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-pink/5 rounded-full blur-3xl animate-hologram" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyber-blue/5 rounded-full blur-3xl animate-hologram" style={{ animationDelay: '4s' }} />

        {/* Lignes de données */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-neon to-transparent animate-data-stream" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-pink to-transparent animate-data-stream" style={{ animationDelay: '1s' }} />

        {/* Code matrix en arrière-plan */}
        {matrixBackground}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-cyber-neon rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-cyber animate-cyber-glow">
              <Brain className="w-10 h-10 text-cyber-deep-black" />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-display font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-cyber-neon">Next-</span>
            <span className="text-cyber-blue">Bilan</span>
          </motion.h1>

          <motion.p
            className="text-cyber-light-gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isLogin ? "Accès à votre centre de contrôle" : "Créer votre profil IA"}
          </motion.p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CyberCard className="p-8">
            <div className="flex justify-center mb-6">
              <div className="flex bg-cyber-gunmetal rounded-lg p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                    isLogin
                      ? 'bg-cyber-neon text-cyber-deep-black shadow-neon'
                      : 'text-cyber-silver hover:text-cyber-neon'
                  }`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                    !isLogin
                      ? 'bg-cyber-neon text-cyber-deep-black shadow-neon'
                      : 'text-cyber-silver hover:text-cyber-neon'
                  }`}
                >
                  Inscription
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CyberInput
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
                    required={!isLogin}
                  />
                  <CyberInput
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
                    required={!isLogin}
                  />
                </motion.div>
              )}

              <CyberInput
                type="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                required
              />

              <div className="relative">
                <CyberInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-steel hover:text-cyber-neon transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CyberButton
                  type="submit"
                  variant="neon"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cyber-deep-black border-t-transparent rounded-full animate-spin mr-2" />
                      {isLogin ? "Connexion..." : "Création..."}
                    </>
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Se connecter
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4 mr-2" />
                          Créer un compte
                        </>
                      )}
                    </>
                  )}
                </CyberButton>
              </motion.div>
            </form>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-cyber-neon/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-cyber-neon/10 rounded-lg flex items-center justify-center mx-auto">
                    <Shield className="w-4 h-4 text-cyber-neon" />
                  </div>
                  <div className="text-xs text-cyber-steel font-mono">Sécurisé</div>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-cyber-blue/10 rounded-lg flex items-center justify-center mx-auto">
                    <Fingerprint className="w-4 h-4 text-cyber-blue" />
                  </div>
                  <div className="text-xs text-cyber-steel font-mono">Biométrique</div>
                </div>
                <div className="space-y-2">
                  <div className="w-8 h-8 bg-cyber-pink/10 rounded-lg flex items-center justify-center mx-auto">
                    <Zap className="w-4 h-4 text-cyber-pink" />
                  </div>
                  <div className="text-xs text-cyber-steel font-mono">IA Avancée</div>
                </div>
              </div>
            </div>
          </CyberCard>
        </motion.div>

        {/* Demo Terminal */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CyberTerminal title="SYSTÈME IA - STATUT">
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-cyber-cyan">Authentification:</span>
                <span className="text-cyber-green">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cyber-cyan">Chiffrement:</span>
                <span className="text-cyber-green">AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cyber-cyan">IA Status:</span>
                <span className="text-cyber-neon animate-neon-pulse">ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cyber-cyan">Sessions:</span>
                <span className="text-cyber-yellow">2,847</span>
              </div>
            </div>
          </CyberTerminal>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-cyber-steel text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>© 2030 Next-Bilan. Système IA de nouvelle génération.</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <CyberBadge variant="neon" size="sm">Sécurisé</CyberBadge>
            <CyberBadge variant="blue" size="sm">RGPD Compliant</CyberBadge>
            <CyberBadge variant="purple" size="sm">IA Certifiée</CyberBadge>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
