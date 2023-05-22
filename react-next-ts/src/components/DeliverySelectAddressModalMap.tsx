/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { FC, memo } from 'react'

import { useMap } from '../hooks/useMap'
import { useMapSelectPlacemark } from '../hooks/useMapSelectPlacemark'
import { DeliveryPlacemark } from './DeliverySelectAddressModal.types'

type Props = {
  className?: string
  value?: DeliveryPlacemark
  onChange?: (placemark: DeliveryPlacemark) => void
}

export const DeliverySelectAddressModalMap: FC<Props> = memo(
  ({ className, value, onChange }) => {
    const { mapContainerId, map } = useMap()
    useMapSelectPlacemark(map, {
      onChange,
      value
    })

    return (
      <div
        id={mapContainerId}
        className={clsx(
          'overflow-hidden rounded-22 border border-gray',
          className
        )}
      ></div>
    )
  }
)

DeliverySelectAddressModalMap.displayName = 'DeliverySelectAddressModalMap'
