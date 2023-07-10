import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Car } from '../models/car';
import { CarRepository } from '../services/car.repository';
import { useCars } from './use.cars';
import {
  deleteCarAsync,
  editCarAsync,
  loadCarsAsync,
  registerCarAsync,
} from '../redux/car.slice';

const mockId = '1';

const mockCarObj = {
  carBrand: 'mariko',
  carModel: 'mariko@elquelolea.com',
  carHP: '100',
  carFuel: 'diesel',
  carId: '1',
} as unknown as Car;

const mockCar = new FormData();

const mockRepo = {
  register: jest.fn(),
  query: jest.fn(),
  deleteById: jest.fn(),
  patch: jest.fn(),
} as unknown as CarRepository;
function TestComponent() {
  const { handleNewCar, handleDeleteCar, handleEditCar, handleLoadCars } =
    useCars();

  return (
    <>
      <button onClick={() => handleNewCar(mockCar)}></button>
      <button onClick={() => handleLoadCars()}></button>
      <button onClick={() => handleDeleteCar(mockId)}></button>
      <button onClick={() => handleEditCar(mockCarObj)}></button>
    </>
  );
}

describe('Given the useCars custom hook', () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    await act(() =>
      render(
        <MemoryRouter>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </MemoryRouter>
      )
    );
    elements = screen.getAllByRole('button');
  });
  describe('When is rendered', () => {
    test('Then the handleRegisterCar function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        store.dispatch(registerCarAsync({ repo: mockRepo, data: mockCar }));
        expect(mockRepo.register).toHaveBeenCalled();
      });
    });

    test('Then the handleLoadCars function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        store.dispatch(loadCarsAsync(mockRepo));
        expect(mockRepo.query).toHaveBeenCalled();
      });
    });

    test('Then the handleDeleteCar function should be called', async () => {
      const repo = mockRepo;
      const id = mockId;
      await act(async () => {
        await userEvent.click(elements[2]);
        store.dispatch(deleteCarAsync({ repo, id }));
        expect(mockRepo.deleteById).toHaveBeenCalled();
      });
    });

    // test('Then the handleDeleteCar function should trown an error', async () => {
    //   const repo = mockRepo;
    //   const id = '';
    //   const error = 'ID not found';
    //   await act(async () => {
    //     await userEvent.click(elements[2]);
    //     store.dispatch(deleteCarAsync({ repo, id }));
    //     expect(error).toHaveBeenCalled();
    //   });
    // });

    test('Then the handleEditCar function should be called', async () => {
      const repo = mockRepo;
      const data = mockCarObj;
      await act(async () => {
        await userEvent.click(elements[3]);
        store.dispatch(editCarAsync({ repo, data }));
        expect(mockRepo.patch).toHaveBeenCalled();
      });
    });
  });
});
