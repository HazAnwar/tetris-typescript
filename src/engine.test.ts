import { TetrisEngine } from './engine';

describe('TetrisEngine', () => {
  let engine: TetrisEngine;

  beforeEach(() => {
    engine = new TetrisEngine(4, 4);
  });

  test('should create an empty grid on initialization', () => {
    const grid = engine.grid;
    expect(grid).toHaveLength(4);
    grid.forEach((row) => {
      expect(row).toHaveLength(4);
      row.forEach((cell) => {
        expect(cell).toBe('');
      });
    });
  });

  test('should reset the grid', () => {
    engine.processNewLine('L0');
    engine.resetGrid();
    const grid = engine.grid;
    grid.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toBe('');
      });
    });
  });

  test('should process a new line and update the grid', () => {
    engine.processNewLine('L0');
    const grid = engine.grid;
    expect(grid[grid.length - 1][0]).toBe('L');
    expect(grid[grid.length - 1][1]).toBe('L');
    expect(grid[grid.length - 2][0]).toBe('L');
    expect(grid[grid.length - 3][0]).toBe('L');
  });

  test('should not modify the original grid when adding a shape', () => {
    const originalGrid = engine.grid.map((row) => row.slice());
    engine.processNewLine('L0');
    expect(engine.grid).not.toEqual(originalGrid);
  });
});
