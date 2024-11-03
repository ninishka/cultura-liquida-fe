import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/store/slices/cartSlice'
import productReducer from '@/lib/store/slices/productSlice'

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     product: productReducer,
//   },
// })

export const makeStore = () => configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
})

export type AppStore = ReturnType<typeof makeStore>


export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
