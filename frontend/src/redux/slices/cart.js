import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0.0,
    additionalInfo: "",
  },
  reducers: {
    populateCart: (state, action) => {
      state.cartItems = [...action.payload.items];
    },
    resetCart: (state) => {
      state.cartItems = [];
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
    setAdditionalInfo: (state, action) => {
      state.additionalInfo = action.payload;
    },
  },
});

export const {
  populateCart,
  resetCart,
  addItem,
  removeItem,
  updateItem,
  setCartQuantity,
  setCartTotal,
  setAdditionalInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
