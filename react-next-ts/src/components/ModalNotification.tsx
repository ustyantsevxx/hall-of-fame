import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { AppButton } from './AppButton'
import { AppModal } from './AppModal'

type Props = {
  title: string
  description: string
  opened: boolean
  className?: string
  onClose: (value: boolean) => void
  onClosed: () => void
}

export const ModalNotification: FC<Props> = ({
  title,
  description,
  onClose,
  onClosed,
  opened
}) => {
  const closeModal = () => onClose(false)

  return (
    <AppModal
      emptyFocusTrap
      wrapperClassName="md:!grow-0"
      contentWrapperClassName="!m-0 grow flex flex-col md:block md:grow-0"
      headerClassName="px-10 pt-10 !text-white md:!hidden"
      panelClassName="!p-0 !bg-transparent md:items-center md:w-auto md:!grow-0 md:justify-center relative"
      mobileCloseButtonClassName="!hidden"
      opened={opened}
      onClose={onClose}
      onClosed={onClosed}
    >
      <div className="flex h-full w-full grow flex-col items-center justify-center">
        <div
          className="sticky top-0 flex min-h-[210px] w-full flex-shrink-0 grow md:hidden"
          onClick={closeModal}
        ></div>

        <div className="z-10 flex max-h-screen min-h-[333px] w-full flex-col overflow-hidden rounded-t-22 bg-white md:mt-0 md:max-h-[488px] md:w-[541px] md:rounded-22 md:px-0">
          <div className="mt-76 flex grow flex-col">
            <Dialog.Title as="h3" className="px-40 text-center text-regular-17">
              {title}
            </Dialog.Title>

            <Dialog.Description className="mt-4 px-40 text-center text-black/50 text-regular-15">
              {description}
            </Dialog.Description>

            <div className="mt-auto px-16 pt-7 pb-11">
              <AppButton className="w-full" onClick={closeModal}>
                xx
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  )
}
