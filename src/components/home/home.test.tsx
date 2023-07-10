import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Home from './home';
import { User } from '../../models/user';
import { Filter } from '../filter/filter';
import '@testing-library/jest-dom';

jest.mock('../../hooks/use.user', () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoadUsers: jest.fn(),
  }),
}));

describe('Home Component', () => {
  test('renders user list when userList is not empty', () => {
    const mockUserList: User[] = [
      {
        id: '1',
        userName: 'User 1',
        email: 'user1@example.com',
        location: 'Madrid',
        cars: [],
        phoneNumber: '666352436',
        password: 'hdhdwduwidiw',
        avatar: {
          imageUrl: 'image-url',
          urlOriginal: 'original-url',
          url: 'image-url',
          mimetype: 'image/jpeg',
          size: 1000,
        },
      },
    ];
    const mockUseSelector = jest.fn();
    mockUseSelector.mockReturnValue({ userList: mockUserList });

    render(
      <Provider store={store}>
        <Home />
        <Filter />
      </Provider>
    );

    const userListItems = screen.getAllByRole('userList');
    expect(userListItems).toHaveLength(mockUserList.length);
  });

  test('renders "No users in this region" message when userList is empty', () => {
    const mockUserList: User[] = [];
    const mockUseSelector = jest.fn();
    mockUseSelector.mockReturnValue({ userList: mockUserList });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const noUsersMessage = screen.getByText(
      'Lo sentimos, no hay usuarios de esta región.'
    );
    expect(noUsersMessage).toBeInTheDocument();
  });
});
