import 'swiper/css'
import 'swiper/css/effect-creative'

import clsx from 'clsx'
import { FC, HTMLAttributes, useState } from 'react'
import { EffectCoverflow, Navigation } from 'swiper'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'

import { Media } from '../api/shared/types'
import AboutPageSliderArrowLeftSvg from '../assets/svg/AboutPageSliderArrowLeft.svg'
import AboutPageSliderArrowRightSvg from '../assets/svg/AboutPageSliderArrowRight.svg'
import { AppImage } from './AppImage'

type Props = HTMLAttributes<HTMLDivElement> & {
  images: Media[]
}

export const AboutPageImageSlider: FC<Props> = ({ className, images }) => {
  const [navPrevEl, setNavPrevEl] = useState<HTMLElement | null>(null)
  const [navNextEl, setNavNextEl] = useState<HTMLElement | null>(null)

  const sliderLoopedAndArrowsVisible = images.length > 2

  return (
    <div className={clsx('relative', className)}>
      <SwiperComponent
        effect={'coverflow'}
        grabCursor={true}
        loop={sliderLoopedAndArrowsVisible}
        centeredSlides
        navigation={
          sliderLoopedAndArrowsVisible
            ? { prevEl: navPrevEl, nextEl: navNextEl }
            : false
        }
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
          scale: 0.85,
          slideShadows: false
        }}
        modules={[EffectCoverflow, Navigation]}
        className="h-[320px] w-full !select-none md:h-[490px]"
      >
        {images.map(image => (
          <SwiperSlide
            key={image.id}
            className="!h-[320px] !w-[320px] overflow-hidden rounded-22 md:!h-[490px] md:!w-[490px] [&.swiper-slide-active>.slider-image]:!opacity-100"
          >
            <div className="slider-image opacity-50 transition">
              <AppImage src={image.url} alt={image.name || 'image'} />
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>

      {sliderLoopedAndArrowsVisible && (
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          <div className="container flex h-full w-full items-center justify-between">
            <button ref={r => setNavPrevEl(r)} className="pointer-events-auto">
              <AboutPageSliderArrowLeftSvg />
            </button>

            <button ref={r => setNavNextEl(r)} className="pointer-events-auto">
              <AboutPageSliderArrowRightSvg />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
