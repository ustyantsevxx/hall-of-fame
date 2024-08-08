import clsx from 'clsx'
import { FC } from 'react'
import { FreeMode, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useRestaurantInfo } from '../api/modules/restaurants/hooks/useRestaurantInfo'
import { breakpoints } from '../app/core/tailwind-theme'
import { formatPhoneNumber } from '../utils'
import { DeliveryInfoBlock } from './DeliveryInfoBlock'

type Props = {
  className?: string
}

export const DeliveryInfo: FC<Props> = ({ className }) => {
  const { data: restaurantInfo } = useRestaurantInfo()

  return (
    <Swiper
      modules={[Navigation, FreeMode]}
      slidesPerView="auto"
      spaceBetween={14}
      slidesPerGroup={2}
      mousewheel
      threshold={10}
      slidesOffsetAfter={16}
      slidesOffsetBefore={16}
      breakpoints={{
        [breakpoints.xl]: {
          spaceBetween: 20,
          slidesOffsetAfter: 0,
          slidesOffsetBefore: 0
        }
      }}
      className={clsx(className)}
    >
      {restaurantInfo?.mode && (
        <SwiperSlide className="!h-auto !w-auto">
          <DeliveryInfoBlock
            label="xx xx xx"
            value={restaurantInfo.mode}
            className="md:w-[388px]"
          />
        </SwiperSlide>
      )}

      {restaurantInfo?.phone && (
        <SwiperSlide className="!h-auto !w-auto">
          <DeliveryInfoBlock
            label="xx xx"
            value={
              <a href={`tel:+${restaurantInfo?.phone}`}>
                {formatPhoneNumber(restaurantInfo?.phone)}
              </a>
            }
            className="md:w-[286px]"
          />
        </SwiperSlide>
      )}
    </Swiper>
  )
}
