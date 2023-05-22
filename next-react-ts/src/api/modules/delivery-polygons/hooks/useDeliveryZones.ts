import { useQuery, UseQueryOptions } from 'react-query'

import { DeliveryPolygonsService } from '../delivery-polygons.service'
import { DeliveryPolygon } from '../delivery-polygons.types'

export const DELIVERY_ZONES_QUERY_KEY = 'delivery-zones'

export const getDeliveryZonesQuery = (): UseQueryOptions<
  DeliveryPolygon[]
> => ({
  queryKey: DELIVERY_ZONES_QUERY_KEY,
  queryFn: () => DeliveryPolygonsService.getAll(),
  refetchOnMount: false
})

export const useDeliveryZones = () => {
  return useQuery(getDeliveryZonesQuery())
}
