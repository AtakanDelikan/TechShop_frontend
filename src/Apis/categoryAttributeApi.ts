import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const categoryAttributeApi = createApi({
  reducerPath: "categoryAttributeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["CategoryAttributes"],
  endpoints: (builder) => ({
    getCategoryAttributes: builder.query({
      query: () => ({
        url: "categoryAttribute",
      }),
      providesTags: ["CategoryAttributes"],
    }),
    getCategoryAttributesById: builder.query({
      query: (id) => ({
        url: `categoryAttribute/${id}`,
      }),
      providesTags: ["CategoryAttributes"],
    }),
    createCategoryAttribute: builder.mutation({
      query: (data) => ({
        url: "categoryAttribute",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CategoryAttributes"],
    }),
    deleteCategoryAttribute: builder.mutation({
      query: (id) => ({
        url: "categoryAttribute" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CategoryAttributes"],
    }),
  }),
});

export const {
  useGetCategoryAttributesQuery,
  useCreateCategoryAttributeMutation,
  useDeleteCategoryAttributeMutation,
  useGetCategoryAttributesByIdQuery,
} = categoryAttributeApi;
export default categoryAttributeApi;
