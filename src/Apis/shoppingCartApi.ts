import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingcart`,
        params: { userId: userId },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ laptopId, updateQuantityBy, userId }) => ({
        url: "shoppingcart",
        method: "POST",
        params: {
          laptopId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
