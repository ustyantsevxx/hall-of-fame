import { useCartItems } from './useCartItems'

export const useCartTotalCost = () => {
  const { data: cartItems } = useCartItems()
  const totalCost =
    cartItems?.reduce(
      (prevValue, currentValue) =>
        prevValue + currentValue.count * currentValue.product.price,
      0
    ) || 0

  return {
    total: totalCost
  }
}
