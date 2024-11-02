import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/app/store/slices/cartSlice'
import productReducer from '@/app/store/slices/productSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
