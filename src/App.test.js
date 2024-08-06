import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/How was your week overall/i);
  expect(linkElement).toBeInTheDocument();
});
