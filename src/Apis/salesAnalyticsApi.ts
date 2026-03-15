import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const API_URL = process.env.REACT_APP_API_URL;

const salesAnalyticsApi = createApi({
  reducerPath: "salesAnalyticsApi",
  baseQuery: baseQueryWithReauth,
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
