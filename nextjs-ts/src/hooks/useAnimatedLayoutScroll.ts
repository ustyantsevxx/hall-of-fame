import { animateScroll } from 'react-scroll'

import { useLayoutState } from '../store/layout'

const TOP_PADDING = 12

type UseLayoutScrollOptions = {
  offset?: number
}

export const useAnimatedLayoutScroll = (
  options: UseLayoutScrollOptions = {}
) => {
  const { secondHeaderHeight } = useLayoutState()

  const scrollTo = (amount: number) => {
    const scrollAmount =
      amount - secondHeaderHeight - TOP_PADDING + (options.offset ?? 0)
    animateScroll.scrollTo(scrollAmount, {
      duration: 500
    })
  }

  const scrollToElement = (element: HTMLElement) => {
    scrollTo(element.offsetTop)
  }

  return {
    scrollTo,
    scrollToElement
  }
}
