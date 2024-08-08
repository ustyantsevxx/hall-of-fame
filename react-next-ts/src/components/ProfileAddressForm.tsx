import clsx from 'clsx'
import { forwardRef, useState } from 'react'

import { NewDeliveryAddress } from '../api/modules/addresses/addresses.types'
import { useAddressAdd } from '../api/modules/addresses/hooks/useAddressAdd'
import { AddressForm } from './AddressForm'

type Props = {
  className?: string
  onCancel: () => void
  onSuccess?: () => void
}

export const ProfileAddressForm = forwardRef<HTMLDivElement, Props>(
  ({ className, onCancel, onSuccess }, ref) => {
    const [error, setError] = useState<any>()
    const resetError = () => setError(undefined)

    const errorMessage =
      error &&
      (error.response?.data?.[0].description ||
        'xx xx. xx xx')

    const { mutateAsync: addAddressMutation, isLoading } = useAddressAdd({
      onError: error => {
        setError(error)
      }
    })

    const addAddress = async (address: NewDeliveryAddress) => {
      await addAddressMutation({ ...address, id: -1 })
      onSuccess?.()
    }

    return (
      <div ref={ref} className={clsx(className)}>
        <h3 className="text-black/50 text-regular-17">
          xx xx xx
        </h3>

        <AddressForm
          className="mt-24"
          onSuccess={address =>
            addAddress({ ...address, geo_point: address.coords })
          }
          loading={isLoading}
          beforeActions={
            errorMessage && <p className="my-16 text-red">{errorMessage}</p>
          }
          onCancel={onCancel}
          onValidChange={resetError}
        />
      </div>
    )
  }
)

ProfileAddressForm.displayName = 'ProfileAddressForm'
