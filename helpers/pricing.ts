import { shippingCost, freeShippingThreshold } from '@/helpers/constants'

type HasPriceAndQuantity = { price: number; quantity: number };

// Get actual shipping cost
export const getShippingCost = (productCost: number): number => {
  if (productCost >= freeShippingThreshold) return 0
  return shippingCost
}

// Get product cost without shipping
export const getProductCost =  (items: Partial<HasPriceAndQuantity>[]): number => items.reduce((total, item) => total + item.price * item.quantity, 0);

// Get total cost, shipping + product
export const getTotalCost =  (items: Partial<HasPriceAndQuantity>[]): number => {
  const productCost = getProductCost(items)
  return productCost + getShippingCost(productCost)
}
