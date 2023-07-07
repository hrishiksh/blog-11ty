const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}", "./.eleventy.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  daisyui: {
    themes: ["light", "dracula"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
