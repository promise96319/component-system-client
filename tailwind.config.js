/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      margin: {
        'px-8': '8px',
        'px-16': '16px',
        'px-24': '24px',
        'px-32': '32px'
      }
    }
  },
  plugins: []
};
