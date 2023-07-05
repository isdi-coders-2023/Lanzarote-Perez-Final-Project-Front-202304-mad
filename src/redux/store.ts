import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.Slice";
import carSlice from "./car.slice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    cars: carSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;
