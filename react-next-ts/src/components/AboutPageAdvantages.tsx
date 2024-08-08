import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

import { RestaurantShowTypeAdvantage } from '../api/modules/restaurants/restaurants.types'
import { WysiwygContentRenderer } from './WysiwygContentRenderer'

type Props = HTMLAttributes<HTMLDivElement> & {
  advantages: RestaurantShowTypeAdvantage[]
}

export const AboutPageAdvantages: FC<Props> = ({ className, advantages }) => {
  return (
    <div className={clsx(className)}>
      <h2 className="text-regular-20 md:text-regular-26">xx xx</h2>

      <ul className="space-y-14 pt-14 md:-mx-16 md:flex md:space-y-0 md:space-x-20 md:overflow-auto md:p-16 md:pt-32 md:pb-20">
        {advantages.map(advantage => (
          <li
            key={advantage.id}
            className="shadow-20-006 rounded-18 px-20 pb-18 pt-14 md:w-[388px] md:min-w-[388px] md:p-30 md:pt-20"
          >
            <h3 className="text-green text-regular-17 md:text-regular-20">
              {advantage.title}
            </h3>
            <WysiwygContentRenderer
              className="mt-8 !h-auto text-black/50 text-regular-15 md:text-regular-17"
              htmlContent={advantage.description}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
