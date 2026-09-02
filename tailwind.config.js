/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0F',
        inksoft: '#121218',
        cream: '#F5EDE4',
        rose: {
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD0C2',
          300: '#FFB199',
          400: '#FF8E72',
          500: '#E8A07A',
          600: '#C77B5A',
          700: '#9A5A3E',
          800: '#6E3E2A',
        },
        gold: {
          100: '#FBE9C8',
          200: '#F0C98F',
          300: '#E5A965',
          400: '#D89247',
          500: '#B5722E',
        },
        neon: '#FF4D8D',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(255, 77, 141, 0.45)',
        'glow-soft': '0 0 60px -20px rgba(255, 142, 114, 0.35)',
        card: '0 30px 80px -40px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'rose-gold': 'linear-gradient(135deg, #FF8E72 0%, #E8A07A 40%, #F0C98F 100%)',
        'rose-gold-soft': 'linear-gradient(135deg, rgba(255,142,114,0.18) 0%, rgba(232,160,122,0.10) 50%, rgba(240,201,143,0.18) 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(255,77,141,0.35)' },
          '50%': { boxShadow: '0 0 30px 6px rgba(255,77,141,0.25)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
