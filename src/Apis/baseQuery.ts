import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setLoggedInUser,
  setLoggedOutUser,
} from "../Storage/Redux/userAuthSlice";
import { jwtDecode } from "jwt-decode";
import { userModel } from "../Interfaces";
import { Mutex } from "async-mutex";
const mutex = new Mutex();

export const API_URL = process.env.REACT_APP_API_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the token
        const accessToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        const refreshResult: any = await rawBaseQuery(
          {
            url: "auth/refresh",
            method: "POST",
            body: { accessToken, refreshToken },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data && refreshResult.data.isSuccess) {
          const { token, refreshToken: newRefreshToken } =
            refreshResult.data.result;

          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", newRefreshToken);

          const { fullName, id, email, role }: userModel = jwtDecode(token);
          api.dispatch(setLoggedInUser({ fullName, id, email, role }));

          // Retry the original request
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          // If refresh fails, clear everything
          api.dispatch(setLoggedOutUser());
        }
      } finally {
        release();
      }
    } else {
      //If it's locked by another request, wait for finish, then retry
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};
