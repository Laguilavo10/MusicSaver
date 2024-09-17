/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    './src/**/*.{html,ts}',
    './src/components/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(275px, 1fr))'
      },
      colors: {
        primary: "#19181f",
        "light-primary": "#23202a",
        "light-text": "#c2c6dd"
      }
    },
  },
  plugins: [],
};
