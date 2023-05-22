import clsx from 'clsx'
import { FC } from 'react'
import { useController, useFormContext, UseFormReturn } from 'react-hook-form'

import { DELIVERY_TIME_TYPE } from '../api/modules/delivery-methods/delivery-methods.constants'
import { AppRadioGroup } from './AppRadioGroup'
import { RadioGroupOption } from './AppRadioGroup.types'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutConfigTimeExact } from './CheckoutConfigTimeExact'

type Props = {
  className?: string
}

export const CheckoutConfigTime: FC<Props> = ({ className }) => {
  const deliveryMethodOptions: RadioGroupOption[] = [
    {
      key: DELIVERY_TIME_TYPE.SOON.toString(),
      name: 'В ближайшее время'
    },
    {
      key: DELIVERY_TIME_TYPE.EXACT_TIME.toString(),
      name: 'Точное время'
    }
  ]

  const { control }: UseFormReturn<CheckoutFormData> = useFormContext()

  const methodController = useController({
    control,
    name: 'deliveryTime.typeId'
  })
  const selectedMethodOption = deliveryMethodOptions.find(
    option => +option.key === methodController.field.value
  )
  const selectMethodOption = (optionId: number) => {
    methodController.field.onChange(optionId)
  }

  return (
    <div className={clsx(className)}>
      <AppRadioGroup
        label="Время доставки"
        value={selectedMethodOption}
        options={deliveryMethodOptions}
        onChange={option => selectMethodOption(+option.key)}
      />

      {selectedMethodOption?.key ===
        DELIVERY_TIME_TYPE.EXACT_TIME.toString() && (
        <div className="mt-20">
          <CheckoutConfigTimeExact />
        </div>
      )}
    </div>
  )
}
