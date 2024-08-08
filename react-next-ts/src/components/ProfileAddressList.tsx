import clsx from 'clsx'
import { FC, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { DeliveryAddress } from '../api/modules/addresses/addresses.types'
import { makeAddressString } from '../api/modules/addresses/addresses.utils'
import { useAddresses } from '../api/modules/addresses/hooks/useAddresses'
import { useAddressRemove } from '../api/modules/addresses/hooks/useAddressRemove'
import { useAnimatedLayoutScroll } from '../hooks/useAnimatedLayoutScroll'
import { AppTransition } from './AppTransition'
import { ModalConfirmation } from './ModalConfirmation'
import { ProfileAddressForm } from './ProfileAddressForm'
import { ProfileAddressListButtonAdd } from './ProfileAddressListButtonAdd'
import { ProfileAddressListItem } from './ProfileAddressListItem'

type Props = {
  className?: string
}

export const ProfileAddressList: FC<Props> = ({ className }) => {
  const { scrollToElement } = useAnimatedLayoutScroll()

  const addressFormRef = useRef<HTMLDivElement>(null)
  const [formOpened, setFormOpened] = useState(false)

  const openFormAndScrollToIt = () => {
    flushSync(() => setFormOpened(true))
    if (addressFormRef.current) {
      scrollToElement(addressFormRef.current)
    }
  }
  const closeForm = () => setFormOpened(false)

  const { data: addresses, isLoading } = useAddresses()
  const { mutate: removeAddressMutation } = useAddressRemove()

  const [removeModalOpened, setRemoveModalOpened] = useState(false)
  const [addressToRemove, setAddressToRemove] =
    useState<DeliveryAddress | null>(null)
  const removeAddress = (address: DeliveryAddress | null) => {
    if (address) {
      removeAddressMutation(address)
    }
  }
  const addressToRemoveString = addressToRemove
    ? makeAddressString(addressToRemove)
    : ''

  const confirmRemove = (address: DeliveryAddress) => {
    setAddressToRemove(address)
    setRemoveModalOpened(true)
  }

  const hasAddresses = addresses?.length || 0 > 0

  return (
    <div className={clsx(className)}>
      <div className="flex items-center">
        <h2 className="text-medium-20">xx xx</h2>
        <ProfileAddressListButtonAdd onClick={openFormAndScrollToIt} />
      </div>

      <ModalConfirmation
        title="xx xx"
        description={`xx xx, xx xx xx xx ${addressToRemoveString}?`}
        confirmButtonText="xx xx"
        opened={removeModalOpened}
        onClose={() => setRemoveModalOpened(false)}
        onClosed={() => setAddressToRemove(null)}
        onConfirm={() => removeAddress(addressToRemove)}
      />

      <AppTransition show={!isLoading}>
        {hasAddresses ? (
          <div className="mt-11 space-y-20 md:mt-28">
            {addresses?.map(address => (
              <ProfileAddressListItem
                key={address.id}
                address={address}
                onRemove={() => confirmRemove(address)}
              />
            ))}
          </div>
        ) : (
          <div className="my-auto">
            <p className="mt-28 h-25 text-black/50 text-regular-15">
              xx xx xx
            </p>
          </div>
        )}
      </AppTransition>

      {isLoading && (
        <p className="mt-11 h-25 text-black/50 text-regular-17 md:mt-28">
          xx...
        </p>
      )}

      {formOpened && (
        <ProfileAddressForm
          ref={addressFormRef}
          className="mt-38"
          onSuccess={() => {
            return closeForm()
          }}
          onCancel={() => closeForm()}
        />
      )}
    </div>
  )
}
