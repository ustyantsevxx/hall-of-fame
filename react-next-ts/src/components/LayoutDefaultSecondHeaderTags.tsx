import 'swiper/css'
import 'swiper/css/navigation'

import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { Link as ReactScrollLink } from 'react-scroll'
import { useWindowScroll, useWindowSize } from 'react-use'
import Swiper, { FreeMode, Mousewheel, Navigation } from 'swiper'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'

import { useProductsGroupedByCategories } from '../api/modules/products/hooks/useProductsGroupedByCategories'
import { ProductsService } from '../api/modules/products/products.service'
import { breakpoints } from '../app/core/tailwind-theme'
import { useIsServer } from '../hooks/useIsServer'
import { useLayoutState } from '../store/layout'
import { LayoutDefaultSecondHeaderTagsNavButton } from './LayoutDefaultSecondHeaderTagsNavButton'

type Props = {
  className?: string
}

const linkBaseClassName =
  'block w-max cursor-pointer rounded-40 bg-gray py-7 px-18 transition-colors text-regular-15 md:text-regular-17 lg:py-10 lg:px-22'

export const LayoutDefaultSecondHeaderTags: FC<Props> = ({ className }) => {
  const { data: groups } = useProductsGroupedByCategories()
  const { secondHeaderHeight } = useLayoutState()

  const [navPrevEl, setNavPrevEl] = useState<HTMLElement | null>(null)
  const [navNextEl, setNavNextEl] = useState<HTMLElement | null>(null)
  const swiperRef = useRef<Swiper | null>(null)

  const router = useRouter()
  const onIndexPage = router.route === '/'

  const [spyingLinksActive, setSpyingLinksActive] = useState(false)
  const [visibleCategoryIndex, setVisibleCategoryIndex] = useState<number>(0)

  const scrollToGroupTagByIndex = (newIndex: number) => {
    let indexToSlideTo = 0

    if (newIndex < visibleCategoryIndex) {
      indexToSlideTo = Math.max(0, newIndex - 1)
    } else if (newIndex > visibleCategoryIndex) {
      indexToSlideTo = Math.min(groups?.length ?? 0 - 1, newIndex - 1)
    } else {
      return
    }

    swiperRef.current?.slideTo(indexToSlideTo)
  }

  const applyCategoryFromHashIfAny = () => {
    if (location.hash) {
      const indexFromHash =
        groups?.findIndex(
          group =>
            ProductsService.generateCategoryId(group.category_id) ===
            location.hash.slice(1)
        ) ?? -1

      if (indexFromHash !== -1) {
        setVisibleCategoryIndex(indexFromHash)
        scrollToGroupTagByIndex(indexFromHash)
      }
    }
  }

  useEffect(() => {
    if (onIndexPage) {
      applyCategoryFromHashIfAny()
    }
    setSpyingLinksActive(onIndexPage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, onIndexPage])

  const handleLinkActiveChange = (tagText: string) => {
    const newVisibleCategoryIndex =
      groups?.findIndex(
        group =>
          ProductsService.generateCategoryId(group.category_id) === tagText
      ) ?? -1

    if (newVisibleCategoryIndex !== -1) {
      scrollToGroupTagByIndex(newVisibleCategoryIndex)

      setVisibleCategoryIndex(newVisibleCategoryIndex)
    }
  }

  const isServer = useIsServer()
  const { y } = useWindowScroll()
  const { height } = useWindowSize()
  const scrolledToBottom =
    !isServer && y + height === document.body.scrollHeight

  return (
    <div className={clsx('relative -ml-16 lg:mx-0', className)}>
      <SwiperComponent
        modules={[Navigation, FreeMode, Mousewheel]}
        spaceBetween={11}
        slidesPerView={'auto'}
        slidesPerGroupAuto
        mousewheel
        threshold={10}
        slidesOffsetAfter={16}
        slidesOffsetBefore={16}
        breakpoints={{
          [breakpoints.lg]: {
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0
          }
        }}
        navigation={{ prevEl: navPrevEl, nextEl: navNextEl }}
        onInit={(swiper: Swiper) => (swiperRef.current = swiper)}
      >
        {groups?.map((group, groupIndex) => (
          <SwiperSlide key={group.category_id} className="!h-auto !w-auto">
            {spyingLinksActive ? (
              <ReactScrollLink
                tabIndex={0}
                spy={spyingLinksActive}
                offset={-secondHeaderHeight - 20}
                hashSpy={spyingLinksActive}
                to={ProductsService.generateCategoryId(group.category_id)}
                className={clsx(linkBaseClassName, {
                  '!bg-green !text-white':
                    (visibleCategoryIndex === groupIndex &&
                      !scrolledToBottom) ||
                    (groupIndex === groups.length - 1 && scrolledToBottom)
                })}
                onSetActive={handleLinkActiveChange}
              >
                {group.category_name}
              </ReactScrollLink>
            ) : (
              <NextLink
                passHref
                href={`/#${ProductsService.generateCategoryId(
                  group.category_id
                )}`}
              >
                <a className={linkBaseClassName}>{group.category_name}</a>
              </NextLink>
            )}
          </SwiperSlide>
        ))}
      </SwiperComponent>

      <LayoutDefaultSecondHeaderTagsNavButton
        ref={el => setNavPrevEl(el)}
        className="rotate-180"
        title="Назад"
      />

      <LayoutDefaultSecondHeaderTagsNavButton
        ref={el => setNavNextEl(el)}
        className="right-0"
        title="Вперед"
      />
    </div>
  )
}
