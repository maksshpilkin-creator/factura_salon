/**
 * Tailwind scans `./*.html` and `./*.js` in this folder.
 * After changing utility classes in those files, run `npm run build:css`
 * to regenerate minified `dist/tailwind.css` (linked from index.html).
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './*.js'],
  theme: {
    extend: {
      colors: {
        brand: '#fdfcf0',
        graphite: '#1a1a1a',
        matte: '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        custom: '2px',
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
