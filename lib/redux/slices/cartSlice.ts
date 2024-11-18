import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItemType {
  description: string;
  icon: any;
  iconSrc: any;
  src: any;
  id: string;
  _id: string;
  ingredient: string;
  price: number;
  stock: number;
  size?: string;
  title: string;
  type: string;
  url: string;
  __v: number;

  amount?: number;
  idCart?: string;
}

type ExtendedPayload = CartItemType & {
  isModal?: boolean;
};

interface CartState {
  cartItems: CartItemType[]
  count: number
  showCart: boolean
}

const initialState: CartState = {
  cartItems: [],
  count: 1,
  showCart: false,
}

type ExtendedPayload2 = CartItemType & {
  isModal?: boolean;
  // idCart
  removeAll?: boolean;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    addToCart(state, action: PayloadAction<ExtendedPayload>) {
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
    removeFromCart(state, action: PayloadAction<ExtendedPayload2>) {
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

export const { addToCart, removeFromCart, toggleShowCart } = cartSlice.actions
export default cartSlice.reducer