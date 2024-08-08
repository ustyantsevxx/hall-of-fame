import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import { usePersonCountState } from '../api/modules/cart/hooks/usePersonCount'
import { AppDrawer } from './AppDrawer'
import { CartConfiguration } from './CartConfiguration'
import { CartEmptyMessage } from './CartEmptyMessage'

type Props = {
  opened: boolean
  onOpenedChanged: (value: boolean) => void
}

export const CartDrawer: FC<Props> = ({ opened, onOpenedChanged }) => {
  const { data: cartItems } = useCartItems()
  const cartEmpty = !cartItems || cartItems.filter(x => !x.extra).length === 0
  const { setPersonCount } = usePersonCountState()

  useEffect(() => {
    if (cartItems?.length === 0) {
      setPersonCount(0)
    }
  }, [setPersonCount, cartItems?.length])

  const closeDrawer = () => onOpenedChanged(false)

  const router = useRouter()
  const handleGoToMenu = () => {
    closeDrawer()
    router.push('/')
  }

  return (
    <AppDrawer title="xx" opened={opened} onClose={onOpenedChanged}>
      <div className="flex h-full w-full px-16 pt-17 md:px-30">
        {cartEmpty ? (
          <CartEmptyMessage onGoToMenu={handleGoToMenu} />
        ) : (
          <CartConfiguration onGoToCheckout={() => closeDrawer()} />
        )}
      </div>
    </AppDrawer>
  )
}
