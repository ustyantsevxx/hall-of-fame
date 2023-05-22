import resolveConfig from 'tailwindcss/resolveConfig'

// disable relative import warning because this file is used in `nuxt.config.js`
// eslint-disable-next-line no-restricted-imports
import tailwindConfig from '../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

export const twTheme = fullConfig.theme
