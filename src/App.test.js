import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title text', () => {
  render(<App />);
  const titleText = screen.getByText(/AI-Powered Resume Builder/i);
  expect(titleText).toBeInTheDocument();
});
