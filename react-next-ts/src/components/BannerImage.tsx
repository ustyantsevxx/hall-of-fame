import clsx from 'clsx'
import { ImageProps } from 'next/image'
import { FC, ReactNode } from 'react'

import { AppImage } from './AppImage'

type Props = {
  className?: string
  title?: string
  titleRenderer?: () => ReactNode
  imageSrc: ImageProps['src']
}

export const BannerImage: FC<Props> = ({
  className,
  title,
  titleRenderer,
  imageSrc
}) => {
  return (
    <div className={clsx('overflow-hidden rounded-20 bg-green', className)}>
      <div className="px-18 pt-22 pb-16 empty:hidden md:p-30 md:pb-20">
        {title && <p className="text-white text-regular-17">{title}</p>}
        {titleRenderer?.()}
      </div>

      <div className="aspect-w-1 aspect-h-1 relative">
        <AppImage src={imageSrc} alt={title} />
      </div>
    </div>
  )
}
