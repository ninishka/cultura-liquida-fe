import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartState, ExtendedPayload } from '@/types/types'

const initialState: CartState = {
  cartItems: [],
  count: 1,
  showCart: false,
  showMenu: false,
  isMercadoInit: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    },
    toggleShowCart: (state, action: PayloadAction<boolean>) => {
      state.showCart = action.payload;
    },
    toggleSetMercado: (state, action: PayloadAction<boolean>) => {
      state.isMercadoInit = action.payload;
    },
    addToCart(state, action: PayloadAction<ExtendedPayload>) {
      const quantity =  action?.payload?.quantity || 1
      const existingItem = state.cartItems.find(i => i.idCart === action.payload.idCart)

      if (existingItem) {
        if (action?.payload?.isModal) existingItem.quantity = quantity // edit existing item from modal
        else existingItem.quantity += quantity // edit existing item from Formation -> Couneter
      
      } else {
        console.log('new item')
        state.cartItems.push({ ...action.payload, quantity })
      }
    },
    removeFromCart(state, action: PayloadAction<ExtendedPayload>) {
      const { idCart, quantity = 1, removeAll = false } = action.payload
      const itemIndex = state.cartItems.findIndex(i => i.idCart === idCart)
      if (itemIndex >= 0) {
        if (removeAll || state.cartItems[itemIndex].quantity <= quantity) {
          state.cartItems.splice(itemIndex, 1)
        } else {
          state.cartItems[itemIndex].quantity -= quantity
        }
      }
    },
  },
})

export const { addToCart, removeFromCart, toggleShowCart, toggleShowMenu, toggleSetMercado } = cartSlice.actions
export default cartSlice.reducer
