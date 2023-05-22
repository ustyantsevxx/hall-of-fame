import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useRef } from 'react'

import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import { useIsServer } from '../hooks/useIsServer'
import { useLayoutState } from '../store/layout'
import { LayoutDefaultHeader } from './LayoutDefaultHeader'
import { LayoutDefaultSecondHeader } from './LayoutDefaultSecondHeader'

type Props = {
  children?: ReactNode
  withSecondHeader?: boolean
  authorized?: boolean
  waitAuth?: boolean
}

export const LayoutDefaultHeaders: FC<Props> = ({ withSecondHeader }) => {
  const headerRef = useRef<HTMLElement>(null)
  const secondHeaderRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { breakpoint } = useCurrentBreakpoint()
  const onIndexPageOrWideScreen =
    router.route === '/' || !['xs', 'sm', 'md'].includes(breakpoint)
  const secondHeaderVisible = withSecondHeader && onIndexPageOrWideScreen

  useEffect(() => {
    setFirstHeaderScrolledUp(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const {
    firstHeaderHeight,
    firstHeaderScrolledUp,
    setFirstHeaderScrolledUp,
    setFirstHeaderHeight,
    setSecondHeaderHeight
  } = useLayoutState()

  useEffect(() => {
    setFirstHeaderHeight(headerRef.current?.clientHeight ?? 0)
    setSecondHeaderHeight(headerRef.current?.clientHeight ?? 0)
  }, [headerRef, secondHeaderRef, setFirstHeaderHeight, setSecondHeaderHeight])

  const onServer = useIsServer()

  useEffect(() => {
    if (!secondHeaderVisible) {
      return
    }

    const handleScroll = () => {
      const newScrolledUpValue = !onServer && window.scrollY > firstHeaderHeight
      if (newScrolledUpValue !== firstHeaderScrolledUp) {
        setFirstHeaderScrolledUp(newScrolledUpValue)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      return window.removeEventListener('scroll', handleScroll)
    }
  }, [
    secondHeaderVisible,
    firstHeaderHeight,
    firstHeaderScrolledUp,
    onServer,
    setFirstHeaderScrolledUp
  ])

  return (
    <>
      <LayoutDefaultHeader ref={headerRef} className="mb-8 md:mb-0" />

      {secondHeaderVisible && (
        <LayoutDefaultSecondHeader
          ref={secondHeaderRef}
          firstHeaderScrolledUp={firstHeaderScrolledUp}
        />
      )}
    </>
  )
}
