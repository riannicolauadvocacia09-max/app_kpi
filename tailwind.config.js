/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rna: {
          navy: {
            950: '#0A0D1B',
            900: '#0F1225',
            800: '#141831', // Oficial Marca Rian Nicolau (#141831)
            700: '#1C2142',
            600: '#252C57',
            500: '#313A70',
          },
          slate: {
            900: '#0D1124',
            800: '#161C36', // Card Background
            700: '#20284D', // Borders
            600: '#2E396B',
            500: '#3F4D8C',
          },
          gold: {
            900: '#7A5210',
            700: '#B88022',
            600: '#DC9B2D',
            500: '#F8B03B', // Oficial Dourado Rian Nicolau (#F8B03B)
            400: '#F9C062',
            300: '#FBD593',
            100: '#FEF5E7',
          }
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F8B03B 0%, #FBD593 50%, #DC9B2D 100%)',
        'navy-gradient': 'linear-gradient(180deg, #141831 0%, #0A0D1B 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(22, 28, 54, 0.9) 0%, rgba(20, 24, 49, 0.7) 100%)',
        'gold-glow': 'radial-gradient(circle at center, rgba(248, 176, 59, 0.18) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(248, 176, 59, 0.2)',
        'gold-md': '0 4px 22px rgba(248, 176, 59, 0.3)',
        'navy-card': '0 10px 30px -5px rgba(10, 13, 27, 0.9)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
