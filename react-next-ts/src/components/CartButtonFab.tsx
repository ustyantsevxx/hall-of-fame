import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import PacketSvg from '../assets/svg/Packet.svg'

export const CartButtonFab: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...buttonAttrs
}) => {
  const { data: cartItems, isLoading: cartLoading } = useCartItems()
  const cartCountTotal =
    cartItems
      ?.filter(x => !x.extra)
      ?.reduce((acc, item) => acc + item.count, 0) ?? 0

  if (cartLoading) {
    return null
  }

  return (
    <button
      className={clsx(
        'relative flex h-50 w-50 items-center justify-center rounded-full bg-green text-white',
        className
      )}
      title="xx xx"
      style={{ boxShadow: '0px 0px 14.459px rgba(0, 0, 0, 0.15)' }}
      {...buttonAttrs}
    >
      <Transition
        className="absolute -right-3 -top-7 "
        show={cartCountTotal > 0}
        enter="transition duration-125"
        enterFrom="scale-50 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-125"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-50 opacity-0"
      >
        <div className="flex h-23 w-23 items-center justify-center rounded-full bg-pink text-green text-regular-15">
          {cartCountTotal || 1}
        </div>
      </Transition>
      <PacketSvg className="h-26 w-26" />
    </button>
  )
}
