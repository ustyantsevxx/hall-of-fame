import { FC, HTMLAttributes } from 'react'

import { StockShort } from '../api/modules/stocks/stocks.types'
import { AppImage } from './AppImage'
import { AppLink } from './AppLink'

type Props = HTMLAttributes<HTMLAnchorElement> & {
  stock: StockShort
}

export const StocksPageCard: FC<Props> = ({ stock, ...props }) => {
  return (
    <AppLink
      href={`/stocks/${stock.id}`}
      className="mask-image-gradient group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-22 bg-gray"
      {...props}
    >
      <AppImage
        src={stock.small_image}
        alt={stock.title}
        className="brightness-90 transition duration-300 group-hover:scale-101"
      />

      <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></span>

      <div className="flex flex-col justify-end px-28 pb-22">
        <p className="text-[20px] leading-[24px] text-white md:text-regular-26">
          {stock.title}
        </p>
      </div>
    </AppLink>
  )
}
