import Puzzle from "@/components/Puzzle/Puzzle.tsx";

function App() {
  return (
    <div className="flex justify-center items-center pt-12">
      <div>
        <h1 className="text-3xl text-blue-400 text-center">Word search</h1>
        <div className="my-4">
          <Puzzle />
        </div>
      </div>
    </div>
  );
}

export default App;
