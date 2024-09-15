import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  laptop: [],
};

export const laptopSlice = createSlice({
  name: "Laptop",
  initialState: initialState,
  reducers: {
    setLaptop: (state, action) => {
      state.laptop = action.payload;
    },
  },
});

export const { setLaptop } = laptopSlice.actions;
export const laptopReducer = laptopSlice.reducer;
