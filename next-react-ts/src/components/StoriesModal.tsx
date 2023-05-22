import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { motion, MotionProps } from 'framer-motion'
import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useMouse } from 'react-use'

import { Story } from '../api/modules/stories/stories.types'
import StoriesLeftArrowSvg from '../assets/svg/StoriesLeftArrow.svg'
import { sleep } from '../utils'
import { variantsWithMousePosition } from '../utils/modals'
import { StoriesModalStory } from './StoriesModalStory'

type Props = {
  story: Story
  opened: boolean
  onClose: (value: boolean) => void
  onPrevStory: () => void
  onNextStory: () => void
}

enum VARIANTS {
  INITIAL = 'INITIAL',
  BEFORE_MOVE = 'BEFORE_MOVE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  HIDDEN = 'HIDDEN',
  BEFORE_CLOSE = 'BEFORE_CLOSE'
}

const FLOATING_BUTTON_SIZE = 60

export const StoriesModal: FC<Props> = ({
  story,
  onClose,
  opened,
  onNextStory,
  onPrevStory
}) => {
  const backdropRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMouse(backdropRef)
  const [activeVariant, setActiveVariant] = useState(VARIANTS.INITIAL)

  const backdropImageUrl = story?.preview?.url ?? story?.media[0]?.file?.url

  const closeModal = useCallback(() => onClose(false), [onClose])

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
        [VARIANTS.LEFT]: {},
        [VARIANTS.RIGHT]: { rotate: '180deg' },
        [VARIANTS.HIDDEN]: { scale: 1.3, opacity: 0 },
        [VARIANTS.BEFORE_CLOSE]: { opacity: 0, scale: 0.8 }
      }
    })
  }

  const handleHalfMouseEnter = (variant: VARIANTS) => {
    if (
      activeVariant !== VARIANTS.INITIAL &&
      activeVariant !== VARIANTS.BEFORE_CLOSE
    ) {
      setActiveVariant(variant)
    }
  }

  const handleHalfMouseMove = async (variant: VARIANTS) => {
    if (activeVariant === VARIANTS.INITIAL) {
      setActiveVariant(VARIANTS.BEFORE_MOVE)
      await sleep(150)
      setActiveVariant(variant)
    }
  }

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center"
        onClose={closeModal}
      >
        {/* entire dialog content is wrapped in Dialog.Panel to prevent closing on click outside panel */}
        <Dialog.Panel className="flex h-full w-full items-center justify-center">
          <Transition.Child
            enter="duration-300"
            enterFrom="opacity-0"
            leave="duration-300 delay-150"
            leaveTo="opacity-0"
          >
            <div
              ref={backdropRef}
              className={clsx('invisible absolute inset-0 md:visible')}
            >
              <div className="relative flex h-full w-full bg-black">
                <Transition.Child
                  enter="duration-300"
                  enterFrom="opacity-0"
                  leave="duration-300"
                  leaveTo="opacity-0"
                >
                  <div
                    className="absolute -inset-[160px] bg-cover bg-center bg-no-repeat blur-3xl transition-[background-image]"
                    style={{ backgroundImage: `url(${backdropImageUrl})` }}
                  />
                </Transition.Child>

                <div className="absolute inset-0 bg-black/40" />

                <div
                  className="z-10 flex-1"
                  onMouseEnter={() => handleHalfMouseEnter(VARIANTS.LEFT)}
                  onMouseMove={() => handleHalfMouseMove(VARIANTS.LEFT)}
                  onClick={onPrevStory}
                />
                <div
                  className="z-10 flex-1"
                  onMouseEnter={() => handleHalfMouseEnter(VARIANTS.RIGHT)}
                  onMouseMove={() => handleHalfMouseMove(VARIANTS.RIGHT)}
                  onClick={onNextStory}
                />
              </div>
            </div>
          </Transition.Child>

          <motion.button
            className="fixed top-0 left-0 hidden items-center justify-center rounded-full bg-pink md:flex"
            style={{
              width: `${FLOATING_BUTTON_SIZE}px`,
              height: `${FLOATING_BUTTON_SIZE}px`
            }}
            {...floatingMotionButtonProps}
          >
            <StoriesLeftArrowSvg />
          </motion.button>

          <div
            className={clsx(
              'z-10 h-full w-full cursor-auto md:h-[668px] md:w-[400px]'
            )}
            onMouseEnter={() => setActiveVariant(VARIANTS.HIDDEN)}
          >
            <Transition.Child
              className="h-full flex-col justify-center md:flex"
              enter="duration-300 delay-150"
              enterFrom="opacity-0 scale-95"
              leave="duration-300"
              leaveTo="opacity-0 scale-95"
            >
              <StoriesModalStory
                story={story}
                onPrev={onPrevStory}
                onNext={onNextStory}
                onClose={closeModal}
              />
            </Transition.Child>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
