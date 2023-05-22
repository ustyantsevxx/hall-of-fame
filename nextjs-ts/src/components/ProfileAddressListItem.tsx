import clsx from 'clsx'
import { FC } from 'react'

import { DeliveryAddress } from '../api/modules/addresses/addresses.types'
import { makeAddressString } from '../api/modules/addresses/addresses.utils'
import NavCloseSvg from '../assets/svg/CloseNav.svg'

type Props = {
  className?: string
  address: DeliveryAddress
  onRemove: () => void
}

export const ProfileAddressListItem: FC<Props> = ({
  address,
  className,
  onRemove
}) => {
  return (
    <div className={clsx('flex items-start', className)}>
      <p className="mt-3 text-regular-17">{makeAddressString(address)}</p>
      <button
        className="ml-12 h-24 w-24 text-black/30"
        title="Удалить адрес"
        onClick={() => onRemove()}
      >
        <NavCloseSvg />
      </button>
    </div>
  )
}
