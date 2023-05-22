import clsx from 'clsx'
import { FC } from 'react'

import { AppButton } from './AppButton'
import { AppModal } from './AppModal'

type Props = {
  opened: boolean
  className?: string
  title: string
  description: string
  confirmButtonText: string
  contentContainerClassName?: string
  onConfirm?: () => void
  onClose: () => void
  onClosed?: () => void
}

export const ModalConfirmation: FC<Props> = ({
  opened,
  title,
  description,
  confirmButtonText,
  contentContainerClassName,
  onConfirm,
  onClose,
  onClosed
}) => {
  const confirm = () => {
    onConfirm?.()
    onClose()
  }

  return (
    <AppModal
      title={title}
      headerClassName="md:hidden"
      contentWrapperClassName="grow flex flex-col"
      panelClassName="flex flex-col md:h-[365px] md:max-w-[440px]"
      opened={opened}
      onClose={onClose}
      onClosed={onClosed}
    >
      <div
        className={clsx(
          'flex flex-grow flex-col items-center justify-center md:max-w-[355px]',
          contentContainerClassName
        )}
      >
        <p className="text-regular-20">{title}</p>
        <p className="mt-4 text-center text-black/50 text-regular-15">
          {description}
        </p>
      </div>

      <div className="mt-4 mb-10 md:mb-0">
        <AppButton onClick={confirm} className="w-full">
          {confirmButtonText}
        </AppButton>
      </div>
    </AppModal>
  )
}
