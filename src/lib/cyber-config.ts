// Configuration du thème Cyberpunk 2030 pour Next-Bilan
export const cyberpunkConfig = {
  // Palette de couleurs principale
  colors: {
    neon: '#00ff88',
    pink: '#ff00ff',
    blue: '#00ffff',
    purple: '#8b00ff',
    red: '#ff0040',
    orange: '#ff8000',
    green: '#00ff00',
    cyan: '#00e5ff',
    magenta: '#ff00aa',
    lime: '#aaff00',
    indigo: '#4a00ff',
    yellow: '#ffff00',

    // Tons de gris
    deepBlack: '#0a0a0a',
    charcoal: '#1a1a1a',
    gunmetal: '#2a2a2a',
    steel: '#3a3a3a',
    silver: '#e0e0e0',
    lightGray: '#c0c0c0'
  },

  // Configuration des animations
  animations: {
    neonPulse: {
      duration: '2s',
      timing: 'ease-in-out',
      iteration: 'infinite'
    },
    glitch: {
      duration: '0.3s',
      timing: 'ease-in-out',
      iteration: 'infinite'
    },
    hologram: {
      duration: '4s',
      timing: 'ease-in-out',
      iteration: 'infinite'
    },
    scan: {
      duration: '3s',
      timing: 'linear',
      iteration: 'infinite'
    }
  },

  // Configuration des ombres
  shadows: {
    neon: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
    'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
    'neon-blue': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
    cyber: '0 0 30px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.1)',
    'cyber-strong': '0 0 50px rgba(0, 255, 136, 0.8), 0 0 100px rgba(0, 255, 136, 0.6), inset 0 0 30px rgba(0, 255, 136, 0.2)'
  },

  // Configuration des polices
  fonts: {
    mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
    sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
    display: ['Orbitron', 'Rajdhani', 'monospace'],
    neural: ['Space Grotesk', 'Inter', 'sans-serif']
  },

  // Configuration des bordures
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem'
  },

  // Images de fond
  backgrounds: {
    grid: 'linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)',
    radial: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
    hologram: 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1), rgba(0, 255, 136, 0.1))',
    matrix: 'linear-gradient(0deg, transparent 0%, rgba(0, 255, 136, 0.03) 2%, transparent 3%, transparent 97%, rgba(0, 255, 136, 0.03) 98%, transparent 100%)',
    circuit: 'linear-gradient(45deg, transparent 0%, rgba(0, 255, 255, 0.05) 25%, transparent 25%, transparent 75%, rgba(255, 0, 255, 0.05) 75%, transparent 100%)',
    neural: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
  }
}

// Hook pour utiliser la configuration cyberpunk
export function useCyberpunkConfig() {
  return cyberpunkConfig
}

// Fonction pour générer des classes CSS dynamiques
export function generateCyberClasses(config = cyberpunkConfig) {
  return {
    // Classes de couleurs
    'text-neon': `text-[${config.colors.neon}]`,
    'text-pink': `text-[${config.colors.pink}]`,
    'text-blue': `text-[${config.colors.blue}]`,
    'bg-neon': `bg-[${config.colors.neon}]`,
    'bg-gunmetal': `bg-[${config.colors.gunmetal}]`,

    // Classes d'animation
    'animate-neon-pulse': `animate-[neon-pulse_${config.animations.neonPulse.duration}_ease-in-out_infinite]`,

    // Classes de police
    'font-display': `font-family: ${config.fonts.display.join(', ')}`,

    // Classes de bordure
    'rounded-cyber': `rounded-[${config.radius.md}]`
  }
}

// Types TypeScript pour le thème cyberpunk
export interface CyberpunkTheme {
  colors: typeof cyberpunkConfig.colors
  animations: typeof cyberpunkConfig.animations
  shadows: typeof cyberpunkConfig.shadows
  fonts: typeof cyberpunkConfig.fonts
  radius: typeof cyberpunkConfig.radius
  backgrounds: typeof cyberpunkConfig.backgrounds
}

export type CyberColor = keyof typeof cyberpunkConfig.colors
export type CyberAnimation = keyof typeof cyberpunkConfig.animations
export type CyberShadow = keyof typeof cyberpunkConfig.shadows
export type CyberFont = keyof typeof cyberpunkConfig.fonts
export type CyberRadius = keyof typeof cyberpunkConfig.radius
export type CyberBackground = keyof typeof cyberpunkConfig.backgrounds
