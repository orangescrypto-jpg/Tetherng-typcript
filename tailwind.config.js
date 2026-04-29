/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0F0D',
          50: '#0F1613',
          100: '#131A17',
          200: '#1A2420',
          300: '#1E2B26',
          400: '#263832',
          500: '#2F453D',
        },
        brand: {
          50: '#E8F5F0',
          100: '#C5E8DB',
          200: '#9ED9C3',
          300: '#6EC8A8',
          400: '#45B98F',
          500: '#1A8A6E',
          600: '#15735A',
          700: '#105C47',
          800: '#0B4534',
          900: '#072E22',
          950: '#031711',
        },
        gold: {
          50: '#FDF8ED',
          100: '#FAECCC',
          200: '#F5D994',
          300: '#EFC55C',
          400: '#D4A853',
          500: '#C4922A',
          600: '#A37520',
          700: '#7D581A',
          800: '#583E14',
          900: '#33240E',
        },
        muted: 'rgb(var(--muted) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': 'var(--shadow-glow-gold)',
        'glow-brand': 'var(--shadow-glow-brand)',
        'glow-danger': 'var(--shadow-glow-danger)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
