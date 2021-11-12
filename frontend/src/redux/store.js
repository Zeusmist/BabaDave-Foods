import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import userReducer from "./slices/user";
import adminReducer from "./slices/admin";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;
