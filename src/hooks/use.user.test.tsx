import { User } from '../models/user';
import '@testing-library/jest-dom';
import { useUsers } from './use.user';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';
import { UserRepository } from '../services/user.repository';
import userEvent from '@testing-library/user-event';
import { ac } from '../redux/user.Slice';
import { loginUserAsync, registerUserAsync } from '../redux/user.Slice';

const mockUser = {
  userName: 'mariko',
  email: 'mariko@elquelolea.com',
} as unknown as User;
const mockRepo = {
  register: jest.fn(),
  login: jest.fn(),
} as unknown as UserRepository;
const mockToken = 'maritoken';
function TestComponent() {
  const { handleRegisterUser, handleLoginUser, handleGetToken } = useUsers();

  return (
    <>
      <button onClick={() => handleRegisterUser(mockUser)}></button>
      <button onClick={() => handleLoginUser(mockUser)}></button>
      <button onClick={() => handleGetToken(mockToken)}></button>
    </>
  );
}

describe('Given the useUsers custom hook', () => {
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
    test('Then the handleRegisterUser function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        store.dispatch(registerUserAsync({ repo: mockRepo, data: mockUser }));
        expect(mockRepo.register).toHaveBeenCalled();
      });
    });

    test('Then the handleLoginUser function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        store.dispatch(loginUserAsync({ repo: mockRepo, data: mockUser }));
        expect(mockRepo.login).toHaveBeenCalled();
      });
    });

    test('Then the handleGetToken function should be called', async () => {
      await act(async () => {
        await userEvent.click(elements[2]);
        store.dispatch(ac.getToken(mockToken));
      });
    });
  });
});
