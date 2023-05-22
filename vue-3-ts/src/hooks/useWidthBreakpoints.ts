import { useBreakpoints } from '@vueuse/core'

export const useWidthBreakpoints = () => {
  const {
    lg,
    md,
    xl,
    '2xl': xl2,
    between
  } = useBreakpoints({
    md: 768,
    lg: 1024,
    xl: 1201,
    '2xl': 1441
  })

  return {
    md,
    lg,
    laptop: between('xl', '2xl'),
    xl,
    '2xl': xl2
  }
}
