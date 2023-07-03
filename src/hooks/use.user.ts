import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useMemo } from "react";

import {
  State,
  ac,
  loginUserAsync,
  registerUserAsync,
} from "../redux/user.Slice";
import { User } from "../models/user";
import { UserRepository } from "../services/user.repository";

export function useUsers() {
  const { token } = useSelector((state: State) => state);
  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:4400/";
  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  // const handleLoadUsers = useCallback(async () => {
  //   dispatch(loadUsersAsync(repo));
  // }, [repo, dispatch]);

  const handleRegisterUser = async (data: Partial<User>) => {
    dispatch(registerUserAsync({ repo, data }));
  };

  const handleLoginUser = async (data: Partial<User>) => {
    dispatch(loginUserAsync({ repo, data }));
  };

  const handleLoginWithToken = async (
    userData: Partial<User>,
    token: string
  ) => {
    dispatch(ac.loginWithToken({ token, userData }));
  };

  const handleGetToken = (token: string) => {
    dispatch(ac.getToken(token));
  };

  const handleLogoutUser = (state: State) => {
    dispatch(ac.logout(state));
    localStorage.removeItem("store");
  };

  return {
    handleRegisterUser,
    handleLoginUser,
    handleLoginWithToken,
    token: token,
    handleGetToken,
    handleLogoutUser,
  };
}
