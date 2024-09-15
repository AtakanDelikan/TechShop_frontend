import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const laptopApi = createApi({
  reducerPath: "laptopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7260/api/",
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
