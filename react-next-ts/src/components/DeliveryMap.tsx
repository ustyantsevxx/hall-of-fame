/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { FC, useEffect } from 'react'

import { useDeliveryZones } from '../api/modules/delivery-polygons/hooks/useDeliveryZones'
import { useRestaurants } from '../api/modules/restaurants/hooks/useRestaurants'
import { getRestraurantAddressString } from '../api/modules/restaurants/restaurants.utils'
import { useMap } from '../hooks/useMap'
import { deliveryPolygonToCoords } from '../utils/map'
import { formatRuble } from '../utils/number'

type Props = {
  className?: string
}

export const DeliveryMap: FC<Props> = ({ className }) => {
  const { mapContainerId, addZone, addAppPlacemark, clear } = useMap()

  const { data: deliveryZones } = useDeliveryZones()
  const { data: restaurants } = useRestaurants()

  const addDeliveryZonesToMap = () => {
    for (const zone of deliveryZones || []) {
      for (const polygon of zone.polygons) {
        addZone({
          color: zone.color,
          coords: deliveryPolygonToCoords(polygon),
          hint: `xx xx xx ${formatRuble(zone.min_order)}, ~${
            zone.delivery_time
          } xx`
        })
      }
    }
  }

  const addRestrauntsToMap = () => {
    for (const restaurant of restaurants || []) {
      addAppPlacemark({
        coords: [restaurant.geo_point.lat, restaurant.geo_point.lng],
        hint: getRestraurantAddressString(restaurant)
      })
    }
  }

  useEffect(() => {
    clear()
    addDeliveryZonesToMap()
    addRestrauntsToMap()
  }, [deliveryZones, restaurants])

  return (
    <>
      <div
        id={mapContainerId}
        className={clsx(
          'overflow-hidden rounded-22 border border-gray',
          className
        )}
      ></div>
    </>
  )
}
