import { create } from "zustand";
import { Board, BoardCell, Point, createBoard } from "@/lib/board";
import { COLORS } from "./Puzzle.helpers";

export interface InitBoardProps {
  words: string[];
  size: number;
  fillEmptyCellsWithRandomChars?: boolean;
}

interface BaseBoardState {
  initBoard: (props: InitBoardProps) => void;
  hoveredCell?: BoardCell;
  clearHoveredCell: () => void;
  setHoveredCell: (cell: BoardCell) => void;
  board?: Board;
  setBoard: (board: Board) => void;
  wordClassNamesMap?: Record<string, string>;
}

interface SelectionState {
  isWordSelected: (word: string) => boolean;
  selectedWords: Set<string>;
  areAllWordsSelected: () => boolean;
  getSelectedWordsList: () => string[];
  selectWord: (word: string) => void;
  deselectWord: (word: string) => void;
  selectAllWords: () => void;
  deselectAllWords: () => void;
  isCellSelected: (point: Point) => boolean;
  wordToStyleMap: Record<string, string>;
}

type State = BaseBoardState & SelectionState;

export const useStore = create<State>()((set, get) => ({
  hoveredCell: undefined,
  clearHoveredCell: () => {
    set((state) => ({
      ...state,
      hoveredCell: undefined,
    }));
  },
  setHoveredCell: (cell: BoardCell) =>
    set((state) => {
      return {
        ...state,
        hoveredCell: cell,
      };
    }),
  board: undefined,
  setBoard: (board?: Board) => {
    return set((state) => ({
      ...state,
      board,
    }));
  },
  initBoard: (props: InitBoardProps) => {
    const { words, size, fillEmptyCellsWithRandomChars = true } = props;
    const board = createBoard({ size, words, fillEmptyCellsWithRandomChars });
    const store = get();
    store.setBoard(board);
    // store.selectAllWords();
  },

  // selection state
  isWordSelected: (word: string) => {
    return useStore.getState().selectedWords.has(word);
  },
  isCellSelected: (point: Point) => {
    return true;
  },
  selectedWords: new Set<string>(),
  areAllWordsSelected: () => {
    const selectedWordsLength = get().selectedWords.size;
    const insertedWordsLength = get().board?.insertedWords.length;
    return (
      selectedWordsLength === insertedWordsLength && selectedWordsLength > 0
    );
  },
  getSelectedWordsList: () =>
    Array.from(useStore.getState().selectedWords) as string[],
  selectWord: (word: string) => {
    set((state) => ({
      ...state,
      selectedWords: new Set([...Array.from(state.selectedWords), word]),
    }));
  },
  deselectWord: (word: string) => {
    set((state) => ({
      ...state,
      selectedWords: new Set(
        Array.from(state.selectedWords).filter((w) => w !== word)
      ),
    }));
  },
  selectAllWords: () => {
    set((state) => ({
      ...state,
      selectedWords: new Set(
        state.board?.insertedWords.map((w) => w.word) || []
      ),
    }));
  },
  deselectAllWords: () => {
    set((state) => ({
      ...state,
      selectedWords: new Set<string>(),
    }));
  },
  wordToStyleMap: {},
  getStyleForWord: (word: string) => {
    const { board, wordToStyleMap } = get();
    if (!wordToStyleMap[word]) {
      // init wordToStyleMap based on board
      board?.insertedWords.forEach((iw, i) => {
        wordToStyleMap[iw.word] = COLORS[i % COLORS.length];
      });
    }
    return wordToStyleMap[word];
  },
}));
