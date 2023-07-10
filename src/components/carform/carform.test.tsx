import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import '@testing-library/jest-dom/extend-expect';
import { useCars } from '../../hooks/use.cars';
import CarForm from './carform';

jest.mock('../../hooks/use.cars', () => ({
  useCars: jest.fn().mockReturnValue({
    handleRegisterCar: jest.fn(),
  }),
}));

describe('CarForm Component', () => {
  test('submits the form correctly', () => {
    const handleNewCar = jest.fn();
    (useCars as jest.Mock).mockReturnValue({ handleNewCar });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CarForm />
        </MemoryRouter>
      </Provider>
    );

    const formElement = screen.getByRole('form');
    const carBrandInput = screen.getByPlaceholderText('Brand');
    const carYearInput = screen.getByPlaceholderText('Year');

    fireEvent.change(carBrandInput, { target: { value: 'Honda' } });
    fireEvent.change(carYearInput, { target: { value: '1990' } });
    fireEvent.submit(formElement);

    expect(handleNewCar).toHaveBeenCalledWith(expect.any(FormData));
    const formData = handleNewCar.mock.calls[0][0] as FormData;
    expect(formData.get('carBrand')).toBe('Honda');
    expect(formData.get('carYear')).toBe('1990');
  });
});
