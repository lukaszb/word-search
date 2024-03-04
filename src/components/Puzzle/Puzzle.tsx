import { BoardCell, createBoard } from "@/lib/board";
import { useStore } from "./store";
import { useState } from "react";

const DEBUG = true;

export interface CellProps {
  cell: BoardCell;
}
export const Cell = ({ cell }: CellProps) => {
  const { x, y, char } = cell;
  const store = useStore();
  const onMouseEnter = () => {
    store.setHoveredCell(cell);
  };
  return (
    <div
      className="
        p-1 flex justify-center items-center border rounded w-8 h-8 text-sm
        hover:bg-sky-100
      "
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
  const board = createBoard({ size });
  const onMouseLeave = () => {
    store.clearHoveredCell();
  };

  const [word, setWord] = useState("elephant");

  return (
    <>
      <div className="flex flex-col gap-1" onMouseLeave={onMouseLeave}>
        {board.getRows().map((cells, x) => {
          return <Row cells={cells} key={x} />;
        })}
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
          <div>
            <input type="text" onChange={(e) => setWord(e.target.value)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Puzzle;
