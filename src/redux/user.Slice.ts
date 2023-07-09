import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { UserRepository } from '../services/user.repository';

export type Avatar = {
  urlOriginal: string;
  url: string;
  imageUrl: string;
  mimetype: string;
  size: number;
};

export type State = {
  userList: User[];
  userData: Partial<User>;
  token?: string;
};

export type LoginState = {
  userData: Partial<User>;
  token?: string;
};

const initialState: State = {
  userList: [] as User[],
  token: '',
  userData: {} as Partial<User>,
};

export const loadUsersAsync = createAsyncThunk(
  'users/load',
  async (repo: UserRepository) => {
    const response = await repo.query();
    return response;
  }
);

export const loadFilteredUsersAsync = createAsyncThunk<
  User[],
  { repo: UserRepository; filter: string }
>('users/loadFilter', async ({ repo, filter }) => {
  const response = await repo.filter(filter);
  return response;
});

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; data: Partial<User> }
>('users/register', async ({ repo, data }) => {
  return await repo.register(data);
});

export const loginUserAsync = createAsyncThunk<
  Partial<State>,
  { repo: UserRepository; data: Partial<User> }
>('users/login', async ({ repo, data }) => {
  const result = await repo.login(data);
  console.log({ result });

  const loggedUser = result.token;
  console.log(loggedUser);
  localStorage.setItem('store', loggedUser as string);
  return result;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    logout: (state) => ({
      ...state,
      token: undefined,
    }),
    loginWithToken: (state, { payload }: PayloadAction<LoginState>) => ({
      ...state,
      token: payload.token,
      userData: payload.userData,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsersAsync.fulfilled, (state, { payload }) => ({
      ...state,
      userList: payload,
    }));
    builder.addCase(loadFilteredUsersAsync.fulfilled, (state, { payload }) => ({
      ...state,
      userList: payload,
    }));
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: payload,
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload.token,
      userData: {
        id: payload.userData?.id,
        userName: payload.userData?.userName,
        email: payload.userData?.email,
        location: payload.userData?.location,
        phoneNumber: payload.userData?.phoneNumber,
        avatar: payload.userData?.avatar,
        cars: payload.userData?.cars,
      },
    }));
  },
});

export const ac = usersSlice.actions;
export default usersSlice.reducer;
