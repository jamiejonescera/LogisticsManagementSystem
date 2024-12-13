/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
