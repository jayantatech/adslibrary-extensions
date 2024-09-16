/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,tsx, ts}"],
  theme: {
    extend: {
      fontFamily: {
        Rotobo: ["Roboto", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ["Open-sans", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        mainBlue: "#1b42cd",
        lightBlue: "#F5F8FE",
      },
    },
  },
  plugins: [],
};
