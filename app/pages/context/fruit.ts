import { createContext } from "react";
import { Option } from "../../utils/option";

type FruitContextProps = {
  selectedFruit: Option;
  updateSelectedFruit: (option: Option) => void;
  fruitOptions: Option[];
};

export const FruitContext = createContext<FruitContextProps | undefined>(
  undefined
);
