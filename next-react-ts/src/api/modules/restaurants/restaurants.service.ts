import { BaseService } from '../../shared/base.service'
import { Restaurant, RestaurantShowType } from './restaurants.types'

class RestaurantsServiceClass extends BaseService {
  async getRestaurants() {
    const response = await this.axios.get<Restaurant[]>(this.getPath('all'))
    return response?.data
  }

  async getRestaurantById(id: number) {
    const response = await this.axios.get<RestaurantShowType>(
      this.getPath('show'),
      { params: { id } }
    )
    return response?.data
  }
}

export const RestaurantsService = new RestaurantsServiceClass(
  'api/v1/restaurants'
)
