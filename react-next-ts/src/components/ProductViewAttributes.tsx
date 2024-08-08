import clsx from 'clsx'
import { FC } from 'react'

import { Product } from '../api/modules/products/products.types'
import { ProductViewAttributesItem } from './ProductViewAttributesItem'
import { ProductViewDividerHorizontal } from './ProductViewDividerHorizontal'
import { ProductViewDividerVertical } from './ProductViewDividerVertical'

type Props = {
  className?: string
  product: Product
}

const withGramsSuffix = (value: string) => {
  return `${value} xx`
}

export const ProductViewAttributes: FC<Props> = ({ className, product }) => {
  return (
    <dl className={clsx(className)}>
      <ProductViewAttributesItem
        label="xx xx xx"
        value={`${product.count} xx / ${withGramsSuffix(product.weight)}`}
        spread
      />

      <ProductViewDividerHorizontal />

      <div className="flex justify-between">
        <ProductViewAttributesItem
          label="xx"
          value={withGramsSuffix(product.proteins)}
        />
        <ProductViewDividerVertical />
        <ProductViewAttributesItem
          label="xx"
          value={withGramsSuffix(product.fats)}
        />
        <ProductViewDividerVertical />
        <ProductViewAttributesItem
          label="xx"
          value={withGramsSuffix(product.carbohydrates)}
        />
      </div>

      <ProductViewDividerHorizontal />

      <ProductViewAttributesItem
        label="xx xx"
        value={`${product.calories} xx`}
        spread
      />
    </dl>
  )
}
