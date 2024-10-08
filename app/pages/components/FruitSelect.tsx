import React, { ReactElement, useContext } from "react";
import { FruitContext } from "../context/fruit";
import { Select } from "../../components/Select";

export const FruitSelect = (): ReactElement => {
  const fruitContext = useContext(FruitContext);

  return (
    <div className="App">
      <h2>Select Fruit</h2>
      <Select
        defaultValue={fruitContext?.selectedFruit}
        options={fruitContext?.fruitOptions}
        onChange={(v) => {
          fruitContext?.updateSelectedFruit(v);
        }}
      />
    </div>
  );
};
