/* eslint-disable eqeqeq */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateInfo_admin: (state, action) => {
      const { info } = action.payload;
      state.info = info;
    },
    removeInfo_admin: (state, action) => {
      return initialState;
    },
  },
});

export const { updateInfo_admin, removeInfo_admin } = adminSlice.actions;
export default adminSlice.reducer;
