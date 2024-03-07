import { Category, PuzzleData, DATA } from "@/lib/data";

export interface Props {
  onChange?: (category: Category, puzzleData: PuzzleData) => void;
}

const CategoryPicker = ({ onChange }: Props) => {
  const handleCategoryClick = (c: Category, data: PuzzleData) => {
    onChange?.(c, data);
  };

  return (
    <div>
      <h3 className="font-semibold mb-4">Choose puzzle</h3>
      <ul>
        {Object.entries(DATA).map(([category, data]) => {
          return (
            <li
              key={category}
              className="cursor-pointer hover:text-sky-400"
              onClick={() => handleCategoryClick(category as Category, data)}
            >
              {data.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryPicker;
