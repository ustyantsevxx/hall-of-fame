import clsx from 'clsx'
import { FC, memo, useContext, useState } from 'react'
import { useFormContext, UseFormReturn } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

import BonusCoinLogoSvg from '../assets/svg/BonusCoinLogo.svg'
import { AppRange } from './AppRange'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'

type Props = {
  className?: string
}

export const CheckoutConfigBonusCoins: FC<Props> = memo(({ className }) => {
  const { setValue }: UseFormReturn<CheckoutFormData> = useFormContext()

  const [bonusCoinsRange, setBonusCoinsRange] = useState([0])

  const debouncedApplyFormBonusCoins = useDebouncedCallback(() => {
    setValue('bonusCoinsToUse', bonusCoinsRange[0])
  }, 500)

  const handleRangeChange = (value: number[]) => {
    setBonusCoinsRange(value)
    debouncedApplyFormBonusCoins()
  }

  const checkoutContext = useContext(CheckoutContext)

  const maxBonusCoinsToUse = Math.floor(
    checkoutContext.calculations?.max_coins_sub_count ?? 0
  )

  const disabled = maxBonusCoinsToUse === 0

  return (
    <>
      {!checkoutContext.calculations?.promocode_used && (
        <div className={clsx(className)}>
          <div className="flex text-black/50">
            <div className="">Списать</div>
            <BonusCoinLogoSvg width={24} height={24} className="ml-2" />
          </div>

          <div className="mt-10">
            <AppRange
              min={0}
              max={maxBonusCoinsToUse || 1}
              values={bonusCoinsRange}
              disabled={disabled}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      )}
    </>
  )
})

CheckoutConfigBonusCoins.displayName = 'CheckoutConfigBonusCoins'
