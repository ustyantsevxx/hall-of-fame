import resolveConfig from 'tailwindcss/resolveConfig'
import { TailwindTheme } from 'tailwindcss/tailwind-config'

import tailwindConfig from '../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig as any)

export const tailwindTheme = fullConfig.theme as Required<TailwindTheme> & {
  colors: typeof tailwindConfig.theme.colors
  screens: typeof tailwindConfig.theme.screens
}