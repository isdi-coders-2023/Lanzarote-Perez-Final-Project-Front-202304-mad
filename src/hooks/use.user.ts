import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../redux/store';
import { useCallback, useMemo } from 'react';

import {
  State,
  ac,
  loadFilteredUsersAsync,
  loadUsersAsync,
  loginUserAsync,
  registerUserAsync,
} from '../redux/user.slice';
import { User } from '../models/user';
import { UserRepository } from '../services/user.repository';
import { url } from '../config';
import Swal from 'sweetalert2';

export function useUsers() {
  const token = useSelector((state: State) => state.token);
  const dispatch: AppDispatch = useDispatch();
  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  const handleLoadUsers = useCallback(async () => {
    dispatch(loadUsersAsync(repo));
  }, [repo, dispatch]);

  const handleFilterUsers = async (filter: string) => {
    dispatch(loadFilteredUsersAsync({ repo, filter }));
  };

  const handleRegisterUser = async (data: FormData) => {
    try {
      await dispatch(registerUserAsync({ repo, data }));
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'SUCCESFULLY REGISTERED',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'ERROR REGISTERING',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    }
  };

  const handleLoginUser = async (data: Partial<User>): Promise<Boolean> => {
    await dispatch(loginUserAsync({ repo, data }));
    const userLogged = store.getState().users.token;
    localStorage.setItem('store', userLogged as string);
    console.log(userLogged, 'User hook');
    if (userLogged !== '' && userLogged !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const handleLoginWithToken = async (
    userData: Partial<User>,
    token: string
  ) => {
    dispatch(ac.loginWithToken({ userData, token }));
  };

  const handleGetToken = (token: string) => {
    dispatch(ac.getToken(token));
  };

  const handleLogoutUser = () => {
    dispatch(ac.logout());
    localStorage.removeItem('store');
  };

  return {
    handleLoadUsers,
    handleLoginUser,
    handleRegisterUser,
    handleFilterUsers,
    handleLoginWithToken,
    token: token,
    handleGetToken,
    handleLogoutUser,
  };
}
