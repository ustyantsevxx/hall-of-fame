import clsx from 'clsx'
import { FC, useEffect } from 'react'
import { useFormContext, UseFormReturn } from 'react-hook-form'

import { useUser } from '../api/modules/user/hooks/useUser'
import { AppInput } from './AppInput'
import { CheckoutFormData } from './Checkout.types'
import { FormFloatingLabel } from './FormFloatingLabel'
import { FormGroup } from './FormGroup'
import { InputPhoneNumber } from './InputPhoneNumber'

type Props = {
  className?: string
}

export const CheckoutConfigPersonalInfo: FC<Props> = ({ className }) => {
  const { data: user } = useUser()
  const { register, setValue }: UseFormReturn<CheckoutFormData> =
    useFormContext()

  useEffect(() => {
    setValue('personalInfo.name', user?.name || '')
    setValue('personalInfo.phone', user?.phone)
  }, [user, setValue])

  return (
    <div className={clsx(className)}>
      <h2 className="sr-only">Данные профиля</h2>

      <div className="grid gap-26 md:grid-cols-2 md:gap-20">
        <FormGroup>
          <FormFloatingLabel label="Ваше имя">
            {({ id }) => (
              <AppInput
                id={id}
                placeholder="Ваше имя"
                className="w-full"
                {...register('personalInfo.name')}
              />
            )}
          </FormFloatingLabel>
        </FormGroup>

        <FormGroup>
          <FormFloatingLabel label="Номер телефона">
            {({ id }) => (
              <InputPhoneNumber
                id={id}
                key={user?.id}
                type="tel"
                placeholder="Номер телефона"
                className="block w-full grow"
                defaultValue={user?.phone || ''}
                readOnly
              />
            )}
          </FormFloatingLabel>
        </FormGroup>
      </div>
    </div>
  )
}
