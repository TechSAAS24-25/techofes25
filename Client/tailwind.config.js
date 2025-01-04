/** @type {import('tailwindcss').Config} */
const defaultColors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...defaultColors,
      homeBlack: {
        DEFAULT: "#0b0c10",
      },
    },
    extend: {},
  },
  plugins: [],
};
