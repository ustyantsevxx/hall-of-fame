export interface ValidationException {
  field?: string
  message?: string
  description?: string
}

export interface MetaPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface Media {
  id?: number
  url?: string
}
