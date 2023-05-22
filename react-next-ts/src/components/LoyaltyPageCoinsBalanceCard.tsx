import clsx from 'clsx'
import { FC } from 'react'

import { useAuth } from '../api/modules/auth/hooks/useAuth'
import { UserService } from '../api/modules/user/user.service'
import SiteLogoSvg from '../assets/svg/SiteLogo.svg'
import { useDialogsState } from '../store/dialogs'
import { AppButton } from './AppButton'

type Props = {
  className?: string
}

export const LoyaltyPageCoinsBalanceCard: FC<Props> = ({ className }) => {
  const { user } = useAuth()
  const { setAuthModalOpened } = useDialogsState()

  return (
    <div className={clsx('mb-20 rounded-20 bg-gray px-30 py-20', className)}>
      {!user ? (
        <div>
          <p className="text-regular-17">
            Авторизуйтесь, чтобы узнать ваш баланс
          </p>

          <AppButton className="mt-18" onClick={() => setAuthModalOpened(true)}>
            Узнать мой баланс
          </AppButton>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-black/50 text-regular-17">Баланс</p>
          <div
            className="flex items-center space-x-10"
            title={UserService.getFormattedUserCoinCount(user)}
          >
            <p className="text-regular-20">{user.coins_count ?? 0}</p>
            <div className="block rounded-full bg-green p-6 text-pink">
              <SiteLogoSvg />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
