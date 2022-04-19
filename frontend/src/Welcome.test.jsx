import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import WelcomeComp from './components/WelcomeComp';

// test('show welcome page when open', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Welcome to BigBrain!/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Welcome Page content', () => {
  render(<WelcomeComp />);
  const linkElement = screen.getByText(/Welcome to BigBrain!/i);
  expect(linkElement).toBeInTheDocument();
});
