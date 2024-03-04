import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { BoardCell } from "@/lib/board";

interface State {
  hoveredCell?: BoardCell;
  clearHoveredCell: () => void;
  setHoveredCell: (cell: BoardCell) => void;
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
      }),
      {
        name: "board-storage",
      }
    )
  )
);
