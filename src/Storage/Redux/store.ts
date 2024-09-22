import { configureStore } from "@reduxjs/toolkit";
import { laptopReducer } from "./laptopSlice";
import { laptopApi, shoppingCartApi } from "../../Apis";
import { getDefaultSettings } from "http2";
import { shoppingCartReducer } from "./shoppingCartSlice";

const store = configureStore({
  reducer: {
    laptopStore: laptopReducer,
    shoppingCartStore: shoppingCartReducer,
    [laptopApi.reducerPath]: laptopApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(laptopApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
