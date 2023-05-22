import clsx from 'clsx'
import {
  ChangeEvent,
  FC,
  FormEventHandler,
  useContext,
  useEffect,
  useState
} from 'react'

import { useAuth } from '../api/modules/auth/hooks/useAuth'
import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import { useDialogsState } from '../store/dialogs'
import { AppButton } from './AppButton'
import { AppInput } from './AppInput'
import { CartConfigurationContext } from './CartConfiguration'
import { FormGroup } from './FormGroup'

type Props = {
  className?: string
  onLocalChange?: (value: string) => void
}

export const CartConfigurationPromocode: FC<Props> = ({
  className,
  onLocalChange
}) => {
  const { data: cartItems } = useCartItems()

  const [localPromoCode, _setLocalPromoCode] = useState('')
  const [promoCodeNotFound, setPromoCodeNotFound] = useState(false)
  const [promoCodeLoading, setPromoCodeLoading] = useState(false)
  const context = useContext(CartConfigurationContext)

  const setLocalPromoCode = (value: string) => {
    _setLocalPromoCode(value)
    onLocalChange?.(value)
  }

  const codeApplied = !promoCodeLoading && context.calculations?.promocode_used

  const setFormPromoCode = (promoCode: string | undefined) => {
    context.setPromocode?.(promoCode)
  }
  const applyFormPromoCode = () => {
    setFormPromoCode(localPromoCode.length > 0 ? localPromoCode : undefined)
  }

  const auth = useAuth()
  const { setAuthModalOpened } = useDialogsState()

  const tryApplyCode = async () => {
    try {
      if (!auth.user) {
        setAuthModalOpened(true)
        setLocalPromoCode('')
      } else {
        setPromoCodeLoading(true)
        applyFormPromoCode()
        await context.refetchCalculations?.()
        if (!context.calculations?.promocode_used) {
          setPromoCodeNotFound(true)
        } else {
          setPromoCodeNotFound(true)
          setFormPromoCode(undefined)
        }
      }
    } catch {
      setPromoCodeNotFound(true)
      setFormPromoCode(undefined)
    } finally {
      setPromoCodeLoading(false)
    }
  }

  const resetCode = async () => {
    setLocalPromoCode('')
    setPromoCodeNotFound(false)
    setFormPromoCode(undefined)

    if (codeApplied) {
      await context.refetchCalculations?.()
    }
  }

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()
    tryApplyCode()
  }
  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = e => {
    setLocalPromoCode(e.target.value)
    setPromoCodeNotFound(false)
  }

  useEffect(() => {
    setPromoCodeNotFound(false)
  }, [cartItems])

  return (
    <div>
      <form className={clsx(className)} onSubmit={handleSubmit}>
        <FormGroup
          className="grow"
          successMessage={codeApplied}
          errorMessage={
            !context.loading && !codeApplied && promoCodeNotFound && 'Ошибка'
          }
          onReset={resetCode}
        >
          <AppInput
            value={localPromoCode}
            className="w-full disabled:cursor-not-allowed disabled:!opacity-100"
            placeholder="Промокод"
            disabled={codeApplied}
            onChange={handleChange}
          />
        </FormGroup>

        <div className="mt-10 flex h-[42px] w-full items-center">
          {!codeApplied ? (
            <AppButton
              variant="secondary"
              className="w-full"
              disabled={
                localPromoCode.length === 0 ||
                promoCodeLoading ||
                promoCodeNotFound
              }
            >
              Применить промокод
            </AppButton>
          ) : (
            <button
              className="w-full p-10"
              title="Сбросить промокод"
              onClick={resetCode}
            >
              Сбросить промокод
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
