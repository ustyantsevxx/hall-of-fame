import { useQuery, UseQueryOptions } from 'react-query'

import { StocksService } from '../stocks.service'
import { Stock } from '../stocks.types'

export const STOCK_QUERY_KEY = 'stock'

export const getStockQuery = (
  id?: number,
  options?: UseQueryOptions<Stock | null>
): UseQueryOptions<Stock | null> => ({
  queryKey: [STOCK_QUERY_KEY, id],
  queryFn: () => (id !== undefined ? StocksService.getStock(id) : null),
  enabled: id !== undefined,
  ...options
})

export const useStock = (
  id: number,
  options?: UseQueryOptions<Stock | null>
) => {
  return useQuery(getStockQuery(id, options))
}
