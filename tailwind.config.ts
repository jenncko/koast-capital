import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F6F2EB',
        'cream-alt': '#EDE8DC',
        sage: '#A8B08E',
        'sage-dark': '#8C9870',
        'sage-light': '#D4DCBA',
        'dusty-pink': '#C4A49E',
        'dusty-pink-light': '#E2CECC',
        charcoal: '#38332E',
        mid: '#7A746E',
        light: '#B0AAA3',
        stone: '#756C5F',
        sand: '#EBE5DC',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
