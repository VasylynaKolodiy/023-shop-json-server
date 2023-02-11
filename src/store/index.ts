import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from "./products/products.api";
import {userReducer} from "./products/user.slice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    auth: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>