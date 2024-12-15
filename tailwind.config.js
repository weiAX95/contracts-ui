/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#48e59b',
      },
      fontFamily: {
        primary: ['var(--font-roboto-mono)', 'monospace'],
        secondary: ['var(--font-noto-sans)', 'monospace'],
      },
      keyframes: {
        spin360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin360: 'spin360 2s linear infinite',
      },
    },
  },
  plugins: [],
};
