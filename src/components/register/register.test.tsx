import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from './register';
import { store } from '../../redux/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

describe('Register Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
  });

  test('displays the register form', () => {
    const registerForm = screen.getByText('REGISTER');

    expect(registerForm).toBeInTheDocument();
  });
});
