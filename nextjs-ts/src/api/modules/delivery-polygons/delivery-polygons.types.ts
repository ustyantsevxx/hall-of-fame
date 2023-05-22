export type DeliveryPolygonPoint = {
  lat: number
  lng: number
}

export type DeliveryPolygonItem = {
  coordinates: DeliveryPolygonPoint[]
}

export type DeliveryPolygon = {
  id: number
  name: string
  color: string
  delivery_time: number
  polygons: DeliveryPolygonItem[]
  min_order: number
}
