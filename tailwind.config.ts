import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: { extend: { colors: { bg: 'var(--bg)', tx: 'var(--tx)', mu: 'var(--mu)', ac: 'var(--ac)', ac2: 'var(--ac2)' } } },
  plugins: [],
} satisfies Config
