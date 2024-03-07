export enum Category {
  ANIMALS = "ANIMALS",
  FOOD = "FOOD",
  ICE_CREAM_FLAVORS = "ICE_CREAM_FLAVORS",
  MONSTERS = "MONSTERS",
  COLORS = "COLORS",
}

export interface PuzzleData {
  title: string;
  words: string[];
}

export const DATA: Record<Category, PuzzleData> = {
  [Category.ANIMALS]: {
    title: "Animals",
    words: ["bird", "cat", "dog", "elephant", "lion", "snake"],
  },
  [Category.ICE_CREAM_FLAVORS]: {
    title: "Ice cream flavors",
    words: ["vanilla", "strawberry", "fudge", "banana", "chocolate", "lemon"],
  },
  [Category.FOOD]: {
    title: "Food",
    words: ["salad", "potato", "tomato", "apple", "banana", "fish", "chips"],
  },
  [Category.COLORS]: {
    title: "Colors",
    words: [
      "red",
      "orange",
      "purple",
      "white",
      "black",
      "yellow",
      "green",
      "blue",
    ],
  },
  [Category.MONSTERS]: {
    title: "Monsters",
    words: ["vampire", "ghost", "mummy", "skeleton", "dragon", "lich", "witch"],
  },
};
