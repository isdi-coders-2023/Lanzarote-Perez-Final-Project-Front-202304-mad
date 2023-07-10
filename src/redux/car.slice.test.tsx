import { store } from '../redux/store';
import { CarRepository } from '../services/car.repository';

import {
  deleteCarAsync,
  editCarAsync,
  loadCarsAsync,
  registerCarAsync,
} from './car.slice';

describe('Given the car slice reducer', () => {
  describe('Given the car slice reducer', () => {
    const repo: CarRepository = {
      url: 'http://localhost:4206',
      token: '',
      query: jest.fn(),
      getFiltered: jest.fn(),
      patch: jest.fn(),
      register: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      deleteById: jest.fn(),
    };
    test('Then it should dispatch the loadCarAsync', async () => {
      repo.query = jest.fn().mockResolvedValue([]);

      await store.dispatch(loadCarsAsync(repo));
      expect(repo.query).toHaveBeenCalled();
    });
    test('Then it should dispatch the registerCarAsync', async () => {
      repo.register = jest.fn().mockResolvedValue({});
      const data = new FormData();

      await store.dispatch(registerCarAsync({ repo, data }));
      expect(repo.query).toHaveBeenCalled();
    });

    test('Then it should dispatch the deleteCarAsync', async () => {
      repo.deleteById = jest.fn();
      const id = '2';

      await store.dispatch(deleteCarAsync({ repo, id }));
      expect(repo.deleteById).toHaveBeenCalled();
    });

    // test('Then it should return an error in the deleteCarAsync', async () => {
    //   repo.deleteById = jest.fn();
    //   const id = '';

    //   await store.dispatch(deleteCarAsync({ repo, id }));
    //   expect(repo.deleteById).toThrowError();
    // });

    test('Then it should dispatch the editCarAsync', async () => {
      repo.patch = jest.fn();
      const data = {};

      await store.dispatch(editCarAsync({ repo, data }));
      expect(repo.deleteById).toHaveBeenCalled();
    });
  });
});
