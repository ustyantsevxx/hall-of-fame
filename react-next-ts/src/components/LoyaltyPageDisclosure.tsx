import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import { FC } from 'react'

import DisclosurePlusSvg from '../assets/svg/DisclosurePlus.svg'
import { WysiwygContentRenderer } from './WysiwygContentRenderer'

type Props = {
  title: string
  description: string
}

export const LoyaltyPageDisclosure: FC<Props> = ({ title, description }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={clsx(
            'overflow-hidden rounded-20 transition-shadow duration-300 hover:!shadow-none',
            { 'shadow-20-006': !open }
          )}
        >
          <Disclosure.Button
            className={clsx(
              'flex w-full items-center justify-between px-20 pt-20 transition duration-300 hover:bg-gray md:px-30 md:pt-30',
              !open
                ? 'rounded-20 pb-20 md:pb-30 '
                : 'rounded-t-20 bg-gray pb-14 md:pb-18'
            )}
          >
            <div className="pr-24 [&_*]:!cursor-pointer">
              <WysiwygContentRenderer
                className="text-left text-regular-20"
                htmlContent={title}
              />
            </div>

            <div
              role="button"
              className={clsx('transition duration-300', {
                'rotate-45': open
              })}
            >
              <DisclosurePlusSvg />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel
            className={clsx(
              'border-t px-20 pb-20 text-regular-17 md:px-30 md:pb-30',
              !open ? 'pb-20 md:pb-30' : 'bg-gray'
            )}
          >
            <div className="border-t border-black/10 pt-14 md:pt-18">
              <WysiwygContentRenderer htmlContent={description} />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
