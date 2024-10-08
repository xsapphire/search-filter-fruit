import React, { ReactElement, useContext } from "react";
import { FruitContext } from "../context/fruit";
import { Select } from "../../components/Select";

export const FruitSelect = (): ReactElement => {
  const { fruitOptions, updateSelectedFruit } = useContext(FruitContext);

  return (
    <div>
      <h2>Select Fruit</h2>
      <Select
        options={fruitOptions}
        onSelect={(v) => {
          updateSelectedFruit?.(v);
        }}
        onClear={() => {
          updateSelectedFruit?.(undefined);
        }}
        placeholder="Select a fruit"
        useClearIcon
        enableSearch
      />
    </div>
  );
};
