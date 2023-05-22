/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

import { DeliveryPlacemark } from '../components/DeliverySelectAddressModal.types'
import { createYandexPlacemark, getAddressByCoords } from '../utils/map'

const defaultPlacemark = [55.73, 37.75]

type DraggablePlacemarkHookOptions = {
  onChange?: (value: DeliveryPlacemark) => void
  value?: DeliveryPlacemark
}

export const useMapSelectPlacemark = (
  map: MutableRefObject<any>,
  { onChange, value }: DraggablePlacemarkHookOptions
) => {
  const mapPlacemark = useRef<any>()

  const handlePlacemarkMove = async () => {
    const coords =
      mapPlacemark.current?.geometry?.getCoordinates() || defaultPlacemark
    onChange?.({
      address: await getAddressByCoords(coords),
      coords
    })
  }

  const animateMapToCoords = (coords: number[]) => {
    return map.current?.setCenter(coords, map.current?.getZoom(), {
      duration: 500
    })
  }

  const initPlacemark = (defaultCoords: number[]) => {
    mapPlacemark.current = createYandexPlacemark({ coords: defaultCoords })
    map.current?.geoObjects.add(mapPlacemark.current)

    mapPlacemark.current?.events.add('dragend', async () => {
      handlePlacemarkMove()
    })
  }

  const setMapPlacemark = (coords: number[]) => {
    if (mapPlacemark.current) {
      mapPlacemark.current?.geometry?.setCoordinates(coords)
    } else {
      initPlacemark(coords)
    }
  }

  mapPlacemark.current?.events.add('dragend', async () => {
    handlePlacemarkMove()
  })

  const handleMapClick = useCallback(async (e: any) => {
    const coords: number[] = e.get('coords')
    setMapPlacemark(coords)
    handlePlacemarkMove()
  }, [])

  useEffect(() => {
    map.current?.events.remove('click', handleMapClick as any)
    map.current?.events.add('click', handleMapClick)
  }, [map.current])

  useEffect(() => {
    if (value) {
      const localCoords =
        mapPlacemark.current?.geometry?.getCoordinates() || defaultPlacemark

      const coordsSameAsPrevious = value.coords.every(
        (v, i) => v === localCoords[i]
      )
      if (!coordsSameAsPrevious) {
        setMapPlacemark(value.coords)
        animateMapToCoords(value.coords)
      }
    }
  }, [value])
}
