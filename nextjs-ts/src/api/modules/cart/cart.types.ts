export type CartItemProduct = {
  id: number
  name: string
  price: number
  sale_price: number
  description?: string
  image?: string
}

export type CartItemType = {
  product: CartItemProduct
  extra?: boolean
  count: number
}

export type CartStorageItem = {
  productId: number
  extra?: boolean
  count: number
}
