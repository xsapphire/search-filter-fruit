import { ReactElement, useRef, useState } from "react";
import { Option } from "../utils/option";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { useClickOutside } from "../hooks/useClickOutside";
import { Fruit } from "../page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchDropdown = styled.ul`
  margin-top: 0.25em;
  border: 1px solid #bababa;
  border-radius: 0.25em;
  z-index: 2;
  background: #ffffff;
`;

const DetailText = styled.p`
  font-style: italic;
  font-size: 0.9em;
  color: #888;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  right: 0.5em;
  top: calc((100% - 1em) / 2);
  color: #bababa;
`;

type SearchBarProps<T> = {
  suggestedOptions?: Option[];
  itemDetails?: T[];
  placeholder?: string;
};

export const SearchBar = <T extends Fruit>({
  suggestedOptions,
  itemDetails,
  placeholder,
}: SearchBarProps<T>): ReactElement => {
  console.log("item details: ", itemDetails);

  const [suggestedItems, setSuggestedItems] = useState<Option[] | undefined>(
    undefined
  );
  const [showDetail, setShowDetail] = useState<Option | undefined>(undefined);

  const handleInputChange = (input: string) => {
    if (!input) {
      setSuggestedItems(undefined);
      setShowDetail(undefined);
      return;
    }

    const filteredOptions = suggestedOptions?.reduce<Option[]>(
      (acc, option) => {
        if (option.label.toUpperCase().includes(input.toUpperCase())) {
          acc.push(option);
        }

        return acc;
      },
      []
    );

    setSuggestedItems(filteredOptions);
  };

  const debouncedOnChange = debounce(handleInputChange, 500);

  const onClickOutside = () => {
    setSuggestedItems(undefined);
    setShowDetail(undefined);
  };

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div ref={ref} className="relative">
      <input
        className="w-full"
        onChange={(event) => {
          debouncedOnChange(event.target.value);
        }}
        placeholder={placeholder}
      />
      <SearchIcon className="absolute" icon={faSearch} />
      {suggestedItems && (
        <SearchDropdown className="absolute w-full">
          {suggestedItems.map((item) => {
            return (
              <li key={item.value} onClick={() => setShowDetail(item)}>
                <p>{item.label}</p>
                {showDetail && item.value === showDetail.value && (
                  <DetailText>
                    {itemDetails?.find((d) => d.name === item.label)?.brief}
                  </DetailText>
                )}
              </li>
            );
          })}
        </SearchDropdown>
      )}
    </div>
  );
};
