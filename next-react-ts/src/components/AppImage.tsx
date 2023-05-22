import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

type Props = ImageProps

export const AppImage: FC<Props> = ({ alt, ...props }) => {
  return (
    <Image
      alt={alt}
      objectFit="cover"
      layout="fill"
      draggable="false"
      onContextMenu={e => e.preventDefault()}
      onDrag={e => e.preventDefault()}
      {...props}
    />
  )
}
