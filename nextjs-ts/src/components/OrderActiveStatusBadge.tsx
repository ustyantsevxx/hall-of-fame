import clsx from 'clsx'
import { FC } from 'react'

import SpinnerSvg from '../assets/svg/Spinner.svg'

type Props = {
  name: string
  active?: boolean
  passed?: boolean
}

export const OrderActiveStatusBadge: FC<Props> = ({ name, active, passed }) => {
  return (
    <div
      className={clsx(
        'flex h-34 flex-1  items-center justify-center whitespace-nowrap rounded-full px-18 text-black transition-colors text-regular-15 md:w-auto',
        passed ? 'bg-pink' : 'bg-gray',
        !passed && !active && 'opacity-50'
      )}
    >
      <div>{name}</div>

      {active && (
        <SpinnerSvg
          width={14}
          height={14}
          className="ml-6 shrink-0 animate-[spin_2s_linear_infinite] text-black"
        />
      )}
    </div>
  )
}
