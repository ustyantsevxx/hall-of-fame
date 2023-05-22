import { Media } from '../../shared/types'

export type ProductTag = {
  id: number
  name: string
}

export type CompositionProduct = {
  id: number
  name: string
}

export type Product = {
  id: number
  name: string
  price: number
  sale_price: number
  proteins: string
  fats: string
  carbohydrates: string
  calories: string
  weight: string
  description?: string
  image?: Media
  composition?: string
  composition_products?: CompositionProduct[]
  count: number
  tags: ProductTag[]
}

export type ProductsGroupProduct = {
  id: number
  name: string
  price: number
  sale_price: number
  image?: string
  composition?: string
  count: number
  tags: ProductTag[]
}

export type ProductGroup = {
  category_id: number
  category_name: string
  products: ProductsGroupProduct[]
}
