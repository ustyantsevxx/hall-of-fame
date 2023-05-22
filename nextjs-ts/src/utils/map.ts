import { DeliveryPolygonItem } from '../api/modules/delivery-polygons/delivery-polygons.types'
import RestrauntPlacemarkUrl from '../assets/images/restraunt-placemark.png'
import YandexPlacemarkUrl from '../assets/images/yandex-placemark.png'

const SAINT_PETERSBURG_COORDS = [59.93, 30.31]

export const createMap = (containerId: string) => {
  return new ymaps.Map(containerId, {
    center: SAINT_PETERSBURG_COORDS,
    zoom: 10,
    controls: ['zoomControl', 'geolocationControl']
  })
}

export type AppMapPlacemark = {
  coords: number[]
  hint?: string
}

export type AppMapZone = {
  coords: number[][][]
  color: string
  hint?: string
}

export const createYandexPlacemark = ({ coords, hint }: AppMapPlacemark) => {
  return new ymaps.Placemark(
    coords,
    {
      hintContent: hint
    },
    {
      iconLayout: 'default#image',
      iconImageSize: [30, 30],
      iconImageOffset: [-15, -15],
      iconImageHref: YandexPlacemarkUrl.src,
      draggable: true
    }
  )
}

export const createAppPlacemark = ({ coords, hint }: AppMapPlacemark) => {
  return new ymaps.Placemark(
    coords,
    {
      hintContent: hint
    },
    {
      iconLayout: 'default#image',
      iconImageSize: [36, 46],
      iconImageOffset: [0, 0],
      iconImageHref: RestrauntPlacemarkUrl.src
    }
  )
}

export const createMapZone = ({ coords, color, hint }: AppMapZone) => {
  return new ymaps.GeoObject(
    {
      geometry: {
        type: 'Polygon',
        coordinates: coords
      } as any,
      properties: {
        hintContent: hint
      }
    },
    {
      opacity: 0.3,
      fillColor: color,
      strokeColor: color
    }
  )
}

export const getCoordsByAddress = async (address: string) => {
  const geocodeResult = await (ymaps as any).geocode(address, {
    results: 1
  })
  const geoObject = geocodeResult.geoObjects.get(0)
  return (geoObject?.geometry?.getCoordinates() || []) as number[]
}

export const getAddressByCoords = async (coords: number[]) => {
  const res = await (ymaps as any).geocode(coords)
  const geocodeResult = res.geoObjects.get(0)
  return geocodeResult.getAddressLine()
}

export const deliveryPolygonToCoords = (polygon: DeliveryPolygonItem) => {
  return [polygon.coordinates.map(point => [point.lng, point.lat])]
}
