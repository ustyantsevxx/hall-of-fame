import { Dialog } from '@headlessui/react'
import { FC, ReactNode } from 'react'

import BackButtonCircleSvg from '../assets/svg/BackArrowCircle.svg'
import { DialogCore } from './DialogCore'

type Props = {
  children?: ReactNode
  opened: boolean
  onClose: (value: boolean) => void
  title: string
  className?: string
}

export const AppDrawer: FC<Props> = ({
  title,
  children,
  onClose,
  ...props
}) => {
  return (
    <DialogCore
      panelWrapperClassName="flex max-h-full min-h-full justify-end"
      panelClassName="relative flex w-full flex-col overflow-y-auto bg-white md:max-w-[367px]"
      panelTransition={{
        enter: 'duration-300',
        enterFrom: 'opacity-0 translate-x-16',
        leave: 'duration-300',
        leaveTo: 'opacity-0 translate-x-16'
      }}
      onClose={onClose}
      {...props}
    >
      <div className="sticky top-0 flex w-full items-center bg-white px-16 md:hidden">
        <div className="flex w-full border-b border-black/10 py-12">
          <button
            title="Закрыть"
            className="flex items-center justify-center"
            onClick={() => onClose(false)}
          >
            <BackButtonCircleSvg className="h-28 w-28 text-pink" />
          </button>
          <Dialog.Title className="ml-10 text-medium-20">{title}</Dialog.Title>
        </div>
      </div>

      {children}
    </DialogCore>
  )
}
