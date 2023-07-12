import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './menu';
import { store } from '../../redux/store';
import '@testing-library/jest-dom/extend-expect';

const mockOptions = [
  { label: 'Home', url: '/', protected: false },
  { label: 'Garage', url: '/garage', protected: true },
  { label: 'Profile', url: '/profile', protected: true },
];

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockReturnValue({ token: 'fakeToken' }),
}));

describe('Menu Component', () => {
  test('renders menu options correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Menu options={mockOptions} />
        </BrowserRouter>
      </Provider>
    );

    const homeLink = screen.getByText('Home');
    const garageLink = screen.getByText('Garage');
    const profileLink = screen.getByText('Profile');

    expect(homeLink).toBeInTheDocument();
    expect(garageLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
  });

  test('adds "active" class to active link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Menu options={mockOptions} />
        </BrowserRouter>
      </Provider>
    );

    const activeLink = screen.getByText('Home');
    expect(activeLink).toHaveClass('active');
  });

  test('does not render protected link if token is missing', () => {
    jest.mock('react-redux', () => ({
      useSelector: jest.fn().mockReturnValue({ token: null }),
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Menu options={mockOptions} />
        </BrowserRouter>
      </Provider>
    );

    const contactLink = screen.queryByText('Contact');
    expect(contactLink).toBeNull();
  });
});
