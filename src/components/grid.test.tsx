import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TetrisGrid } from './grid';

const mockGrid = [
  ['', '', ''],
  ['L', '', ''],
  ['', 'T', ''],
  ['', '', 'Z'],
];

test('renders the Grid component', () => {
  render(<TetrisGrid grid={mockGrid} />);
  expect(screen.getByTestId('0-0')).toBeInTheDocument();
  expect(screen.getByTestId('1-0')).toHaveClass('filled-L');
  expect(screen.getByTestId('2-1')).toHaveClass('filled-T');
  expect(screen.getByTestId('3-2')).toHaveClass('filled-Z');
});

test('renders empty cells correctly', () => {
  render(<TetrisGrid grid={mockGrid} />);
  expect(screen.getByTestId('0-0')).not.toHaveClass('filled-L');
  expect(screen.getByTestId('0-1')).not.toHaveClass('filled-T');
  expect(screen.getByTestId('0-2')).not.toHaveClass('filled-Z');
});

test('renders the correct number of rows and columns', () => {
  render(<TetrisGrid grid={mockGrid} />);
  const rows = screen.getAllByRole('row');

  const gridLengthWithFooter = mockGrid.length + 1;

  expect(rows).toHaveLength(gridLengthWithFooter);

  const columns = screen.getAllByRole('cell');
  expect(columns).toHaveLength(gridLengthWithFooter * mockGrid[0].length);
});
