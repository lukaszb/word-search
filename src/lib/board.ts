export class BoardCell {
  x: number;
  y: number;
  char: string;

  constructor(x: number, y: number, char: string) {
    this.x = x;
    this.y = y;
    this.char = char;
  }
}

export class Board {
  sizeX: number;
  sizeY: number;
  fill: string;
  _board: BoardCell[][];

  constructor(sizeX: number, sizeY: number, fill = " ") {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fill = fill;
    this.init();
  }

  init() {
    const simpleBoard = initBoard(this.sizeX, this.sizeY, this.fill);
    this._board = simpleBoard.map((row, x) => {
      return row.map((char, y) => new BoardCell(x, y, char));
    });
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

export const getCellsWhereWordCanBeInserted = (
  board: Board,
  word: string
) => {};
