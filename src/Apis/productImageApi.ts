import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const API_URL = process.env.REACT_APP_API_URL;

const productImageApi = createApi({
  reducerPath: "productImageApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ProductImages"],
  endpoints: (builder) => ({
    createProductImages: builder.mutation({
      query: (data) => ({
        url: "productImage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductImages"],
    }),
  }),
});

export const { useCreateProductImagesMutation } = productImageApi;
export default productImageApi;
