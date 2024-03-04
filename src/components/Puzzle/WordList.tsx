import classNames from "classnames";

interface Props {
  words: string[];
  onWordClick?: (word: string) => void;
  wordtoClassNameMap?: Record<string, string>;
}

export const WordList = ({ words, onWordClick, wordtoClassNameMap }: Props) => {
  const handleClick = (word: string) => {
    onWordClick?.(word);
  };

  return (
    <>
      <h3 className="text font-semibold mb-2">Words</h3>
      <ul className="flex flex-col gap-2">
        {words.map((word) => (
          <li
            className={classNames(
              "border rounded uppercase p-1 text-xs cursor-pointer",
              wordtoClassNameMap?.[word]
            )}
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
