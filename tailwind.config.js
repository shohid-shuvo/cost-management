
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // modfy - Ensure Tailwind scans all JSX/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
