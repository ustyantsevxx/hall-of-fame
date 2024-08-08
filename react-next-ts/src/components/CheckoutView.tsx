import { FC, useContext } from 'react'
import { useFormContext, UseFormReturn } from 'react-hook-form'

import { useCartTotalCost } from '../api/modules/cart/hooks/useCartTotalCost'
import { getTotalCostFromCalculations } from '../api/modules/orders/orders.utils'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import { formatRuble } from '../utils/number'
import { AppButton } from './AppButton'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'
import { CheckoutViewDesktop } from './CheckoutViewDesktop'
import { CheckoutViewMobile } from './CheckoutViewMobile'

type Props = {
  onSubmit: () => void
}

export const CheckoutView: FC<Props> = ({ onSubmit }) => {
  const { formState }: UseFormReturn<CheckoutFormData> = useFormContext()
  const checkoutContext = useContext(CheckoutContext)

  const mobileViewBreakpoints = ['xs', 'sm']
  const { breakpoint } = useCurrentBreakpoint()
  const isMobileView = mobileViewBreakpoints.includes(breakpoint)

  const { total: localTotal } = useCartTotalCost()
  const { total } = getTotalCostFromCalculations(checkoutContext.calculations)

  const hasErrors = Object.values(formState.errors).length > 0

  const errorsToDisplay = [
    formState.errors.personalInfo?.name?.message,
    formState.errors.personalInfo?.phone?.message,
    formState.errors.deliveryTime?.typeId?.message,
    formState.errors.deliveryMethod?.typeId?.message,
    formState.errors.deliveryMethod?.restaurantId?.message,
    formState.errors.deliveryMethod?.addressCoords?.lat?.message,
    formState.errors.deliveryTime?.typeId?.message,
    formState.errors.deliveryTime?.exactTime?.message,
    formState.errors.paymentMethod?.typeId?.message,
    formState.errors.promoCode?.message,
    formState.errors.bonusCoinsToUse?.message
  ].filter(Boolean)

  const submitButton = (
    <>
      {hasErrors && (
        <div className="mb-16">
          {errorsToDisplay.length > 0 ? (
            <>
              {errorsToDisplay.map(error => (
                <p key={error} className=" text-red">
                  {error}
                </p>
              ))}
            </>
          ) : (
            <p className="text-red">xx xx xx xx</p>
          )}
        </div>
      )}
      <div className="flex w-full flex-wrap">
        <AppButton
          className="w-full"
          disabled={checkoutContext.loading}
          onClick={onSubmit}
        >
          {checkoutContext.loading
            ? 'xx...'
            : `xx xx xx ${formatRuble(total || localTotal)}`}
        </AppButton>
      </div>
    </>
  )

  return (
    <>
      {isMobileView ? (
        <div className="container mt-4 md:mt-50">
          <CheckoutViewMobile submitButton={submitButton} />
        </div>
      ) : (
        <div className="container mt-4 md:mt-50">
          <CheckoutViewDesktop submitButton={submitButton} />
        </div>
      )}
    </>
  )
}
