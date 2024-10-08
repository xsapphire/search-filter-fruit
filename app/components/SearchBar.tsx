import { ReactElement, useRef, useState } from "react";
import { createOption, Option } from "../utils/option";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { useClickOutside } from "../hooks/useClickOutside";
import { Fruit } from "../page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { themedColors } from "../colors";

const SearchDropdown = styled.ul`
  border: 1px solid ${themedColors.input.border};
  z-index: 1;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  right: 0.5em;
  top: calc((100% - 1em) / 2);
  color: ${themedColors.icon.input};
`;

type SearchBarProps<T> = {
  suggestRange?: T[];
  placeholder?: string;
};

/**
 * @param suggestRange {T[]} optional, an array of items to suggest from
 * @param placeholder {string} optional, the placeholder text
 * @returns
 */
export const SearchBar = <T extends Fruit>({
  suggestRange,
  placeholder,
}: SearchBarProps<T>): ReactElement => {
  const [suggestedItems, setSuggestedItems] = useState<Option[] | undefined>(
    undefined
  );
  const [showDetail, setShowDetail] = useState<Option | undefined>(undefined);

  const onSearch = (input: string) => {
    if (!input) {
      setSuggestedItems(undefined);
      setShowDetail(undefined);
      return;
    }

    const filteredOptions = suggestRange?.reduce<Option[]>((acc, item) => {
      if (item.name.toUpperCase().includes(input.toUpperCase())) {
        acc.push(createOption(item.name));
      }

      return acc;
    }, []);

    setSuggestedItems(filteredOptions);
  };

  const debouncedOnChange = debounce(onSearch, 500);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setSuggestedItems(undefined);
    setShowDetail(undefined);
  });

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

      {suggestedItems && suggestedItems.length > 0 && (
        <SearchDropdown className="absolute w-full py-1 bg-white rounded mt-1">
          {suggestedItems.map((item) => {
            const detailItem = showDetail && item.value === showDetail.value;

            return (
              <li
                key={item.value}
                onClick={() => setShowDetail(item)}
                className={detailItem ? "active" : undefined}
              >
                <p>{item.label}</p>

                {detailItem && (
                  <p className="italic text-sm text-slate-100">
                    {suggestRange?.find((i) => i.name === item.label)?.brief}
                  </p>
                )}
              </li>
            );
          })}
        </SearchDropdown>
      )}
    </div>
  );
};
