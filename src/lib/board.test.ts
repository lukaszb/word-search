import { describe, it, test, expect } from "vitest";
import { Direction, canInsertWord, createBoard } from "./board";

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
      console.log(" => canInsert:", canInsert);
      expect(canInsert).toBe(expected);
    }
  );
});
