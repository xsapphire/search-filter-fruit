import { createContext } from "react";
import { Option } from "../../utils/option";
import { Fruit } from "@/app/page";

type FruitContextProps = {
  selectedFruit: Option | undefined;
  updateSelectedFruit: ((option: Option | undefined) => void) | undefined;
  fruitOptions: Option[];
  fruitData: Fruit[];
};

export const FruitContext = createContext<FruitContextProps>({
  selectedFruit: undefined,
  updateSelectedFruit: undefined,
  fruitOptions: [],
  fruitData: [],
});
