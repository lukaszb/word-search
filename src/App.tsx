import Puzzle from "@/components/Puzzle/Puzzle";
import { Category, PuzzleData } from "./lib/data";
import { useState } from "react";
import CategoryPicker from "./components/CategoryPicker/CategoryPicker";
import HelpModal from "./HelpModal";
import { useKeyPressEvent } from "react-use";

function App() {
  const [data, setData] = useState<PuzzleData | undefined>();

  const handleCategoryChange = (category: Category, puzzleData: PuzzleData) => {
    setData(puzzleData);
  };

  const showCategoryPicker = () => {
    setData(undefined);
  };

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  ["?", "h"].forEach((ch) => {
    useKeyPressEvent(ch, () => {
      setIsHelpOpen(!isHelpOpen);
    });
  });

  return (
    <>
      <div className="flex justify-center items-center pt-12">
        <div>
          <h1 className="text-3xl text-blue-400 text-center">Word search</h1>
          {!data ? (
            <div className="my-8">
              <CategoryPicker onChange={handleCategoryChange} />
            </div>
          ) : (
            <div className="my-4">
              <div className="my-2">
                <a className="link" onClick={() => showCategoryPicker()}>
                  Change category
                </a>
              </div>
              <Puzzle words={data.words} />
            </div>
          )}
        </div>
      </div>
      <HelpModal open={isHelpOpen} close={() => setIsHelpOpen(false)} />
    </>
  );
}

export default App;
