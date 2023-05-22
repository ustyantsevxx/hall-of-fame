import clsx from 'clsx'
import { FC, useState } from 'react'

import { Product } from '../api/modules/products/products.types'

type Props = {
  className?: string
  product: Product
}

export const ProductViewDescription: FC<Props> = ({ className, product }) => {
  const [expanded, setExpanded] = useState(false)

  const { composition, description } = product
  const firstValue = composition || description
  const secondValue = composition && description

  return (
    <div className={clsx(className)}>
      <p className="break-words text-black/50 text-regular-15">{firstValue}</p>

      {expanded && (
        <p className="mt-4 break-words text-black/50 text-regular-15">
          {secondValue}
        </p>
      )}

      {secondValue && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={clsx('mt-4 w-full text-left text-green text-regular-15', {
            'pb-10': !expanded
          })}
        >
          {!expanded ? 'Подробнее' : 'Скрыть'}
        </button>
      )}
    </div>
  )
}
