import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

import PlusSvg from '../assets/svg/Plus.svg'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const ProfileAddressListButtonAdd: FC<Props> = ({
  className,
  ...buttonAttrs
}) => {
  return (
    <button
      title="xx xx xx"
      className={clsx(
        'ml-14 flex h-36 w-36 items-center justify-center rounded-full border border-pink text-black transition-colors hover:bg-pink-hover',
        className
      )}
      {...buttonAttrs}
    >
      <PlusSvg height={24} width={24} />
    </button>
  )
}
