import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRoutes } from './app.routes';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Given AppRoutes component', () => {
  describe('When it is instantiate with a route "" ', () => {
    const MockedComponentLogin = jest.fn().mockReturnValue(<h2>Login</h2>);

    jest.mock('../login/login', () => MockedComponentLogin);
    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={store}>
            <Router initialEntries={['']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('Login');
    });

    test('Then it should render register page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route "/Register" ', () => {
    const MockedComponentRegister = jest
      .fn()
      .mockReturnValue(<h2>Register</h2>);

    jest.mock('../register/register', () => MockedComponentRegister);

    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={store}>
            <Router initialEntries={['/Register']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('Register');
    });

    test('Then it should render register page', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
