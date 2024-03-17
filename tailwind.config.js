/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        PottaOne: ["PottaOne"],
        Manjari: ["Manjari"]
      },
      colors: {
        'custom-red': '#EE1515',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

