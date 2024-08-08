import clsx from 'clsx'
import { FC } from 'react'

import { useRestaurantInfo } from '../api/modules/restaurants/hooks/useRestaurantInfo'
import { AppAlert } from './AppAlert'
import { AppTransition } from './AppTransition'

type Props = {
  className?: string
}

export const IndexPageWorkHours: FC<Props> = ({ className }) => {
  const { data: restaurantInfo, isLoading } = useRestaurantInfo()

  const message = `xx xx xx xx xx xx: ${restaurantInfo?.workingHoursString}`

  return (
    <AppTransition
      show={
        !isLoading &&
        !restaurantInfo?.working &&
        !!restaurantInfo?.workingHoursString
      }
    >
      <div className={clsx('flex', className)}>
        <AppAlert
          title={message}
          text="xx xx xx xx"
          variant="error"
        />
      </div>
    </AppTransition>
  )
}
