import clsx from 'clsx'
import { FC } from 'react'

import { ORDER_STATUS_ACTIONS } from '../api/modules/orders/orders.constants'
import { Order, OrderActions } from '../api/modules/orders/orders.types'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import { AppButton } from './AppButton'
import { ButtonSize, ButtonVariant } from './AppButton.types'

type Props = {
  className?: string
  order: Order
  onRepeat?: () => void
  onCancel?: () => void
  onRate?: () => void
}

type OrderActionConfig = {
  variant: ButtonVariant
  children: string
  onClick?: () => void
}

export const HistoryOrderItemActions: FC<Props> = ({
  order,
  className,
  onRepeat,
  onCancel,
  onRate
}) => {
  const { breakpoint } = useCurrentBreakpoint()
  const normalSizeBreakpoints = ['lg', 'xl', '2xl']
  const buttonSize: ButtonSize = normalSizeBreakpoints.includes(breakpoint)
    ? 'normal'
    : 'mini'

  const orderActionConfig: Record<OrderActions, OrderActionConfig> = {
    [OrderActions.CANCEL]: {
      variant: 'secondary',
      children: 'xx',
      onClick: onCancel
    },
    [OrderActions.REPEAT]: {
      variant: 'secondary',
      children: 'xx',
      onClick: onRepeat
    },
    [OrderActions.RATE]: {
      children: 'xx',
      variant: 'primary',
      onClick: onRate
    }
  }

  const orderActions = ORDER_STATUS_ACTIONS[order.status.id]

  return (
    <div
      className={clsx('flex space-x-4 sm:space-x-14 md:space-x-18', className)}
    >
      {orderActions.map(action => {
        const config = orderActionConfig[action]
        return <AppButton key={action} size={buttonSize} {...config} />
      })}
    </div>
  )
}
