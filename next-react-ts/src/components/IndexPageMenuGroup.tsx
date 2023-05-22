import { FC } from 'react'
import { Element } from 'react-scroll'

import { ProductsService } from '../api/modules/products/products.service'
import { ProductGroup } from '../api/modules/products/products.types'
import { ProductCard } from './ProductCard'

type Props = {
  group: ProductGroup
  onProductClick: (productId: number) => void
}

export const IndexPageMenuGroup: FC<Props> = ({ group, onProductClick }) => {
  const categoryId = ProductsService.generateCategoryId(group.category_id)

  return (
    <>
      <Element className="pb-36 md:pb-70" name={categoryId} id={categoryId}>
        <h2 className="text-[22px] font-medium leading-[32px] sm:text-medium-30">
          {group.category_name}
        </h2>

        <div className="mt-16 grid gap-20 sm:mt-30 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {group.products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product.id)}
            />
          ))}
        </div>
      </Element>
    </>
  )
}
