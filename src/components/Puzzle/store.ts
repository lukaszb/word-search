import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Board, BoardCell, Point, pointToKey } from "@/lib/board";

interface State {
  hoveredCell?: BoardCell;
  clearHoveredCell: () => void;
  setHoveredCell: (cell: BoardCell) => void;
  board?: Board;
  setBoard: (board: Board) => void;
  wordClassNamesMap?: Record<string, string>;
  highlightedPoints: Record<string, string>;
  clearHighlightedPoints: () => void;
  setHighlightedPoints: (points: Point[], className: string) => void;
  getCellHighlightClassName: (point: Point) => string;
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
          useStore.getState().clearHighlightedPoints();
          return set((state) => ({
            ...state,
            board,
          }));
        },
        highlightedPoints: {},
        clearHighlightedPoints: () => {
          set((state) => ({
            ...state,
            highlightedPoints: {},
          }));
        },
        setHighlightedPoints: (points: Point[], className: string) => {
          const submap = points.reduce((map, point) => {
            map[point.toString()] = className;
            return map;
          }, {} as Record<string, string>);
          return set((state) => ({
            ...state,
            highlightedPoints: {
              ...state.highlightedPoints,
              ...submap,
            },
          }));
        },
        getCellHighlightClassName: (point: Point) => {
          const { highlightedPoints } = useStore.getState();
          return highlightedPoints[pointToKey(point)];
        },
      }),
      {
        name: "board-storage",
      }
    )
  )
);
