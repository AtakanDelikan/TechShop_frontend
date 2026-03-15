import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const API_URL = process.env.REACT_APP_API_URL;

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: (params) => ({
        url: "order",
        params: params,
        // default params, pageNumber = 1, pageSize = 20, status = ""
      }),
      providesTags: ["Orders"],
    }),
    getOrdersByUserId: builder.query({
      query: (userId) => ({
        url: "order/byUser",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: "order/" + orderDetails.orderHeaderId,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrdersByUserIdQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation,
} = orderApi;
export default orderApi;
