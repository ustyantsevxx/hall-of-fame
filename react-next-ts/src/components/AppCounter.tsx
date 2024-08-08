import clsx from 'clsx'
import { FC, MouseEvent } from 'react'

import MinusSvg from '../assets/svg/Minus.svg'
import PlusSvg from '../assets/svg/Plus.svg'
import { AppCounterButton } from './AppCounterButton'

type Size = 'normal' | 'mini'

type Props = {
  value: number
  onChange?: (value: number) => void
  size?: Size
  min?: number
  max?: number
  className?: string
  minusButtonTitle?: string
  plusButtonTitle?: string
  onClick?: (e: MouseEvent) => void
}

export const AppCounter: FC<Props> = ({
  value,
  className,
  onChange,
  onClick,
  size = 'normal',
  min = 0,
  max = Number.POSITIVE_INFINITY,
  minusButtonTitle = 'xx',
  plusButtonTitle = 'xx'
}) => {
  const reachedMin = value === min
  const reachedMax = value === max

  const handleButtonClick = (e: MouseEvent, handler: () => void) => {
    onClick?.(e)
    handler()
  }

  const decreaseValue = () => {
    if (!reachedMin) {
      onChange?.(value - 1)
    }
  }
  const increaseValue = () => {
    if (!reachedMax) {
      onChange?.(value + 1)
    }
  }

  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <AppCounterButton
        className="shrink-0"
        disabled={reachedMin}
        size={size}
        type="button"
        title={minusButtonTitle}
        onClick={e => handleButtonClick(e, decreaseValue)}
      >
        <MinusSvg width="24" height="24" />
      </AppCounterButton>

      <div className="w-[38px] text-center text-regular-20">{value}</div>

      <AppCounterButton
        className="shrink-0"
        disabled={reachedMax}
        size={size}
        type="button"
        title={plusButtonTitle}
        onClick={e => handleButtonClick(e, increaseValue)}
      >
        <PlusSvg width="24" height="24" />
      </AppCounterButton>
    </div>
  )
}
