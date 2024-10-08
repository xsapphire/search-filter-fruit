import { useContext } from "react";
import { FruitContext } from "../context/fruit";

export const FruitDisplay = () => {
  const { selectedFruit, fruitData } = useContext(FruitContext);

  if (!selectedFruit) {
    return <p>Please select a fruit to view details. </p>;
  }

  const fruitDetail = fruitData.find((f) => f.name === selectedFruit.label);

  if (!fruitDetail) {
    return <p>Sorry, something went wrong. </p>;
  }

  return (
    <div className="flex gap-1 flex-col">
      <h2>{fruitDetail.name}</h2>
      <p className="italic text-sm text-slate-500">{fruitDetail.brief}</p>
      <p>{fruitDetail.description}</p>
    </div>
  );
};
