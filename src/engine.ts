import { Grid } from './types/grid';

type InputLetter = 'I' | 'J' | 'L' | 'Q' | 'S' | 'T' | 'Z';

const LetterMapping: Record<InputLetter, number[][]> = {
  I: [[1], [1], [1], [1]],
  J: [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  L: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  Q: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  Z: [
    [0, 1, 1],
    [1, 1, 0],
  ],
};

export class TetrisEngine {
  public grid!: Grid;

  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    this.resetGrid();
  }

  /**
   * Resets the grid to be completely empty/restart the game
   * @returns an updated/empty instance of the grid
   */
  public resetGrid(): Grid {
    this.grid = Array.from({ length: this.height }, () => Array(this.width).fill(''));
    return this.grid;
  }

  /**
   * Takes in a line of letter and column pairs and processes them to update the grid
   * @returns an updated instance of the grid
   */
  public processNewLine(lineInput: string): Grid {
    lineInput.split(',').forEach((letterAndColumn) => {
      const [letter, column] = letterAndColumn.split('') as [InputLetter, string];
      const columnIndex = parseInt(column);

      for (let row = 0; row < this.grid.length; row++) {
        if (!this.checkIfLetterFitsInRow(letter, row, columnIndex)) {
          this.insertLetter(letter, row - 1, columnIndex);
          break;
        } else if (row === this.grid.length - 1) {
          this.insertLetter(letter, row, columnIndex);
          break;
        }
      }
    });

    // return a new array to trigger re-render
    return Array.from(this.grid);
  }

  /**
   * Checks if given letter fits in given row and column index
   * @returns `true` if it fits, `false` otherwise
   */
  private checkIfLetterFitsInRow(
    letter: InputLetter,
    rowNumber: number,
    columnIndex: number,
  ): boolean {
    const letterMap = LetterMapping[letter];
    const height = letterMap.length;
    const width = letterMap[0].length;

    for (let letterRow = 0; letterRow < height; letterRow++) {
      for (let letterColumn = 0; letterColumn < width; letterColumn++) {
        const gridRow = rowNumber - letterRow < 0 ? 0 : rowNumber - letterRow;
        if (letterMap[letterRow][letterColumn] && this.grid[gridRow][columnIndex + letterColumn]) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Inserts a letter/shape into the grid and updates the grid accordingly including clearing any full rows
   */
  private insertLetter(letter: InputLetter, rowNumber: number, columnIndex: number): void {
    const letterMap = LetterMapping[letter];
    const letterHeight = letterMap.length;
    const letterWidth = letterMap[0].length;

    for (let letterRow = 0; letterRow < letterHeight; letterRow++) {
      for (let letterColumn = 0; letterColumn < letterWidth; letterColumn++) {
        const gridRow = rowNumber - letterRow < 0 ? 0 : rowNumber - letterRow;
        if (letterMap[letterRow][letterColumn]) {
          this.grid[gridRow][columnIndex + letterColumn] = letter;
        }
      }
    }

    this.grid = this.grid.filter((row) => row.some((cell) => !cell));

    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.grid[0].length).fill(''));
    }
  }
}
