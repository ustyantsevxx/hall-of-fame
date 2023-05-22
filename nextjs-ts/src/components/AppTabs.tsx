import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { FC } from 'react'

import { AppTab } from './AppTabs.types'

type Props = {
  items: AppTab[]
  className?: string
  panelsContainerClassName?: string
  selectedIndex?: number
  onChange?: (index: number) => void
}

export const AppTabs: FC<Props> = ({
  items,
  className,
  panelsContainerClassName,
  selectedIndex,
  onChange
}) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
        <Tab.List className="space-x-24 border-b border-black/10">
          {items.map(tab => (
            <Tab key={tab.key}>
              {({ selected }) => (
                <span
                  className={clsx(
                    'relative -mb-1 block pb-15 transition-colors text-regular-17',
                    selected ? 'text-green' : 'text-black/50'
                  )}
                >
                  <span>{tab.name}</span>
                  <span
                    className={clsx(
                      'absolute bottom-0 left-0 right-0 h-2 bg-green transition-opacity',
                      selected ? 'opacity-100' : 'opacity-0'
                    )}
                  ></span>
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels
          className={clsx('grow overflow-auto', panelsContainerClassName)}
        >
          {items.map(tab => (
            <Tab.Panel key={tab.key}>{tab.panelContent}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
