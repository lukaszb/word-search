import { create } from "zustand";
import { Board, BoardCell, Point, pointToKey } from "@/lib/board";

interface BaseBoardState {
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
    console.log(" => selectWord", word);
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
}));
