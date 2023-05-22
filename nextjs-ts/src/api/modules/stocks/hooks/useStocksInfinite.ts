import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'

import { StocksService } from '../stocks.service'
import { StocksPaginatedResponse } from '../stocks.types'

export const STOCKS_QUERY_KEY = 'stocks'

export const getStocksInfiniteQuery =
  (): UseInfiniteQueryOptions<StocksPaginatedResponse> => ({
    queryKey: STOCKS_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      StocksService.getPaginatedStocks({ page: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.meta.last_page === lastPage.meta.current_page
        ? undefined
        : lastPage.meta.current_page + 1
  })

export const useStocksInfinite = () => {
  return useInfiniteQuery({
    ...getStocksInfiniteQuery(),
    refetchOnMount: false
  })
}
