import clsx from 'clsx'
import { FC } from 'react'

import { Order } from '../api/modules/orders/orders.types'
import { rawTimeToCalendarString } from '../utils/date'

type Props = {
  className?: string
  order: Order
}

export const HistoryOrderItemStatusHeaderDelivered: FC<Props> = ({
  className,
  order
}) => {
  // TODO выводить корректное время доставки
  const dateString = rawTimeToCalendarString(order.created_at)

  return (
    <div
      className={clsx(
        'flex items-center justify-between px-18 pt-16 pb-12 text-regular-15 md:px-40 md:pt-25',
        className
      )}
    >
      <div className="md:flex">
        <div className="whitespace-nowrap text-green">Доставлен</div>
        <div className="mt-4 flex items-center space-x-4 text-black/50 md:mt-0 md:ml-8">
          <div>{dateString}</div>

          {/* 
          TODO Доделать когда добавят отзыв на бэке
          {order &&
            (order ? (
              <>
                <div className="mt-2 text-[36px] text-black/30">&#183;</div>
                <div>Понравился</div>
              </>
            ) : (
              <>
                <div className="mt-2 text-[36px] text-black/30">&#183;</div>
                <div>Не понравился</div>
              </>
            ))} */}
        </div>
      </div>

      {/*
       TODO Доделать когда добавят отзыв на бэке
       <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray text-regular-20">
        <div className="mt-4">{order && (order ? <>😊</> : <>😣</>)}</div>
      </div> */}
    </div>
  )
}
