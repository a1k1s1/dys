/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",        // Add your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // Add your JavaScript/TypeScript files
  ],
  theme: {
    extend: {
      fontFamily: {
        opendyslexic: ['OpenDyslexic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

