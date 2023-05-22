import clsx from 'clsx'
import { FC, MouseEvent, ReactNode, useState } from 'react'

import { useOrdersActive } from '../api/modules/orders/hooks/useOrdersActive'
import { AppButton } from './AppButton'
import { CheckoutConfig } from './CheckoutConfig'
import { CheckoutOrderList } from './CheckoutOrderList'
import { PageTitle } from './PageTitle'

type Props = {
  className?: string
  submitButton: ReactNode
}

export const CheckoutViewMobile: FC<Props> = ({ className, submitButton }) => {
  const [configFormVisible, setConfigFormVisible] = useState(false)

  const { data: orders } = useOrdersActive()
  const hasActiveOrders = (orders?.length || 0) > 0 || true

  const handleGoBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (configFormVisible) {
      e.preventDefault()
      setConfigFormVisible(false)
    }
  }

  return (
    <div className={clsx('h-full', className, hasActiveOrders && 'pb-100')}>
      <PageTitle
        title="Оформление заказа"
        goBackHref="/"
        goBackClickHandler={handleGoBackClick}
      />

      {!configFormVisible ? (
        <div className="flex flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto">
            <CheckoutOrderList
              className={clsx('mt-14', hasActiveOrders ? 'mb-80' : 'mb-60')}
            />
          </div>

          <div
            className={clsx(
              'fixed bottom-0 left-0 right-0 bg-white py-6 px-16',
              hasActiveOrders ? 'pb-100' : 'pb-10'
            )}
          >
            <AppButton
              className="w-full"
              onClick={() => setConfigFormVisible(true)}
            >
              Ввести данные
            </AppButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex">
            <div className="mt-22 flex w-full flex-col">
              <CheckoutConfig />
            </div>
          </div>

          <div className="mt-32 mb-16 flex w-full flex-col">{submitButton}</div>
        </div>
      )}
    </div>
  )
}
