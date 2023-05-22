import clsx from 'clsx'
import { forwardRef } from 'react'
import { animateScroll } from 'react-scroll'

import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import GradientLogoSvg from '../assets/svg/GradientLogo.svg'
import { useDialogsState } from '../store/dialogs'
import { AppButton } from './AppButton'
import { LayoutDefaultSecondHeaderTags } from './LayoutDefaultSecondHeaderTags'

type Props = {
  className?: string
  firstHeaderScrolledUp: boolean
}

export const LayoutDefaultSecondHeader = forwardRef<HTMLDivElement, Props>(
  ({ className, firstHeaderScrolledUp }, ref) => {
    const { data: cartItems, isLoading: cartLoading } = useCartItems()
    const cartCountTotal =
      cartItems
        ?.filter(x => !x.extra)
        ?.reduce((acc, item) => acc + item.count, 0) ?? 0

    const { setCartOpened } = useDialogsState()

    return (
      <div
        ref={ref}
        className={clsx(
          'second-header bg-white py-10 transition lg:py-20',
          {
            'second-header-fixed shadow-20-006 fixed -inset-x-1 -top-1 z-20':
              firstHeaderScrolledUp
          },
          className
        )}
      >
        <div className="container relative flex items-center overflow-hidden">
          <button
            className={clsx(
              'z-10 flex w-48 shrink-0 items-center self-stretch  overflow-hidden bg-white transition lg:w-36',
              firstHeaderScrolledUp ? 'delay-150 duration-500' : 'opacity-0'
            )}
            title="В начало"
            onClick={() => animateScroll.scrollToTop({ duration: 500 })}
          >
            <GradientLogoSvg className="w-30 lg:w-36" />
          </button>

          <div
            className={clsx(
              'w-full grow transition-[margin-left] lg:w-auto lg:overflow-auto lg:pr-42',
              firstHeaderScrolledUp
                ? 'duration-500 lg:ml-42'
                : '-ml-48 lg:-ml-36'
            )}
          >
            <LayoutDefaultSecondHeaderTags
              className={firstHeaderScrolledUp ? 'mr-32' : '-mr-16'}
            />
          </div>

          <div className="hidden h-42 lg:block">
            {!cartLoading && (
              <AppButton
                className=" divide-x divide-white lg:block"
                onClick={() => setCartOpened(true)}
              >
                <span className={clsx({ 'pr-10': cartCountTotal > 0 })}>
                  Корзина
                </span>
                {cartCountTotal > 0 && (
                  <span className="pl-10">{cartCountTotal}</span>
                )}
              </AppButton>
            )}
          </div>
        </div>
      </div>
    )
  }
)

LayoutDefaultSecondHeader.displayName = 'LayoutDefaultSecondHeader'
