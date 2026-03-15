import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { apiResponse } from "../Interfaces";

export const API_URL = process.env.REACT_APP_API_URL;

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
    logoutUser: builder.mutation<apiResponse, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
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
  useLogoutUserMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} = authApi;
export default authApi;
