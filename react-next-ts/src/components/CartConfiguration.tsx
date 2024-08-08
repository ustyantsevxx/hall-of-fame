import clsx from 'clsx'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { createContext, FC, useEffect, useState } from 'react'

import { useAuth } from '../api/modules/auth/hooks/useAuth'
import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import { useCartTotalCost } from '../api/modules/cart/hooks/useCartTotalCost'
import { usePersonCountState } from '../api/modules/cart/hooks/usePersonCount'
import { useOrdersCalculations } from '../api/modules/orders/hooks/useOrderCalculations'
import {
  BIRTHDAY_COOKIES_KEY,
  PROMOCODE_COOKIES_KEY
} from '../api/modules/orders/orders.constants'
import { OrdersCalculationResponse } from '../api/modules/orders/orders.types'
import { getTotalCostFromCalculations } from '../api/modules/orders/orders.utils'
import { useDialogsState } from '../store/dialogs'
import { formatRuble } from '../utils/number'
import { AppButton } from './AppButton'
import { CartConfigurationItems } from './CartConfigurationItems'
import { CartConfigurationItemsExtra } from './CartConfigurationItemsExtra'
import { CartConfigurationPromocode } from './CartConfigurationPromocode'
import { CartItem } from './CartItem'

type Props = {
  onGoToCheckout?: () => void
}

export type CartConfigurationContextType = {
  calculations?: OrdersCalculationResponse
  promocode?: string
  birthdayProductCanceled?: boolean
  loading?: boolean
  setPromocode?: (promocode: string | undefined) => void
  setBirthdayProductCanceled?: (birthdayProductCanceled: boolean) => void
  refetchCalculations?: () => Promise<any>
}

export const CartConfigurationContext =
  createContext<CartConfigurationContextType>({})

export const CartConfiguration: FC<Props> = ({ onGoToCheckout }) => {
  const router = useRouter()
  const auth = useAuth()

  const { data: cartItems } = useCartItems()
  const { personCount, setPersonCount } = usePersonCountState()

  const { setAuthModalOpened } = useDialogsState()

  const [promocode, setPromocode] = useState<string>()
  const [birthdayProductCanceled, setBirthdayProductCanceled] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const {
    data: calculations,
    isLoading,
    isFetching,
    refetch
  } = useOrdersCalculations(
    {
      promoCode: promocode
    },
    {
      onError: error => {
        handleServerError(error)
      }
    }
  )
  const handleServerError = (error: any) => {
    setPromocode(undefined)

    const defaultMessage = 'xx xx. xx xx'
    const firstErrorMessage =
      error.response.status !== 500
        ? error.response?.data?.[0].description || defaultMessage
        : defaultMessage

    setErrorMessage(firstErrorMessage)
  }

  const context: CartConfigurationContextType = {
    calculations,
    promocode,
    birthdayProductCanceled,
    loading: isLoading,
    refetchCalculations: refetch,
    setBirthdayProductCanceled: v => setBirthdayProductCanceled(v),
    setPromocode: promocode => {
      setErrorMessage(undefined)
      setPromocode(promocode)
    }
  }

  useEffect(() => {
    setErrorMessage(undefined)
  }, [cartItems])

  const { total: localTotal } = useCartTotalCost()
  const { total, oldTotal, birthday } =
    getTotalCostFromCalculations(calculations)

  const formattedTotal = formatRuble(total || localTotal)

  const tryGoToCheckout = () => {
    if (!auth.user) {
      setAuthModalOpened(true)
    } else {
      setCookie(PROMOCODE_COOKIES_KEY, promocode)
      setCookie(BIRTHDAY_COOKIES_KEY, birthdayProductCanceled)
      router.push('/checkout')
      onGoToCheckout?.()
    }
  }

  return (
    <CartConfigurationContext.Provider value={context}>
      <div className="flex min-h-full w-full flex-col justify-between">
        <div className="pb-36 md:mb-0">
          <CartConfigurationItems />

          <CartConfigurationItemsExtra />

          <CartItem
            className="mt-36"
            name="xx"
            priceHidden
            count={personCount}
            onCountChange={setPersonCount}
          />
        </div>

        <div>
          <CartConfigurationPromocode
            onLocalChange={() => setErrorMessage(undefined)}
          />

          <div className="mt-26 flex items-center justify-between md:mb-0">
            <div className="text-black/50 text-regular-17">xx</div>
            <div
              className={clsx(
                ' flex items-center space-x-11 text-black transition delay-200 text-medium-20',
                { 'opacity-50': isFetching }
              )}
            >
              {oldTotal && oldTotal > 0 && (
                <div
                  className={clsx(
                    ' text-[#808080] line-through text-regular-17'
                  )}
                >
                  {formatRuble(oldTotal)}
                </div>
              )}
              <div className={clsx('text-medium-20')}>{formattedTotal}</div>
            </div>
          </div>

          {errorMessage && <p className="my-10 text-red">{errorMessage}</p>}

          {birthday && calculations && (
            <p className="mt-10 mb-18 text-pink text-medium-17">
              xx {calculations.birth_day_discount}% xx xx xx
            </p>
          )}
          <div className="fixed bottom-0 left-0 right-0 border-t border-t-gray bg-white px-16 pt-2 pb-20 md:static md:mt-18 md:border-t-0 md:px-0 md:py-0 md:pb-0 ">
            <AppButton
              className="mt-18 w-full md:block"
              disabled={isLoading}
              onClick={tryGoToCheckout}
            >
              {isLoading ? (
                'xx...'
              ) : (
                <>
                  <span className="hidden md:block">xx xx xx</span>
                  <span className="md:hidden">
                    xx xx xx {formattedTotal}
                  </span>
                </>
              )}
            </AppButton>
          </div>

          <div className="h-90 w-full md:h-38"></div>
        </div>
      </div>
    </CartConfigurationContext.Provider>
  )
}
