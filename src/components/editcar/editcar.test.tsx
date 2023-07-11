import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import '@testing-library/jest-dom/extend-expect';
import { useCars } from '../../hooks/use.cars';
import { EditCarForm } from './editcar';
import { Car } from '../../models/car';

jest.mock('../../hooks/use.cars', () => ({
  useCars: jest.fn().mockReturnValue({
    handleEditCar: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation((selector) =>
    selector({
      users: {
        userData: {
          cars: [
            {
              id: '1',
              carPhoto: {
                imageUrl: 'http://localhost/',
                url: 'https://example.com/image.jpg',
                urlOriginal: '',
                mimetype: '',
                size: 0,
              },
              carBrand: 'Toyota',
              carModel: 'Camry',
              carYear: '2022',
              carFuel: 'gasoline',
              carHP: '200',
            },
          ] as Car[],
        },
      },
    })
  ),
}));
describe('CarForm Component', () => {
  test('submits the form correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['editcar/1']}>
          <EditCarForm />
        </MemoryRouter>
      </Provider>
    );

    const formElement = screen.getByRole('form');
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('Toyota');

    await userEvent.type(inputs[0], 'Ford');
    expect(inputs[0]).toHaveValue('ToyotaFord');
    await act(async () => {
      fireEvent.submit(formElement);
    });
    expect(useCars().handleEditCar).toHaveBeenCalled();
  });
});
