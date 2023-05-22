import { Dialog, Transition, TransitionClasses } from '@headlessui/react'
import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'
import { FC, Fragment, ReactNode, useEffect, useRef, useState } from 'react'
import { useMouse } from 'react-use'

import CloseSvg from '../assets/svg/Close.svg'
import { sleep } from '../utils'
import { variantsWithMousePosition } from '../utils/modals'

type Props = {
  children?: ReactNode
  opened: boolean
  emptyFocusTrap?: boolean
  panelClassName?: string
  panelWrapperClassName?: string
  panelTransition?: TransitionClasses
  backdropClassName?: string
  onClose: (value: boolean) => void
  onClosed?: () => void
  onOpened?: () => void
  onOpen?: () => void
}

enum VARIANTS {
  INITIAL = 'INITIAL',
  BEFORE_MOVE = 'BEFORE_MOVE',
  MOVING = 'MOVING',
  HIDDEN = 'HIDDEN',
  BEFORE_CLOSE = 'BEFORE_CLOSE'
}

const FLOATING_BUTTON_SIZE = 60

export const DialogCore: FC<Props> = ({
  onClose,
  onClosed,
  onOpened,
  onOpen,
  opened,
  children,
  emptyFocusTrap,
  panelClassName,
  panelWrapperClassName,
  backdropClassName,
  panelTransition
}) => {
  const backdropRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMouse(backdropRef)
  const [activeVariant, setActiveVariant] = useState(VARIANTS.INITIAL)

  useEffect(() => {
    opened
      ? setActiveVariant(VARIANTS.INITIAL)
      : setActiveVariant(VARIANTS.BEFORE_CLOSE)
  }, [opened])

  const floatingMotionButtonProps: MotionProps = {
    animate: activeVariant,
    transition: { type: 'spring', mass: 0.9, damping: 50, stiffness: 1000 },
    variants: variantsWithMousePosition({
      buttonSize: FLOATING_BUTTON_SIZE,
      mousePosition: { x: mousePosition.elX, y: mousePosition.elY },
      variants: {
        [VARIANTS.INITIAL]: { opacity: 0, transition: { duration: 0 } },
        [VARIANTS.BEFORE_MOVE]: { opacity: 0, transition: { duration: 0 } },
        [VARIANTS.MOVING]: {},
        [VARIANTS.HIDDEN]: { scale: 1.3, opacity: 0 },
        [VARIANTS.BEFORE_CLOSE]: { opacity: 0, scale: 0.8 }
      }
    })
  }

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 cursor-pointer"
        onClose={() => onClose(false)}
      >
        <Transition.Child
          enter="duration-300"
          enterFrom="opacity-0"
          leave="duration-300"
          leaveTo="opacity-0"
        >
          <div
            ref={backdropRef}
            className={clsx('fixed inset-0 bg-black/40', backdropClassName)}
          />
        </Transition.Child>

        <div
          className="fixed inset-0 z-40"
          onMouseMove={async () => {
            if (activeVariant === VARIANTS.INITIAL) {
              setActiveVariant(VARIANTS.BEFORE_MOVE)
              await sleep(150)
              setActiveVariant(VARIANTS.MOVING)
            }
          }}
        >
          <motion.div
            className="fixed top-0 left-0 hidden h-60 w-60 items-center justify-center rounded-full bg-pink md:flex"
            {...floatingMotionButtonProps}
          >
            <CloseSvg width={24} height={24} className="text-white" />
          </motion.div>

          {emptyFocusTrap && (
            <button
              title="Закрыть"
              className="sr-only"
              onClick={() => onClose(false)}
            >
              {/* hidden button to calm `FocusTrap` module */}
            </button>
          )}

          <div className={clsx('max-h-full min-h-full', panelWrapperClassName)}>
            <Transition.Child
              as={Fragment}
              {...panelTransition}
              afterLeave={onClosed}
              afterEnter={onOpened}
              beforeEnter={onOpen}
            >
              <Dialog.Panel
                className={clsx('cursor-auto', panelClassName)}
                onMouseEnter={() => setActiveVariant(VARIANTS.HIDDEN)}
                onMouseLeave={() => setActiveVariant(VARIANTS.MOVING)}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
