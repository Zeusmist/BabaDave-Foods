import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0.0,
  },
  reducers: {
    addItem: (state, action) => {
      const { itemIndex, item } = action.payload;
      if (itemIndex > -1) state.cartItems[itemIndex].quantity += 1;
      else state.cartItems.push({ ...item, quantity: 1 });
      let quantity = 0;
      let total = 0.0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.cartQuantity = quantity;
      state.cartTotal = total;
    },
    removeItem: (state, action) => {
      const { itemIndex } = action.payload;
      if (itemIndex > -1) state.cartItems.splice(itemIndex, 1);
      let quantity = 0;
      let total = 0.0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.cartQuantity = quantity;
      state.cartTotal = total;
    },
    updateItem: (state, action) => {
      const { itemIndex, key, value } = action.payload;
      state.cartItems[itemIndex][key] = value;
      let quantity = 0;
      let total = 0.0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.cartQuantity = quantity;
      state.cartTotal = total;
    },
  },
});

export const { addItem, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
