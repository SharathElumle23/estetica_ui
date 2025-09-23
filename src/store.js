import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./store/products/productSlice";
import cartReducer from "./store/cart/cartSlice";
// import authReducer from "./store/auth/authSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    //auth: authReducer,
  },
});
