import 'swiper/css'
import 'swiper/css/navigation'

import clsx from 'clsx'
import { FC, useState } from 'react'
import { FreeMode, Mousewheel, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useMarkStoryAsViewed } from '../api/modules/stories/hooks/useMarkStoryAsViewed'
import { useStories } from '../api/modules/stories/hooks/useStories'
import { Story } from '../api/modules/stories/stories.types'
import { breakpoints } from '../app/core/tailwind-theme'
import ArrowCardsLeftSvg from '../assets/svg/ArrowCardsLeft.svg'
import ArrowCardsRightSvg from '../assets/svg/ArrowCardsRight.svg'
import { StoriesModal } from './StoriesModal'
import { StoriesSliderItem } from './StoriesSliderItem'
import { StoriesSliderNavButton } from './StoriesSliderNavButton'

type Props = {
  className?: string
}

export const StoriesSlider: FC<Props> = ({ className }) => {
  const [navPrevEl, setNavPrevEl] = useState<HTMLElement | null>(null)
  const [navNextEl, setNavNextEl] = useState<HTMLElement | null>(null)
  const { data: stories, isLoading } = useStories()

  const [selectedStory, setSelectedStory] = useState<Story>()
  const [storiesModalOpened, setStoriesModalOpened] = useState(false)
  const { mutate: markAsViewed } = useMarkStoryAsViewed()

  const setAndMarkAsViewed = (story: Story) => {
    markAsViewed(story)
    setSelectedStory(story)
  }

  const handleStoryClick = (story: Story) => {
    setAndMarkAsViewed(story)
    setStoriesModalOpened(true)
  }

  const selectedStoryIndex = stories?.findIndex(
    story => story.id === selectedStory?.id
  ) as number

  const selectNextStory = () => {
    const nextIndex = selectedStoryIndex + 1
    if (stories && nextIndex < stories.length) {
      setAndMarkAsViewed(stories[nextIndex])
    } else {
      setStoriesModalOpened(false)
    }
  }

  const selectPrevStory = () => {
    const prevIndex = selectedStoryIndex - 1
    if (stories && prevIndex >= 0) {
      setAndMarkAsViewed(stories[prevIndex])
    } else {
      setStoriesModalOpened(false)
    }
  }

  return (
    <>
      <div
        className={clsx('h-[146px] md:h-[230px]', className, {
          '!h-auto': !isLoading && stories && stories.length === 0
        })}
      >
        {stories && stories.length > 0 && (
          <div className={clsx('relative h-[146px] md:h-[230px]')}>
            <Swiper
              modules={[Navigation, FreeMode, Mousewheel]}
              slidesPerView="auto"
              spaceBetween={10}
              slidesPerGroup={3}
              slidesOffsetAfter={16}
              slidesOffsetBefore={16}
              mousewheel
              threshold={10}
              navigation={{ prevEl: navPrevEl, nextEl: navNextEl }}
              breakpoints={{
                [breakpoints.xl]: {
                  spaceBetween: 20,
                  slidesOffsetAfter: 0,
                  slidesOffsetBefore: 0
                }
              }}
            >
              {stories?.map(story => (
                <SwiperSlide key={story.id} className="!h-auto !w-auto">
                  <StoriesSliderItem
                    item={story}
                    onClick={() => handleStoryClick(story)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <StoriesSliderNavButton
              ref={e => setNavPrevEl(e)}
              className="-translate-x-[24px]"
              title="Назад"
            >
              <ArrowCardsLeftSvg />
            </StoriesSliderNavButton>

            <StoriesSliderNavButton
              ref={e => setNavNextEl(e)}
              className="right-0 translate-x-[24px]"
              title="Вперед"
            >
              <ArrowCardsRightSvg />
            </StoriesSliderNavButton>
          </div>
        )}
      </div>

      <StoriesModal
        story={selectedStory as Story}
        opened={storiesModalOpened}
        onNextStory={selectNextStory}
        onPrevStory={selectPrevStory}
        onClose={setStoriesModalOpened}
      />
    </>
  )
}
