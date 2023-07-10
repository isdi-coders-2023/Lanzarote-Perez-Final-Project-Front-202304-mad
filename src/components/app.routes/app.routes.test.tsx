import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRoutes } from './app.routes';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Given AppRoutes component', () => {
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
  describe('When it is instantiate with a route "/Login" ', () => {
    const MockedComponentRegister = jest.fn().mockReturnValue(<h2>Login</h2>);

    jest.mock('../login/login', () => MockedComponentRegister);

    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={store}>
            <Router initialEntries={['/Login']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('Login');
    });

    test('Then it should render login page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route "/Garage" ', () => {
    const MockedComponentRegister = jest.fn().mockReturnValue(<h2>garage</h2>);

    jest.mock('../garage/garage', () => MockedComponentRegister);

    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={store}>
            <Router initialEntries={['/garage']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('garage');
    });

    test('Then it should render garage page', () => {
      expect(element).toBeInTheDocument();
    });
  });
  // describe('When it is instantiate with a route "/editcar/:id" ', () => {
  //   const MockedComponentRegister = jest.fn().mockReturnValue(<h2>editcar</h2>);

  //   jest.mock('../editcar/editcar', () => MockedComponentRegister);
  //   let element: HTMLElement;

  //   beforeEach(async () => {
  //     await act(async () =>
  //       render(
  //         <Provider store={store}>
  //           <Router initialEntries={['/editcar/:id']} initialIndex={0}>
  //             <AppRoutes></AppRoutes>
  //           </Router>
  //         </Provider>
  //       )
  //     );

  //     element = screen.getByText('editcar');
  //   });

  //   test('Then it should render editcarform page', () => {
  //     expect(element).toBeInTheDocument();
  //   });
  // });
  // describe('When it is instantiated with a route "/profile"', () => {
  //   const MockedComponentProfile = jest
  //     .fn()
  //     .mockReturnValue(<h2>profileUser</h2>);

  //   jest.mock('../profile/profile', () => MockedComponentProfile);

  //   let element: HTMLElement;

  //   beforeEach(async () => {
  //     await act(async () =>
  //       render(
  //         <Provider store={store}>
  //           <Router initialEntries={['/profile']} initialIndex={0}>
  //             <AppRoutes></AppRoutes>
  //           </Router>
  //         </Provider>
  //       )
  //     );

  //     element = screen.queryByText('profileUser')!;
  //   });

  //   it('should render profile page', () => {
  //     expect(element).toBeInTheDocument();
  //   });
  // });

  describe('When it is instantiate with a non existing route "/*" ', () => {
    const MockedComponentRegister = jest.fn().mockReturnValue(<h2>error</h2>);

    jest.mock('../errorPage/errorPage', () => MockedComponentRegister);

    let element: HTMLElement;

    beforeEach(async () => {
      await act(async () =>
        render(
          <Provider store={store}>
            <Router initialEntries={['/error']} initialIndex={0}>
              <AppRoutes></AppRoutes>
            </Router>
          </Provider>
        )
      );

      element = screen.getByText('error');
    });

    test('Then it should render error page', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
