import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Board, BoardCell } from "@/lib/board";

interface State {
  hoveredCell?: BoardCell;
  clearHoveredCell: () => void;
  setHoveredCell: (cell: BoardCell) => void;
  board?: Board;
  setBoard: (board: Board) => void;
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
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
          return set(state => ({
            ...state,
            board
          }))
        }
      }),
      {
        name: "board-storage",
      }
    )
  )
);
