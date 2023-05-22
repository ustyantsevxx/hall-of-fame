import { Media, MetaPagination } from '~/logic/types/api-meta'

export interface Article {
  id?: number
  title?: string
  content?: string
  stations_count?: number
  start_at?: number
  end_at?: number
  image?: Media
}

export interface ShortArticle {
  id?: number
  title?: string
  content_small?: string
  start_at?: number
  end_at?: number
  image?: Media
}

export interface ArticlesIndexRequestParams {
  page?: number
  per_page?: number
  station_id?: number
}

export interface ArticlesIndexResponse {
  data?: ShortArticle[]
  meta?: MetaPagination
}

export interface ArticlesShowRequestParams {
  id: number
}

export interface GetArticlesOptions {
  page: number
}
