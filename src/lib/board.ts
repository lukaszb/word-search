export class Board {
  sizeX: number;
  sizeY: number;
  fill: string;
  _board: string[][];

  constructor(sizeX: number, sizeY: number, fill = "X") {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fill = fill;
    this.init();
  }

  init() {
    this._board = createBoard(this.sizeX, this.sizeY, this.fill);
  }
}

export const createBoard = (x: number, y: number, fill: string = " ") => {
  return Array.from({ length: y }).map((_) =>
    Array.from({ length: x }).fill(fill)
  ) as string[][];
};
