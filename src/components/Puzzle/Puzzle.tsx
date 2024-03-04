import { createBoard } from "@/lib/board";

export interface CellProps {
  x: number;
  y: number;
  char: string;
}
export const Cell = ({ x, y, char }: CellProps) => {
  return (
    <div className="p-1 flex justify-center items-center border rounded w-8 h-8 text-sm">
      {char}
    </div>
  );
};

export interface RowProps {
  cells: CellProps[];
}
export const Row = ({ cells }: RowProps) => {
  return (
    <div className="flex gap-1">
      {cells.map((cell) => {
        const { x, y, char } = cell;
        return <Cell x={x} y={y} char={char} key={`${x},${y}`} />;
      })}
    </div>
  );
};

const Puzzle = () => {
  const size = 9;
  const board = createBoard(size, size, "X");
  return (
    <>
      <div className="flex flex-col gap-1">
        {board.map((row, y) => {
          const cells = row.map((char, x) => ({
            x,
            y,
            char,
          }));
          return <Row cells={cells} key={y} />;
        })}
      </div>
    </>
  );
};

export default Puzzle;
