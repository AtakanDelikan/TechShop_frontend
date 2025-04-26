import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const salesAnalyticsApi = createApi({
  reducerPath: "salesAnalyticsApi",
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
  endpoints: (builder) => ({
    getSalesAnalytics: builder.query({
      query: () => ({
        url: "SalesAnalytics",
      }),
    }),
  }),
});

export const { useGetSalesAnalyticsQuery } = salesAnalyticsApi;
export default salesAnalyticsApi;
