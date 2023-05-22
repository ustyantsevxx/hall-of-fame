import { ProductsService } from '../products/products.service'
import { Product } from '../products/products.types'
import { CartItemProduct, CartItemType, CartStorageItem } from './cart.types'

const LOCAL_STORAGE_CART_KEY = 'cart'

const cartLocalStorage = {
  getCartItems: (): CartStorageItem[] => {
    const localItems = localStorage.getItem(LOCAL_STORAGE_CART_KEY)
    return localItems ? JSON.parse(localItems) : []
  },
  addCartItem: (productId: number, extra?: boolean, count = 1) => {
    const localItems = cartLocalStorage.getCartItems()
    localItems.push({ extra, productId, count })
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(localItems))
  },
  removeCartItem: (productId: number) => {
    const localItems = cartLocalStorage.getCartItems()
    localStorage.setItem(
      LOCAL_STORAGE_CART_KEY,
      JSON.stringify(localItems.filter(i => i.productId !== productId))
    )
  },
  setCartItemCount: (productId: number, count: number) => {
    const localItems = cartLocalStorage.getCartItems()
    localStorage.setItem(
      LOCAL_STORAGE_CART_KEY,
      JSON.stringify(
        localItems.map(i => (i.productId === productId ? { ...i, count } : i))
      )
    )
  },
  clearCart: () => {
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
  }
}

class CartServiceClass {
  async getCartItems(): Promise<CartItemType[]> {
    try {
      const localCartItems = cartLocalStorage.getCartItems()
      if (localCartItems.length > 0) {
        const cartProducts: Product[] = await ProductsService.getByIds(
          localCartItems.map(item => item.productId)
        )

        const result: CartItemType[] = []

        for (const item of localCartItems) {
          const product = cartProducts.find(
            product => product.id === item.productId
          )
          if (product) {
            result.push({
              extra: item.extra,
              count: item.count,
              product: {
                ...product,
                image: product.image?.url
              }
            })
          } else {
            cartLocalStorage.removeCartItem(item.productId)
          }
        }

        return result
      } else {
        return []
      }
    } catch {
      cartLocalStorage.clearCart()
      return []
    }
  }

  addCartItem(item: CartItemType): void {
    cartLocalStorage.addCartItem(item.product.id, item.extra, item.count)
  }

  removeCartItem(product: CartItemProduct): void {
    cartLocalStorage.removeCartItem(product.id)
  }

  setCartItemCount(productId: number, count: number): void {
    cartLocalStorage.setCartItemCount(productId, count)
  }

  clearCart(): void {
    cartLocalStorage.clearCart()
  }
}

export const CartService = new CartServiceClass()
