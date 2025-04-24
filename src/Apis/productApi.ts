import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers) => {
    //   headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    //   return headers;
    // },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "product",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `product/${id}`,
      }),
      providesTags: ["Products"],
    }),
    getProductsByCategory: builder.query({
      query: (params) => ({
        url: `product/category/${params}`,
      }),
      providesTags: ["Products"],
    }),
    getFilteredProducts: builder.query({
      query: (params) => ({
        url: `product/filter/?${params}`,
      }),
      providesTags: ["Products"],
    }),
    getSearchedProducts: builder.query({
      query: (params) => ({
        url: `product/search?${params}`,
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: "product/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "product/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFilteredProductsQuery,
  useGetSearchedProductsQuery,
} = productApi;
export default productApi;
