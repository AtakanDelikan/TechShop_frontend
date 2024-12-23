import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const productImageApi = createApi({
  reducerPath: "productImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
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
