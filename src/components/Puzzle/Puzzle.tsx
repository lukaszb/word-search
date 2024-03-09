import { useEffect, useMemo } from "react";
import { BoardCell, createBoard } from "@/lib/board";
import { useStore } from "./store";
import { WordList } from "./WordList";
import classNames from "classnames";
import { useShortcuts } from "./Puzzle.helpers";

export interface CellProps {
  cell: BoardCell;
}
export const Cell = ({ cell }: CellProps) => {
  const store = useStore();
  const onMouseEnter = () => {
    store.setHoveredCell(cell);
  };
  const selectedWord = cell.words.filter((w) =>
    store.isWordSelected(w.word)
  )[0];
  const isSelected = !!selectedWord;
  const className = isSelected ? store.getStyleForWord(selectedWord.word) : "";
  return (
    <div
      className={classNames(
        `
        p-1 flex justify-center items-center border rounded w-8 h-8 text-sm
        hover:opacity-80`,
        className
      )}
      onMouseEnter={onMouseEnter}
    >
      {cell.char}
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

export interface PuzzleProps {
  words: string[];
}

const Puzzle = ({ words: wordsProp }: PuzzleProps) => {
  const store = useStore();
  const words = useMemo(
    () => wordsProp.map((w) => w.toUpperCase()),
    [wordsProp]
  );

  const maxWordLength = useMemo(() => {
    return Math.max(...wordsProp.map((w) => w.length));
  }, [wordsProp]);

  const size = maxWordLength + 2;

  const getNewBoard = () => {
    return createBoard({ size, words, fillEmptyCellsWithRandomChars: true });
  };
  Object.assign(window, { store });

  useEffect(() => {
    const board = getNewBoard();
    store.setBoard(board);
    // store.selectAllWords();
  }, [wordsProp]);

  useShortcuts();

  const onMouseLeave = () => {
    store.clearHoveredCell();
  };

  const handleWordClick = (word: string) => {
    if (store.isWordSelected(word)) {
      store.deselectWord(word);
    } else {
      store.selectWord(word);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1" onMouseLeave={onMouseLeave}>
        {store.board?.getRows().map((cells, x) => {
          return <Row cells={cells} key={x} />;
        })}
      </div>
      <div className="my-4">
        <WordList
          words={words}
          onWordClick={handleWordClick}
          selectedWords={store.getSelectedWordsList()}
        />
      </div>
    </>
  );
};

export default Puzzle;
