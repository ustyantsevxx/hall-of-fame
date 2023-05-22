/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useId, useRef } from 'react'

import {
  AppMapPlacemark,
  AppMapZone,
  createAppPlacemark,
  createMap,
  createMapZone,
  createYandexPlacemark
} from '../utils/map'

export const useMap = () => {
  const mapContainerId = useId()
  const map = useRef<any>()

  useEffect(() => {
    map.current = createMap(mapContainerId)

    return () => {
      if (map.current) {
        map.current.destroy()
        map.current = undefined
      }
    }
  }, [])

  const addPlacemark = (createFn: (placemark: AppMapPlacemark) => any) => {
    return (placemark: AppMapPlacemark) => {
      const yandexPlacemark = createFn(placemark)
      map.current?.geoObjects.add(yandexPlacemark)

      return yandexPlacemark
    }
  }

  const addAppPlacemark = (placemark: AppMapPlacemark) => {
    return addPlacemark(createAppPlacemark)(placemark)
  }

  const addYandexPlacemark = (placemark: AppMapPlacemark) => {
    return addPlacemark(createYandexPlacemark)(placemark)
  }

  const addZone = (zone: AppMapZone) => {
    map.current?.geoObjects.add(
      createMapZone({
        color: zone.color,
        coords: zone.coords,
        hint: zone.hint
      })
    )
  }

  const clear = () => {
    map.current?.geoObjects.removeAll()
  }

  return {
    map,
    mapContainerId,
    clear,
    addZone,
    addAppPlacemark,
    addYandexPlacemark
  }
}
