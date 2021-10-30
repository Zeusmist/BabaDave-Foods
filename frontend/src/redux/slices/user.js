/* eslint-disable eqeqeq */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  addresses: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfo: (state, action) => {
      const { info } = action.payload;
      console.log("Setting user in app", { ...info });
      state.info = info;
    },
    removeInfo: (state, action) => {
      console.log("Removing user");
      return initialState;
    },
    addAddress: (state, action) => {
      const { address } = action.payload;
      console.log("Added address");
      state.addresses.push(address);
    },
    updateAddress: (state, action) => {
      const { id, updatedAddress } = action.payload;
      const index = state.findIndex((a) => a.id == id);
      if (index > -1) state[index] = { ...updatedAddress };
    },
    removeAddress: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((a) => a.id == id);
      if (index > -1) state[index] = state.splice(index, 1);
    },
  },
});

export const {
  updateInfo,
  removeInfo,
  addAddress,
  updateAddress,
  removeAddress,
} = userSlice.actions;
export default userSlice.reducer;
