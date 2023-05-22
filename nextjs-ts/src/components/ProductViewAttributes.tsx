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
  return `${value} г`
}

export const ProductViewAttributes: FC<Props> = ({ className, product }) => {
  return (
    <dl className={clsx(className)}>
      <ProductViewAttributesItem
        label="Количество и вес"
        value={`${product.count} шт / ${withGramsSuffix(product.weight)}`}
        spread
      />

      <ProductViewDividerHorizontal />

      <div className="flex justify-between">
        <ProductViewAttributesItem
          label="Белки"
          value={withGramsSuffix(product.proteins)}
        />
        <ProductViewDividerVertical />
        <ProductViewAttributesItem
          label="Жиры"
          value={withGramsSuffix(product.fats)}
        />
        <ProductViewDividerVertical />
        <ProductViewAttributesItem
          label="Углеводы"
          value={withGramsSuffix(product.carbohydrates)}
        />
      </div>

      <ProductViewDividerHorizontal />

      <ProductViewAttributesItem
        label="Энергетическая ценность"
        value={`${product.calories} ккал`}
        spread
      />
    </dl>
  )
}
