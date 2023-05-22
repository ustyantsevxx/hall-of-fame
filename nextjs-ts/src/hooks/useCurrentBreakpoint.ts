import useBreakpoint from 'use-breakpoint'

import { breakpoints } from '../app/core/tailwind-theme'

export const useCurrentBreakpoint = () => useBreakpoint(breakpoints, 'lg')
