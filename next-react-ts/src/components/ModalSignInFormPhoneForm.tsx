import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import { FC } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { useForm } from 'react-hook-form'

import { SMS_SEND_INTERVAL } from '../api/modules/auth/auth.constants'
import { PHONE_REGEX } from '../app/constants/regex'
import { AppButton } from './AppButton'
import { InputPhoneNumber } from './InputPhoneNumber'

type Props = {
  className?: string
  onSubmit?: (phone: string) => void
}

type FormFields = {
  phone: string
}

export const ModalSignInFormPhoneForm: FC<Props> = ({
  className,
  onSubmit
}) => {
  const [smsCodeSent, setSmsCodeSent] = useState(false)

  const { register, handleSubmit, setValue, formState, trigger } =
    useForm<FormFields>()

  const submit = (values: FormFields) => {
    setSmsCodeSent(true)
    onSubmit?.(values.phone)
  }

  const submitDisabled = smsCodeSent || !formState.isValid

  return (
    <form
      className={clsx('items-center md:flex md:w-full', className)}
      onSubmit={handleSubmit(submit)}
    >
      <InputPhoneNumber
        disabled={smsCodeSent}
        placeholder="Номер телефона"
        className="block w-full flex-1"
        onAccept={value => {
          setValue('phone', value)
          trigger('phone')
        }}
        {...register('phone', {
          pattern: PHONE_REGEX,
          required: true
        })}
      />

      <AppButton
        className="mt-14 w-full md:mt-0 md:ml-16 md:w-[146px]"
        variant="secondary"
        title={smsCodeSent ? 'Подождите' : ''}
        disabled={submitDisabled}
      >
        {!smsCodeSent ? (
          'Получить код'
        ) : (
          <Countdown
            date={dayjs().add(SMS_SEND_INTERVAL, 'seconds').toDate()}
            renderer={ctx => ctx.minutes + ':' + zeroPad(ctx.seconds)}
            onComplete={() => setSmsCodeSent(false)}
          />
        )}
      </AppButton>
    </form>
  )
}
