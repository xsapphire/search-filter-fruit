import { SearchBar } from "@/app/components/SearchBar";
import { ReactElement, useContext } from "react";
import { FruitContext } from "../context/fruit";

export const FruitSearch = (): ReactElement => {
  const { fruitOptions, fruitData } = useContext(FruitContext);

  return (
    <div>
      <h2>Search</h2>
      <SearchBar suggestRange={fruitData} placeholder="Search a fruit" />
    </div>
  );
};
