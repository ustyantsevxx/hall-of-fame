import clsx from 'clsx'
import { FC, useContext, useMemo } from 'react'
import { useController, useFormContext, UseFormReturn } from 'react-hook-form'

import { DELIVERY_METHOD } from '../api/modules/delivery-methods/delivery-methods.constants'
import { useDeliveryMethods } from '../api/modules/delivery-methods/hooks/useDeliveryMethods'
import { AppRadioGroup } from './AppRadioGroup'
import { RadioGroupOption } from './AppRadioGroup.types'
import { AppTransition } from './AppTransition'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'
import { CheckoutConfigDeliveryCourier } from './CheckoutConfigDeliveryCourier'
import { CheckoutConfigDeliveryPickup } from './CheckoutConfigDeliveryPickup'

type Props = {
  className?: string
}

const deliveryConfiguratorByMethod = {
  [DELIVERY_METHOD.COURIER]: CheckoutConfigDeliveryCourier,
  [DELIVERY_METHOD.PICKUP]: CheckoutConfigDeliveryPickup
}

export const CheckoutConfigDelivery: FC<Props> = ({ className }) => {
  const { data: deliveryMethods, isLoading } = useDeliveryMethods()

  const deliveryMethodOptions: RadioGroupOption[] = useMemo(
    () =>
      deliveryMethods?.map(({ id, name }) => ({
        key: id.toString(),
        name
      })) || [],
    [deliveryMethods]
  )

  const { control }: UseFormReturn<CheckoutFormData> = useFormContext()
  const { field } = useController({ control, name: 'deliveryMethod.typeId' })

  const selectDeliveryMethod = (methodId: number) => {
    field.onChange(methodId)
  }

  const selectedMethodOption = deliveryMethodOptions.find(
    method => +method.key === Number(field.value)
  )

  const ConfiguratorComponent =
    selectedMethodOption &&
    deliveryConfiguratorByMethod[+selectedMethodOption.key]

  const checkoutContext = useContext(CheckoutContext)

  const bonusCoinsByDeliveryMethod = {
    [DELIVERY_METHOD.COURIER]:
      checkoutContext.calculations?.coins_count_delivery,
    [DELIVERY_METHOD.PICKUP]:
      checkoutContext.calculations?.coins_count_self_delivery
  }

  return (
    <div className={clsx(className)}>
      <AppTransition show={!isLoading}>
        <AppRadioGroup
          label="Адрес доставки"
          value={selectedMethodOption}
          options={deliveryMethodOptions}
          nameRenderer={option => (
            <span className="flex space-x-5">
              <span>{option.name}</span>
              {!!bonusCoinsByDeliveryMethod[+option.key] && (
                <span className="text-black/50">
                  +{bonusCoinsByDeliveryMethod[+option.key]}
                </span>
              )}
            </span>
          )}
          onChange={option => selectDeliveryMethod(+option.key)}
        />

        {ConfiguratorComponent && <ConfiguratorComponent />}
      </AppTransition>

      {isLoading && (
        <p className="mt-11 h-25 text-black/50 text-regular-17">Загрузка...</p>
      )}
    </div>
  )
}
