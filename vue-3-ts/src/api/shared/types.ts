export type User = {
  id: number
  email_verified: false
  username: string
  email: string
  has_data: boolean
  has_subscription: boolean
}

export type MetaPagination = {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export type MetaPaginationParams = {
  page?: number
  perPage?: number
}
