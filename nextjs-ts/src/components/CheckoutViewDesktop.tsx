import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import { CheckoutConfig } from './CheckoutConfig'
import { CheckoutOrderList } from './CheckoutOrderList'
import { PageTitle } from './PageTitle'

type Props = {
  className?: string
  submitButton: ReactNode
}

export const CheckoutViewDesktop: FC<Props> = ({ className, submitButton }) => {
  return (
    <div className={clsx(className)}>
      <PageTitle title="Оформление заказа" goBackHref="/" />

      <div className="flex justify-between">
        <div className="mt-32 flex w-full flex-col md:w-[512px]">
          <CheckoutConfig />
        </div>

        <div className="mt-32 md:ml-[30px] md:w-[561px]">
          <CheckoutOrderList />
        </div>
      </div>

      <div className="mt-32 flex w-full flex-wrap md:w-[512px]">
        {submitButton}
      </div>
    </div>
  )
}
