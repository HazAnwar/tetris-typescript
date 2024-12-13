import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Grid } from '../types/grid';

interface TetrisGridProps {
  grid: Grid;
}

const Table = styled.table`
  text-align: center;
  margin: auto;
`;

const TD = styled.td`
  height: 1rem;
  width: 1rem;
  border: 1px solid black;
  border-radius: 25%;
  &.filled-I {
    background-color: cyan;
  }
  &.filled-J {
    background-color: blue;
  }
  &.filled-L {
    background-color: orange;
  }
  &.filled-Q {
    background-color: yellow;
  }
  &.filled-S {
    background-color: lightgreen;
  }
  &.filled-T {
    background-color: purple;
  }
  &.filled-Z {
    background-color: red;
  }
`;

const TableFooter = styled.tfoot`
  font-weight: bold;
`;

export const TetrisGrid = ({ grid }: TetrisGridProps) => {
  const height = grid.length;
  const width = grid[0].length;
  const initialHeight = Math.round(window.innerHeight * 0.035);
  const rowNumbers: ReactElement[] = [];
  const tableRows: ReactElement[] = [];

  for (let rowNumber = 0; rowNumber < width; rowNumber++) {
    rowNumbers.push(<td key={rowNumber}>{rowNumber}</td>);
  }

  for (let i = 0; i < height; i++) {
    if (i < height - initialHeight && grid[i].every((cell) => cell === '')) {
      continue;
    }

    const row: ReactElement[] = [];

    for (let j = 0; j < width; j++) {
      const gridItem = grid[i][j];
      row.push(
        <TD
          data-testid={`${i}-${j}`}
          className={gridItem ? `filled-${gridItem}` : undefined}
          key={j}
        />,
      );
    }

    tableRows.push(<tr key={i}>{row}</tr>);
  }

  return (
    <Table>
      <tbody>{tableRows}</tbody>
      <TableFooter>
        <tr>{rowNumbers}</tr>
      </TableFooter>
    </Table>
  );
};
