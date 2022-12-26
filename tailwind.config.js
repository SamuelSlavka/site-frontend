/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#353535',
      'dark': '#264653',
      'middle': '#2a9d8f',
      'light': '#a8dadc',
      'white': '#f1faee',
      'red': '#e63946',
    },

  },
  plugins: [require("daisyui")],
}
