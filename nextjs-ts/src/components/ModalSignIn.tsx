import { FC } from 'react'

import { PRIVACY_POLICY_URL } from '../app/constants'
import { AppModal } from './AppModal'
import { ModalSignInForm } from './ModalSignInForm'

type Props = {
  opened: boolean
  className?: string
  onClose: (value: boolean) => void
}

export const ModalSignIn: FC<Props> = ({ onClose, opened }) => {
  return (
    <AppModal
      title="Вход"
      contentWrapperClassName="grow flex flex-col"
      panelClassName="md:max-w-[492px]"
      opened={opened}
      onClose={onClose}
    >
      <p className="mt-4 text-black/50 text-regular-15">
        Вы сможете оплачивать заказ, узнавать об акциях
        самым первым
      </p>

      <ModalSignInForm className="mt-20 flex grow flex-col" />

      <p className="mt-12 mb-17 text-black/50 text-regular-13 md:mb-0">
        Нажимая на кнопку «Войти в профиль», вы соглашаетесь с{' '}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green"
        >
          Политикой конфиденциальности
        </a>
        .
      </p>
    </AppModal>
  )
}
