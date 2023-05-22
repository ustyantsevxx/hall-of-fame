import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'

import { AUTH_REDIRECTED_FROM_KEY } from '../api/modules/auth/auth.constants'
import { useAuth } from '../api/modules/auth/hooks/useAuth'

type Props = {
  children: ReactNode
  disableRedirect?: boolean
}

export const AuthorizedContent: FC<Props> = ({ children, disableRedirect }) => {
  const { user, userLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user && !disableRedirect) {
      setCookie(AUTH_REDIRECTED_FROM_KEY, router.asPath)
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoading])

  return <>{(user || disableRedirect) && children}</>
}
