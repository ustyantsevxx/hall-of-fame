import { DeliveryAddress } from './addresses.types'

export const makeAddressString = (address: DeliveryAddress) => {
  return [
    address?.city?.name,
    address.street,
    address.house,
    address.block,
    address.apartment
  ]
    .filter(s => s?.length && s.length > 0)
    .join(', ')
}
