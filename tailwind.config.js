/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:     '#050510',
        panel:  'rgba(8,8,20,0.92)',
        border: '#2a2a45',
        yellow: '#FFD700',
        orange: '#FFA500',
        green:  '#00ff88',
        cyan:   '#00ffff',
        purple: '#9b5de5',
        red:    '#ef476f',
        gold:   '#ffd166',
        blue:   '#118ab2',
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", 'cursive'],
        term:  ["'VT323'", 'monospace'],
      },
    },
  },
  plugins: [],
}
