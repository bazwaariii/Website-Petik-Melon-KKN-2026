/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        melon: {
          primary: '#F2994A',   // Oranye melon lembut
          secondary: '#3A7D44', // Hijau kebun
          accent: '#C7E89E',    // Hijau muda melon
          dark: '#2E2A26',      // Coklat tanah
          bg: '#FAF6EF',        // Krem kanvas
          highlight: '#F6C453', // Kuning matahari
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F5ECDF',
          300: '#EAD9C2',
          400: '#F6C453',
          500: '#F2994A',
          600: '#E07D2B',
          700: '#3A7D44',
          800: '#2A5D32',
          900: '#2E2A26',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Bricolage Grotesque', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'Caveat', 'cursive'],
      },
      backgroundImage: {
        'canvas-pattern': "radial-gradient(#3A7D44 0.5px, transparent 0.5px)",
      }
    },
  },
  plugins: [],
}
