import { useContext } from "react";
import { FruitContext } from "../context/fruit";
import fruitsData from "../../data/fruits.json";
import { Fruit } from "@/app/page";
import styled from "styled-components";

const BriefText = styled.p`
  font-style: italic;
  color: #888;
  font-size: 0.9em;
`;

export const FruitDisplay = () => {
  const fruitCtx = useContext(FruitContext);

  const fruits: Fruit[] = JSON.parse(JSON.stringify(fruitsData)).fruits;
  const fruitData = fruits.find(
    (f) => f.name === fruitCtx?.selectedFruit.label
  );

  return (
    <div className="flex gap-1 flex-col">
      <h2>{fruitData?.name}</h2>
      <BriefText>{fruitData?.brief}</BriefText>
      <p>{fruitData?.description}</p>
    </div>
  );
};
