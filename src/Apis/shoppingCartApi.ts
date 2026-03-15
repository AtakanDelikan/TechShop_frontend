import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const API_URL = process.env.REACT_APP_API_URL;

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: baseQueryWithReauth,
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
      query: ({ productId, updateQuantityBy, userId }) => ({
        url: "shoppingcart",
        method: "POST",
        params: {
          productId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
    deleteShoppingCart: builder.mutation({
      query: (id) => ({
        url: "shoppingcart/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const {
  useGetShoppingCartQuery,
  useUpdateShoppingCartMutation,
  useDeleteShoppingCartMutation,
} = shoppingCartApi;
export default shoppingCartApi;
