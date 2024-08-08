import { Dialog } from '@headlessui/react'
import { FC, useState } from 'react'

import { Order } from '../api/modules/orders/orders.types'
import { checkCanCancelOrder } from '../api/modules/orders/orders.utils'
import CloseSvg from '../assets/svg/Close.svg'
import { formatRuble } from '../utils/number'
import { AppButton } from './AppButton'
import { AppModal } from './AppModal'
import { OrderActiveModalDeliveryInfo } from './OrderActiveModalDeliveryInfo'
import { OrderListTable } from './OrderListTable'

type Props = {
  opened: boolean
  className?: string
  order?: Order
  onClose: (value: boolean) => void
  onCancel?: () => void
}

export const OrderActiveModal: FC<Props> = ({
  onClose,
  onCancel,
  opened,
  order
}) => {
  const canCancelOrder = order && checkCanCancelOrder(order)
  const closeModal = () => onClose(false)

  const [requestedCancelOrder, setRequestedCancelOrder] = useState(false)

  const handleCancelButtonClick = () => {
    setRequestedCancelOrder(true)
    closeModal()
  }
  const handleModalClosed = () => {
    if (requestedCancelOrder) {
      onCancel && onCancel()
      setRequestedCancelOrder(false)
    }
  }

  const orderListItems =
    order?.products.map((product, index) => ({
      ...product,
      id: product.id + index
    })) || []

  return (
    <AppModal
      emptyFocusTrap
      wrapperClassName="md:!grow-0"
      contentWrapperClassName="!m-0 grow flex flex-col md:block md:grow-0"
      headerClassName="px-10 pt-10 !text-white md:!hidden"
      panelClassName="!p-0 !bg-transparent md:items-center md:w-auto md:!grow-0 md:justify-center relative"
      mobileCloseButtonClassName="!hidden"
      opened={opened}
      onClose={onClose}
      onClosed={handleModalClosed}
    >
      {order && (
        <>
          <div className="flex h-full w-full grow flex-col items-center justify-center">
            <div
              className="sticky top-0 flex min-h-[210px] w-full flex-shrink-0 grow md:hidden"
              onClick={closeModal}
            ></div>

            <div className="z-10 flex max-h-screen w-full flex-col overflow-hidden rounded-t-22 bg-white md:mt-0 md:max-h-[488px] md:w-[541px] md:rounded-22 md:px-0">
              <div className="relative">
                <Dialog.Title
                  as="h3"
                  className="sticky mx-16 block border-b border-black/10 pt-22 pb-16 text-center text-regular-15 md:mx-30 md:text-regular-17"
                >
                  xx {order?.id}
                </Dialog.Title>

                <button
                  className="absolute right-10 top-1/2 -translate-y-1/2 md:hidden"
                  onClick={closeModal}
                >
                  <CloseSvg width={24} height={24} />
                </button>
              </div>

              <div className="grow overflow-y-auto">
                <OrderActiveModalDeliveryInfo order={order} />

                <div className="mt-30 flex-grow bg-gray px-16 pt-20 pb-30 md:mx-0 md:px-30 md:pt-26">
                  <p className="text-black/50 text-regular-15 md:text-regular-17">
                    xx xx xx {formatRuble(order.order_price)}
                  </p>
                  <OrderListTable
                    items={orderListItems}
                    className="mb-60 w-full text-regular-15 md:mb-0 md:text-regular-17"
                  />

                  {canCancelOrder && (
                    <AppButton
                      variant="secondary"
                      className="mt-30 hidden md:block"
                      onClick={handleCancelButtonClick}
                    >
                      xx xx
                    </AppButton>
                  )}
                </div>
              </div>
            </div>

            {canCancelOrder && (
              <div className="sticky bottom-0 z-20 w-full bg-gray px-16 pb-11 pt-9 md:hidden">
                <AppButton
                  variant="secondary"
                  className="w-full max-w-full"
                  onClick={handleCancelButtonClick}
                >
                  xx xx
                </AppButton>
              </div>
            )}
          </div>
        </>
      )}
    </AppModal>
  )
}
