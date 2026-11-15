/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ferrari: {
          DEFAULT: '#C91D28',
          dark: '#9B131C',
          light: '#E63946',
        },
        obsidian: {
          DEFAULT: '#191919',
          card: '#222222',
          border: '#333333',
        },
        sandstone: {
          DEFAULT: '#E9D9B5',
          dark: '#D4BF94',
          light: '#F4ECE1',
        },
        grass: {
          DEFAULT: '#4D9B56',
          dark: '#38733E',
          light: '#6AB873',
        },
        forest: {
          DEFAULT: '#254A35',
          dark: '#172E21',
        },
        gold: {
          DEFAULT: '#E9C55B',
          dark: '#C8A33A',
          light: '#F8D878',
        },
        pixelWhite: '#F5F1E8',
        mutedGrey: '#A8A8A8',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Silkscreen"', '"Press Start 2P"', 'monospace'],
        mono: ['"VT323"', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,0.8)',
        'pixel-lg': '6px 6px 0px 0px rgba(0,0,0,0.9)',
        'pixel-red': '4px 4px 0px 0px #9B131C',
        'pixel-gold': '4px 4px 0px 0px #C8A33A',
        'pixel-inset': 'inset -4px -4px 0px 0px rgba(0,0,0,0.5), inset 4px 4px 0px 0px rgba(255,255,255,0.2)',
      },
      keyframes: {
        bouncePixel: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.95)' },
        },
        carDrive: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px #E9C55B)' },
          '50%': { filter: 'drop-shadow(0 0 12px #E9C55B)' },
        }
      },
      animation: {
        'bounce-pixel': 'bouncePixel 1.2s infinite ease-in-out',
        'flicker': 'flicker 0.4s infinite alternate ease-in-out',
        'car-drive': 'carDrive 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
