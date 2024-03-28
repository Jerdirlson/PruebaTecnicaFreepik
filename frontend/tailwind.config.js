// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: {
          600: '#3b82f6', // Azul primario
          700: '#1d4ed8', // Azul primario oscuro
          300: '#a5b4fc', // Azul primario claro
          800: '#1e3a8a', // Azul primario muy oscuro
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}