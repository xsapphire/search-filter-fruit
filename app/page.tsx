"use client";

import { FruitDisplay } from "./pages/components/FruitDisplay";
import { FruitSelect } from "./pages/components/FruitSelect";
import { FruitContext } from "./pages/context/fruit";
import fruitsData from "./data/fruits.json";
import { useState } from "react";
import { createOptions, Option } from "./utils/option";
import { FruitSearch } from "./pages/components/FruitSearch";
import styled from "styled-components";

const Card = styled.div`
  width: 500px;
  border: 1px solid #ddd;
`;

export type Fruit = {
  name: string;
  brief: string;
  description: string;
};

const fruitData: Fruit[] = JSON.parse(JSON.stringify(fruitsData)).fruits;

export default function Home() {
  const fruitNames = fruitData.map((d) => d.name);
  const fruitOptions = createOptions(fruitNames);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );

  return (
    <main className="h-screen flex justify-center items-center">
      <FruitContext.Provider
        value={{
          selectedFruit: selectedOption,
          fruitOptions,
          updateSelectedFruit: setSelectedOption,
          fruitData,
        }}
      >
        <Card className="flex gap-4 flex-col bg-white p-4 rounded-2xl shadow">
          <FruitSearch />
          <FruitSelect />

          <hr />

          <FruitDisplay />
        </Card>
      </FruitContext.Provider>
    </main>
  );
}
