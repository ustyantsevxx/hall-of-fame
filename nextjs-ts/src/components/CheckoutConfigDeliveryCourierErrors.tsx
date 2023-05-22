import clsx from 'clsx'
import { FC, useContext } from 'react'
import { useFormContext, UseFormReturn } from 'react-hook-form'

import { useCartTotalCost } from '../api/modules/cart/hooks/useCartTotalCost'
import { formatRuble } from '../utils/number'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'
import { CheckoutAlert } from './CheckoutAlert'

type Props = {
  className?: string
}

export const CheckoutConfigDeliveryCourierErrors: FC<Props> = () => {
  const { getValues }: UseFormReturn<CheckoutFormData> = useFormContext()
  const checkoutContext = useContext(CheckoutContext)
  const { total } = useCartTotalCost()
  const calculatedTotal = checkoutContext.calculations?.total || total

  const addressCoords = getValues('deliveryMethod.addressCoords')
  const addressCoordsSelected = addressCoords?.lat && addressCoords?.lng

  const noDeliveryToSelectedAddress =
    addressCoordsSelected &&
    !checkoutContext.loading &&
    !checkoutContext.calculations?.delivery_polygon

  const totalPrinceNotEnough =
    calculatedTotal <
    (checkoutContext.calculations?.delivery_polygon?.min_order || 0)

  const noErrors = !noDeliveryToSelectedAddress && !totalPrinceNotEnough

  return (
    <>
      {noErrors && addressCoordsSelected && (
        <>
          {checkoutContext.calculations?.delivery_polygon?.min_order && (
            <p className={clsx('mt-12 text-black/50 text-regular-15')}>
              Бесплатно доставим за{' '}
              {checkoutContext.calculations?.delivery_polygon?.delivery_time}{' '}
              мин
            </p>
          )}
        </>
      )}

      {addressCoordsSelected && (
        <>
          {noDeliveryToSelectedAddress && (
            <CheckoutAlert
              variant="error"
              text="На выбранный адрес доставка не осуществляется"
              className="mt-20 !text-black"
            />
          )}
        </>
      )}

      {addressCoordsSelected && (
        <>
          {totalPrinceNotEnough && (
            <CheckoutAlert
              variant="error"
              text={`Минимальная сумма заказа для вашей зоны на доставку составляет ${formatRuble(
                checkoutContext.calculations?.delivery_polygon?.min_order
              )}`}
              className="mt-20 !text-black"
            />
          )}
        </>
      )}
    </>
  )
}
