/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        joelyn: {
          pink: "#F6B8DF",
          light: "#F9D4FA",
          purple: "#7020A5",
          cream: "#FFF9F3",
          text: "#9278A7",
        },
      },
      fontFamily: {
        brand: ["Parisienne", "cursive"],
        body: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};