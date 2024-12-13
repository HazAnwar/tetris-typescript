import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { App } from './App';

test('renders the App component', () => {
  render(<App />);
  expect(screen.getByText("Hazik's Tetris Engine")).toBeInTheDocument();
});

test('processes a new input correctly and resets the grid when reset button is clicked', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Enter shape');
  const resetButton = screen.getByText('Reset');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(input, { target: { value: 'q0' } });
  fireEvent.click(submitButton);
  expect(screen.getByTestId('99-0')).toHaveClass('filled-Q');

  fireEvent.click(resetButton);
  expect(screen.getByTestId('99-0')).not.toHaveClass('filled-Q');
});

test('updates the grid correctly with different inputs', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Enter shape');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(input, { target: { value: 'l0' } });
  fireEvent.click(submitButton);
  expect(screen.getByTestId('99-0')).toHaveClass('filled-L');

  fireEvent.change(input, { target: { value: 't7' } });
  fireEvent.click(submitButton);
  expect(screen.getByTestId('99-8')).toHaveClass('filled-T');
});
