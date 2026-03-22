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
        accent:    '#C4572A',
        'accent-light': '#E8872A',
        parchment: '#FBF7F0',
        'off-white': '#FFFDF9',
        'warm-gray': '#EDE5D8',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans:  ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono:  ['Courier New', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
