import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'

import { getUserQuery } from '../../user/hooks/useUser'
import { AuthService } from '../auth.service'

export const useAuth = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    ...getUserQuery(),
    refetchOnMount: false,
    staleTime: dayjs.duration(5, 'minutes').asMilliseconds(),
    enabled: !!getCookie(AuthService.TOKENS_COOKIES_KEY)
  })

  const login = ({ phone, code }: { phone: string; code: string }) => {
    return AuthService.signIn({
      phone,
      code
    })
  }

  const logout = async () => {
    AuthService.clearSavedTokens()
    location.assign('/')
  }

  return {
    user,
    userLoading,
    login,
    logout
  }
}
