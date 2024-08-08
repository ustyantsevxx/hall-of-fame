import clsx from 'clsx'
import { FC } from 'react'
import { withHttps } from 'ufo'

import { useRestaurantAddress } from '../api/modules/restaurants/hooks/useRestaurantAddress'
import { useRestaurantInfo } from '../api/modules/restaurants/hooks/useRestaurantInfo'
import { useSocials } from '../api/modules/restaurants/hooks/useSocials'
import AboutPagePhoneSvg from '../assets/svg/AboutPagePhone.svg'
import PlaceSvg from '../assets/svg/Place.svg'
import { formatPhoneNumber } from '../utils'

type Props = {
  className?: string
}

export const AboutPageContactsCard: FC<Props> = ({ className }) => {
  const { data: content } = useRestaurantInfo()
  const socials = useSocials()
  const address = useRestaurantAddress()

  return (
    <div
      className={clsx('rounded-18 bg-gray pt-26 md:pr-32 md:pb-30', className)}
    >
      <h2 className="pl-23 text-black/50 text-regular-20 md:pl-36 md:text-black md:text-regular-26">
        xx
      </h2>

      <ul className="mt-12 text-regular-17">
        <li className="pl-16 md:pl-30">
          <a className="flex items-center" href={`tel:${content?.phone}`}>
            <span className="shrink-0">
              <AboutPagePhoneSvg />
            </span>
            <span className="ml-6">
              {formatPhoneNumber(content?.phone ?? '')}
            </span>
          </a>
        </li>

        <li className="mt-12 flex items-center pl-20 md:pl-34">
          <span className="shrink-0">
            <PlaceSvg />
          </span>
          <span className="ml-12">{address}</span>
        </li>

        {socials.map(social => (
          <li className="mt-20 pl-20 md:pl-34" key={social?.name}>
            <a
              href={withHttps(social.href)}
              title={social.name}
              target="_blank"
              className="flex items-center space-x-12 text-green text-regular-17"
              rel="noopener noreferrer"
            >
              <social.iconComponent />
              <span>{social.username}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
