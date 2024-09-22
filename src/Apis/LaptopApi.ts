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
  }),
});

export const { useGetLaptopsQuery, useGetLaptopByIdQuery } = laptopApi;
export default laptopApi;
