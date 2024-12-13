import { useState } from 'react';
import { TetrisGrid } from './components/grid';
import { InputForm } from './components/input';
import { TetrisEngine } from './engine';
import { Grid } from './types/grid';

import styled from '@emotion/styled';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 100;

const tetrisEngine = new TetrisEngine(GRID_WIDTH, GRID_HEIGHT);

const AppHeader = styled.header`
  font-size: large;
  font-weight: bold;
  text-align: center;
  padding: 2rem;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const App = () => {
  const [grid, setGrid] = useState<Grid>(tetrisEngine.grid);

  const onSubmit = (lineInput: string) => {
    setGrid(tetrisEngine.processNewLine(lineInput));
  };

  return (
    <>
      <AppHeader>Hazik&apos;s Tetris Engine</AppHeader>
      <ResetButton onClick={() => setGrid(tetrisEngine.resetGrid())}>Reset</ResetButton>
      <TetrisGrid grid={grid} />
      <InputForm onSubmit={onSubmit} />
    </>
  );
};
