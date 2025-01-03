/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0078d4", // Microsoft blue
          dark: "#005a9e",
          light: "#2b88d8",
        },
        secondary: {
          DEFAULT: "#2b2b2b",
          dark: "#1b1b1b",
          light: "#3b3b3b",
        },
      },
    },
  },
  plugins: [],
};
