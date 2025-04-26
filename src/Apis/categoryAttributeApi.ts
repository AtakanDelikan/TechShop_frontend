import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const categoryAttributeApi = createApi({
  reducerPath: "categoryAttributeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
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
    updateCategoryAttribute: builder.mutation({
      query: ({ data, id }) => ({
        url: "categoryAttribute/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CategoryAttributes"],
    }),
    deleteCategoryAttribute: builder.mutation({
      query: (id) => ({
        url: "categoryAttribute/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CategoryAttributes"],
    }),
  }),
});

export const {
  useGetCategoryAttributesQuery,
  useCreateCategoryAttributeMutation,
  useUpdateCategoryAttributeMutation,
  useDeleteCategoryAttributeMutation,
  useGetCategoryAttributesByIdQuery,
} = categoryAttributeApi;
export default categoryAttributeApi;
