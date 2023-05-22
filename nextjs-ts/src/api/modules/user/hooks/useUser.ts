import { useQuery, UseQueryOptions } from 'react-query'

import { UserService } from '../user.service'
import { User } from '../user.types'

export const USER_QUERY_KEY = 'user'

export const getUserQuery = (): UseQueryOptions<User> => ({
  queryKey: USER_QUERY_KEY,
  queryFn: () => UserService.getCurrentUser()
})

export const useUser = () => {
  return useQuery(getUserQuery())
}
