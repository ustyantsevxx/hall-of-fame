import clsx from 'clsx'
import { createContext, FC, useState } from 'react'

import { AppTabs } from './AppTabs'
import { AppTab } from './AppTabs.types'
import { DELIVERY_LEGEND_TAB } from './DeliveryLegend.constants'
import { DeliveryLegendCourier } from './DeliveryLegendCourier'
import { DeliveryLegendPickup } from './DeliveryLegendPickup'

type Props = {
  className?: string
}

export type DeliveryLegendContextType = {
  selectTabByKey?: (key: string) => void
}

export const DeliveryLegendContext = createContext<DeliveryLegendContextType>(
  {}
)

export const DeliveryLegend: FC<Props> = ({ className }) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  const tabs: AppTab[] = [
    {
      key: DELIVERY_LEGEND_TAB.DELIVERY,
      name: 'Доставка',
      panelContent: <DeliveryLegendCourier />
    },
    {
      key: DELIVERY_LEGEND_TAB.PICKUP,
      name: 'Самовывоз',
      panelContent: <DeliveryLegendPickup />
    }
  ]

  const selectTabByKey = (key: string) => {
    const index = tabs.findIndex(tab => tab.key === key)
    if (index > -1) {
      setTabIndex(index)
    }
  }

  const context: DeliveryLegendContextType = {
    selectTabByKey
  }

  return (
    <DeliveryLegendContext.Provider value={context}>
      <div
        className={clsx('bg-white md:rounded-22 md:px-30 md:py-32', className)}
      >
        <AppTabs
          selectedIndex={tabIndex}
          items={tabs}
          className="max-h-full"
          panelsContainerClassName="pt-24"
          onChange={setTabIndex}
        />
      </div>
    </DeliveryLegendContext.Provider>
  )
}
