import { BaseService } from '../../shared/base.service'
import { Product, ProductGroup } from './products.types'

class ProductsServiceClass extends BaseService {
  async getProductsGroupedByCategories() {
    const response = await this.axios.get<ProductGroup[]>(
      this.getPath('grouped-by-categories')
    )
    return response.data
  }

  async getProduct(productId: number) {
    const response = await this.axios.get<Product>(this.getPath('show'), {
      params: {
        product_id: productId
      }
    })
    return response.data
  }

  async getByIds(productIds: number[]) {
    const response = await this.axios.get<Product[]>(
      this.getPath('get-by-ids'),
      {
        params: {
          product_ids: productIds
        }
      }
    )
    return response.data
  }

  generateCategoryId(categoryId: number) {
    return `category-${categoryId}`
  }
}

export const ProductsService = new ProductsServiceClass('api/v1/products')
