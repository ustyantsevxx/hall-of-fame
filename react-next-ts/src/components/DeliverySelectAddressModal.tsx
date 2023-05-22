import { FC, useContext, useEffect, useState } from 'react'

import { DeliveryPolygonsService } from '../api/modules/delivery-polygons/delivery-polygons.service'
import MarkSvg from '../assets/svg/Mark.svg'
import { AppModal } from './AppModal'
import { DeliveryLegendContext } from './DeliveryLegend'
import { DELIVERY_LEGEND_TAB } from './DeliveryLegend.constants'
import { DeliveryPlacemark } from './DeliverySelectAddressModal.types'
import { DeliverySelectAddressModalMap } from './DeliverySelectAddressModalMap'
import { DeliverySelectAddressModalSearchInput } from './DeliverySelectAddressModalSearchInput'

type Props = {
  opened: boolean
  onClose: (value: boolean) => void
}

type DeliveryInfo = {
  time: number
  hasDelivery: boolean
}

export const DeliverySelectAddressModal: FC<Props> = ({ onClose, opened }) => {
  const [placemark, setPlacemark] = useState<DeliveryPlacemark>()

  const [mapReady, setMapReady] = useState(false)
  const handleModalOpened = () => {
    setMapReady(true)
  }

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>()
  const [deliveryInfoLoading, setDeliveryInfoLoading] = useState(false)
  const updateDeliveryInfo = async () => {
    try {
      setDeliveryInfoLoading(true)
      const zoneInfo = await DeliveryPolygonsService.checkPointPolygon({
        lat: placemark?.coords[0] || 0,
        lng: placemark?.coords[1] || 0
      })
      setDeliveryInfo({
        time: zoneInfo.delivery_time,
        hasDelivery: true
      })
    } catch {
      setDeliveryInfo({
        time: 0,
        hasDelivery: false
      })
    } finally {
      setDeliveryInfoLoading(false)
    }
  }

  useEffect(() => {
    if (placemark) {
      updateDeliveryInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placemark])

  const context = useContext(DeliveryLegendContext)
  const goToRestaurantsInfo = () => {
    onClose(false)
    context.selectTabByKey?.(DELIVERY_LEGEND_TAB.PICKUP)
  }

  const noDelivery =
    placemark && !deliveryInfoLoading && !deliveryInfo?.hasDelivery

  return (
    <>
      <AppModal
        title="Адрес доставки"
        contentWrapperClassName="grow flex flex-col"
        panelClassName="md:max-w-[710px]"
        emptyFocusTrap
        opened={opened}
        afterTitle={
          <>
            <button
              className="hidden text-green text-regular-15 md:block"
              onClick={goToRestaurantsInfo}
            >
              Точки самовывоза
            </button>
          </>
        }
        onOpened={handleModalOpened}
        onClose={onClose}
      >
        <p className="mt-4 max-w-[385px] text-black/50 text-regular-15">
          Удостоверьтесь, что ваш район входит в зону действия доставки
          ресторана
        </p>

        <div className="mt-20 h-50">
          {mapReady && (
            <DeliverySelectAddressModalSearchInput
              value={placemark}
              noDelivery={noDelivery}
              loading={deliveryInfoLoading}
              onChange={setPlacemark}
              onGoToRestaurantsInfo={goToRestaurantsInfo}
            />
          )}
        </div>

        <div className="mt-14 h-24">
          {deliveryInfoLoading ? (
            <span>Загрузка...</span>
          ) : (
            <>
              {!placemark ? (
                <span>Введите адрес доставки</span>
              ) : (
                <>
                  {deliveryInfo?.hasDelivery ? (
                    <div className="flex items-center">
                      <MarkSvg className="text-green" height={24} width={24} />
                      <div className="ml-6 font-bold">
                        Доставка ~{deliveryInfo.time} мин
                      </div>
                    </div>
                  ) : (
                    <span className="text-red">
                      Ресторан не доставляет по данному адресу
                    </span>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="mt-18 flex w-full grow flex-col pb-74 md:h-[294px] md:grow-0 md:pb-0">
          {mapReady && (
            <DeliverySelectAddressModalMap
              className="h-full w-full grow"
              value={placemark}
              onChange={setPlacemark}
            />
          )}
        </div>
      </AppModal>
    </>
  )
}
