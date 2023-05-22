import clsx from 'clsx'
import { FC } from 'react'

import { useSocials } from '../api/modules/restaurants/hooks/useSocials'

type Props = {
  className?: string
}

export const SocialLinks: FC<Props> = ({ className }) => {
  const socials = useSocials()

  return (
    <ul className={clsx('flex items-center space-x-14', className)}>
      {socials.map((social, i) => (
        <li key={i}>
          <a
            title={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full bg-pink p-8 text-white"
          >
            <social.iconComponent />
          </a>
        </li>
      ))}
    </ul>
  )
}
