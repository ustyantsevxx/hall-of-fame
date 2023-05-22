import { BaseService } from '../../shared/base.service'
import {
  CreateOrderResponse,
  NewOrderAttributes,
  Order,
  OrderAdditionalProductsResponseItem,
  OrdersCalculationRequestAttrs,
  OrdersCalculationResponse,
  OrdersPaginatedResponse
} from './orders.types'

class OrdersServiceClass extends BaseService {
  async getPaginatedOrders({
    page,
    perPage
  }: {
    page: number
    perPage: number
  }) {
    const response = await this.axios.get<OrdersPaginatedResponse>(
      this.getPath('index'),
      {
        params: {
          page,
          per_page: perPage
        }
      }
    )
    return response.data
  }

  async getActiveOrders() {
    const response = await this.axios.get<OrdersPaginatedResponse>(
      this.getPath('active')
    )
    return response?.data?.data
  }

  async getOrder(id: number) {
    const response = await this.axios.get<Order | null>(this.getPath('show'), {
      params: {
        id
      }
    })
    return response.data
  }

  async cancelOrder({ orderId, reason }: { orderId: number; reason: string }) {
    const response = await this.axios.put(this.getPath('cancel', orderId), {
      reason
    })
    return response?.data
  }

  async createOrder(orderAttributes: NewOrderAttributes) {
    const response = await this.axios.post<CreateOrderResponse>(
      this.getPath('create'),
      orderAttributes
    )
    return response?.data
  }

  calculateOrder(attrs: OrdersCalculationRequestAttrs) {
    return this.axios.post<OrdersCalculationResponse>(
      this.getPath('calculate'),
      attrs
    )
  }

  async getAdditionalProducts(attrs: OrdersCalculationRequestAttrs) {
    return this.axios.post<OrderAdditionalProductsResponseItem[]>(
      this.getPath('additional-products'),
      attrs
    )
  }
}

export const OrdersService = new OrdersServiceClass('api/v1/orders')
