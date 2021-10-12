import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
