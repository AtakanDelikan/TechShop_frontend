import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const laptopApi = createApi({
  reducerPath: "laptopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Laptops"],
  endpoints: (builder) => ({
    getLaptops: builder.query({
      query: () => ({
        url: "laptop",
      }),
      providesTags: ["Laptops"],
    }),
    getLaptopById: builder.query({
      query: (id) => ({
        url: `laptop/${id}`,
      }),
      providesTags: ["Laptops"],
    }),
    updateLaptop: builder.mutation({
      query: ({ data, id }) => ({
        url: "laptop/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Laptops"],
    }),
    createLaptop: builder.mutation({
      query: (data) => ({
        url: "laptop",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Laptops"],
    }),
    deleteLaptop: builder.mutation({
      query: (id) => ({
        url: "laptop/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Laptops"],
    }),
  }),
});

export const {
  useGetLaptopsQuery,
  useGetLaptopByIdQuery,
  useCreateLaptopMutation,
  useDeleteLaptopMutation,
  useUpdateLaptopMutation,
} = laptopApi;
export default laptopApi;
