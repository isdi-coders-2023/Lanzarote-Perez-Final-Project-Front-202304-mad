import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Login from './login';
import '@testing-library/jest-dom/extend-expect';
import { useUsers } from '../../hooks/use.user';

jest.mock('../../hooks/use.user', () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoginUser: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const loginForm = screen.getByText('LOGIN');
    expect(loginForm).toBeInTheDocument();
  });
});

describe('Login component', () => {
  test('renders login form correctly', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'SUBMIT' });
    expect(submitButton).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    const handleLoginUser = jest.fn().mockResolvedValue(true);
    (useUsers as jest.Mock).mockReturnValue({ handleLoginUser });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'SUBMIT' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLoginUser).toHaveBeenCalledWith({
        user: 'testuser',
        password: 'testpassword',
      });
    });
  });

  test('handles form submission with authentication error', async () => {
    const handleLoginUser = jest.fn().mockResolvedValue(false);
    (useUsers as jest.Mock).mockReturnValue({ handleLoginUser });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'SUBMIT' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLoginUser).toHaveBeenCalledWith({
        user: 'testuser',
        password: 'testpassword',
      });
    });
  });
});
