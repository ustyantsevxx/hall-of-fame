import clsx from 'clsx'
import { deleteCookie, getCookie } from 'cookies-next'
import { FC, MutableRefObject, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  AUTH_REDIRECTED_FROM_KEY,
  SMS_CODE_LENGTH
} from '../api/modules/auth/auth.constants'
import { useAuth } from '../api/modules/auth/hooks/useAuth'
import { useDialogsState } from '../store/dialogs'
import { AppButton } from './AppButton'
import { FormGroup } from './FormGroup'
import { InputMasked } from './InputMasked'

type Props = {
  className?: string
  phone?: string
  codeInputRef?: MutableRefObject<HTMLInputElement | null>
}

type FormFields = {
  code: string
}

export const ModalSignInFormCodeForm: FC<Props> = ({
  className,
  codeInputRef,
  phone
}) => {
  const [codeError, setCodeError] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const { register, handleSubmit, setValue, formState } = useForm<FormFields>({
    mode: 'onChange'
  })
  const { login } = useAuth()

  useEffect(() => {
    setCodeError(false)
  }, [phone])

  const { setAuthModalOpened } = useDialogsState()

  const [resetCounter, setResetCounter] = useState(0)
  const handleResetCode = () => {
    setValue('code', '')
    setResetCounter(resetCounter + 1)
    setCodeError(false)
  }

  const submit = async ({ code }: FormFields) => {
    if (phone && code) {
      setCodeError(false)
      setLoginLoading(true)

      const signInSuccess = await login({ phone, code })

      if (signInSuccess) {
        setAuthModalOpened(false)
        const redirectTo = getCookie(AUTH_REDIRECTED_FROM_KEY)
        if (redirectTo && typeof redirectTo === 'string') {
          deleteCookie(AUTH_REDIRECTED_FROM_KEY)
          location.assign(redirectTo)
        }
      } else {
        setLoginLoading(false)
        setCodeError(true)
      }
    }
  }

  return (
    <form
      className={clsx('flex grow flex-col', className)}
      onSubmit={handleSubmit(submit)}
    >
      <div className="grow">
        <FormGroup
          errorMessage={codeError && 'xx xx xx'}
          onReset={handleResetCode}
        >
          <InputMasked
            key={resetCounter}
            mask="0000"
            type="tel"
            disabled={!phone}
            placeholder="xx xx xx"
            className="w-full"
            onAccept={value => {
              codeError && setCodeError(false)
              setValue('code', value)

              if (value.length === SMS_CODE_LENGTH) {
                submit({ code: value })
              }
            }}
            {...register('code', {
              required: true,
              minLength: SMS_CODE_LENGTH,
              maxLength: SMS_CODE_LENGTH
            })}
            inputRef={(el: any) => {
              if (codeInputRef && el) {
                codeInputRef.current = el
              }
            }}
          />
        </FormGroup>
      </div>

      <AppButton
        disabled={!phone || !formState.isValid || loginLoading}
        className="mt-auto w-full md:mt-20"
      >
        xx xx xx
      </AppButton>
    </form>
  )
}
