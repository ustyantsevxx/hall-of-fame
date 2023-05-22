import { useQuery, UseQueryOptions } from 'react-query'

import { useAuth } from '../../auth/hooks/useAuth'
import { AddressesService } from '../addresses.service'
import { DeliveryAddress } from '../addresses.types'

export const ADDRESSES_QUERY_KEY = 'addresses'

export const getAddressesQuery = (
  options?: UseQueryOptions<DeliveryAddress[]>
): UseQueryOptions<DeliveryAddress[]> => ({
  queryKey: ADDRESSES_QUERY_KEY,
  queryFn: () => AddressesService.getAddresses(),
  ...options
})

export const useAddresses = () => {
  const { user } = useAuth()

  return useQuery({
    ...getAddressesQuery(),
    refetchOnMount: false,
    enabled: !!user
  })
}
