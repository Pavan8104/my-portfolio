import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        'cyber-black': '#0A0A0A',
        'cyber-dark': '#111118',
        'cyber-darker': '#1a1a2e',
        'cyber-blue': '#00FFFF',
        'cyber-blue-dim': '#88DDEE',
        'neon-pink': '#FF0099',
        'neon-pink-dim': '#cc0077',
        'cyber-purple': '#8A2BE2',
        'cyber-purple-dim': '#6a1fb2',
        'cyber-red': '#FF4444',
        'cyber-red-dim': '#cc3333',
        'cyber-green': '#00FF41',
        'cyber-green-dim': '#00cc33',
        'cyber-yellow': '#FFD700',
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        code: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)',
        'neon-pink': '0 0 20px rgba(255, 0, 153, 0.6), 0 0 40px rgba(255, 0, 153, 0.4)',
        'neon-purple': '0 0 20px rgba(138, 43, 226, 0.6), 0 0 40px rgba(138, 43, 226, 0.4)',
        'neon-red': '0 0 20px rgba(255, 68, 68, 0.6), 0 0 40px rgba(255, 68, 68, 0.4)',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, rgba(0,255,255,0.8), rgba(138,43,226,0.8))',
        'gradient-neon': 'linear-gradient(45deg, #FF0099, #00FFFF)',
        'gradient-matrix': 'linear-gradient(180deg, rgba(0,255,65,0.1), rgba(0,255,65,0.8))',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': {
            textShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF, 0 0 20px #00FFFF',
          },
          '50%': {
            textShadow: '0 0 2px #00FFFF, 0 0 5px #00FFFF, 0 0 8px #00FFFF',
          },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '25%': { opacity: '0.95' },
          '50%': { opacity: '0.97' },
          '75%': { opacity: '0.93' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,255,255,0.3), 0 0 20px rgba(0,255,255,0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.4)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
