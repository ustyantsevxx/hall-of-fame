import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

import { useAuth } from '../api/modules/auth/hooks/useAuth'
import { UserService } from '../api/modules/user/user.service'
import ManSvg from '../assets/svg/Man.svg'
import SiteLogoSvg from '../assets/svg/SiteLogo.svg'
import { useDialogsState } from '../store/dialogs'
import { AppLink } from './AppLink'

type Props = {
  className?: string
  buttonsClassName?: string
}

export const LayoutDefaultHeaderActions: FC<Props> = ({
  className,
  buttonsClassName
}) => {
  const { authModalOpened, setAuthModalOpened } = useDialogsState()
  const { user, userLoading } = useAuth()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!userLoading && !visible) {
      setVisible(true)
    }
  }, [userLoading, visible])

  return (
    <>
      <div className={className}>
        {visible && (
          <>
            {!user ? (
              <button
                className={clsx('transition transition-none', buttonsClassName)}
                onClick={() => setAuthModalOpened(true)}
              >
                <span className="relative flex items-center md:space-x-8">
                  <ManSvg className="absolute -left-32 text-pink md:static" />
                  <span
                    className={clsx(
                      'transition text-regular-17',
                      authModalOpened ? 'text-pink' : 'text-white'
                    )}
                  >
                    xx
                  </span>
                </span>
              </button>
            ) : (
              <AppLink
                href="/profile"
                activeClassName="!text-pink"
                className={clsx('py-9 text-white transition', buttonsClassName)}
              >
                <span className="relative flex items-center md:space-x-8 ">
                  <ManSvg className="absolute -left-32 text-pink md:static" />
                  <span className="whitespace-nowrap">
                    {user.name ?? 'xx'}
                  </span>
                </span>
              </AppLink>
            )}

            <AppLink
              href="/loyalty"
              activeClassName="!text-pink"
              className={clsx('py-9 text-white transition', buttonsClassName)}
            >
              <span className="relative flex items-center md:space-x-8">
                <SiteLogoSvg className="absolute -left-32 text-pink md:static" />
                <span className="whitespace-nowrap text-current transition text-regular-17">
                  {user
                    ? UserService.getFormattedUserCoinCount(user)
                    : ''}
                </span>
              </span>
            </AppLink>
          </>
        )}
      </div>
    </>
  )
}
