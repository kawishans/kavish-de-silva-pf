/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        // Main display font — local "Space" with Space Grotesk fallback
        space: ['Space', 'Space Grotesk', 'system-ui', 'sans-serif'],
        // Secondary body font — local "IBM" with IBM Plex Sans fallback
        ibm: ['IBM', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': 'var(--bg-mesh)',
      },
    },
  },
  plugins: [],
};
