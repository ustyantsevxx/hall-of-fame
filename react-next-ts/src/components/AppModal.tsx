import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import CloseSvg from '../assets/svg/Close.svg'
import { DialogCore } from './DialogCore'

type Props = {
  children?: ReactNode
  afterTitle?: ReactNode
  opened: boolean
  title?: string
  headerClassName?: string
  panelClassName?: string
  emptyFocusTrap?: boolean
  contentWrapperClassName?: string
  wrapperClassName?: string
  mobileCloseButtonClassName?: string
  onClose: (value: boolean) => void
  onClosed?: () => void
  onOpen?: () => void
  onOpened?: () => void
}

export const AppModal: FC<Props> = ({
  children,
  afterTitle,
  panelClassName,
  headerClassName,
  emptyFocusTrap,
  contentWrapperClassName,
  mobileCloseButtonClassName,
  wrapperClassName,
  title,
  ...props
}) => {
  return (
    <DialogCore
      emptyFocusTrap={emptyFocusTrap}
      panelWrapperClassName="flex flex-col md:flex-row justify-center items-center"
      panelClassName={clsx(
        'flex w-full grow flex-col overflow-auto bg-white md:h-auto md:flex-row md:rounded-[28px] px-16 md:px-30 md:py-24',
        panelClassName
      )}
      panelTransition={{
        enter: 'duration-300',
        enterFrom: 'opacity-0 md:scale-95 md:translate-y-0 translate-y-32',
        enterTo: 'opacity-100 md:scale-100 md:translate-y-0 translate-y-0',
        leave: 'duration-300',
        leaveFrom: 'opacity-100 md:scale-100 md:translate-y-0 translate-y-0',
        leaveTo: 'opacity-0 md:scale-95 md:translate-y-0 translate-y-32'
      }}
      {...props}
    >
      <div className={clsx('flex grow flex-col', wrapperClassName)}>
        <div
          className={clsx(
            'fixed inset-x-0 top-0 z-10 flex h-44 items-center justify-between px-16 md:static md:px-0',
            headerClassName
          )}
        >
          <p className="text-black text-medium-20 md:text-medium-30">{title}</p>
          <button
            title="xx"
            className={clsx(
              '-mr-12 flex h-45 w-45 items-center justify-center rounded-full md:hidden',
              mobileCloseButtonClassName
            )}
            onClick={() => props.onClose(false)}
          >
            <CloseSvg className="h-24 w-24" />
          </button>

          {afterTitle}
        </div>

        <div className={clsx('mt-54 md:mt-0', contentWrapperClassName)}>
          {children}
        </div>
      </div>
    </DialogCore>
  )
}
