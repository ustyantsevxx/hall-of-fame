import { Restaurant } from './restaurants.types'

export const getRestraurantAddressString = (restaurant: Restaurant) => {
  return [restaurant.street, restaurant.house, restaurant.block]
    .filter(Boolean)
    .join(', ')
}
