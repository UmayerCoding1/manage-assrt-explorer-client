/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       fontFamily: { Rozha: "'Rozha One', serif" },
       letterSpacing: {cus: '10px',title: '2px'},
      },
  },
  plugins: [require('daisyui')],
};
