import { FC, memo, useMemo } from 'react'

import { Story } from '../api/modules/stories/stories.types'
import ReactInstaStories from '../vendor/react-insta-stories'

type Props = {
  onPrev: () => void
  onNext: () => void
  onClose: () => void
  story: Story
}

export const StoriesModalStory: FC<Props> = memo(
  ({ onNext, onPrev, onClose, story }) => {
    const mappedStoryItems = useMemo(
      () =>
        story?.media.map(x => ({
          url: x.file.url ?? '',
          description: x.description ?? '',
          title: x.title ?? '',
          href: x.url ?? ''
        })) ?? [],
      [story]
    )

    return (
      <ReactInstaStories
        height="100%"
        keyboardNavigation
        defaultInterval={10_000}
        stories={mappedStoryItems}
        onAllStoriesEnd={onNext}
        onFirstPrevious={onPrev}
        onClose={onClose}
      />
    )
  }
)

StoriesModalStory.displayName = 'StoriesModalStory'
