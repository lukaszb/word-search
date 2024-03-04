export enum Direction {
  LEFT_RIGHT = "LEFT_RIGHT",
  TOP_DOWN = "TOP_DOWN",
}
const DIRECTIONS = [Direction.LEFT_RIGHT, Direction.TOP_DOWN];

export class Board {
  sizeX: number;
  sizeY: number;
  fill: string;
  _board: string[][];

  constructor(sizeX: number, sizeY: number, fill = " ") {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fill = fill;
    this.init();
  }

  init() {
    this._board = initBoard(this.sizeX, this.sizeY, this.fill);
  }

  getRows() {
    return this._board;
  }

  getCells(row: number) {
    return this._board[row];
  }
}

export const initBoard = (x: number, y: number, fill: string = " ") => {
  return Array.from({ length: y }).map((_) =>
    Array.from({ length: x }).fill(fill)
  ) as string[][];
};

export interface CreateBoardProps {
  size: number;
}
export const createBoard = ({ size }: CreateBoardProps) => {
  return new Board(size, size);
};

export const getCellsWhereWordCanBeInserted = (board: Board, word: string) => {
  board.getRows().forEach((row, y) => {
    row.forEach((cell, x));
  });
};
