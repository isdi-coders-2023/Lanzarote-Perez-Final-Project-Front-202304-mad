import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
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
import { useNavigate } from 'react-router-dom';

export function useUsers() {
  const token = useSelector((state: State) => state.token);
  const dispatch: AppDispatch = useDispatch();
  const repo: UserRepository = useMemo(() => new UserRepository(url), []);
  const navigate = useNavigate();

  const handleLoadUsers = useCallback(async () => {
    dispatch(loadUsersAsync(repo));
  }, [repo, dispatch]);

  const handleFilterUsers = async (filter: string) => {
    dispatch(loadFilteredUsersAsync({ repo, filter }));
  };

  const handleRegisterUser = async (data: Partial<User>) => {
    dispatch(registerUserAsync({ repo, data }));
  };

  const handleLoginUser = async (data: Partial<User>) => {
    try {
      dispatch(loginUserAsync({ repo, data }));
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'LOGGED IN',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'LOGGED OUT',
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
