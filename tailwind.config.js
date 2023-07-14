const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}", "./.eleventy.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", ...defaultTheme.fontFamily.sans],
        mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono],
        display: ["Caprasimo"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
