import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cv: {
          bg: '#070311',
          panel: '#120b21',
          panelAlt: '#171028',
          text: '#f4ecff',
          muted: '#c2b6d7',
          faint: '#8d82a5',
          line: 'rgba(255,255,255,0.08)',
          gold: '#d1a765',
          goldSoft: 'rgba(209,167,101,0.12)'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [],
} satisfies Config;
