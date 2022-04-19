import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Welcome from './pages/Welcome';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('show welcome page when open', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to BigBrain!/i);
  expect(linkElement).toBeInTheDocument();
});
