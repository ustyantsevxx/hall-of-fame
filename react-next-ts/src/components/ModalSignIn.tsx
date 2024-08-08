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
      title="xx"
      contentWrapperClassName="grow flex flex-col"
      panelClassName="md:max-w-[492px]"
      opened={opened}
      onClose={onClose}
    >
      <p className="mt-4 text-black/50 text-regular-15">
        xx xx xx xx, xx xx xx
        xx xx
      </p>

      <ModalSignInForm className="mt-20 flex grow flex-col" />

      <p className="mt-12 mb-17 text-black/50 text-regular-13 md:mb-0">
        xx xx xx «xx xx xx», xx xx xx{' '}
        <a
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green"
        >
          xx xx
        </a>
        .
      </p>
    </AppModal>
  )
}
