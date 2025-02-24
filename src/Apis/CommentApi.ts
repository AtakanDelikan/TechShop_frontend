import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const commentApi = createApi({
  reducerPath: "commentApi",
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
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getCommentByProduct: builder.query({
      query: (id) => ({
        url: `comment/${id}`,
      }),
      providesTags: ["Comments"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: "comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: "comment/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentByProductQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
export default commentApi;
