import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App works', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello There!/i);
  expect(linkElement).toBeInTheDocument();
});
