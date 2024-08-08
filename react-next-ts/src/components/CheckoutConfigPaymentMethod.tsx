import clsx from 'clsx'
import { FC, useMemo } from 'react'
import { useController, useFormContext, UseFormReturn } from 'react-hook-form'

import { usePaymentMethods } from '../api/modules/payment-methods/hooks/usePaymentMethods'
import { PAYMENT_METHOD } from '../api/modules/payment-methods/payment-methods.constants'
import { AppInput } from './AppInput'
import { AppRadioGroup } from './AppRadioGroup'
import { RadioGroupOption } from './AppRadioGroup.types'
import { AppTransition } from './AppTransition'
import { CheckoutFormData } from './Checkout.types'

type Props = {
  className?: string
}

export const CheckoutConfigPaymentMethod: FC<Props> = ({ className }) => {
  const { data: paymentMethods, isLoading } = usePaymentMethods()

  const paymentMethodOptions: RadioGroupOption[] = useMemo(
    () =>
      paymentMethods?.map(({ id, name }) => ({
        key: id.toString(),
        name
      })) || [],
    [paymentMethods]
  )

  const { control }: UseFormReturn<CheckoutFormData> = useFormContext()
  const { field } = useController({ control, name: 'paymentMethod.typeId' })
  const { field: billField } = useController({
    control,
    name: 'paymentMethod.changeBanknote'
  })
  const selectPaymentMethod = (paymentMethodId: number) => {
    field.onChange(paymentMethodId)
  }

  const selectedPaymentMethodOption = paymentMethodOptions.find(
    method => +method.key === Number(field.value)
  )

  return (
    <div className={clsx(className)}>
      <AppTransition show={!isLoading}>
        <AppRadioGroup
          label="xx xx"
          value={selectedPaymentMethodOption}
          options={paymentMethodOptions}
          onChange={option => selectPaymentMethod(+option.key)}
        />

        {Number(selectedPaymentMethodOption?.key) ===
          PAYMENT_METHOD.CASH_UPON_RECEIPT && (
          <AppInput
            className="mt-20 w-full md:w-[367px]"
            placeholder="xx xx xx xx"
            value={billField.value || ''}
            type="number"
            min={0}
            onChange={billField.onChange}
          />
        )}
      </AppTransition>

      {isLoading && (
        <p className="mt-11 h-25 text-black/50 text-regular-17">xx...</p>
      )}
    </div>
  )
}
