import { FC, HTMLAttributes } from 'react'
import { withHttps } from 'ufo'

import InstagramSvg from '../../../../assets/svg/Instagram.svg'
import TelegramSvg from '../../../../assets/svg/Telegram.svg'
import VKSvg from '../../../../assets/svg/VK.svg'
import { useRestaurantInfo } from './useRestaurantInfo'

type Social = {
  name: string
  username: string
  href: string
  iconComponent: FC<HTMLAttributes<SVGElement>>
}

const getUsernameFromLink = (link: string) => link.split('/').pop()

export const useSocials = () => {
  const { data: info } = useRestaurantInfo()

  if (!info) {
    return []
  }

  const instagramUsername = getUsernameFromLink(info.inst_url || '')
  const telegramUsername = getUsernameFromLink(info.tg_url || '')
  const vkUsername = getUsernameFromLink(info.vk_url || '')

  const socials = [
    instagramUsername && {
      name: 'Instagram',
      username: instagramUsername,
      href: withHttps(info.inst_url),
      iconComponent: InstagramSvg
    },
    telegramUsername && {
      name: 'Telegram',
      username: telegramUsername,
      href: withHttps(info.tg_url),
      iconComponent: TelegramSvg
    },
    vkUsername && {
      name: 'VK',
      username: vkUsername,
      href: withHttps(info.vk_url),
      iconComponent: VKSvg
    }
  ].filter(Boolean)

  return socials as Social[]
}
