import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('App works', () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const linkElement = screen.getByTestId('AppContainer');

  expect(linkElement).toBeInTheDocument();
});
