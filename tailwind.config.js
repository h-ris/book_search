module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      background: "#777790",
      light: "#EEEEEE",
      primary: "#000000",
      secondary: "#9E9E9E",
      third: "#058ED9",
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
