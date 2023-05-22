import { DeliveryPolygon } from '../delivery-polygons/delivery-polygons.types'

export type City = {
  id: number
  name: string
  mode: string
  phone: string
}

export type DeliveryAddress = {
  id: number
  city?: City
  street?: string | null
  house?: string | null
  block?: string | null
  section?: string | null
  floor?: string | null
  apartment?: string | null
  comment?: string | null
  geo_point: {
    lat: number
    lng: number
  }
  delivery_polygon?: DeliveryPolygon
}

export type NewDeliveryAddress = {
  street?: string | null
  house?: string | null
  block?: string | null
  section?: string | null
  floor?: string | null
  apartment?: string | null
  comment?: string | null
  geo_point: {
    lat: number
    lng: number
  }
}
