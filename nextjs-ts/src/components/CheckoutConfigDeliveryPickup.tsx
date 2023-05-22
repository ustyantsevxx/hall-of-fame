import clsx from 'clsx'
import { FC, useEffect, useMemo } from 'react'
import { useController, useFormContext, UseFormReturn } from 'react-hook-form'

import { makeAddressString } from '../api/modules/addresses/addresses.utils'
import { useRestaurants } from '../api/modules/restaurants/hooks/useRestaurants'
import { AppSelect } from './AppSelect'
import { AppSelectOption } from './AppSelect.types'
import { AppTransition } from './AppTransition'
import { CheckoutFormData } from './Checkout.types'

type Props = {
  className?: string
}

export const CheckoutConfigDeliveryPickup: FC<Props> = ({ className }) => {
  const { data: restaurants, isLoading } = useRestaurants()
  const restaurantsOptions: AppSelectOption[] = useMemo(
    () =>
      restaurants?.map(restaurant => ({
        key: restaurant.id.toString(),
        name: makeAddressString(restaurant)
      })) || [],
    [restaurants]
  )

  const { control }: UseFormReturn<CheckoutFormData> = useFormContext()
  const { field } = useController({
    control,
    name: 'deliveryMethod.restaurantId'
  })

  const selectedOption = restaurantsOptions.find(
    option => +option.key === field.value
  )

  const selectOption = (addressId: number) => {
    field.onChange(addressId)
  }

  useEffect(() => {
    const defaultRestaurantId = restaurants?.[0]?.id

    if (!field.value && defaultRestaurantId !== undefined) {
      selectOption(defaultRestaurantId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantsOptions, field.value])

  return (
    <div className={clsx(className, 'mt-20')}>
      <AppTransition show={!isLoading}>
        <AppSelect
          label="Адрес самовывоза"
          options={restaurantsOptions}
          value={selectedOption}
          onChange={option => selectOption(+option.key)}
        />
      </AppTransition>

      {isLoading && (
        <p className="mt-11 h-25 text-black/50 text-regular-17">Загрузка...</p>
      )}
    </div>
  )
}
