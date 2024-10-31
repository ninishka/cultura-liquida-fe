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

interface LayoutData {
    description: string;
    ingredient: string;
    price: number;
    stock: number;
    title: string;
    type: string;
    url: string;
    __v: number;
    size?: string;

}

interface CartState {
  cartItems: CartItemType[]
  showCart: boolean
  showMenu: boolean
  layoutData: LayoutData[] 
}

const initialState: CartState = {
  cartItems: [],
  showCart: false,
  showMenu: false,
  layoutData: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLayoutData(state, action: PayloadAction<any[]>) {
      state.layoutData = action.payload
    },
    addToCart(state, action: PayloadAction<{ item: CartItemType; amount?: number }>) {
      console.log('REDUX')
      console.log('action', action)
      const amount =  action?.payload?.amount || 1

      const existingItem = state.cartItems.find(i => i.idCart === action.payload.idCart)
      if (existingItem) {
        existingItem.amount += amount
      } else {
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
    toggleShowCart: (state, action) => {
        console.log('action', action)
        state.showCart = action.payload;
      },
    toggleShowMenu(state) {
      state.showMenu = !state.showMenu
    },
  },
})

export const { addToCart, removeFromCart, toggleShowCart, toggleShowMenu, setLayoutData } = cartSlice.actions
export default cartSlice.reducer
