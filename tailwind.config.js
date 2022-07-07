/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#4f6d7aff',
          200: '#88a2adff',
          300: '#c0d6dfff',
          400: '#cee0e7ff',
          500: '#dbe9eeff',
          600: '#4a6fa5ff',
          700: '#166088ff'
        },
        transparent: {
          text: '#313131',
          500: 'rgba(255, 255, 255, 0.5)',
          300: 'rgba(255, 255, 255, 0.75)'
        }
      }
    }
  },
  plugins: []
}
