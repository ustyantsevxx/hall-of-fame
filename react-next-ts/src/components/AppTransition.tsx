import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

type Props = {
  show?: boolean
  children?: ReactNode
  className?: string
  appear?: boolean
  disabled?: boolean
  durationClassName?: string
}

export const AppTransition: FC<Props> = ({
  children,
  className,
  show,
  appear,
  disabled,
  durationClassName = 'duration-150'
}) => {
  return disabled ? (
    <div className={className}>{children}</div>
  ) : (
    <Transition
      className={className}
      show={show}
      appear={appear}
      as="div"
      enter={clsx('transition', durationClassName)}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={clsx('transition', durationClassName)}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  )
}
