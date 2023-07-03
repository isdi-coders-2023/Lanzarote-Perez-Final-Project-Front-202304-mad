import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.Slice";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;
