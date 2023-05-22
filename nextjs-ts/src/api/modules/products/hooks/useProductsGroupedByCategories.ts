import { useQuery, UseQueryOptions } from 'react-query'

import { ProductsService } from '../products.service'
import { ProductGroup } from '../products.types'

const PRODUCTS_GROUPED_BY_CATEGORIES_QUERY_KEY =
  'products-grouped-by-categories'

export const getProductsGroupedByCategoriesQuery = (): UseQueryOptions<
  ProductGroup[]
> => ({
  queryKey: PRODUCTS_GROUPED_BY_CATEGORIES_QUERY_KEY,
  queryFn: () => ProductsService.getProductsGroupedByCategories()
})

export const useProductsGroupedByCategories = () => {
  return useQuery({
    ...getProductsGroupedByCategoriesQuery(),
    refetchOnMount: false
  })
}
