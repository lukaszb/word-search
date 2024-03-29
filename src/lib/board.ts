export enum Direction {
  LEFT_TO_RIGHT = "LEFT_TO_RIGHT",
  RIGHT_TO_LEFT = "RIGHT_TO_LEFT",
  TOP_TO_BOTTOM = "TOP_TO_BOTTOM",
  BOTTOM_TO_TOP = "BOTTOM_TO_TOP",
  LEFT_BOTTOM_TO_RIGHT_TOP = "LEFT_BOTTOM_TO_RIGHT_TOP",
  LEFT_TOP_TO_RIGHT_BOTTOM = "LEFT_TOP_TO_RIGHT_BOTTOM",
  RIGHT_BOTTOM_TO_LEFT_TOP = "RIGHT_BOTTOM_TO_LEFT_TOP",
  RIGHT_TOP_TO_LEFT_BOTTOM = "RIGHT_TOP_TO_LEFT_BOTTOM",
}

export const DIRECTIONS = [
  Direction.LEFT_TO_RIGHT,
  Direction.TOP_TO_BOTTOM,
  Direction.LEFT_BOTTOM_TO_RIGHT_TOP,
  Direction.LEFT_TOP_TO_RIGHT_BOTTOM,
];

export const ALL_DIRECTIONS = [
  Direction.LEFT_TO_RIGHT,
  Direction.RIGHT_TO_LEFT,
  Direction.TOP_TO_BOTTOM,
  Direction.BOTTOM_TO_TOP,
  Direction.LEFT_BOTTOM_TO_RIGHT_TOP,
  Direction.LEFT_TOP_TO_RIGHT_BOTTOM,
  Direction.RIGHT_BOTTOM_TO_LEFT_TOP,
  Direction.RIGHT_TOP_TO_LEFT_BOTTOM,
];

export class BoardCell {
  x: number;
  y: number;
  char: string;
  words: InsertedWord[];

  constructor(x: number, y: number, char: string) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.words = [];
  }

  addWord(word: InsertedWord) {
    this.words.push(word);
  }
}

export interface InsertedWord {
  word: string;
  x: number;
  y: number;
  direction: Direction;
  points: Point[];
}

export class Board {
  sizeX: number;
  sizeY: number;
  fill: string;
  _board: BoardCell[][];
  insertedWords: InsertedWord[];

  constructor(sizeX: number, sizeY: number, fill = "") {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.fill = fill;
    this.init();
    this.insertedWords = [];
  }

  init() {
    const simpleBoard = initBoard(this.sizeX, this.sizeY, this.fill);
    this._board = simpleBoard.map((row, y) => {
      return row.map((char, x) => new BoardCell(x, y, char));
    });
  }

