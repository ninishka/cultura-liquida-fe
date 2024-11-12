import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from '@/lib/redux/slices/cartSlice'
import productReducer from '@/lib/redux/slices/productSlice'
import { productsAPI } from "@/lib/redux/slices/api";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     product: productReducer,
//   },
// })


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




// import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from '@/lib/redux/slices/cartSlice'
// import productReducer from '@/lib/redux/slices/productSlice'
// import { productsAPI } from "@/lib/redux/slices/api";

// // export const store = configureStore({
// //   reducer: {
// //     cart: cartReducer,
// //     product: productReducer,
// //   },
// // })

// export const makeStore = () => configureStore({
//   reducer: {
//     cart: cartReducer,
//     product: productReducer,
//     [productsAPI.reducerPath]: productsAPI.reducer,
//   },
// })

// export type AppStore = ReturnType<typeof makeStore>


// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']
