import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Header } from './header';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../redux/user.slice';
import { User } from '../../models/user';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('Given the header component', () => {
  const mockedElement = <></>;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header children={mockedElement} />
        </Provider>
      </MemoryRouter>
    );
  });
  describe('When its rendered', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    test('Then it should contain the title', () => {
      const element = screen.queryAllByText('SRC');
      expect(element[0]).toBeInTheDocument();
    });

    test('Redirects to Register page when "Register" button is clicked', () => {
      const logoutButton = screen.getByText('Register');
      fireEvent.click(logoutButton);

      expect(mockNavigate).toHaveBeenCalledWith('register');
    });

    test('Redirects to Login page when "Login" button is clicked', () => {
      const logoutButton = screen.getByText('Login');
      fireEvent.click(logoutButton);

      expect(mockNavigate).toHaveBeenCalledWith('login');
    });
  });
  describe("When there's a token", () => {
    beforeEach(() => {
      const mockStore = configureStore({
        reducer: { users: userSlice },
        preloadedState: {
          users: {
            userList: [],
            token: 'token',
            userData: {} as User,
          },
        },
      });

      render(
        <MemoryRouter>
          <Provider store={mockStore}>
            <Header children={mockedElement}></Header>
          </Provider>
        </MemoryRouter>
      );
    });

    test('Then it should have a logout button when logged', () => {
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);
    });
  });
});
