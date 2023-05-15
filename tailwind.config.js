const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}
