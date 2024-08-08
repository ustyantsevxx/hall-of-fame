import clsx from 'clsx'
import { FC } from 'react'

import { Story } from '../api/modules/stories/stories.types'
import { AppImage } from './AppImage'

type Props = {
  item: Story
  onClick: () => void
}

export const StoriesSliderItem: FC<Props> = ({ item, onClick }) => {
  const previewImageUrl = item?.preview?.url
  const title = item.media[0]?.description ?? 'Story'

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        'group h-[146px] w-[110px] cursor-pointer rounded-20 border-2 transition sm:h-[230px] sm:w-[184px]',
        item.viewed ? 'border-transparent' : 'border-pink'
      )}
      onClick={onClick}
    >
      <div className="mask-image-gradient absolute inset-6 flex items-center justify-center overflow-hidden rounded-16 bg-gray">
        <div className="relative flex h-full w-full items-center justify-center">
          {previewImageUrl ? (
            <AppImage
              priority
              src={previewImageUrl}
              alt={title}
              className="transition duration-300 group-hover:scale-101"
            />
          ) : (
            <p className="text-center text-black/50 text-regular-13 md:text-regular-15">
              xx xx
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
