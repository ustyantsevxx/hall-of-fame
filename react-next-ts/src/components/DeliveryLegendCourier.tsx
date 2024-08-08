import { FC, useState } from 'react'

import { useDeliveryZones } from '../api/modules/delivery-polygons/hooks/useDeliveryZones'
import { formatRuble } from '../utils/number'
import { AppButton } from './AppButton'
import { DeliveryLegendCourierZoneInfo } from './DeliveryLegendCourierZoneInfo'
import { DeliverySelectAddressModal } from './DeliverySelectAddressModal'

export const DeliveryLegendCourier: FC = () => {
  const { data: deliveryZones } = useDeliveryZones()

  const formattedZones =
    deliveryZones?.map(zone => ({
      id: zone.id,
      title: `xx xx xx ${formatRuble(zone.min_order)}`,
      subtitle: `xx xx xx ${zone.delivery_time} xx`,
      indicatorColor: zone.color
    })) || []

  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="">
      <div className="space-y-14 overflow-y-auto">
        {formattedZones.map(zone => (
          <DeliveryLegendCourierZoneInfo key={zone.id} {...zone} />
        ))}
      </div>

      <DeliverySelectAddressModal
        opened={modalOpened}
        onClose={setModalOpened}
      />

      <AppButton
        className="mt-16 w-full md:mt-36"
        onClick={() => setModalOpened(true)}
      >
        xx xx xx
      </AppButton>
    </div>
  )
}
