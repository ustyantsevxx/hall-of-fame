import { useQuery, UseQueryOptions } from 'react-query'

import { ProductsService } from '../products.service'
import { Product } from '../products.types'

const PRODUCT_BY_IDS_QUERY_KEY = 'productsByIds'

export const getProductByIdsQuery = (
  ids: number[],
  options?: UseQueryOptions<Product[]>
): UseQueryOptions<Product[]> => ({
  queryKey: [PRODUCT_BY_IDS_QUERY_KEY, ...ids],
  queryFn: () => ProductsService.getByIds(ids),
  enabled: ids.length > 0,
  ...options
})

export const useProductsByIds = (
  ids: number[],
  options?: UseQueryOptions<Product[]>
) => {
  return useQuery(getProductByIdsQuery(ids, options))
}
