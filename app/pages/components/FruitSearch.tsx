import { SearchBar } from "@/app/components/SearchBar";
import { ReactElement, useContext } from "react";
import { FruitContext } from "../context/fruit";
import fruitsData from "../../data/fruits.json";
import { Fruit } from "@/app/page";

const fruitData: Fruit[] = JSON.parse(JSON.stringify(fruitsData)).fruits;

export const FruitSearch = (): ReactElement => {
  const fruitOptions = useContext(FruitContext);
  return (
    <div>
      <h2>Search bar</h2>
      <SearchBar
        suggestedOptions={fruitOptions?.fruitOptions}
        itemDetails={fruitData}
        placeholder="Search a fruit"
      />
    </div>
  );
};
