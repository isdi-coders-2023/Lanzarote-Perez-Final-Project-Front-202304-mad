import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './card';
import '@testing-library/jest-dom';
import { User } from '../../models/user';
describe('Card component', () => {
  const mockUser: User = {
    id: '1',
    userName: 'Honda',
    avatar: {
      imageUrl: 'http://localhost/',
      url: 'https://example.com/image.jpg',
      urlOriginal: '',
      mimetype: '',
      size: 0,
    },
    email: 'hola@gmail.com',
    location: 'Madrid',
    phoneNumber: '66635426',
    password: 'hdhdhhd',
    cars: [],
  };

  test('renders the card with correct data', () => {
    render(
      <MemoryRouter>
        <Card item={mockUser} />
      </MemoryRouter>
    );

    const imageElement = screen.getByAltText(
      mockUser.userName
    ) as HTMLImageElement;
    const nameElement = screen.getByText(mockUser.userName);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(mockUser.avatar.imageUrl);
    expect(imageElement.width).toBe(150);
    expect(imageElement.height).toBe(150);
    expect(nameElement).toBeInTheDocument();
  });
});
