import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const productAttributeApi = createApi({
  reducerPath: "productAttributeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["ProductAttributes"],
  endpoints: (builder) => ({
    getProductAttributes: builder.query({
      query: () => ({
        url: "productAttribute",
      }),
      providesTags: ["ProductAttributes"],
    }),
    createProductAttribute: builder.mutation({
      query: (data) => ({
        url: "productAttribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductAttributes"],
    }),
    updateProductAttribute: builder.mutation({
      query: (data) => ({
        url: "productAttribute",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProductAttributes"],
    }),
    deleteProductAttribute: builder.mutation({
      query: (id) => ({
        url: "productAttribute/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductAttributes"],
    }),
  }),
});

export const {
  useGetProductAttributesQuery,
  useCreateProductAttributeMutation,
  useUpdateProductAttributeMutation,
  useDeleteProductAttributeMutation,
} = productAttributeApi;
export default productAttributeApi;
