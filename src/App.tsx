import Puzzle from "@/components/Puzzle/Puzzle";
import { Category, PuzzleData } from "./lib/data";
import { useState } from "react";
import CategoryPicker from "./components/CategoryPicker/CategoryPicker";
import HelpModal from "./HelpModal";
import { useKeyPressEvent } from "react-use";
import PrinterIcon from "@/assets/icons/PrinterIcon";
import QuestionMarkIcon from "@/assets/icons/QuestionMarkIcon";
import { getAssetUrl } from "@/settings";

function App() {
  const [data, setData] = useState<PuzzleData | undefined>();

  const handleCategoryChange = (category: Category, puzzleData: PuzzleData) => {
    setData(puzzleData);
  };

  const showCategoryPicker = () => {
    setData(undefined);
  };

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const showHelpModal = () => {
    setIsHelpOpen(true);
  };

  ["?", "h"].forEach((ch) => {
    useKeyPressEvent(ch, () => {
      setIsHelpOpen(!isHelpOpen);
    });
  });

  const printPage = () => {
    window.print();
  };

  return (
    <>
      <div className="flex justify-center items-center pt-12">
        <div className="max-w-xl">
          <h1 className="text-3xl text-blue-400 text-center">Word search</h1>
          {!data ? (
            <>
              <div className="my-8">
                <img
                  className="object-cover max-w-64"
                  src={getAssetUrl("/logo.webp")}
                  alt="logo"
                />
              </div>
              <div className="my-8">
                <CategoryPicker onChange={handleCategoryChange} />
              </div>
            </>
          ) : (
            <div className="my-4">
              <div className="my-4 print:hidden">
                <a className="link" onClick={() => showCategoryPicker()}>
                  Change category
                </a>
              </div>
              <Puzzle words={data.words} />
              <div className="mt-12 flex gap-4 print:hidden">
                <button className="btn" onClick={printPage}>
                  <PrinterIcon className="size-4" />
                  Print
                </button>
                <button className="btn" onClick={showHelpModal}>
                  <QuestionMarkIcon className="size-4" />
                  Help
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <HelpModal open={isHelpOpen} close={() => setIsHelpOpen(false)} />
    </>
  );
}

export default App;
