const { Grid } = require('@mantine/core');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      sans: ["Open Sans"]
    },
  },
  plugins: [],
}