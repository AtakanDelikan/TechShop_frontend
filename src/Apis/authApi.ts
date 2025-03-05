import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = process.env.REACT_APP_API_URL;

const authApi = createApi({
  reducerPath: "authApi",
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
  tagTypes: ["UserData"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: userCredentials,
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: "auth/userdata",
      }),
      providesTags: ["UserData"],
    }),
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "auth/userdata",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserData"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} = authApi;
export default authApi;
