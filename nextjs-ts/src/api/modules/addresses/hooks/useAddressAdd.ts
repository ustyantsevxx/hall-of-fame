import { useCreateMutation } from '../../../shared/hooks'
import { AddressesService } from '../addresses.service'
import { DeliveryAddress } from '../addresses.types'
import { ADDRESSES_QUERY_KEY } from './useAddresses'

export const useAddressAdd = ({
  onError
}: {
  onError?: (error: any) => void
} = {}) => {
  return useCreateMutation<DeliveryAddress>({
    itemsQueryKey: ADDRESSES_QUERY_KEY,
    mutationFn: async (data: DeliveryAddress) => {
      try {
        const response = await AddressesService.addAddress(data)
        return response.data
      } catch (error) {
        onError?.(error)
        throw error
      }
    },
    updateAfterSuccess: true
  })
}
