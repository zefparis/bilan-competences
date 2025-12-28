/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			// Palette Cyberpunk 2030 Complète
  			cyber: {
  				// Couleurs de base
  				neon: '#00ff88',
  				pink: '#ff00ff',
  				blue: '#00ffff',
  				purple: '#8b00ff',
  				yellow: '#ffff00',
  				red: '#ff0040',
  				orange: '#ff8000',
  				green: '#00ff00',
  				cyan: '#00e5ff',
  				magenta: '#ff00aa',
  				lime: '#aaff00',
  				indigo: '#4a00ff',

  				// Tons de gris cyberpunk
  				'deep-black': '#0a0a0a',
  				'charcoal': '#1a1a1a',
  				'gunmetal': '#2a2a2a',
  				'steel': '#3a3a3a',
  				'silver': '#e0e0e0',
  				'light-gray': '#c0c0c0',

  				// Couleurs spéciales
  				'neon-glow': 'rgba(0, 255, 136, 0.8)',
  				'pink-glow': 'rgba(255, 0, 255, 0.8)',
  				'blue-glow': 'rgba(0, 255, 255, 0.8)',
  				'purple-glow': 'rgba(139, 0, 255, 0.8)'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			// Animations Cyberpunk 2030 Avancées
  			'neon-pulse': {
  				'0%, 100%': {
  					opacity: 1,
  					textShadow: '0 0 10px #00ff88, 0 0 20px #00ff88',
  					boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
  				},
  				'50%': {
  					opacity: 0.9,
  					textShadow: '0 0 20px #00ff88, 0 0 30px #00ff88, 0 0 40px #00ff88',
  					boxShadow: '0 0 20px rgba(0, 255, 136, 0.8), 0 0 30px rgba(0, 255, 136, 0.6)'
  				}
  			},
  			'glitch': {
  				'0%, 100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
  				'10%': { transform: 'translate(-1px, 1px)', filter: 'hue-rotate(90deg)' },
  				'20%': { transform: 'translate(-2px, -1px)', filter: 'hue-rotate(180deg)' },
  				'30%': { transform: 'translate(1px, 2px)', filter: 'hue-rotate(270deg)' },
  				'40%': { transform: 'translate(-1px, -1px)', filter: 'hue-rotate(0deg)' },
  				'50%': { transform: 'translate(2px, 1px)', filter: 'hue-rotate(90deg)' },
  				'60%': { transform: 'translate(-2px, 2px)', filter: 'hue-rotate(180deg)' },
  				'70%': { transform: 'translate(1px, -1px)', filter: 'hue-rotate(270deg)' },
  				'80%': { transform: 'translate(-1px, 1px)', filter: 'hue-rotate(0deg)' },
  				'90%': { transform: 'translate(1px, 1px)', filter: 'hue-rotate(90deg)' }
  			},
  			'scan': {
  				'0%': { transform: 'translateY(-100%)', opacity: 0 },
  				'10%': { opacity: 1 },
  				'90%': { opacity: 1 },
  				'100%': { transform: 'translateY(100%)', opacity: 0 }
  			},
  			'hologram': {
  				'0%, 100%': {
  					transform: 'scale(1) rotate(0deg)',
  					opacity: 1,
  					filter: 'hue-rotate(0deg) brightness(1)'
  				},
  				'25%': {
  					transform: 'scale(1.02) rotate(90deg)',
  					opacity: 0.9,
  					filter: 'hue-rotate(90deg) brightness(1.1)'
  				},
  				'50%': {
  					transform: 'scale(1.05) rotate(180deg)',
  					opacity: 0.8,
  					filter: 'hue-rotate(180deg) brightness(1.2)'
  				},
  				'75%': {
  					transform: 'scale(1.02) rotate(270deg)',
  					opacity: 0.9,
  					filter: 'hue-rotate(270deg) brightness(1.1)'
  				}
  			},
  			'digital-rain': {
  				'0%': { transform: 'translateY(-100vh)', opacity: 0 },
  				'5%': { opacity: 1 },
  				'95%': { opacity: 1 },
  				'100%': { transform: 'translateY(100vh)', opacity: 0 }
  			},
  			'cyber-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88'
  				},
  				'50%': {
  					boxShadow: '0 0 20px #00ff88, 0 0 30px #00ff88, 0 0 40px #00ff88, 0 0 50px #00ff88'
  				}
  			},
  			'matrix-fall': {
  				'0%': { transform: 'translateY(-100vh)' },
  				'100%': { transform: 'translateY(100vh)' }
  			},
  			'terminal-blink': {
  				'0%, 50%': { borderColor: '#00ff88', boxShadow: 'inset 0 0 10px rgba(0, 255, 136, 0.3)' },
  				'51%, 100%': { borderColor: 'rgba(0, 255, 136, 0.3)', boxShadow: 'none' }
  			},
  			'data-stream': {
  				'0%': { transform: 'translateX(-100%)', opacity: 0 },
  				'10%': { opacity: 1 },
  				'90%': { opacity: 1 },
  				'100%': { transform: 'translateX(100%)', opacity: 0 }
  			},
  			'circuit-flow': {
  				'0%': { backgroundPosition: '0% 0%' },
  				'100%': { backgroundPosition: '100% 100%' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
  			'glitch': 'glitch 0.3s ease-in-out infinite',
  			'scan': 'scan 3s linear infinite',
  			'hologram': 'hologram 4s ease-in-out infinite',
  			'digital-rain': 'digital-rain 2s linear infinite',
  			'cyber-glow': 'cyber-glow 2s ease-in-out infinite',
  			'matrix-fall': 'matrix-fall 1s linear infinite',
  			'terminal-blink': 'terminal-blink 1s infinite',
  			'data-stream': 'data-stream 3s linear infinite',
  			'circuit-flow': 'circuit-flow 4s linear infinite'
  		},
  		boxShadow: {
  			'neon': '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
  			'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
  			'neon-blue': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
  			'neon-purple': '0 0 20px rgba(139, 0, 255, 0.5), 0 0 40px rgba(139, 0, 255, 0.3)',
  			'glitch': '2px 2px 0px #ff00ff, -2px -2px 0px #00ffff',
  			'cyber': '0 0 30px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.4), inset 0 0 20px rgba(0, 255, 136, 0.1)',
  			'cyber-strong': '0 0 50px rgba(0, 255, 136, 0.8), 0 0 100px rgba(0, 255, 136, 0.6), inset 0 0 30px rgba(0, 255, 136, 0.2)',
  			'hologram': 'inset 0 0 50px rgba(0, 255, 136, 0.3), 0 0 100px rgba(0, 255, 136, 0.2)',
  			'terminal': 'inset 0 0 20px rgba(0, 255, 136, 0.1), 0 0 10px rgba(0, 255, 136, 0.3)'
  		},
  		backgroundImage: {
  			'cyber-grid': 'linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)',
  			'cyber-radial': 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
  			'hologram': 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1), rgba(0, 255, 136, 0.1))',
  			'matrix': 'linear-gradient(0deg, transparent 0%, rgba(0, 255, 136, 0.03) 2%, transparent 3%, transparent 97%, rgba(0, 255, 136, 0.03) 98%, transparent 100%)',
  			'circuit': 'linear-gradient(45deg, transparent 0%, rgba(0, 255, 255, 0.05) 25%, transparent 25%, transparent 75%, rgba(255, 0, 255, 0.05) 75%, transparent 100%)',
  			'neural-network': 'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
  		},
  		fontFamily: {
  			'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
  			'sans': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
  			'display': ['Orbitron', 'Rajdhani', 'monospace'],
  			'neural': ['Space Grotesk', 'Inter', 'sans-serif']
  		},
  		fontSize: {
  			'xs': ['0.75rem', { lineHeight: '1rem' }],
  			'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  			'base': ['1rem', { lineHeight: '1.5rem' }],
  			'lg': ['1.125rem', { lineHeight: '1.75rem' }],
  			'xl': ['1.25rem', { lineHeight: '1.75rem' }],
  			'2xl': ['1.5rem', { lineHeight: '2rem' }],
  			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  			'5xl': ['3rem', { lineHeight: '1' }],
  			'6xl': ['3.75rem', { lineHeight: '1' }],
  			'7xl': ['4.5rem', { lineHeight: '1' }],
  			'8xl': ['6rem', { lineHeight: '1' }],
  			'9xl': ['8rem', { lineHeight: '1' }]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
