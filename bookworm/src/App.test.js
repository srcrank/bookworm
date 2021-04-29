import { render, screen } from '@testing-library/react';
import Bookworm from './App';

test('renders learn react link', () => {
  render(<Bookworm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
