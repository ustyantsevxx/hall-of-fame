export interface Station {
  id: number
  name: string
  address?: string
  latitude?: number
  longitude?: number
}

export interface StationsAllRequestParams {
  payment_methods_id?: number[]
  services_id?: number[]
  stock_id?: number
}

export interface StationsRequestOptions {
  articleId?: number
}
