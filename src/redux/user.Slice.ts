import { createSlice } from "@reduxjs/toolkit";

type UserStates = "idle" | "logging" | "logged";

export type Avatar = {
  urlOriginal: string;
  url: string;
  mimetype: string;
  size: number;
};

export type UserLogged = {
  id: string;
  userName: string;
  email: string;
  avatar: Avatar;
};

type State = {
  userState: UserStates;
  token: string;
  userData: UserLogged | null;
};

const initialState: State = {
  userState: "idle",
  token: "",
  userData: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logout: () => {
      initialState;
    },
    login: (_state: State, { payload }) => ({
      token: payload.token,
      userState: "logged",
      userData: payload.userData,
    }),
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
