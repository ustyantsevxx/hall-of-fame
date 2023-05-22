import clsx from 'clsx'
import { FC, useEffect, useMemo } from 'react'
import { useController, useFormContext, UseFormReturn } from 'react-hook-form'

import { NEW_ADDRESS_KEY } from '../api/modules/addresses/address.constants'
import { makeAddressString } from '../api/modules/addresses/addresses.utils'
import { useAddresses } from '../api/modules/addresses/hooks/useAddresses'
import { AddressForm } from './AddressForm'
import { AddressFormData } from './AddressForm.types'
import { AppRadioGroup } from './AppRadioGroup'
import { RadioGroupOption } from './AppRadioGroup.types'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutConfigDeliveryCourierErrors } from './CheckoutConfigDeliveryCourierErrors'

type Props = {
  className?: string
}

export const CheckoutConfigDeliveryCourier: FC<Props> = ({ className }) => {
  const { data: addresses } = useAddresses()

  const addressOptions: RadioGroupOption[] = useMemo(() => {
    return [
      ...(addresses?.map(address => ({
        key: address.id.toString(),
        name: makeAddressString(address),
        description:
          (address.delivery_polygon?.delivery_time &&
            `Бесплатно доставим за ${address.delivery_polygon?.delivery_time} мин`) ||
          ''
      })) || []),
      {
        key: NEW_ADDRESS_KEY.toString(),
        name: 'Новый адрес'
      }
    ]
  }, [addresses])

  const { control, setValue }: UseFormReturn<CheckoutFormData> =
    useFormContext()
  const { field } = useController({ control, name: 'deliveryMethod.addressId' })
  const { field: deliveryAddressCoords } = useController({
    control,
    name: 'deliveryMethod.addressCoords'
  })

  const selectedOption = addressOptions.find(
    address => +address.key === field.value
  )

  const selectOption = (addressId: number) => {
    const selectedAddress = addresses?.find(address => address.id === addressId)
    deliveryAddressCoords.onChange({
      lat: selectedAddress?.geo_point?.lat,
      lng: selectedAddress?.geo_point?.lng
    })
    field.onChange(addressId)
  }

  useEffect(() => {
    const defaultAddressId = addresses?.[0]?.id
    if (!field.value && defaultAddressId) {
      selectOption(defaultAddressId)
    }

    if (addresses?.length === 0 && !field.value) {
      selectOption(NEW_ADDRESS_KEY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressOptions, field.value])

  const addressFormOpened = field.value === NEW_ADDRESS_KEY

  const applyNewAddressParams = (address: AddressFormData) => {
    deliveryAddressCoords.onChange({
      lat: address.coords?.lat,
      lng: address.coords?.lng
    })
    setValue('deliveryMethod.newAddress', address)
  }

  return (
    <div className={clsx(className, 'mt-32')}>
      <AppRadioGroup
        label="Адрес доставки"
        value={selectedOption}
        options={addressOptions}
        onChange={option => selectOption(+option.key)}
      />

      {addressFormOpened && (
        <>
          <AddressForm
            className="mt-20"
            hideComment
            hideActions
            onValidChange={applyNewAddressParams}
          />
          <CheckoutConfigDeliveryCourierErrors />
        </>
      )}
    </div>
  )
}
