import { BaseService } from '../../shared/base.service'
import { PaymentMethod } from './payment-methods.types'

class PaymentMethodsServiceClass extends BaseService {
  async getPaymentMethods() {
    const response = await this.axios.get<PaymentMethod[]>(this.getPath('all'))
    return response.data
  }
}

export const PaymentMethodsService = new PaymentMethodsServiceClass(
  'api/v1/payment_methods'
)
