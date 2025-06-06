import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from '@/lib/redux/slices/cartSlice'
import { productsAPI } from "@/lib/redux/slices/api";
import { ordersAPI } from "@/lib/redux/slices/orderApi";
import { authAPI } from '@/lib/redux/slices/authApi';

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', storeAPI.getState());
  return result;
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      [ordersAPI.reducerPath]: ordersAPI.reducer,
      [productsAPI.reducerPath]: productsAPI.reducer,
      [authAPI.reducerPath]: authAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productsAPI.middleware,
        ordersAPI.middleware,
        authAPI.middleware,
        // loggerMiddleware
      ),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']



// before MIDDLEWARE vesion
// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     product: productReducer,
//   },
// })
