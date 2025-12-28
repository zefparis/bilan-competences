"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Target, BarChart3, FileText, Sparkles } from "lucide-react"

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'neon' | 'pink' | 'blue' | 'purple' | 'red' | 'yellow'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function CyberButton({
  children,
  variant = 'neon',
  size = 'md',
  onClick,
  disabled = false
}: CyberButtonProps) {
  const baseClasses = "relative overflow-hidden font-mono uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantClasses = {
    neon: "bg-cyber-gunmetal border border-cyber-neon/50 text-cyber-neon shadow-neon hover:shadow-cyber-strong",
    pink: "bg-cyber-gunmetal border border-cyber-pink/50 text-cyber-pink shadow-neon-pink hover:shadow-neon-pink",
    blue: "bg-cyber-gunmetal border border-cyber-blue/50 text-cyber-blue shadow-neon-blue hover:shadow-neon-blue",
    purple: "bg-cyber-gunmetal border border-cyber-purple/50 text-cyber-purple shadow-neon-purple hover:shadow-neon-purple",
    red: "bg-cyber-gunmetal border border-cyber-red/50 text-cyber-red shadow-neon hover:shadow-cyber-strong",
    yellow: "bg-cyber-gunmetal border border-cyber-yellow/50 text-cyber-yellow shadow-neon hover:shadow-cyber-strong"
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-current/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

interface CyberCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  holographic?: boolean
}

export function CyberCard({
  children,
  className = "",
  glow = false,
  holographic = false
}: CyberCardProps) {
  return (
    <motion.div
      className={`
        bg-gradient-to-br from-cyber-gunmetal/50 to-cyber-steel/30
        border border-cyber-neon/30 backdrop-blur-sm
        rounded-xl p-6 relative overflow-hidden
        ${glow ? 'shadow-cyber animate-cyber-glow' : 'shadow-cyber'}
        ${holographic ? 'hologram-effect' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}

      {/* Effet de grille subtile */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

      {/* Ligne de scan */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
    </motion.div>
  )
}

interface CyberInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  required?: boolean
  className?: string
}

export function CyberInput({
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  className = ""
}: CyberInputProps) {
  return (
    <motion.div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        className={`
          w-full bg-cyber-deep-black border border-cyber-neon/30
          text-cyber-silver placeholder:text-cyber-steel
          focus:border-cyber-neon focus:shadow-neon focus:ring-cyber-neon/20
          transition-all duration-300 rounded-lg p-3 pr-10
          focus:outline-none hover:border-cyber-neon/50
          ${className}
        `}
      />

      {/* Curseur terminal */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="w-1 h-4 bg-cyber-neon terminal-cursor" />
      </div>

      {/* Glow effect au focus */}
      <div className="absolute inset-0 rounded-lg opacity-0 focus-within:opacity-100
                      bg-cyber-neon/5 blur-xl transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}

interface CyberStatProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down' | 'neutral'
  description?: string
}

export function CyberStat({
  title,
  value,
  icon: Icon,
  trend = 'neutral',
  description
}: CyberStatProps) {
  const trendColors = {
    up: 'text-cyber-green',
    down: 'text-cyber-red',
    neutral: 'text-cyber-blue'
  }

  return (
    <motion.div
      className="cyber-stat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-6 h-6 text-cyber-neon" />
        <div className={`text-sm font-mono ${trendColors[trend]}`}>
          {trend === 'up' && '↗'}
          {trend === 'down' && '↘'}
          {trend === 'neutral' && '→'}
        </div>
      </div>

      <div className="cyber-stat-value font-display">
        {value}
      </div>

      <div className="cyber-stat-label">
        {title}
      </div>

      {description && (
        <div className="text-cyber-light-gray text-xs mt-1">
          {description}
        </div>
      )}
    </motion.div>
  )
}

interface CyberProgressProps {
  value: number
  max?: number
  label?: string
  color?: 'neon' | 'pink' | 'blue' | 'purple'
}

export function CyberProgress({
  value,
  max = 100,
  label,
  color = 'neon'
}: CyberProgressProps) {
  const percentage = (value / max) * 100

  const colorClasses = {
    neon: 'bg-cyber-neon',
    pink: 'bg-cyber-pink',
    blue: 'bg-cyber-blue',
    purple: 'bg-cyber-purple'
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-cyber-silver font-mono">{label}</span>
          <span className="text-cyber-neon font-mono">{percentage.toFixed(0)}%</span>
        </div>
      )}

      <div className="cyber-progress">
        <motion.div
          className={`cyber-progress-bar ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

interface CyberBadgeProps {
  children: React.ReactNode
  variant?: 'neon' | 'pink' | 'blue' | 'purple' | 'red' | 'yellow'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CyberBadge({
  children,
  variant = 'neon',
  size = 'md'
}: CyberBadgeProps) {
  const variantClasses = {
    neon: 'bg-cyber-neon/10 border-cyber-neon/50 text-cyber-neon',
    pink: 'bg-cyber-pink/10 border-cyber-pink/50 text-cyber-pink',
    blue: 'bg-cyber-blue/10 border-cyber-blue/50 text-cyber-blue',
    purple: 'bg-cyber-purple/10 border-cyber-purple/50 text-cyber-purple',
    red: 'bg-cyber-red/10 border-cyber-red/50 text-cyber-red',
    yellow: 'bg-cyber-yellow/10 border-cyber-yellow/50 text-cyber-yellow'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <motion.span
      className={`
        inline-flex items-center rounded-full border font-mono uppercase tracking-wider
        ${variantClasses[variant]} ${sizeClasses[size]}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
    >
      {children}
    </motion.span>
  )
}

interface CyberTerminalProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function CyberTerminal({
  title = "TERMINAL",
  children,
  className = ""
}: CyberTerminalProps) {
  return (
    <motion.div
      className={`terminal ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
        </div>
        <span className="text-cyber-silver font-mono text-sm">{title}</span>
      </div>

      <div className="p-4">
        {children}
      </div>
    </motion.div>
  )
}

interface CyberGlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function CyberGlitchText({
  children,
  className = "",
  intensity = 'medium'
}: CyberGlitchTextProps) {
  const intensityClasses = {
    low: 'animate-pulse',
    medium: 'glitch-text',
    high: 'glitch-text animate-pulse'
  }

  return (
    <span
      className={`${intensityClasses[intensity]} ${className}`}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </span>
  )
}
