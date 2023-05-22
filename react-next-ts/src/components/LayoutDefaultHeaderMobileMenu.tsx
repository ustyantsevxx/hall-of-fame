import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { usePrevious } from 'react-use'

import { DeliveryAddress } from '../api/modules/addresses/addresses.types'
import { makeAddressString } from '../api/modules/addresses/addresses.utils'
import { useRestaurantInfo } from '../api/modules/restaurants/hooks/useRestaurantInfo'
import { formatPhoneNumber } from '../utils'
import { AppLink } from './AppLink'
import { LayoutDefaultHeaderActions } from './LayoutDefaultHeaderActions'
import { SocialLinks } from './SocialLinks'

type Props = {
  opened?: boolean
  onClose?: () => void
}

const links = [
  { name: 'Доставка', href: '/delivery' },
  { name: 'О нас', href: '/about' },
  { name: 'Акции', href: '/stocks' }
  // { name: 'Отзывы', href: '/' }, // TODO: Add correct link
  // { name: 'Вакансии', href: '/' } // TODO: Add correct link
]

export const LayoutDefaultHeaderMobileMenu: FC<Props> = ({
  opened,
  onClose
}) => {
  const { pathname } = useRouter()
  const previousPathname = usePrevious(pathname)

  const { data: restaurantInfo } = useRestaurantInfo()

  useEffect(() => {
    const pathsAreNotEqual =
      previousPathname !== undefined && pathname !== previousPathname
    if (opened && pathsAreNotEqual) {
      onClose?.()
    }
  }, [pathname, opened, onClose, previousPathname])

  return (
    <div className="flex flex-col items-center px-16">
      <div className="w-full divide-y divide-white/20">
        <LayoutDefaultHeaderActions
          buttonsClassName="w-full flex justify-center py-10"
          className="mt-7 flex w-full flex-col items-center pb-22"
        />

        <nav className="w-full">
          <ul className="mt-22 flex flex-col items-center">
            {links.map((link, i) => (
              <li key={i} className="w-full">
                <AppLink
                  activeClassName="!text-pink"
                  className="block grow py-10 text-center text-white text-regular-17"
                  href={link.href}
                >
                  {link.name}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="mt-30 flex w-full justify-center pt-32" />
      </div>

      <address className="mt-28 text-white text-regular-15">
        {makeAddressString(restaurantInfo as DeliveryAddress)}
      </address>

      {restaurantInfo?.phone && (
        <a
          href={`tel:${restaurantInfo?.phone}`}
          className="mt-8 text-white text-regular-15"
        >
          {formatPhoneNumber(restaurantInfo?.phone)}
        </a>
      )}
    </div>
  )
}
