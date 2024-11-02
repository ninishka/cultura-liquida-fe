import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItemType {
  description: string;
  icon: object;
  iconSrc: object;
  src: object;
  id: string;
  _id: string;
  idCart: string;
  ingredient: string;
  price: number;
  stock: number;
  title: string;
  type: string;
  url: string;
  __v: number;
  amount?: number;
}

interface CartState {
  cartItems: CartItemType[]
  count: number
}

const initialState: CartState = {
  cartItems: [],
  count: 1
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ item: CartItemType; amount?: number, isModal?: boolean }>) {
      const amount =  action?.payload?.amount || 1
      const existingItem = state.cartItems.find(i => i.idCart === action.payload.idCart)

      if (existingItem) {
        if (action?.payload?.isModal) existingItem.amount = amount // edit existing item from modal
        else existingItem.amount += amount // edit existing item from Formation -> Couneter
      
      } else {
        console.log('new item')
        state.cartItems.push({ ...action.payload, amount })
      }
    },
    removeFromCart(state, action: PayloadAction<{ idCart: string; amount?: number; removeAll?: boolean }>) {
      const { idCart, amount = 1, removeAll = false } = action.payload
      const itemIndex = state.cartItems.findIndex(i => i.idCart === idCart)
      if (itemIndex >= 0) {
        if (removeAll || state.cartItems[itemIndex].amount <= amount) {
          state.cartItems.splice(itemIndex, 1)
        } else {
          state.cartItems[itemIndex].amount -= amount
        }
      }
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
