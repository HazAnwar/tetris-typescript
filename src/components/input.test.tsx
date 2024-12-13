import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { InputForm } from './input';

const mockOnSubmit = jest.fn();

test('renders the InputForm component', () => {
  render(<InputForm onSubmit={mockOnSubmit} />);
  expect(screen.getByPlaceholderText('Enter shape')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('calls onSubmit with the correct input value', () => {
  render(<InputForm onSubmit={mockOnSubmit} />);
  const input = screen.getByPlaceholderText('Enter shape');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(input, { target: { value: 'L0' } });
  fireEvent.click(submitButton);

  expect(mockOnSubmit).toHaveBeenCalledWith('L0');
});

test('shows an error message for invalid input', () => {
  render(<InputForm onSubmit={mockOnSubmit} />);
  const input = screen.getByPlaceholderText('Enter shape');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(input, { target: { value: 'invalid' } });
  fireEvent.click(submitButton);

  expect(
    screen.getByText('Unexpected input, please enter data in the correct format'),
  ).toBeInTheDocument();
  expect(screen.getByText('Unexpected input, please enter data in the correct format')).toHaveClass(
    'error',
  );
});

test('clears the error message after valid input', () => {
  render(<InputForm onSubmit={mockOnSubmit} />);
  const input = screen.getByPlaceholderText('Enter shape');
  const submitButton = screen.getByText('Submit');

  expect(screen.getByText('Add a new line')).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'invalid' } });
  fireEvent.click(submitButton);

  expect(
    screen.getByText('Unexpected input, please enter data in the correct format'),
  ).toBeInTheDocument();
  expect(screen.getByText('Unexpected input, please enter data in the correct format')).toHaveClass(
    'error',
  );

  fireEvent.change(input, { target: { value: 'q0' } });
  fireEvent.click(submitButton);

  expect(screen.getByText('Add a new line')).toBeInTheDocument();
});

test('clears the input after successful submission', () => {
  render(<InputForm onSubmit={mockOnSubmit} />);
  const input = screen.getByPlaceholderText('Enter shape');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(input, { target: { value: 'L0' } });
  fireEvent.click(submitButton);

  expect(input).toHaveValue('');
});
