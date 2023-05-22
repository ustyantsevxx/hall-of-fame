import { useQuery, UseQueryOptions } from 'react-query'

import { StoriesService } from '../stories.service'
import { Story } from '../stories.types'

export const STORIES_QUERY_KEY = 'stories'

export const getStoriesQuery = (
  viewedStoryIds: number[] = []
): UseQueryOptions<Story[]> => ({
  queryKey: STORIES_QUERY_KEY,
  queryFn: () => StoriesService.getStories(viewedStoryIds)
})

export const useStories = () => {
  return useQuery({
    ...getStoriesQuery(),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}
