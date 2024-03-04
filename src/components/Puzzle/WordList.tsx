interface Props {
  words: string[];
  onWordClick?: (word: string) => void;
}

export const WordList = ({ words, onWordClick }: Props) => {
  const handleClick = (word: string) => {
    onWordClick?.(word);
    console.log("clicked", word);
  };

  return (
    <>
      <h3 className="text font-semibold mb-2">Words</h3>
      <ul className="flex flex-col gap-2">
        {words.map((word) => (
          <li
            className="border rounded uppercase p-1 text-xs cursor-pointer"
            key={word}
            onClick={() => handleClick(word)}
          >
            {word}
          </li>
        ))}
      </ul>
    </>
  );
};
