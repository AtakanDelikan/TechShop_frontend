import { configureStore } from "@reduxjs/toolkit";
import {
  authApi,
  orderApi,
  paymentApi,
  shoppingCartApi,
  categoryApi,
  categoryAttributeApi,
  productApi,
  productAttributeApi,
  commentApi,
  bulkImportApi,
  salesAnalyticsApi,
} from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";
import productImageApi from "../../Apis/productImageApi";

const store = configureStore({
  reducer: {
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [categoryAttributeApi.reducerPath]: categoryAttributeApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productAttributeApi.reducerPath]: productAttributeApi.reducer,
    [productImageApi.reducerPath]: productImageApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [bulkImportApi.reducerPath]: bulkImportApi.reducer,
    [salesAnalyticsApi.reducerPath]: salesAnalyticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(orderApi.middleware)
      .concat(categoryApi.middleware)
      .concat(categoryAttributeApi.middleware)
      .concat(productApi.middleware)
      .concat(productAttributeApi.middleware)
      .concat(productImageApi.middleware)
      .concat(commentApi.middleware)
      .concat(bulkImportApi.middleware)
      .concat(salesAnalyticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
