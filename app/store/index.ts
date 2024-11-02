import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/app/store/slices/cartSlice'
import productReducer from '@/app/store/slices/productSlice'
import toggleReducer from '@/app/store/slices/toggleSlice'
// import itemCartReducer from '@/app/store/slices/itemCartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    toggling: toggleReducer,
    // itemCart: itemCartReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
