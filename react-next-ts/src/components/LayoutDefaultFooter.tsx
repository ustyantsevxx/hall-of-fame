import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'

import { useRestaurantInfo } from '../api/modules/restaurants/hooks/useRestaurantInfo'
import FooterLogoMobileSvg from '../assets/svg/FooterLogoMobile.svg'
import GradientLogoSvg from '../assets/svg/GradientLogo.svg'
import { formatPhoneNumber } from '../utils'
import { SocialLinks } from './SocialLinks'

type Props = {
  className?: string
}

type FooterLink = {
  name: string
  href: string
}

const links: FooterLink[] = [
  { name: 'xx xx', href: '/about' },
  { name: 'xx', href: '/stocks' },
  { name: 'xx', href: '/delivery' }
  // { name: 'xx', href: '/' }, // TODO: Add correct links
  // { name: 'xx', href: '/' } // TODO: Add correct links
]

const currentYear = dayjs().year()

export const LayoutDefaultFooter: FC<Props> = ({ className }) => {
  const { data: restaurantInfo } = useRestaurantInfo()

  return (
    <footer className={className}>
      <div className="container">
        <div className="grid grid-cols-[1fr,auto,1fr] items-center">
          <div className="flex items-center">
            <GradientLogoSvg className="hidden w-45 lg:block" />
            <FooterLogoMobileSvg className="lg:hidden" />

            {restaurantInfo?.phone && (
              <a
                href={`tel:+${restaurantInfo?.phone}`}
                className="ml-10 lg:ml-30"
              >
                <p className="text-regular-15">
                  {formatPhoneNumber(restaurantInfo?.phone)}
                </p>
                <p className="mt-2 text-black/50 text-regular-15">
                  xx xx
                </p>
              </a>
            )}
          </div>

          <ul className="order-last col-span-3 mt-20 flex space-x-20 lg:order-none lg:col-span-1 lg:mt-0 lg:space-x-30 lg:justify-self-center">
            {links.map((link, i) => (
              <li key={i}>
                <Link href={link.href} passHref>
                  <a className="text-green text-regular-17">{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>

          <SocialLinks className="col-span-2 justify-self-end lg:col-span-1" />
        </div>

        <div className="my-20 flex items-center justify-center gap-14 border-t border-black/10 pt-16 text-black/50 text-regular-15 lg:my-40 lg:gap-30 lg:pt-26">
          <Link
            // TODO: Add correct link
            href="/"
            passHref
          >
            <a className="lg:order-2">xx xx</a>
          </Link>

          <p>NEXTJS_TS &copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  )
}
