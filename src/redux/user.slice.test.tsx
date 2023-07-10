import { User } from '../models/user';
import { store } from '../redux/store';
import { UserRepository } from '../services/user.repository';

import {
  ac,
  loadFilteredUsersAsync,
  loadUsersAsync,
  loginUserAsync,
  registerUserAsync,
} from './user.Slice';

describe('Given the users slice reducer', () => {
  describe('When it is instantiated', () => {
    test('Then it should update the token in the state', () => {
      const newToken = 'Token';
      store.dispatch(ac.getToken(newToken));
      const state = store.getState().users;
      expect(state.token).toBe(newToken);
    });
    test('Then it should set the token and userData in the state', () => {
      const newUserData = {};
      const mockPayload = {
        mockToken: '',
        userData: {},
      };
      store.dispatch(ac.loginWithToken(mockPayload));
      const state = store.getState().users;
      expect(state.token).toBe(undefined);
      expect(state.userData).toStrictEqual(newUserData);
    });

    test('Then it should set the token to undefined in the state', () => {
      store.dispatch(ac.logout());
      const state = store.getState().users;
      expect(state.token).toBe(undefined);
    });
  });
  describe('Given the users slice reducer', () => {
    const data = {} as Partial<User>;

    const userRepo: UserRepository = {
      url: 'http://localhost:4206',
      query: jest.fn(),
      register: jest.fn(),
      login: jest.fn(),
      filter: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      getFiltered: jest.fn(),
    };
    test('Then it should dispatch the loadUsersAsync', async () => {
      userRepo.query = jest.fn().mockResolvedValue([]);

      await store.dispatch(loadUsersAsync(userRepo));
      expect(userRepo.query).toHaveBeenCalled();
    });
    test('Then it should dispatch the loadFilteredUsersAsync', async () => {
      const mockFilter = '';
      userRepo.getFiltered = jest.fn().mockResolvedValue([]);

      await store.dispatch(
        loadFilteredUsersAsync({ repo: userRepo, filter: mockFilter })
      );
      expect(userRepo.filter).toHaveBeenCalled();
    });
    test('Then it should dispatch the registerUserAsync', async () => {
      const userData = {};

      userRepo.register = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'New User' });

      await store.dispatch(registerUserAsync({ repo: userRepo, data }));

      expect(userRepo.register).toHaveBeenCalledWith(userData);
    });
    test('Then it should dispatch the loginUserAsync', () => {
      const mockToken = '';
      const localStorage = jest.fn();
      const setItem = jest.fn().mockReturnValue(mockToken);
      store.dispatch(loginUserAsync({ repo: userRepo, data }));
      expect(userRepo.login).toHaveBeenCalledWith(data);
      expect(localStorage).toBeCalled();
      expect(setItem).toHaveBeenCalled();
    });
  });
});
