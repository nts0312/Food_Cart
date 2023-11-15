import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";

const appStore = configureStore({//store created
  // add slice inside it
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
