import { shippingCost, freeShippingThreshold } from '@/helpers/constants'

type Item = {
  price: number;
  amount: number;
};

type ItemArray = Item[];

// Get actual shipping cost
export const getShippingCost = (productCost: number): number => {
  if (productCost >= freeShippingThreshold) return 0
  return shippingCost
}

// Get product cost without shipping
export const getProductCost = (items: ItemArray): number => items.reduce((total, item) => total + item.price * item.amount, 0);

// Get total cost, shipping + product
export const getTotalCost = (items: ItemArray): number => {
  const productCost = getProductCost(items)
  return productCost + getShippingCost(productCost)
}
