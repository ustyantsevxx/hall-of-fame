import { useUpdateMutation } from '../../../shared/hooks'
import { StoriesService } from '../stories.service'
import { Story } from '../stories.types'
import { STORIES_QUERY_KEY } from './useStories'

export const useMarkStoryAsViewed = () => {
  return useUpdateMutation<Story, Story>({
    itemsQueryKey: STORIES_QUERY_KEY,
    invalidateOnSettled: false,
    cacheItemUpdateFn: item => ({ ...item, viewed: true }),
    mutationFn: (story: Story) => StoriesService.markAsViewed(story.id),
    equalsToTargetItemFn: (storyA, storyB) => storyA.id === storyB.id
  })
}
