import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const bulkImportApi = createApi({
  reducerPath: "bulkImportApi",
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
    bulkImportCategories: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "BulkImport/importCategories",
          method: "POST",
          body: formData,
        };
      },
    }),

    bulkImportCategoryAttributes: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "BulkImport/importCategoryAttributes",
          method: "POST",
          body: formData,
        };
      },
    }),

    bulkImportProducts: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "BulkImport/importProducts",
          method: "POST",
          body: formData,
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
