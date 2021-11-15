/* eslint-disable eqeqeq */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  addresses: [],
  // orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // INFO
    updateInfo: (state, action) => {
      const { info } = action.payload;
      state.info = info;
    },
    removeInfo: (state, action) => {
      return initialState;
    },

    // ADDRESSES
    addAddress: (state, action) => {
      const { address } = action.payload;
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

    // ORDERS
    // addOrder: (state, action) => {
    //   const { order } = action.payload;
    //   state.orders.push(order);
    // },
  },
});

export const {
  updateInfo,
  removeInfo,
  addAddress,
  updateAddress,
  removeAddress,
  // addOrder,
} = userSlice.actions;
export default userSlice.reducer;
