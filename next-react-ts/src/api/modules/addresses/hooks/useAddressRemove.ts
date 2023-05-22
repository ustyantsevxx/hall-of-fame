import { useDeleteMutation } from '../../../shared/hooks'
import { AddressesService } from '../addresses.service'
import { DeliveryAddress } from '../addresses.types'
import { ADDRESSES_QUERY_KEY } from './useAddresses'

export const useAddressRemove = () => {
  return useDeleteMutation<DeliveryAddress, DeliveryAddress>({
    itemsQueryKey: ADDRESSES_QUERY_KEY,
    mutationFn: data => AddressesService.removeAddress(data.id),
    equalsToTargetItemFn(item, dto) {
      return item.id === dto.id
    }
  })
}
