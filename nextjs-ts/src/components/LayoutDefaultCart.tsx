import { FC } from 'react'

import { useDialogsState } from '../store/dialogs'
import { ActiveOrders } from './ActiveOrders'
import { CartButtonFab } from './CartButtonFab'
import { CartDrawer } from './CartDrawer'

type Props = {
  hideCartFloatingButton?: boolean
}

export const LayoutDefaultCart: FC<Props> = ({ hideCartFloatingButton }) => {
  const { cartOpened, setCartOpened } = useDialogsState()

  return (
    <>
      <CartDrawer opened={cartOpened} onOpenedChanged={setCartOpened} />
      <div className="fixed bottom-16 right-14 left-16 z-10 flex items-end justify-end space-x-10 lg:hidden">
        <ActiveOrders />

        {!hideCartFloatingButton && (
          <CartButtonFab
            className="shrink-0"
            onClick={() => setCartOpened(true)}
          />
        )}
      </div>
    </>
  )
}
