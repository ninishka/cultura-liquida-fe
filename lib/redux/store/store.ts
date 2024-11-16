import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from '@/lib/redux/slices/cartSlice'
import { productsAPI } from "@/lib/redux/slices/api";

// before MIDDLEWARE vesion
// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     product: productReducer,
//   },
// })


export const makeStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsAPI.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
