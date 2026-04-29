/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
        surface: {
          0: '#0A0F0D',
          50: '#0F1613',
          100: '#131A17',
          200: '#1A2420',
          300: '#1E2B26',
          400: '#263832',
          500: '#2F453D',
        },
        muted: '#6B7B74',
        danger: '#E54D4D',
        success: '#2ECC71',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 168, 83, 0.25)',
        'glow-brand': '0 0 20px rgba(26, 138, 110, 0.2)',
        'glow-danger': '0 0 15px rgba(229, 77, 77, 0.2)',
        'card': '0 2px 8px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.4)',
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
