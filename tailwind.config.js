/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}