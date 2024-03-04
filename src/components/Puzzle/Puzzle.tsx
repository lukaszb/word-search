import { BoardCell, createBoard } from "@/lib/board";
import { useStore } from "./store";

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
  const onMouseLeave = () => {
    store.clearHoveredCell();
  };
  return (
    <div
      className="p-1 flex justify-center items-center border rounded w-8 h-8 text-sm"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
  return (
    <>
      <div className="flex flex-col gap-1">
        {board.getRows().map((cells, x) => {
          return <Row cells={cells} key={x} />;
        })}
      </div>
      <pre>{JSON.stringify({ hoveredCell: store.hoveredCell }, null, 2)}</pre>
      {DEBUG && (
        <div className="my-2 text-sky-400">
          {store.hoveredCell && (
            <p>
              Hover: ({store.hoveredCell.x}, {store.hoveredCell.y})
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Puzzle;
