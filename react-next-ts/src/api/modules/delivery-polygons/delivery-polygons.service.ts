import { BaseService } from '../../shared/base.service'
import { DELIVERY_POLYGONS_COLORS } from './delivery-polygons.constants'
import {
  DeliveryPolygon,
  DeliveryPolygonPoint
} from './delivery-polygons.types'

class DeliveryPolygonsServiceClass extends BaseService {
  async getAll() {
    const response = await this.axios.get<DeliveryPolygon[]>(
      this.getPath('all')
    )

    return (
      response.data?.map((polygon, index) => ({
        ...polygon,
        color: DELIVERY_POLYGONS_COLORS[index] || 'black'
      })) || []
    )
  }

  async checkPointPolygon(point: DeliveryPolygonPoint) {
    const response = await this.axios.get<DeliveryPolygon>(
      this.getPath('check-point-polygon'),
      {
        params: point
      }
    )
    return response.data
  }
}

export const DeliveryPolygonsService = new DeliveryPolygonsServiceClass(
  'api/v1/delivery-polygons'
)
