import { BaseService } from '../../shared/base.service'
import { Story } from './stories.types'

export class StoriesServiceClass extends BaseService {
  async getStories(viewedStoryIds: number[]) {
    const { data: stories } = await this.axios.get<Story[]>(this.getPath())
    return viewedStoryIds.length > 0
      ? stories.map(story => ({
          ...story,
          viewed: story.viewed || viewedStoryIds.includes(story.id)
        }))
      : stories
  }

  async markAsViewed(storyId: number) {
    return this.makeSafeRequest(
      {
        method: 'POST',
        url: this.getPath('viewed', storyId)
      },
      { okIfStatus: 204 }
    )
  }
}

export const StoriesService = new StoriesServiceClass('api/v1/stories')