  fillEmptyCellsWithRandomChars() {
    for (const row of this.getRows()) {
      for (const cell of row) {
        if (!cell.char) {
          cell.char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
  }

  getRows() {
    return this._board;
  }

  getCells(row: number) {
    return this._board[row];
  }

  getCell(x: number, y: number): BoardCell | undefined {
    return this.getCells(y)?.[x];
  }

  setCell(x: number, y: number, char: string) {
    const cell = this.getCell(x, y);
    if (cell) {
      cell.char = char;
    }
  }

  findInsertedWord(word: string) {
    return this.insertedWords.find((w) => w.word === word);
  }

  insertWord(word: string, x: number, y: number, direction: Direction) {
    if (!canInsertWord(this, word, x, y, direction)) {
      throw new Error("Cannot insert word at this position");
    }
    const points = getPointsForWord(word, x, y, direction);
    const insertedWord = {
      x,
      y,
      word,
      direction,
      points,
    };
    this.insertedWords.push(insertedWord);
    points.forEach((point, i) => {
      const cell = this.getCell(point.x, point.y);
      cell.char = word[i];
      cell.words = [...cell.words, insertedWord];
    });
  }
}

export const initBoard = (x: number, y: number, fill: string = " ") => {
  return Array.from({ length: y }).map((_) =>
    Array.from({ length: x }).fill(fill)
  ) as string[][];
};

export interface CreateBoardProps {
  size: number;
  words?: string[];
  fillEmptyCellsWithRandomChars?: boolean;
}
export const createBoard = ({
  size,
  words = [],
  fillEmptyCellsWithRandomChars,
}: CreateBoardProps) => {
  const board = new Board(size, size);
  for (const word of words) {
    insertWordAtRandom(board, word.toUpperCase());
  }
  if (fillEmptyCellsWithRandomChars) {
    board.fillEmptyCellsWithRandomChars();
  }
  return board;
};

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return pointToKey(this);
  }
}

export const pointToKey = (point: Point) => {
  return `${point.x},${point.y}`;
};

export const getCellsWhereWordCanBeInsertedByDirection = (
  board: Board,
  word: string
): Record<Direction, Point[]> => {
  const map: Record<Direction, Point[]> = ALL_DIRECTIONS.reduce(
    (map, dir) => ({
      ...map,
      [dir]: [],
    }),
    {} as Record<Direction, Point[]>
  );

  board.getRows().forEach((row, y) => {
    row.forEach((cell, x) => {
      const directions = getDirectionsWordCanBeInserted(board, word, x, y);
      directions.forEach((dir) => {
        map[dir].push(new Point(x, y));
      });
    });
  });
  return map;
};

export const getCellsWhereWordCanBeInserted = (
  board: Board,
  word: string
): Point[] => {
  const points: Point[] = [];
  board.getRows().forEach((row, y) => {
    row.forEach((cell, x) => {
      const directions = getDirectionsWordCanBeInserted(board, word, x, y);
      if (directions.length) {
        points.push({ x, y });
      }
    });
  });
  return points;
};

export const getDirectionsWordCanBeInserted = (
  board: Board,
  word: string,
  x: number,
  y: number
): Direction[] => {
  const directions: Direction[] = [];
  for (const direction of DIRECTIONS) {
    const canInsert = canInsertWord(board, word, x, y, direction);
    if (canInsert) {
      directions.push(direction);
    }
  }
  return directions;
};

export const getRandomElement = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export const insertWordAtRandom = (board: Board, word: string) => {
  const [point, direction] = getRandomPointAndDirectionToInsertWord(
    board,
    word
  );
  insertWordAt(board, word, point.x, point.y, direction);
};

enum Strategy {
  NAIVE = "NAIVE",
  BALANCED_DIRECTIONS = "BALANCED_DIRECTIONS",
}

export const getRandomPointAndDirectionToInsertWord = (
  board: Board,
  word: string,
  strategy = Strategy.BALANCED_DIRECTIONS
): [Point, Direction] => {
  if (strategy === Strategy.NAIVE) {
    const points = getCellsWhereWordCanBeInserted(board, word);
    const point = getRandomElement(points);
    if (!point) {
      throw new Error("Cannot find point to insert word");
    }
    const directions = getDirectionsWordCanBeInserted(
      board,
      word,
      point.x,
      point.y
    );
    const direction = getRandomElement(directions);
    return [point, direction];
  } else if (strategy === Strategy.BALANCED_DIRECTIONS) {
    const map = getCellsWhereWordCanBeInsertedByDirection(board, word);
    const directionsAscendingByLeastUsed =
      getDirectionsAscendingByLeastUsed(board);
    for (const dir of directionsAscendingByLeastUsed) {
      const points = map[dir];
      if (points.length > 0) {
        const point = getRandomElement(points);
        return [point, dir];
      }
    }
    throw new Error("Cannot find point to insert word");
  }
  throw new Error(`Wrong strategy: ${strategy}`);
};

export const getDirectionsAscendingByLeastUsed = (
  board: Board
): Direction[] => {
  return [...DIRECTIONS].sort((a, b) => {
    const aCount = board.insertedWords.filter(
      (iw) => iw.direction === a
    ).length;
    const bCount = board.insertedWords.filter(
      (iw) => iw.direction === b
    ).length;
    return aCount - bCount;
  });
};

export const insertWordAt = (
  board: Board,
  word: string,
  x: number,
  y: number,
  direction: Direction
) => {
  board.insertWord(word, x, y, direction);
};

export const canInsertWord = (
  board: Board,
  word: string,
  x: number,
  y: number,
  direction: Direction
) => {
  let canInsert = true;
  const points = getPointsForWord(word, x, y, direction);
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const cell = board.getCell(point.x, point.y);
    if (!cell || (!!cell.char && cell.char !== word[i])) {
      canInsert = false;
      break;
    }
  }
  return canInsert;
};

export const getPointsForWord = (
  word: string,
  x: number,
  y: number,
  direction: Direction
): Point[] => {
  const points: Point[] = [];
  switch (direction) {
    case Direction.LEFT_TO_RIGHT:
      for (let i = 0; i < word.length; i++) {
        points.push(new Point(x + i, y));
      }
      break;
    case Direction.TOP_TO_BOTTOM:
      for (let i = 0; i < word.length; i++) {
        points.push(new Point(x, y + i));
      }
      break;
    case Direction.LEFT_BOTTOM_TO_RIGHT_TOP:
      for (let i = 0; i < word.length; i++) {
        points.push(new Point(x + i, y - i));
      }
      break;
    case Direction.LEFT_TOP_TO_RIGHT_BOTTOM:
      for (let i = 0; i < word.length; i++) {
        points.push(new Point(x + i, y + i));
      }
      break;
  }
  return points;
};
