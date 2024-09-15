import { configureStore } from "@reduxjs/toolkit";
import { laptopReducer } from "./laptopSlice";
import { laptopApi } from "../../Apis";
import { getDefaultSettings } from "http2";

const store = configureStore({
  reducer: {
    laptopStore: laptopReducer,
    [laptopApi.reducerPath]: laptopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(laptopApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
