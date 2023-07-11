import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Given Footer component', () => {
  describe('When it is instantiated', () => {
    test('Then it should render on screen "@SRC" ', () => {
      render(<Footer />);
      const text = screen.getByText('@SRC');
      expect(text).toBeInTheDocument();
    });
  });
});
