import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slice/authSlice";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    cart: cartSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
