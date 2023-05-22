import { FC } from 'react'

import { CheckoutConfigBonusCoins } from './CheckoutConfigBonusCoins'
import { CheckoutConfigComment } from './CheckoutConfigComment'
import { CheckoutConfigDelivery } from './CheckoutConfigDelivery'
import { CheckoutConfigPaymentMethod } from './CheckoutConfigPaymentMethod'
import { CheckoutConfigPersonalInfo } from './CheckoutConfigPersonalInfo'
import { CheckoutConfigTime } from './CheckoutConfigTime'

export const CheckoutConfig: FC = () => {
  return (
    <>
      <CheckoutConfigPersonalInfo />
      <CheckoutConfigDelivery className="mt-34" />
      <CheckoutConfigTime className="mt-34" />
      <CheckoutConfigPaymentMethod className="mt-34" />
      <CheckoutConfigBonusCoins className="mt-36" />
      <CheckoutConfigComment className="mt-32" />
    </>
  )
}
