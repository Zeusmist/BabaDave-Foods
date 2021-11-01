import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0.0,
  },
  reducers: {
    populateCart: (state, action) => {
      state.cartItems = [...action.payload.items];
    },
    addItem: (state, action) => {
      const { itemIndex, item } = action.payload;
      if (itemIndex > -1) state.cartItems[itemIndex].quantity += 1;
      else state.cartItems.push({ ...item, quantity: 1 });
    },
    removeItem: (state, action) => {
      const { itemIndex } = action.payload;
      if (itemIndex > -1) state.cartItems.splice(itemIndex, 1);
    },
    updateItem: (state, action) => {
      const { itemIndex, key, value } = action.payload;
      state.cartItems[itemIndex][key] = value;
    },
    setCartQuantity: (state, action) => {
      state.cartQuantity = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
  },
});

export const {
  populateCart,
  addItem,
  removeItem,
  updateItem,
  setCartQuantity,
  setCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
