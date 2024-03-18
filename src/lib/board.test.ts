import { describe, it, test, expect } from "vitest";
import {
  Direction,
  canInsertWord,
  createBoard,
  getPointsForWord,
} from "./board";

describe("board.canInsertWord", () => {
  test.each([
    {
      size: 3,
      word: "foo",
      x: 0,
      y: 0,
      direction: Direction.LEFT_TO_RIGHT,
      expected: true,
    },
    {
      size: 3,
      word: "foo",
      x: 2,
      y: 0,
      direction: Direction.LEFT_TO_RIGHT,
      expected: false,
    },
  ])(
    'test if can insert word "$word" at $x, $y, $direction',
    ({ size, word, x, y, direction, expected }) => {
      const board = createBoard({ size });
      const canInsert = canInsertWord(board, word, x, y, direction);
      expect(canInsert).toBe(expected);
    }
  );

  test("can insert word in partially filled board", () => {
    const board = createBoard({ size: 3 });
    board.insertWord("bar", 1, 0, Direction.TOP_TO_BOTTOM);
    const canInsert = canInsertWord(
      board,
      "tap",
      0,
      1,
      Direction.LEFT_TO_RIGHT
    );
    expect(canInsert).toBe(true);
  });
});

describe("board.getPointsForWord", () => {
  test.each([
    {
      word: "foo",
      x: 0,
      y: 0,
      direction: Direction.LEFT_TO_RIGHT,
      expected: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    },
    {
      word: "foo",
      x: 0,
      y: 2,
      direction: Direction.LEFT_TOP_TO_RIGHT_BOTTOM,
      expected: [
        [0, 2],
        [1, 3],
        [2, 4],
      ],
    },
  ])(
    'test points for word "$word" at (%x, %y) with direction $direction',
    ({ word, x, y, direction, expected }) => {
      const points = getPointsForWord(word, x, y, direction);
      expect(points.map((p) => [p.x, p.y])).toEqual(expected);
    }
  );
});
