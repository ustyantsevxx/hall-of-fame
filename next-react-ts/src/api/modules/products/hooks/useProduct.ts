import { useQuery, UseQueryOptions } from 'react-query'

import { ProductsService } from '../products.service'
import { Product } from '../products.types'

const PRODUCT_QUERY_KEY = 'product'

export const getProductQuery = (
  id?: number,
  options?: UseQueryOptions<Product | null>
): UseQueryOptions<Product | null> => ({
  queryKey: [PRODUCT_QUERY_KEY, id],
  queryFn: () => (id !== undefined ? ProductsService.getProduct(id) : null),
  enabled: id !== undefined,
  ...options
})

export const useProduct = (
  id: number,
  options?: UseQueryOptions<Product | null>
) => {
  return useQuery(getProductQuery(id, options))
}
