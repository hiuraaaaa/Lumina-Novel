/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: '#fff5f7',
          100: '#ffe4e9',
          200: '#ffc0cb',
          300: '#ffaec9',
          400: '#ff85a1',
          500: '#ffb7c5',
          600: '#e91e63',
          700: '#c2185b',
        },
        dark: {
          primary: '#2d1b3d',
          secondary: '#1a0d2e',
          lighter: '#3d2a4d',
        }
      },
      fontFamily: {
        'serif': ['"Playfair Display"', '"Noto Serif JP"', 'serif'],
        'sans': ['Inter', '"Noto Sans JP"', 'sans-serif'],
        'reading': ['"Crimson Pro"', '"Source Serif Pro"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-right': 'slideRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.3s ease-in-out',
        'fall': 'fall 5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fall: {
          '0%': { 
            transform: 'translateY(-10vh) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(110vh) rotate(360deg)',
            opacity: '0.3'
          },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 105, 180, 0.5)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 105, 180, 0.8)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'sakura': '0 4px 20px rgba(255, 105, 180, 0.15)',
        'sakura-lg': '0 8px 30px rgba(255, 105, 180, 0.25)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
