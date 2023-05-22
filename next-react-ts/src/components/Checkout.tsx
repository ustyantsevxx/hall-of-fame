import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

import { useClearCart } from '../api/modules/cart/hooks/useCartClear'
import {
  DELIVERY_METHOD,
  DELIVERY_TIME_TYPE
} from '../api/modules/delivery-methods/delivery-methods.constants'
import { useCreateOrder } from '../api/modules/orders/hooks/useCreateOrder'
import { useOrdersCalculations } from '../api/modules/orders/hooks/useOrderCalculations'
import {
  BIRTHDAY_COOKIES_KEY,
  NEED_SHOW_ORDER_WITH_ID_KEY,
  PROMOCODE_COOKIES_KEY
} from '../api/modules/orders/orders.constants'
import { PAYMENT_METHOD } from '../api/modules/payment-methods/payment-methods.constants'
import { checkoutFormSchema } from './Checkout.schema'
import { CheckoutContextType, CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'
import { CheckoutView } from './CheckoutView'

const unwatchableFields = [
  'comment',
  'personalInfo.name',
  'personalInfo.phone',
  'promoCode',
  'paymentMethod.type',
  'paymentMethod.changeBanknote',
  'deliveryMethod.addressId',
  'deliveryMethod.newAddress',
  'deliveryTime.exactTime'
]

const tryOpenPaymentWindow = (url?: string | null) => {
  if (url) {
    location.assign(url)
  }
}

export const Checkout: FC = () => {
  const form = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        phone: ''
      },
      deliveryMethod: {
        typeId: DELIVERY_METHOD.COURIER
      },
      paymentMethod: {
        typeId: PAYMENT_METHOD.CASH_UPON_RECEIPT,
        changeBanknote: null
      },
      deliveryTime: {
        typeId: DELIVERY_TIME_TYPE.SOON
      },
      promoCode: (getCookie(PROMOCODE_COOKIES_KEY) as string) || undefined,
      withoutBirthdayProduct: getCookie(BIRTHDAY_COOKIES_KEY) as boolean
    }
  })

  const handleServerError = (error: any) => {
    const defaultMessage = 'Произошла ошибка. Попробуйте позже'
    const firstErrorMessage =
      error.response.status !== 500
        ? error.response?.data?.[0].description || defaultMessage
        : defaultMessage

    form.setError('personalInfo.name', { message: firstErrorMessage })
  }

  const {
    data: calculations,
    isLoading: calculationsLoading,
    isFetching: calculationsFetching,
    refetch
  } = useOrdersCalculations(form.getValues(), {
    onError: (error: any) => {
      handleServerError(error)
    }
  })

  const debouncedRefetch = useDebouncedCallback(refetch, 100)

  useEffect(() => {
    const subscription = form.watch(async (_, { name }) => {
      form.clearErrors()

      if (!unwatchableFields.some(fieldName => name?.includes(fieldName))) {
        await debouncedRefetch()
      }
    })
    return () => subscription.unsubscribe()
  }, [form, form.watch, debouncedRefetch])

  const router = useRouter()
  const { mutateAsync: createOrder } = useCreateOrder()
  const { mutate: clearCart } = useClearCart()

  const handleSubmit = form.handleSubmit(async formData => {
    try {
      const response = await createOrder(formData)
      clearCart()
      if (response?.acquiring?.payment_url) {
        tryOpenPaymentWindow(response.acquiring.payment_url)
      } else {
        await router.push({
          hostname: '/',
          query: {
            [NEED_SHOW_ORDER_WITH_ID_KEY]: response.id
          }
        })
      }
    } catch (error) {
      handleServerError(error)
    }
  })

  const loading =
    form.formState.isSubmitting || calculationsLoading || calculationsFetching

  const context: CheckoutContextType = {
    loading,
    calculations,
    refetchCalculations: refetch
  }

  return (
    <CheckoutContext.Provider value={context}>
      <FormProvider {...form}>
        <CheckoutView onSubmit={handleSubmit} />
      </FormProvider>
    </CheckoutContext.Provider>
  )
}
