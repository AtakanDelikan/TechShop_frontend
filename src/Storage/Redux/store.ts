import { configureStore } from "@reduxjs/toolkit";
import { laptopReducer } from "./laptopSlice";
import { authApi, laptopApi, shoppingCartApi } from "../../Apis";
import { getDefaultSettings } from "http2";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
  reducer: {
    laptopStore: laptopReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [laptopApi.reducerPath]: laptopApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(laptopApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
