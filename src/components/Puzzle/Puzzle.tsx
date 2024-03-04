import {
  Board,
  BoardCell,
  createBoard,
  getDirectionsWordCanBeInserted,
  getPointsForWord,
} from "@/lib/board";
import { useStore } from "./store";
import { useEffect, useMemo, useState } from "react";
import { WordList } from "./WordList";
import classNames from "classnames";

const DEBUG = false;

export interface CellProps {
  cell: BoardCell;
}
export const Cell = ({ cell }: CellProps) => {
  const { x, y, char } = cell;
  const store = useStore();
  const onMouseEnter = () => {
    store.setHoveredCell(cell);
  };
  const className = store.getCellHighlightClassName({ x, y });
  return (
    <div
      className={classNames(
        `
        p-1 flex justify-center items-center border rounded w-8 h-8 text-sm
        hover:bg-sky-100`,
        className
      )}
      onMouseEnter={onMouseEnter}
    >
      {char}
    </div>
  );
};

export interface RowProps {
  cells: BoardCell[];
}
export const Row = ({ cells }: RowProps) => {
  return (
    <div className="flex gap-1">
      {cells.map((cell) => {
        return <Cell cell={cell} key={`${cell.x},${cell.y}`} />;
      })}
    </div>
  );
};

const Puzzle = () => {
  const size = 9;
  const store = useStore();
  const words = ["leopard", "elephant", "lion", "turtle", "bird"].map((w) =>
    w.toUpperCase()
  );
  const getNewBoard = () => {
    return createBoard({ size, words, fillEmptyCellsWithRandomChars: true });
  };
  const [board, setBoard] = useState<Board>(getNewBoard());
  Object.assign(window, { store });

  useEffect(() => {
    store.setBoard(board);
  }, []);

  const onMouseLeave = () => {
    store.clearHoveredCell();
  };

  const [word, setWord] = useState("elephant");

  const possibleDirections = useMemo(() => {
    if (store.hoveredCell) {
      return getDirectionsWordCanBeInserted(
        board,
        word,
        store.hoveredCell.x,
        store.hoveredCell.y
      );
    }
    return [];
  }, [store, board, word]);

  const COLORS = [
    "text-sky-400",
    "text-violet-400",
    "text-orange-400",
    "text-purple-400",
    "text-red-400",
  ];

  const [wordsColors, setWordsColors] = useState<Record<string, string>>({});

  const handleWordClick = (word: string) => {
    const insertedWord = board.findInsertedWord(word);
    if (insertedWord) {
      if (wordsColors[insertedWord.word]) {
        store.clearHighlightedPoints();
        setWordsColors({});
        return;
      }
      const { x, y, word, direction } = insertedWord;
      const points = getPointsForWord(board, word, x, y, direction);
      store.clearHighlightedPoints();
      const color = COLORS[0];
      store.setHighlightedPoints(points, color);
      setWordsColors({
        [word]: color,
      });
    } else {
      throw new Error(` => no inserted word found ${word}`);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1" onMouseLeave={onMouseLeave}>
        {board.getRows().map((cells, x) => {
          return <Row cells={cells} key={x} />;
        })}
      </div>
      <div className="my-4">
        <WordList
          words={words}
          onWordClick={handleWordClick}
          wordtoClassNameMap={wordsColors}
        />
      </div>
      {DEBUG && (
        <div className="my-4 flex flex-col gap-4">
          {store.hoveredCell && (
            <div>
              <p className="text-sky-400">
                Hover: ({store.hoveredCell.x}, {store.hoveredCell.y})
              </p>
              <pre>
                {JSON.stringify({ hoveredCell: store.hoveredCell }, null, 2)}
              </pre>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              value={word}
              className="font-sans block text-sm w-full py-2 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400"
              type="text"
              onChange={(e) => setWord(e.target.value)}
            />
            <pre>{JSON.stringify({ possibleDirections }, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Puzzle;
