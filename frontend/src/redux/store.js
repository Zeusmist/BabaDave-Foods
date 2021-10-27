import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import userReducer from "./slices/user";

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
