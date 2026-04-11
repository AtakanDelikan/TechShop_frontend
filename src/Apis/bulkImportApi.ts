import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const API_URL = process.env.REACT_APP_API_URL;

const bulkImportApi = createApi({
  reducerPath: "bulkImportApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    bulkImportCategories: builder.mutation({
      query: (data: FormData) => {
        return {
          url: "BulkImport/importCategories",
          method: "POST",
          body: data,
        };
      },
    }),

    bulkImportCategoryAttributes: builder.mutation({
      query: (data: FormData) => {
        return {
          url: "BulkImport/importCategoryAttributes",
          method: "POST",
          body: data,
        };
      },
    }),

    bulkImportProducts: builder.mutation({
      query: (data: FormData) => {
        return {
          url: "BulkImport/importProducts",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useBulkImportCategoriesMutation,
  useBulkImportCategoryAttributesMutation,
  useBulkImportProductsMutation,
} = bulkImportApi;
export default bulkImportApi;
