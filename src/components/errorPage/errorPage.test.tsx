import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorPage from './errorPage';

describe('Given errorPage component', () => {
  describe('When it is instantiated', () => {
    test('Then it should render on screen the error route message ', () => {
      render(<ErrorPage />);
      const text = screen.getByText('Route not found !');
      expect(text).toBeInTheDocument();
    });
  });
});
