import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

export const emptyUserState: userModel = {
  fullName: "",
  id: "",
  email: "",
  role: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    setLoggedOutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      
      return emptyUserState;
    },
  },
});

export const { setLoggedInUser, setLoggedOutUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
