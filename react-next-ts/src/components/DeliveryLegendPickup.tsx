import { FC } from 'react'

import { useRestaurants } from '../api/modules/restaurants/hooks/useRestaurants'
import { getRestraurantAddressString } from '../api/modules/restaurants/restaurants.utils'

export const DeliveryLegendPickup: FC = () => {
  const { data: restaurants } = useRestaurants()

  const cities = [
    {
      name: 'г. Санкт-Петербург',
      waitTime: '25 мин ожидания',
      restaurants: restaurants || []
    }
  ]

  return (
    <div>
      {cities.map(city => (
        <div key={city.name}>
          <div className="flex items-center space-x-6 text-black/50">
            <div className="whitespace-nowrap text-regular-17">{city.name}</div>
            <div className="mt-4 text-[32px] leading-[28px] !text-black/40">
              &middot;
            </div>
            <div className="mt-2 text-regular-15">{city.waitTime}</div>
          </div>

          <div className="mt-6 space-y-4">
            {city.restaurants.map(restaurant => (
              <div key={restaurant.id} className="text-regular-15">
                {getRestraurantAddressString(restaurant)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
