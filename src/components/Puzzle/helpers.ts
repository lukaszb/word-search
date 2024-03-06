import { useStore } from "./store";
import { useKeyPressEvent } from "react-use";

export const useShortcuts = () => {
  const store = useStore();

  useKeyPressEvent("a", () => {
    if (store.areAllWordsSelected()) {
      store.deselectAllWords();
    } else {
      store.selectAllWords();
    }
  });
};

const COLORS = [
  "bg-sky-400 text-white",
  "bg-violet-400 text-white",
  "bg-orange-400 text-white",
  "bg-purple-400 text-white",
  "bg-red-400 text-white",
];

export const getStyleForWord = (word: string) => {
  const num = stringToNumber(word);
  return COLORS[num % COLORS.length];
};

export const stringToNumber = (s: string) => {
  return Array.from(s)
    .map((ch, i) => s.charCodeAt(i))
    .reduce((curr, num) => curr + num, 0);
};
