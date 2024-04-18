/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0989ff",
        pink: "#00bfa5"
      },
      container: {
        center: true,
        padding: "15px"

      }
    },
  },
  plugins: [],
}

