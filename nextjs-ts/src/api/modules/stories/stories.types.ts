import { Media } from '../../shared/types'

export type StoryItem = {
  title: string | null
  description: string | null
  url: string | null
  file: Media
}

export type Story = {
  id: number
  preview: Media
  media: StoryItem[]
  viewed: boolean
}
