import clsx from 'clsx'
import { FC, HTMLAttributes } from 'react'

import { TAG_IDS } from '../api/modules/products/products.constants'
import { ProductTag } from '../api/modules/products/products.types'
import PepperSvg from '../assets/svg/Pepper.svg'
import VegetarianSvg from '../assets/svg/Vegetarian.svg'

type Props = HTMLAttributes<HTMLDivElement> & {
  product: object & { tags: ProductTag[] }
  tagClassName?: string
  tagContentClassName?: string
  tagContentContainerClassName?: string
}

const TAGS_CONFIG = {
  [TAG_IDS.NEW]: {
    content: (className?: string) => (
      <span className={clsx('pt-2', className)}>NEW</span>
    )
  },
  [TAG_IDS.HIT]: {
    content: (className?: string) => (
      <span className={clsx('pt-2', className)}>HIT</span>
    )
  },
  [TAG_IDS.PEPPER]: {
    content: (className?: string) => (
      <PepperSvg className={clsx('h-12 w-12 md:h-18 md:w-18', className)} />
    )
  },
  [TAG_IDS.VEGETARIAN]: {
    content: (className?: string) => (
      <VegetarianSvg className={clsx('h-12 w-12 md:h-18 md:w-18', className)} />
    )
  }
}

export const ProductTags: FC<Props> = ({
  className,
  product,
  tagClassName,
  tagContentClassName,
  tagContentContainerClassName
}) => {
  return (
    <div className={clsx('h-max w-max ', className)}>
      <ul className="flex flex-wrap items-center space-x-10">
        {product.tags.map((tag, i) => (
          <li
            key={i}
            title={tag.name}
            className={clsx(
              'relative h-18 w-18 rounded-full bg-pink !text-white md:h-26 md:w-26',
              tagClassName
            )}
          >
            <span
              className={clsx(
                'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[6px] leading-[8px] md:text-[9px] md:leading-[11px]',
                tagContentContainerClassName
              )}
            >
              {TAGS_CONFIG[tag.id].content(tagContentClassName)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
