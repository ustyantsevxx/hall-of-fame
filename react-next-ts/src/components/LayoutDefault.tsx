import clsx from 'clsx'
import { deleteCookie, getCookie } from 'cookies-next'
import { FC, Fragment, ReactNode } from 'react'

import { AUTH_REDIRECTED_FROM_KEY } from '../api/modules/auth/auth.constants'
import { useDialogsState } from '../store/dialogs'
import { AuthorizedContent } from './AuthorizedContent'
import { LayoutDefaultCart } from './LayoutDefaultCart'
import { LayoutDefaultContentWrapper } from './LayoutDefaultContentWrapper'
import { LayoutDefaultFooter } from './LayoutDefaultFooter'
import { LayoutDefaultHeaders } from './LayoutDefaultHeaders'
import { ModalSignIn } from './ModalSignIn'

type Props = {
  children?: ReactNode
  withSecondHeader?: boolean
  authorized?: boolean
  waitAuth?: boolean
  noFooter?: boolean
  footerClassName?: string
  hideCartFloatingButton?: boolean
}

export const LayoutDefault: FC<Props> = ({
  children,
  withSecondHeader,
  authorized,
  waitAuth,
  noFooter,
  footerClassName,
  hideCartFloatingButton
}) => {
  const { authModalOpened, setAuthModalOpened } = useDialogsState()

  const handleSignInModalClose = () => {
    if (getCookie(AUTH_REDIRECTED_FROM_KEY)) {
      deleteCookie(AUTH_REDIRECTED_FROM_KEY)
    }
    setAuthModalOpened(false)
  }

  const Wrapper =
    authorized || waitAuth
      ? ({ children }: { children: ReactNode }) =>
          AuthorizedContent({ children, disableRedirect: waitAuth })
      : Fragment

  return (
    <>
      <LayoutDefaultHeaders withSecondHeader={withSecondHeader} />
      <LayoutDefaultCart hideCartFloatingButton={hideCartFloatingButton} />

      <Wrapper>
        <LayoutDefaultContentWrapper withSecondHeader={withSecondHeader}>
          {children}
        </LayoutDefaultContentWrapper>

        {!noFooter && (
          <LayoutDefaultFooter
            className={clsx('mt-32 md:mt-100', footerClassName)}
          />
        )}
      </Wrapper>

      <ModalSignIn opened={authModalOpened} onClose={handleSignInModalClose} />
    </>
  )
}
