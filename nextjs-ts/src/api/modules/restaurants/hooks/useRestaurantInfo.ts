import dayjs from 'dayjs'
import { useQuery, UseQueryOptions } from 'react-query'

import { RESTAURANT } from '../restaurants.constants'
import { RestaurantsService } from '../restaurants.service'
import { RestaurantShowType } from '../restaurants.types'

export const RESTAURANT_WORK_HOURS_QUERY_KEY = 'restaurantWorkHours'

export type RestaurantInfo = RestaurantShowType & {
  working: boolean
  workingHoursString: string
}

export const getRestaurantInfoQuery = (): UseQueryOptions<RestaurantInfo> => ({
  queryKey: RESTAURANT_WORK_HOURS_QUERY_KEY,
  queryFn: async () => {
    const restaurantId = RESTAURANT.SAINT_PETERSBURG
    const restaurant = await RestaurantsService.getRestaurantById(restaurantId)

    const now = dayjs()
    const todayDayNum = now.day()

    const todaySchedule = restaurant.schedules.find(
      day => day.day_num === todayDayNum
    )

    if (todaySchedule) {
      const working = now.isBetween(
        todaySchedule.start_hours,
        todaySchedule.end_hours
      )

      const start = dayjs(todaySchedule.start_hours).format('HH:mm')
      const end = dayjs(todaySchedule.end_hours).format('HH:mm')

      return {
        ...restaurant,
        working,
        workingHoursString: `${start} — ${end}`
      }
    }

    return {
      ...restaurant,
      working: false,
      workingHoursString: restaurant.mode
    }
  },
  refetchOnMount: false
})

export const useRestaurantInfo = () => {
  return useQuery(getRestaurantInfoQuery())
}
