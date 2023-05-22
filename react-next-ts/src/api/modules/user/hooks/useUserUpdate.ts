import { useMutation, useQueryClient } from 'react-query'

import { UserService } from '../user.service'
import { User, UserProfileUpdateRequestParams } from '../user.types'
import { USER_QUERY_KEY } from './useUser'

export const useUserUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserProfileUpdateRequestParams) =>
      UserService.updatePersonalInfo(data),
    onMutate: data => {
      const prevState = queryClient.getQueryState<User>(USER_QUERY_KEY)

      queryClient.setQueryData(USER_QUERY_KEY, {
        ...prevState?.data,
        ...data
      })
    },
    onSettled: () => queryClient.invalidateQueries(USER_QUERY_KEY)
  })
}
