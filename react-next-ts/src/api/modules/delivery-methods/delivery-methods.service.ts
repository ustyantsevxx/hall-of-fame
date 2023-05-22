import { BaseService } from '../../shared/base.service'
import { DeliveryMethod } from './delivery-methods.types'

class DeliveryMethodsServiceClass extends BaseService {
  async getDeliveryMethods() {
    const response = await this.axios.get<DeliveryMethod[]>(this.getPath('all'))
    return response.data
  }
}

export const DeliveryMethodsService = new DeliveryMethodsServiceClass(
  'api/v1/delivery_methods'
)
