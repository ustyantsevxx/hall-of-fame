import { useQuery, UseQueryOptions } from 'react-query'

import { RestaurantsService } from '../restaurants.service'
import { Restaurant } from '../restaurants.types'

export const RESTAURANTS_QUERY_KEY = 'restaurants'

export const getRestaurantsQuery = (): UseQueryOptions<Restaurant[]> => ({
  queryKey: RESTAURANTS_QUERY_KEY,
  queryFn: () => RestaurantsService.getRestaurants(),
  refetchOnMount: false
})

export const useRestaurants = () => {
  return useQuery(getRestaurantsQuery())
}
