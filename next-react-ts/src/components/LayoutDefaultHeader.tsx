import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'

import BurgerSvg from '../assets/svg/Burger.svg'
import CloseSvg from '../assets/svg/Close.svg'
import HeaderLogoSvg from '../assets/svg/HeaderLogo.svg'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import { AppLink } from './AppLink'
import { AppTransition } from './AppTransition'
import { LayoutDefaultHeaderActions } from './LayoutDefaultHeaderActions'
import { LayoutDefaultHeaderMobileMenu } from './LayoutDefaultHeaderMobileMenu'

const links = [
  { name: 'Доставка', href: '/delivery' },
  { name: 'Акции', href: '/stocks' },
  { name: 'О нас', href: '/about' }
]

type Props = {
  className?: string
}

export const LayoutDefaultHeader = forwardRef<HTMLElement, Props>(
  ({ className }, ref) => {
    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)

    const toggleMobileMenu = (toOpen: boolean) => {
      if (toOpen) {
        document.body.classList.add('mobile-menu-expanded')
      } else {
        document.body.classList.remove('mobile-menu-expanded')
      }
      setMobileMenuExpanded(toOpen)
    }

    const { breakpoint } = useCurrentBreakpoint()
    if (!['xs', 'sm', 'md'].includes(breakpoint) && mobileMenuExpanded) {
      toggleMobileMenu(false)
    }

    return (
      <header ref={ref} className={className}>
        <div className="bg-green">
          <div className="container flex justify-between">
            <div className="flex w-full items-center">
              <AppLink
                href="/"
                title="На главную"
                className={clsx(
                  'flex justify-center py-10 transition-all duration-300 lg:py-30',
                  { grow: mobileMenuExpanded }
                )}
              >
                <HeaderLogoSvg />
              </AppLink>

              <ul className="ml-68 hidden space-x-32 lg:flex">
                {links.map((link, i) => (
                  <li key={i}>
                    <AppLink
                      activeClassName="!text-pink"
                      className="block px-12 py-30 text-white transition text-regular-17"
                      href={link.href}
                    >
                      {link.name}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            <LayoutDefaultHeaderActions
              buttonsClassName="py-29"
              className="hidden items-center space-x-56 lg:flex"
            />

            <div className="absolute right-16 top-0 flex items-center lg:hidden">
              <button
                className="-mx-16 py-10 px-16 text-white"
                title={mobileMenuExpanded ? 'Скрыть меню' : 'Показать меню'}
                onClick={() => toggleMobileMenu(!mobileMenuExpanded)}
              >
                <span className="relative block h-24 w-24">
                  <AppTransition
                    className="absolute inset-0"
                    show={!mobileMenuExpanded}
                  >
                    <BurgerSvg />
                  </AppTransition>
                  <AppTransition
                    className="absolute inset-0"
                    show={mobileMenuExpanded}
                  >
                    <CloseSvg />
                  </AppTransition>
                </span>
              </button>
            </div>
          </div>
        </div>

        <Transition
          as="div"
          show={mobileMenuExpanded}
          className="fixed inset-x-0 bottom-0 top-41 z-40 grow bg-green"
          enter="transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <LayoutDefaultHeaderMobileMenu
            opened={mobileMenuExpanded}
            onClose={() => toggleMobileMenu(false)}
          />
        </Transition>
      </header>
    )
  }
)

LayoutDefaultHeader.displayName = 'LayoutDefaultHeader'
