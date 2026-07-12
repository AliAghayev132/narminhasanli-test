// Next.js 16 removed the `next lint` command in favor of running ESLint
// directly (`eslint .`). eslint-config-next 16 ships a native flat config
// array, so we spread it straight into our flat config — no FlatCompat needed.
import next from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'],
  },
  ...next,
]

export default eslintConfig
