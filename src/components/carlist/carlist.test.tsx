import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { CarList } from './carlist';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { act } from 'react-dom/test-utils';

jest.mock('../../hooks/use.user', () => ({
  useUsers: () => ({
    handleLoadUsers: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation((selector) =>
    selector({
      users: {
        userData: {
          id: '1',
        },
        userList: [
          {
            id: '1',
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
              {
                id: '2',
                carPhoto: {
                  imageUrl: 'http://localhost/',
                  url: 'https://example.com/image.jpg',
                  urlOriginal: '',
                  mimetype: '',
                  size: 0,
                },
                carBrand: 'Honda',
                carModel: 'Civic',
                carYear: '2021',
                carFuel: 'diesel',
                carHP: '150',
              },
            ],
          },
        ],
      },
    })
  ),
}));

describe('CarList Component', () => {
  test('renders car list correctly', async () => {
    await act(
      async () =>
        await render(
          <Provider store={store}>
            <MemoryRouter>
              <CarList></CarList>
            </MemoryRouter>
          </Provider>
        )
    );

    const carElements = screen.getAllByRole('link');
    expect(carElements[0]).toBeInTheDocument();
  });
});
