export type User = {
  id: number
  addresses_count: number
  birth_date: string | null
  name: string | null
  last_email: string | null
  phone: string
  coins_count: number | null
}

export type UserProfileUpdateRequestParams = {
  name: string
  birth_date: string | null
}
